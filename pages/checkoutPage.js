 export class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.firstNameInput = page.locator('[data-test="firstName"]');
      this.lastNameInput = page.locator('[data-test="lastName"]');
      this.postalCodeInput = page.locator('[data-test="postalCode"]');
      this.continueButton = page.locator('[data-test="continue"]');
      this.finishButton = page.locator('[data-test="finish"]');
      this.subtotalLabel = page.locator('.summary_subtotal_label');
      this.taxLabel = page.locator('.summary_tax_label');
      this.totalLabel = page.locator('.summary_total_label');
      this.completeHeader = page.locator('.complete-header');
    }
  
    async fillShippingInfo(firstName, lastName, postalCode) {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
      await this.continueButton.click();
    }
  
    async getSubtotal() {
      const text = await this.subtotalLabel.textContent();
      return parseFloat(text.match(/\$([0-9.]+)/)[1]);
    }
  
    async getTax() {
      const text = await this.taxLabel.textContent();
      return parseFloat(text.match(/\$([0-9.]+)/)[1]);
    }
  
    async getTotal() {
      const text = await this.totalLabel.textContent();
      return parseFloat(text.match(/\$([0-9.]+)/)[1]);
    }
  
    async finishOrder() {
      await this.finishButton.click();
    }
  
    async getSuccessMessage() {
      return await this.completeHeader.textContent();
    }
  }
