const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const { CartPage } = require('../../pages/shoppingCartPage');
const { CheckoutPage } = require('../../pages/checkoutPage');
const { users } = require('../fixtures/loginFixture');
const { checkoutInfo, products } = require('../fixtures/testDataFixture');

test.describe('E2E Flujo 1: pruebas en el carrito de compras exitoso', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      checkoutPage = new CheckoutPage(page);

      await loginPage.goto('/');
      await loginPage.login(users.standard.username, users.standard.password);
    });

    test('Agregar al carrito dos productos', async ({ page }) => {
      // Step 1: Agregar productos al carrito
      await test.step('Add products to cart', async () => {
        await inventoryPage.addToCart(products.backpack.name);
        await inventoryPage.addToCart(products.bikeLight.name);

        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe('2');
      });

      // Step 2: Validar contenido en el carrito
      await test.step('Validar contenido en el carrito', async () => {
      await inventoryPage.goToCart();
      // Esperar a que la página de carrito esté completamente cargada
      await page.waitForLoadState('networkidle');
      console.log('Getting backpack price...');
      const backpackPrice = await cartPage.getItemPrice(products.backpack.name);
      console.log('Getting bike light price...');
      const bikeLightPrice = await cartPage.getItemPrice(products.bikeLight.name);
      expect(backpackPrice).toBe(products.backpack.price);
      expect(bikeLightPrice).toBe(products.bikeLight.price);
      });

      // Step 3: Completar el proceso de compra
      await test.step('Completar el proceso de compra', async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.fillShippingInfo(
          checkoutInfo.firstName,
          checkoutInfo.lastName,
          checkoutInfo.postalCode
          );

      const subtotal = await checkoutPage.getSubtotal();
      const tax = await checkoutPage.getTax();
      const total = await checkoutPage.getTotal();
      expect(subtotal).toBe(products.backpack.price + products.bikeLight.price);
      expect(total).toBe(subtotal + tax);
      await checkoutPage.finishOrder();
      const successMessage = await checkoutPage.getSuccessMessage();
      expect(successMessage).toBe('Thank you for your order!');
      });
    });

    test.afterEach(async ({ page }) => {
      await inventoryPage.logout();
      expect(page.url()).toContain('/');
    });
});