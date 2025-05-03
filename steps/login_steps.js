// steps/login_steps.js
const { Given, When } = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/login.page');

Given('que estoy en la página de login', async function() {
  // guardamos la instancia para los siguientes steps
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When('ingreso credenciales válidas', async function() {
  // suponiendo que this.testUser ya viene de registerAndLogin()
  await this.loginPage.login('john', 'demo');
});
