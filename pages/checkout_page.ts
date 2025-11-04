import {Locator, expect, Page} from '@playwright/test';
import { HeaderBase } from './base_header';
import { faker } from '@faker-js/faker';

export class CheckOutPage extends HeaderBase {
    commentsTextArea: Locator;
    placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.commentsTextArea = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.locator('a[class="btn btn-default check_out"]');
    }

    async fillCommentsAndSubmit() {
        await this.commentsTextArea.fill(faker.lorem.sentence());
        await this.placeOrderButton.click();
    }
}