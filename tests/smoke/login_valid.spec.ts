import {test} from '@playwright/test';
import {HomePage} from '../../pages/home_page.ts';
import {LoginPage} from '../../pages/login_page.ts';

let homePage: HomePage;
let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL!);
});

test('Login User Smoke Test', async ({page}) => {
    await homePage.clickNavLink('Signup / Login');
    await loginPage.verifyLoginTitleIsVisible();
    await loginPage.loginWithValidation();
});