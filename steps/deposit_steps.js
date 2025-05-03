// steps/deposit_steps.js
const { Given } = require('@cucumber/cucumber');

Given('deposito ${int} en la cuenta actual', async function(amount) {
  // Usamos la API REST para depositar fondos
  const response = await this.page.request.post(
    'https://parabank.parasoft.com/parabank/services/bank/deposit',
    {
      params: {
        accountId: this.accountId,
        amount: amount
      }
    }
  );
  if (!response.ok()) {
    const text = await response.text();
    throw new Error(
      `Deposit API falló con ${response.status()}: ${text}`
    );
  }
});
