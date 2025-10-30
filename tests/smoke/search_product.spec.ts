import {test} from '@playwright/test';
import {HomePage} from '../../pages/home_page.ts';
import {ProductsPage} from '../../pages/products_page.ts';

let homePage: HomePage;
let productsPage: ProductsPage;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    await page.goto(process.env.BASE_URL!);
    await homePage.validateHomePage();
    await homePage.clickNavLink('Products')
    await productsPage.validateProductsPage();
});

test('Search Product Smoke Test', async ({page}) => {
    await productsPage.searchProduct('T-Shirt');
    await productsPage.validateSearchedProductsPage();
});