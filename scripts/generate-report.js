// scripts/generate-report.js
const reporter = require('cucumber-html-reporter');
reporter.generate({
  theme: 'bootstrap',
  jsonFile: 'reports/report.json',
  output: 'reports/index.html',
  reportSuiteAsScenarios: true,
  launchReport: false
});
