// pages/login.page.js

class LoginPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      username: 'input[name="username"]',
      password: 'input[name="password"]',
      loginButton: 'input[value="Log In"]',
      postLogin: 'text=Accounts Overview'
    };
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await this.page.waitForSelector(this.selectors.username);
  }

  async login(user, pass) {
    console.log(`Intentando login con: ${user}/${pass}`);

    // Limpiar los campos
    await this.page.evaluate(() => {
      document.querySelector('input[name="username"]').value = '';
      document.querySelector('input[name="password"]').value = '';
    });

    // Rellenar usuario y contraseña
    await this.page.fill(this.selectors.username, user);
    await this.page.fill(this.selectors.password, pass);

    // Verificar valores
    const userValue = await this.page.$eval(this.selectors.username, el => el.value);
    const passValue = await this.page.$eval(this.selectors.password, el => el.value);
    console.log(`Valores actuales: username=${userValue}, password=${passValue}`);

    if (userValue !== user || passValue !== pass) {
      console.warn('¡Los valores no coinciden! Reintentando con type()...');
      await this.page.type(this.selectors.username, user, { delay: 100 });
      await this.page.type(this.selectors.password, pass, { delay: 100 });
    }
  }

  async submit() {
    // Hacer click y esperar navegación en paralelo
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'load', timeout: 45000 }),
      this.page.click(this.selectors.loginButton)
    ]);
  }

  async expectLoginSuccess() {
    try {
      // Esperar el texto de la página de overview
      await this.page.waitForSelector(this.selectors.postLogin, { timeout: 45000 });
      return true;
    } catch {
      const currentUrl = this.page.url();
      console.error(`Login fallido: URL actual ${currentUrl}`);
      throw new Error(`No se encontró el texto "${this.selectors.postLogin}" tras el login`);
    }
  }
}

module.exports = { LoginPage };
