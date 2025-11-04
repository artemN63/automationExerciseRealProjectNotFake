import {Locator, expect, Page} from '@playwright/test';
import { HeaderBase } from './base_header';

export class ViewCartPage extends HeaderBase {
    proceedToCheckoutButton: Locator;
    registerLoginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.proceedToCheckoutButton = page.locator('a[class="btn btn-default check_out"]');
        this.registerLoginButton = page.locator('div[class="modal-body"] p[class="text-center"] a');
    }

    async verifyAndProceedToCheckoutWithRegister() {
        await expect(this.proceedToCheckoutButton).toBeVisible();
        await this.proceedToCheckoutButton.click();
        await this.registerLoginButton.click();
    }

    async verifyAndProceedToCheckout() {
        await expect(this.proceedToCheckoutButton).toBeVisible();
        await this.proceedToCheckoutButton.click();
    }
}