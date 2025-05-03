// pages/register.page.js
class RegisterPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      firstName: '#customer\\.firstName',
      lastName: '#customer\\.lastName',
      street: '#customer\\.address\\.street',
      city: '#customer\\.address\\.city',
      state: '#customer\\.address\\.state',
      zipCode: '#customer\\.address\\.zipCode',
      phone: '#customer\\.phoneNumber',
      ssn: '#customer\\.ssn',
      username: '#customer\\.username',
      password: '#customer\\.password',
      confirmPassword: '#repeatedPassword',
      submitBtn: 'input[value="Register"]',
      successMsg: 'text=Your account was created successfully',
      postLogin: 'text=Accounts Overview'
    };
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
    await this.page.waitForSelector(this.selectors.firstName);
  }

  async fillForm(userData) {
    for (const [field, value] of Object.entries(userData)) {
      await this.page.fill(this.selectors[field], value);
    }
  }

  async fillCredentials({ username, password }) {
    this.lastUsername = username;
    this.lastPassword = password;
    await this.page.fill(this.selectors.username, username);
    await this.page.fill(this.selectors.password, password);
    await this.page.fill(this.selectors.confirmPassword, password);
  }

  async submit() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'load', timeout: 45000 }),
      this.page.click(this.selectors.submitBtn)
    ]);
  }

  async expectSuccess() {
    await this.page.waitForSelector(this.selectors.successMsg, { timeout: 45000 });
  }

  /**
   * Registra un usuario nuevo y espera a que termine la navegación
   * hasta la página de Accounts Overview.
   * Devuelve { username, password }.
   */
  async registerAndLogin() {
    // 1) Abre el formulario de registro
    await this.goto();

    // 2) Datos fijos (puedes parametrizar si gustas)
    const userData = {
      firstName: 'Test',
      lastName:  'User',
      street:    '123 Test St',
      city:      'Test City',
      state:     'TS',
      zipCode:   '12345',
      phone:     '555-1234',
      ssn:       '123-45-6789'
    };

    // 3) Genera credenciales únicas
    const timestamp = Date.now();
    const username = `test_${timestamp}`;
    const password = 'Password123';

    // 4) Rellena form y envía
    await this.fillForm(userData);
    await this.fillCredentials({ username, password });
    await this.submit();

    // 5) Verifica mensaje de éxito
    await this.expectSuccess();

    // 6) Después del registro, ParaBank te redirige a Overview
    await this.page.waitForSelector(this.selectors.postLogin, { timeout: 45000 });

    // 7) Devuelve las credenciales usadas
    return { username, password };
  }
}

module.exports = { RegisterPage };
