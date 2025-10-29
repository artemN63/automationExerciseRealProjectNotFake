import {Locator, Page} from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HeaderBase } from './base_header';

export class SignupPage extends HeaderBase {
    title: Locator;
    passwordInput: Locator;
    dayOfBirthSelect: Locator;
    monthOfBirthSelect: Locator;
    yearOfBirthSelect: Locator;
    newsletterCheckbox: Locator;
    offersCheckbox: Locator;
    firstNameInput: Locator;
    lastNameInput: Locator;
    companyInput: Locator;
    address1Input: Locator;
    address2Input: Locator;
    countrySelect: Locator;
    stateInput: Locator;
    cityInput: Locator;
    zipCodeInput: Locator;
    mobileNumberInput: Locator;
    createAccountButton: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('input[type="radio"]');
        this.passwordInput = page.locator('input[data-qa="password"]');
        this.dayOfBirthSelect = page.locator('select[data-qa="days"]');
        this.monthOfBirthSelect = page.locator('select[data-qa="months"]');
        this.yearOfBirthSelect = page.locator('select[data-qa="years"]');
        this.newsletterCheckbox = page.locator('input[id="newsletter"]');
        this.offersCheckbox = page.locator('input[id="optin"]');
        this.firstNameInput = page.locator('input[data-qa="first_name"]');
        this.lastNameInput = page.locator('input[data-qa="last_name"]');
        this.companyInput = page.locator('input[data-qa="company"]');
        this.address1Input = page.locator('input[data-qa="address"]');
        this.address2Input = page.locator('input[data-qa="address2"]');
        this.countrySelect = page.locator('select[data-qa="country"]');
        this.stateInput = page.locator('input[data-qa="state"]');
        this.cityInput = page.locator('input[name="city"]');
        this.zipCodeInput = page.locator('input[name="zipcode"]');
        this.mobileNumberInput = page.locator('input[name="mobile_number"]');
        this.createAccountButton = page.locator('button[data-qa="create-account"]');
    }

    async fillSignupForm() {
        await this.title.nth(faker.number.int({min: 0, max: 1})).click();
        await this.passwordInput.fill(faker.internet.password());
        await this.dayOfBirthSelect.selectOption(faker.date.birthdate({min: 18, max: 65, mode: 'age'}).getDate().toString());
        await this.monthOfBirthSelect.selectOption((faker.date.birthdate({min: 18, max: 65, mode: 'age'}).getMonth() + 1).toString());
        await this.yearOfBirthSelect.selectOption(faker.date.birthdate({min: 18, max: 65, mode: 'age'}).getFullYear().toString());
        await this.newsletterCheckbox.check();
        await this.offersCheckbox.check();
        await this.firstNameInput.fill(faker.person.firstName());
        await this.lastNameInput.fill(faker.person.lastName());
        await this.companyInput.fill(faker.company.name());
        await this.address1Input.fill(faker.location.streetAddress());
        await this.address2Input.fill(faker.location.secondaryAddress());
        await this.countrySelect.selectOption('United States');
        await this.stateInput.fill(faker.location.state());
        await this.cityInput.fill(faker.location.city());
        await this.zipCodeInput.fill(faker.location.zipCode());
        await this.mobileNumberInput.fill(faker.phone.number());
        await this.createAccountButton.click();
    }
}