import {Locator, expect, Page} from '@playwright/test';
import { HeaderBase } from './base_header';
import { faker} from '@faker-js/faker';

export class PaymentPage extends HeaderBase {
    nameOnCardInput: Locator;
    cardNumberInput: Locator;
    cvcInput: Locator;
    expirationMonthInput: Locator;
    expirationYearInput: Locator;
    payAndConfirmOrderButton: Locator;

    orderPlacedText: Locator;
    expectedOrderPlacedText = 'Order Placed!';

    constructor(page: Page) {
        super(page);
        this.nameOnCardInput = page.locator('input[name="name_on_card"]');
        this.cardNumberInput = page.locator('input[name="card_number"]');
        this.cvcInput = page.locator('input[name="cvc"]');
        this.expirationMonthInput = page.locator('input[data-qa="expiry-month"]');
        this.expirationYearInput = page.locator('input[data-qa="expiry-year"]');
        this.payAndConfirmOrderButton = page.locator('button[data-qa="pay-button"]');

        this.orderPlacedText = page.locator('h2[data-qa="order-placed"] b');
    }

    async fillPaymentDetailsAndSubmit() {
        await this.nameOnCardInput.fill(faker.person.fullName());
        await this.cardNumberInput.fill(faker.finance.creditCardNumber());
        await this.cvcInput.fill(faker.finance.creditCardCVV());
        await this.expirationMonthInput.fill(faker.number.int({min: 1, max: 12}).toString())
        await this.expirationYearInput.fill(faker.number.int({min: 2025}).toString())
        await this.payAndConfirmOrderButton.click();
    }

    async verifyOrderPlaced() {
        await expect(this.orderPlacedText).toBeVisible();
        await expect(this.orderPlacedText).toHaveText(this.expectedOrderPlacedText);
    }
}