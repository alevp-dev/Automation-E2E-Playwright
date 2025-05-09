export class CartPage {
    constructor(page) {
      this.page = page;
      this.checkoutButton = page.locator('[data-test="checkout"]');
      this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }
  
    async removeItem(productName) {
      const button = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/ /g, '-')}"]`);
      await button.click();
    }
  
    async getItemPrice(productName) {
      const itemContainer = this.page.locator('.cart_item').filter({ hasText: productName });
      await itemContainer.waitFor({ state: 'visible' });
      const priceElement = itemContainer.locator('.inventory_item_price');
      const priceText = await priceElement.textContent();
      return parseFloat(priceText.replace('$', ''));
    }
  
    async proceedToCheckout() {
      await this.checkoutButton.click();
    }
  }
  