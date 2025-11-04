import {test} from '@playwright/test';
import {HomePage} from '../../pages/home_page.ts';
import {ViewCartPage} from '../../pages/view_cart_page.ts';
import {LoginPage} from '../../pages/login_page.ts';
import {SignupPage} from '../../pages/signup_page.ts';
import {AccountCreatedPage} from '../../pages/account_created_page.ts';
import { CheckOutPage } from '../../pages/checkout_page.ts';
import { PaymentPage } from '../../pages/payment_page.ts';
import { DeleteAccountPage } from '../../pages/delete_account_page.ts';

let homePage: HomePage;
let viewCartPage: ViewCartPage;
let loginPage: LoginPage;
let signUpPage: SignupPage;
let accountCreatedPage: AccountCreatedPage;
let checkOutPage: CheckOutPage;
let paymentPage: PaymentPage;
let deleteAccountPage: DeleteAccountPage;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    viewCartPage = new ViewCartPage(page);
    loginPage = new LoginPage(page);
    signUpPage = new SignupPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    checkOutPage = new CheckOutPage(page);
    paymentPage = new PaymentPage(page);
    deleteAccountPage = new DeleteAccountPage(page);
    await page.goto(process.env.BASE_URL!);
    await homePage.validateHomePage();
});

test('Place Order Smoke Test', async ({page}) => {
    await homePage.addToCartAndViewCart()
    await viewCartPage.verifyAndProceedToCheckoutWithRegister();
    await loginPage.signUp();
    await signUpPage.fillSignupForm();
    await accountCreatedPage.verifyAccountCreatedMessage();
    await accountCreatedPage.clickContinueButton();
    await homePage.validateNavLinkHasText('Logged in as');
    await homePage.clickNavLink('Cart');
    await viewCartPage.verifyAndProceedToCheckout();
    await checkOutPage.fillCommentsAndSubmit();
    await paymentPage.fillPaymentDetailsAndSubmit();
    await paymentPage.verifyOrderPlaced();
    await homePage.clickNavLink('Delete Account');
    await deleteAccountPage.verifyAccountDeleted();
});