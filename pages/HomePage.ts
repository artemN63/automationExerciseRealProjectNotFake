import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly contactUsLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly loggedInUserName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('a[href="/login"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.contactUsLink = page.locator('a[href="/contact_us"]');
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.loggedInUserName = page.locator('li:has-text("Logged in as")');
  }

  async goto() {
    await this.page.goto('/');
  }

  async navigateToLogin() {
    await this.loginLink.click();
  }

  async navigateToProducts() {
    await this.productsLink.click();
  }

  async navigateToCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.loggedInUserName.isVisible();
  }

  async getLoggedInUserName(): Promise<string> {
    const text = await this.loggedInUserName.textContent();
    return text?.replace('Logged in as ', '').trim() || '';
  }
}
