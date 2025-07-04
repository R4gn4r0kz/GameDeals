describe('Página principal de GameDeals', () => {
  it('debería cargar correctamente el título', async () => {
    await browser.url('http://localhost:8100');
    const titulo = await $('ion-title');
    await expect(titulo).toBeDisplayed();

  console.log('LLEGÓ AQUI');
  await browser.debug(); // Se detiene aquí hasta que escribas `.exit` en la consola
  });
});