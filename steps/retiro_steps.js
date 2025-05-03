// steps/retiro_steps.js
const assert = require('assert');
const { When, Then } = require('@cucumber/cucumber');

When('retiro ${int} de la cuenta actual', async function(amount) {
  // 1) Guardamos saldo antes del retiro
  this.oldBalance = await this.accountPage.getBalance(this.accountId);
  // 2) Ejecutamos retiro via API
  await this.accountPage.withdraw(this.accountId, amount);
});

Then('el saldo de la cuenta actual disminuye en ${int}', async function(amount) {
  if (this.transferPage && this.oldFrom != null) {
    // transferencia
    await this.transferPage.expectFromBalanceReduced(this.accountId, this.oldFrom, amount);
  } else {
    // retiro
    await this.accountPage.expectBalanceReduced(this.accountId, this.oldBalance, amount);
  }
});

