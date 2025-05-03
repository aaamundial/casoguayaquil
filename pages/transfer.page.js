// pages/transfer.page.js
const { LoginPage } = require('./login.page');

class TransferPage {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.selectors = {
      overviewUrl: 'https://parabank.parasoft.com/parabank/overview.htm',
      transferApi:   'https://parabank.parasoft.com/parabank/services/bank/transfer',
      fromAccount: 'select#fromAccountId',
      toAccount: 'select#toAccountId',
      amountInput: 'input#amount',
      continueBtn: 'input[value="Continue"]',
      transferBtn: 'input[value="Transfer"]',
      successMsg: 'text=Transfer Complete!',
      balanceCell: (acct) => `xpath=//td[a/text()="${acct}"]/following-sibling::td`

    };
  }

  async ensureLoggedIn() {
    await this.loginPage.goto();
    await this.loginPage.login('john', 'demo'); // Usa las mismas credenciales que en AccountPage
    await this.loginPage.submit();
    await this.loginPage.expectLoginSuccess(); // Usa el método correcto de LoginPage
  }

  async ensureBalance(accountId, minAmount) {
    await this.page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    const text = await this.page.textContent(this.selectors.balanceCell(accountId));
    const balance = parseFloat(text.replace(/[^0-9.-]+/g, ''));
    if (balance < minAmount) {
      throw new Error(`Saldo insuficiente (${balance}) en cuenta ${accountId}`);
    }
  }



  async expectFromBalanceReduced(from, amount) {
    await this.page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    await this.page.waitForSelector(`xpath=//td[a/text()="${from}"]/following-sibling::td`);
    const text = await this.page.textContent(`xpath=//td[a/text()="${from}"]/following-sibling::td`);
    const newBalance = parseFloat(text.replace(/[^0-9.-]+/g, ''));
    if (isNaN(newBalance)) {
      throw new Error(`No pude leer el nuevo saldo de ${from}`);
    }
    // Verificar que el saldo ha disminuido (lógica adicional necesaria)
  }

  async expectToBalanceIncreased(to, amount) {
    await this.page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    await this.page.waitForSelector(`xpath=//td[a/text()="${to}"]/following-sibling::td`);
    const text = await this.page.textContent(`xpath=//td[a/text()="${to}"]/following-sibling::td`);
    const newBalance = parseFloat(text.replace(/[^0-9.-]+/g, ''));
    if (isNaN(newBalance)) {
      throw new Error(`No pude leer el nuevo saldo de ${to}`);
    }
    // Verificar que el saldo ha aumentado (lógica adicional necesaria)
  }

  async expectMessage(text) {
    await this.page.waitForSelector(this.selectors.successMsg);
  }

  // --- método actualizado para leer la primera cuenta ---
  async getPrimaryAccountId() {
    await this.page.goto(this.selectors.overviewUrl);
    // Selecciona el primer enlace cuyo href incluya "activity.htm?id="
    const link = await this.page.waitForSelector(
      'table#accountTable tbody tr td:first-child a[href*="activity.htm?id="]'
    );
    return (await link.textContent()).trim();
  }

  async getAnotherAccountId(primary) {
    await this.page.goto(this.selectors.overviewUrl);
    // Espera la tabla
    await this.page.waitForSelector('table#accountTable tbody tr');

    // Extrae todos los IDs de cuenta
    const accounts = await this.page.$$eval(
      'table#accountTable tbody tr td:first-child a[href*="activity.htm?id="]',
      els => els.map(a => a.textContent.trim())
    );

    console.log('⚙️ Cuentas disponibles:', accounts);
    const other = accounts.find(acc => acc !== primary);
    if (!other) {
      throw new Error(
        `No encontré otra cuenta distinta de ${primary}. ` +
        `Cuentas: ${accounts.join(', ')}`
      );
    }
    return other;
  }

  async getBalance(accountId) {
    await this.page.goto(this.selectors.overviewUrl);
    await this.page.waitForSelector(this.selectors.balanceCell(accountId));
    const text = await this.page.textContent(this.selectors.balanceCell(accountId));
    return parseFloat(text.replace(/[^0-9.-]+/g, ''));
  }

  /**
   * Comprueba que desde-account bajó withdrawn.
   */
  async expectFromBalanceReduced(from, oldBalance, withdrawn) {
    const newBalance = await this.getBalance(from);
    if (newBalance !== oldBalance - withdrawn) {
      throw new Error(
        `Saldo origen incorrecto: esperado ${oldBalance - withdrawn}, obtenido ${newBalance}`
      );
    }
  }

  /**
   * Comprueba que to-account subió deposited.
   */
  async expectToBalanceIncreased(to, oldBalance, deposited) {
    const newBalance = await this.getBalance(to);
    if (newBalance !== oldBalance + deposited) {
      throw new Error(
        `Saldo destino incorrecto: esperado ${oldBalance + deposited}, obtenido ${newBalance}`
      );
    }
  }

  /**
   * Transferencia por API REST.
   */
  async transfer(from, to, amount) {
    // 1) Abre la página de transferencia
    await this.page.goto('https://parabank.parasoft.com/parabank/transfer.htm');

    // 2) Rellena monto y cuentas
    await this.page.fill('#amount', amount.toString());
    await this.page.selectOption('#fromAccountId', from);
    await this.page.selectOption('#toAccountId', to);

    // 3) Envía el formulario y espera la página de confirmación
    await Promise.all([
      this.page.waitForSelector(this.selectors.successMsg, { timeout: 30000 }),
      this.page.click('input[type="submit"][value="Transfer"]')
    ]);
  }

}

module.exports = { TransferPage };
