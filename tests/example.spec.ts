import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Automation Exercise - Example Tests', () => {
  
  test('should navigate to home page successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(homePage.loginLink).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    
    await homePage.goto();
    await homePage.navigateToLogin();
    
    await expect(page).toHaveURL(/.*login/);
    await expect(loginPage.isLoginFormVisible()).resolves.toBe(true);
  });

  test('should display login form elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    
    await expect(loginPage.loginEmailInput).toBeVisible();
    await expect(loginPage.loginPasswordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.signupNameInput).toBeVisible();
    await expect(loginPage.signupEmailInput).toBeVisible();
    await expect(loginPage.signupButton).toBeVisible();
  });

  test('should show error on invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('invalid@email.com', 'wrongpassword');
    
    await expect(loginPage.loginErrorMessage).toBeVisible();
  });

  test('should navigate to products page', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    await homePage.navigateToProducts();
    
    await expect(page).toHaveURL(/.*products/);
  });

  test('should navigate to cart page', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    await homePage.navigateToCart();
    
    await expect(page).toHaveURL(/.*view_cart/);
  });
});
