import {Locator, expect, Page} from '@playwright/test';
import { HeaderBase } from './base_header';

export class DeleteAccountPage extends HeaderBase {
    accountDeletedText: Locator;
    expectedAccountDeletedText = 'Account Deleted!';

    constructor(page: Page) {
        super(page);
        this.accountDeletedText = page.locator('h2[data-qa="account-deleted"] b');
    }

    async verifyAccountDeleted() {
        await expect(this.accountDeletedText).toBeVisible();
        await expect(this.accountDeletedText).toHaveText(this.expectedAccountDeletedText);
    }
}