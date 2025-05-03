// steps/transferencia_steps.js
const assert = require('assert');
const { When, Then } = require('@cucumber/cucumber');
const { TransferPage } = require('../pages/transfer.page');

When('transfiero ${int} de la cuenta actual a otra cuenta', async function(amount) {
  this.transferPage = this.transferPage || new TransferPage(this.page);
  // 1) guardar ‘from’ y ‘to’
  this.oldFrom = await this.transferPage.getBalance(this.accountId);
  const other  = await this.transferPage.getAnotherAccountId(this.accountId);
  this.oldTo   = await this.transferPage.getBalance(other);
  this.otherAccountId = other;

  // 2) realizar la transferencia por UI (ver método transfer modificado arriba)
  await this.transferPage.transfer(this.accountId, this.otherAccountId, amount);
});



Then('el saldo de la otra cuenta aumenta en ${int}', async function(amount) {
  await this.transferPage.expectToBalanceIncreased(this.otherAccountId, this.oldTo, amount);
});
