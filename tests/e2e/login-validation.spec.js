const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const { users } = require('../fixtures/loginFixture');

test.describe('E2E Flujo 2: pruebas en inicio de sesión, validaciones y restricciones', () => {
    let loginPage;
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      await loginPage.goto();
    });

    test('Validación de credenciales vacías', async () => {
      await loginPage.login('', '');
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe('Epic sadface: Username is required');
    });

    test('Validación de usuario bloqueado', async () => {
      await loginPage.login(users.locked.username, users.locked.password);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Inicio y cierre de sesión exitoso', async ({ page }) => {
      await loginPage.login(users.standard.username, users.standard.password);
      expect(page.url()).toContain('/inventory.html');

      await inventoryPage.logout();
      expect(page.url()).toContain('/');
    });

    test('Restricción de acceso directo', async ({ page }) => {
      await page.goto('/inventory.html');
      expect(page.url()).toContain('/');
    });

    test('Restricción de credenciales inválidas', async () => {
      await loginPage.login('invalid_user', 'invalid_password');
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
    });
    test.afterEach(async ({ page }) => {
      // Cerrar sesión si el usuario está en la página de inventario
      if (page.url().includes('inventory')) {
          await inventoryPage.logout();
        }
      expect(page.url()).toContain('/');
    });
});