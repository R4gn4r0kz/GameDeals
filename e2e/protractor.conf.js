exports.config = {
  framework: 'jasmine',
  directConnect: true,
  specs: ['e2e/**/*.ts'], // ✅ Asegúrate que sea así
  capabilities: {
    browserName: 'chrome'
  },
  baseUrl: 'http://localhost:8100/',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {}
  },

onPrepare() {
  require('ts-node').register({
    project: require('path').join(__dirname, '../tsconfig.json'),
    transpileOnly: true
  });

  const { SpecReporter } = require('jasmine-spec-reporter');
  jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

  // 👇 Agrega esta línea
  browser.waitForAngularEnabled(false);
}
};
