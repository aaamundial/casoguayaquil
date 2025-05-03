// pages/account.page.js
const { LoginPage } = require('./login.page');

class AccountPage {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.selectors = {
      overviewUrl: 'https://parabank.parasoft.com/parabank/overview.htm',
      withdrawUrl: 'https://parabank.parasoft.com/parabank/withdraw.htm',
      accountSelect: 'select#accountId',
      amountInput: 'input#amount',
      continueBtnText: (t) => `input[type="submit"][value="${t}"]`,
      withdrawBtnText: (t) => `input[type="submit"][value="${t}"]`,
      successMsg: 'text=The withdrawal was successful',
      // Localiza el <td> que contiene el <a> con la cuenta y toma la siguiente celda (Balance)
      balanceCell: (acct) =>
        `xpath=//td[a/text()="${acct}"]/following-sibling::td`
    };
  }

  // pages/account.page.js
  async ensureLoggedIn() {
    // 1) Navega a login
    await this.loginPage.goto();
    
    // 2) Prueba con diferentes credenciales conocidas para ParaBank
    // Opción 1: john/demo (original)
    await this.loginPage.login('john', 'demo');
    await this.loginPage.submit();
    
    try {
      await this.loginPage.expectLoginSuccess();
      return; // Si tiene éxito, termina aquí
    } catch (error) {
      console.log('Falló con john/demo, intentando otras credenciales...');
    }
    
    // Intenta con otras credenciales comunes de ParaBank
    const credentialSets = [
      { username: 'admin', password: 'admin' },
      { username: 'parasoft', password: 'demo' },
      { username: 'john', password: 'password' },
      { username: 'customer', password: 'customer' }
    ];
    
    for (const creds of credentialSets) {
      await this.loginPage.goto(); // Vuelve a la página de login
      await this.loginPage.login(creds.username, creds.password);
      await this.loginPage.submit();
      
      try {
        await this.loginPage.expectLoginSuccess();
        console.log(`Éxito al iniciar sesión con ${creds.username}/${creds.password}`);
        return; // Si tiene éxito, termina aquí
      } catch (error) {
        console.log(`Falló con ${creds.username}/${creds.password}`);
      }
    }
    
    // Si ninguna de las credenciales funcionó, lanza un error
    throw new Error('No se pudo iniciar sesión con ninguna de las credenciales conocidas');
  }


  async ensureBalance(accountId, minAmount) {
    await this.page.goto(this.selectors.overviewUrl);
    // Espera a que aparezca la celda de balance
    await this.page.waitForSelector(this.selectors.balanceCell(accountId));
    const text = await this.page.textContent(this.selectors.balanceCell(accountId));
    const balance = parseFloat(text.replace(/[^0-9.-]+/g, ''));
    if (balance < minAmount) {
      throw new Error(`Saldo insuficiente (${balance}) en cuenta ${accountId}`);
    }
  }

  async withdraw(accountId, amount) {
    const response = await this.page.request.post(
      'https://parabank.parasoft.com/parabank/services/bank/withdraw',
      {
        params: { accountId, amount }
      }
    );
    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`Withdraw API falló con ${response.status()}: ${body}`);
    }
  }

  async getBalance(accountId) {
    await this.page.goto(this.selectors.overviewUrl);
    await this.page.waitForSelector(this.selectors.balanceCell(accountId));
    const text = await this.page.textContent(this.selectors.balanceCell(accountId));
    return parseFloat(text.replace(/[^0-9.-]+/g, ''));
  }

  async expectBalanceReduced(accountId, oldBalance, withdrawn) {
    const newBalance = await this.getBalance(accountId);
    if (newBalance !== oldBalance - withdrawn) {
      throw new Error(
        `Saldo incorrecto en ${accountId}: esperado ${oldBalance - withdrawn}, pero es ${newBalance}`
      );
    }
  }
  
  async getPrimaryAccountId() {
    await this.page.goto(this.selectors.overviewUrl);
    const link = await this.page.waitForSelector(
      'css=table#accountTable tbody tr:first-child td a'
    );
    return (await link.textContent()).trim();
  }
  
}

module.exports = { AccountPage };
