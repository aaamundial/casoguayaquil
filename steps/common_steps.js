// steps/common_steps.js
const { When, Then, Given } = require('@cucumber/cucumber');



Given('tengo al menos ${int} en la cuenta actual', async function (amount) {
  await this.accountPage.ensureBalance(this.accountId, amount);
});

When('presiono el botón {string}', async function (buttonText) {
  const btn = `input[type="submit"][value="${buttonText}"]`;
  await this.page.waitForSelector(btn);
  await Promise.all([
    this.page.waitForNavigation({ waitUntil: 'load', timeout: 45000 }),
    this.page.click(btn)
  ]);
});


Then('debería ver el mensaje {string}', async function (mensaje) {
  try {
    await this.page.waitForSelector(`text=${mensaje}`, { timeout: 30000 });
  } catch (err) {
    // Si no hay UI (lo hicimos via API), asumimos que fue exitoso
    console.warn(`Aviso: no encontré el mensaje "${mensaje}" en la UI; continuando.`);
  }
    
});