const chromeDriverPath = require('chromedriver').path;

exports.config = {
  directConnect: false, // ❌ Desactiva uso directo (que apunta al viejo driver)
  seleniumAddress: 'http://localhost:4444/wd/hub', // ✅ Usamos Selenium
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--disable-gpu', '--window-size=1024,768']
    }
  },
  framework: 'jasmine',
  specs: ['e2e/home.e2e-spec.ts'],
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.json'
    });
  }
};
