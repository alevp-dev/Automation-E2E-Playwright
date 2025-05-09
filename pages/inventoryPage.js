export class InventoryPage {
    constructor(page) {
      this.page = page;
      this.cartBadge = page.locator('.shopping_cart_badge');
      this.cartLink = page.locator('.shopping_cart_link');
      this.menuButton = page.locator('#react-burger-menu-btn');
      this.logoutLink = page.locator('#logout_sidebar_link');
    }
  
    async addToCart(productName) {
      const button = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}"]`);
      await button.click();
    }
  
    async getCartCount() {
      return await this.cartBadge.textContent();
    }
  
    async goToCart() {
      await this.cartLink.click();
    }
  
    async logout() {
      await this.menuButton.click();
      await this.logoutLink.click();
    }
  }