module.exports = {
    default: {
      require: [
        'steps/hooks.js',
        'steps/*.js',
        'pages/*.js'
      ],
      format: ['html:reports/report.html', 'json:reports/report.json']
    }
  };
  