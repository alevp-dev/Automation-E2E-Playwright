const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const { CartPage } = require('../../pages/shoppingCartPage');
const { CheckoutPage } = require('../../pages/checkoutPage');
const { users } = require('../fixtures/loginFixture');
const { checkoutInfo, products } = require('../fixtures/testDataFixture');

test.describe('E2E: Escenarios alternos', () => {
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

    test('Eliminar un producto y validar que el total cambió', async ({ page }) => {
        // Agregar dos productos al carrito
        await inventoryPage.addToCart(products.backpack.name);
        await inventoryPage.addToCart(products.bikeLight.name);
        await inventoryPage.goToCart();

        // Proceso de checkout
        await cartPage.proceedToCheckout();
        await checkoutPage.fillShippingInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );
        const initialTotal = await checkoutPage.getTotal();

        // Eliminar un producto y verificar el nuevo total
        await page.goBack();
        await page.goBack();
        await cartPage.removeItem(products.backpack.name);
        await cartPage.proceedToCheckout();
        await checkoutPage.fillShippingInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );

        // Verificar que el total ha cambiado
        const newTotal = await checkoutPage.getTotal();
        expect(newTotal).toBeLessThan(initialTotal);
    });

    test('Documentar comportamiento de checkout con carrito vacío', async ({ page }) => {
        await inventoryPage.goToCart();
        
        // Verificar que el carrito está vacío inicialmente
        const cartBadge = await page.locator('.shopping_cart_badge').count();
        expect(cartBadge).toBe(0, 'El carrito debe estar vacío');
        
        // Documentar que se puede proceder al checkout
        await cartPage.proceedToCheckout();
        
        // Verificar que se puede continuar con el proceso
        await checkoutPage.fillShippingInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );

        // Documentar que se puede completar la compra
        const total = await checkoutPage.getTotal();
        expect(total).toBe(0, 'El total debe ser 0 para un carrito vacío');
        
        // Verificar que se puede finalizar la orden
        await checkoutPage.finishOrder();
        const successMessage = await checkoutPage.getSuccessMessage();
        expect(successMessage).toBe('Thank you for your order!');
    });

    test('Validar el precio e impuestos en el resumen de compra', async ({ page }) => {
        // Agregar un producto al carrito y proceder al checkout
        await inventoryPage.addToCart(products.backpack.name);
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
        await checkoutPage.fillShippingInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );

        // Esperar a que el resumen de compra esté visible
        await page.waitForSelector('.summary_subtotal_label');

        // Obtener los precios
        const subtotal = await checkoutPage.getSubtotal();
        const tax = await checkoutPage.getTax();
        const total = await checkoutPage.getTotal();

        // Validar que los precios son números y que el total es correcto
        expect(typeof subtotal).toBe('number');
        expect(typeof tax).toBe('number');
        expect(typeof total).toBe('number');
        expect(total).toBe(subtotal + tax);

        // Verificar que los elementos del resumen de compra son visibles
        await expect(page.locator('.summary_subtotal_label')).toBeVisible();
        await expect(page.locator('.summary_tax_label')).toBeVisible();
        await expect(page.locator('.summary_total_label')).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        try {
            // Cerrar sesión si estamos en la página de inventario
            if (page.url().includes('inventory')) {
                await inventoryPage.logout();
                await expect(page.url()).toContain('/');
            }
        } catch (error) {
            console.log('Logout not needed or failed:', error.message);
        }
    });
});