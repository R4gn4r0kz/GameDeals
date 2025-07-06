import { browser, by, element } from 'protractor';

describe('Inicio App GameDeals', () => {
  beforeEach(async () => {
    await browser.get('http://localhost:8100');
  });

  it('debería mostrar el título', async () => {
    const titulo = await element(by.css('ion-title')).getText();
    expect(titulo).toContain('GameDeals');
  });
});
