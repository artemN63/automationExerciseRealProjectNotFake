import {Locator, Page, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HeaderBase } from './base_header';

export class LoginPage extends HeaderBase {
    signupTitle: Locator;
    expectedSignupTitleText = 'New User Signup!';

    nameInput: Locator;
    emailInput: Locator;
    signupButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signupTitle = page.locator('div[class="signup-form"] h2');

        this.nameInput = page.locator('input[data-qa="signup-name"]');
        this.emailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');
    }

    async verifySignupTitleIsVisible() {
        await this.signupTitle.isVisible()
        await expect(this.signupTitle).toHaveText(this.expectedSignupTitleText);
    }

    async signUp() {
        await this.nameInput.fill(faker.person.fullName());
        await this.emailInput.fill(faker.internet.email());
        await this.signupButton.click();
    }
}