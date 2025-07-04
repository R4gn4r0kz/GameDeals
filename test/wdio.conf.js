exports.config = {
  runner: 'local',
  specs: [
    './test/specs/**/*.spec.js'  // Aquí apuntas a tus pruebas
  ],
  maxInstances: 1,
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    acceptInsecureCerts: true,
    'goog:chromeOptions': {
      args: ['--start-maximized'], // Pantalla maximizada
      // Para ver consola del navegador: descomenta si quieres
      // debuggerAddress: 'localhost:9222',
    },
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'http://localhost:8100',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
  ui: 'bdd',
  timeout: 99999999 // evita que corte el test
}
};
