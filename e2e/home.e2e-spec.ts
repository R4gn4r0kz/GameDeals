const { browser, by, element, ExpectedConditions: EC } = require('protractor');

describe('Página Registro', () => {
  beforeEach(async () => {
    await browser.get('/registro'); // Asegúrate de que esta ruta sea correcta
  });

  it('debería tener el título correcto', async () => {
    const title = element(by.css('ion-title'));
    await browser.wait(EC.presenceOf(title), 5000);
    expect(await title.getText()).toContain('Registro');
  });

  it('debería mostrar un botón Registrarse (aunque esté deshabilitado)', async () => {
    const boton = element(by.cssContainingText('ion-button', 'Registrarse'));
    await browser.wait(EC.presenceOf(boton), 5000);
    expect(await boton.isPresent()).toBe(true);
  });

  it('debería mostrar el título del formulario', async () => {
    const cardTitle = element(by.cssContainingText('ion-card-title', 'Crea tu cuenta'));
    await browser.wait(EC.presenceOf(cardTitle), 5000);
    expect(await cardTitle.isPresent()).toBe(true);
  });
  
});
