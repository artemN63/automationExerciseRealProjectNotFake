import {Locator, expect, Page} from '@playwright/test';
import { HeaderBase } from './base_header';

export class HomePage extends HeaderBase {
    logo: Locator;

    addToCartButton: Locator;
    viewCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logo = page.locator('div[class="logo pull-left"]');

        this.addToCartButton = page.locator('div[class="productinfo text-center"] a[class="btn btn-default add-to-cart"] i');
        this.viewCartButton = page.locator('p[class="text-center"] u');
    }

    async addToCartAndViewCart() {
        await this.addToCartButton.first().click();
        await this.viewCartButton.click();
    }

    async validateHomePage() {
        await expect(this.logo).toBeVisible();
    }
}