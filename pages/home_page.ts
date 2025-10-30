import {Locator, expect, Page} from '@playwright/test';
import { HeaderBase } from './base_header';

export class HomePage extends HeaderBase {
    logo: Locator;

    constructor(page: Page) {
        super(page);
        this.logo = page.locator('div[class="logo pull-left"]');
    }

    async validateHomePage() {
        await expect(this.logo).toBeVisible();
    }
}