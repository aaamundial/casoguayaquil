// steps/auth_steps.js
const { Given } = require('@cucumber/cucumber');
const { AccountPage } = require('../pages/account.page');

Given('que estoy logueado con usuario válido', async function() {
  this.accountPage = new AccountPage(this.page);
  // 1) Login con usuario preexistente
  await this.accountPage.ensureLoggedIn();  
  // 2) Leer la primera cuenta y guardarla
  this.accountId = await this.accountPage.getPrimaryAccountId();
});
