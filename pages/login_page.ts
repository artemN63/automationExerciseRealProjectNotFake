import {Locator, Page, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HeaderBase } from './base_header';

export class LoginPage extends HeaderBase {
    signupTitle: Locator;
    expectedSignupTitleText = 'New User Signup!';

    nameInput: Locator;
    emailInput: Locator;
    signupButton: Locator;

    loginTitle: Locator;
    expectedLoginTitleText = 'Login to your account';

    emailLoginInput: Locator;
    passwordLoginInput: Locator;
    loginButton: Locator;

    loggedInAsText: Locator;
    expectedLoggedInAsText = `Logged in as ${process.env.VALID_USER_EMAIL!}`;

    constructor(page: Page) {
        super(page);
        this.signupTitle = page.locator('div[class="signup-form"] h2');

        this.nameInput = page.locator('input[data-qa="signup-name"]');
        this.emailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');

        this.loginTitle = page.locator('div[class="login-form"] h2');

        this.emailLoginInput = page.locator('input[data-qa="login-email"]');
        this.passwordLoginInput = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');

        this.loggedInAsText = page.locator('a:has-text("Logged in as")');
    }

    async verifySignupTitleIsVisible() {
        await this.signupTitle.isVisible()
        await expect(this.signupTitle).toHaveText(this.expectedSignupTitleText);
    }

    async verifyLoginTitleIsVisible() {
        await expect(this.loginTitle).toBeVisible();
        await expect(this.loginTitle).toHaveText(this.expectedLoginTitleText);
    }

    async signUp() {
        await this.nameInput.fill(faker.person.fullName());
        await this.emailInput.fill(faker.internet.email());
        await this.signupButton.click();
    }

    async loginWithValidation() {
        await this.emailLoginInput.fill(process.env.VALID_USER_EMAIL!);
        await this.passwordLoginInput.fill(process.env.VALID_USER_PASSWORD!);
        await this.loginButton.click();

        await expect(this.loggedInAsText).toBeVisible();
        await expect(this.loggedInAsText).toHaveText(this.expectedLoggedInAsText);
    }
}