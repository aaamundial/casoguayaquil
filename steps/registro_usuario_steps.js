// steps/registro_usuario_steps.js
const { Given, When } = require('@cucumber/cucumber');
const { RegisterPage } = require('../pages/register.page');

Given('que estoy en la página de registro', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.goto();
});

When('completo el formulario con datos válidos', async function () {
  await this.registerPage.fillForm({
    firstName: 'Henry',
    lastName: 'Flores',
    street: 'Av. Amazonas',
    city: 'Quito',
    state: 'Pichincha',
    zipCode: '170102',
    phone: '0987654321',
    ssn: '1723456789'
  });
  await this.registerPage.fillCredentials({
    username: `henry${Date.now()}`,
    password: 'Password123',
  });
});
