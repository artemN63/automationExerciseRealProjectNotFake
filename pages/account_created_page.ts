import {Locator, Page, expect} from '@playwright/test';
import { HeaderBase } from './base_header';

export class AccountCreatedPage extends HeaderBase {
    accountCreatedMessage: Locator;
    expectedAccountCreatedText = 'Account Created!';

    constructor(page: Page) {
        super(page);
        this.accountCreatedMessage = page.locator('h2 b');
    }

    async verifyAccountCreatedMessage() {
        await this.accountCreatedMessage.isVisible()
        await expect(this.accountCreatedMessage).toHaveText(this.expectedAccountCreatedText);
    }
}