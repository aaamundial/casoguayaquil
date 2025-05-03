// pages/deposit.page.js
class DepositPage {
    constructor(page) {
      this.page = page;
      this.selectors = {
        depositUrl: 'https://parabank.parasoft.com/parabank/deposit.htm',
        accountSelect: 'select#accountId',
        amountInput: 'input#amount',
        continueBtn: 'input[value="Continue"]',
        depositBtn:  'input[value="Deposit"]',
        successMsg: 'text=The deposit was successful'
      };
    }
  
    async deposit(accountId, amount) {
      await this.page.goto(this.selectors.depositUrl);
      await this.page.selectOption(this.selectors.accountSelect, accountId);
      await this.page.fill(this.selectors.amountInput, amount.toString());
      await this.page.click(this.selectors.continueBtn);
      await this.page.click(this.selectors.depositBtn);
    }
  
    async expectSuccess() {
      await this.page.waitForSelector(this.selectors.successMsg, { timeout: 30000 });
    }
  }
  
  module.exports = { DepositPage };
  