// steps/hooks.js
const {
    BeforeAll, AfterAll,
    Before, After,
    setDefaultTimeout
  } = require('@cucumber/cucumber');
  const { chromium } = require('@playwright/test');
  
  setDefaultTimeout(60 * 1000);
  let browser;
  
  BeforeAll(async () => {
    browser = await chromium.launch({
      headless: process.env.HEADLESS === 'true'
    });
  });
  AfterAll(async () => {
    await browser.close();
  });
  
  Before(async function () {
    this.page = await browser.newPage();
  });
  After(async function () {
    await this.page.close();
  });
  