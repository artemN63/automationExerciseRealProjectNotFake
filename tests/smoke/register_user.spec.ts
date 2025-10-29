import {test} from '@playwright/test';
import {HomePage} from '../../pages/home_page.ts';
import {LoginPage} from '../../pages/login_page.ts';
import {SignupPage} from '../../pages/signup_page.ts';
import {AccountCreatedPage} from '../../pages/account_created_page.ts';

let homePage: HomePage;
let loginPage: LoginPage;
let signupPage: SignupPage;
let accountCreatedPage: AccountCreatedPage;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    signupPage = new SignupPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    await page.goto(process.env.BASE_URL!);
});

test('Register User Smoke Test', async ({page}) => {
    await homePage.clickNavLink('Signup / Login');
    await loginPage.verifySignupTitleIsVisible();
    await loginPage.signUp();
    await signupPage.fillSignupForm();
    await accountCreatedPage.verifyAccountCreatedMessage();
});