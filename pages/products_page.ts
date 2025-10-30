import {Locator, expect, Page} from '@playwright/test';
import { HeaderBase } from './base_header';

export class ProductsPage extends HeaderBase {
    allProducts: Locator;
    expectedTitle = 'All Products';

    searchBarInput: Locator;
    searchButton: Locator;

    searchedProduct: Locator;
    expectedSearchedProductText = 'Searched Products';

    addToCartButton: Locator;
    continueShoppingButton: Locator;
    viewCartButton: Locator;

    productNameOnPage: Locator;
    productPriceOnPage: Locator;

    cartNameOnPage: Locator;
    cartPriceOnPage: Locator;
    cartQuantityOnPage: Locator;

    constructor(page: Page) {
        super(page);
        this.allProducts = page.locator('h2[class="title text-center"]');
        this.searchBarInput = page.locator('input[id="search_product"]');
        this.searchButton = page.locator('button[id="submit_search"]');

        this.searchedProduct = page.locator('h2[class="title text-center"]');

        this.addToCartButton = page.locator('div[class="productinfo text-center"] a[class="btn btn-default add-to-cart"] i');
        this.continueShoppingButton = page.locator('button[class="btn btn-success close-modal btn-block"]');
        this.viewCartButton = page.locator('p[class="text-center"] u');

        this.productNameOnPage = page.locator('div[class="single-products"] div[class="productinfo text-center"] p');
        this.productPriceOnPage = page.locator('div[class="single-products"] div[class="productinfo text-center"] h2');

        this.cartNameOnPage = page.locator('td[class="cart_description"] a');
        this.cartPriceOnPage = page.locator('p[class="cart_total_price"]');
        this.cartQuantityOnPage = page.locator('td[class="cart_quantity"] button');
    }

    async validateProductsPage() {
        await expect(this.allProducts).toBeVisible();
        await expect(this.allProducts).toHaveText(this.expectedTitle);
    }

    async searchProduct(productName: string) {
        await this.searchBarInput.fill(productName);
        await this.searchButton.click();
    }

    async validateSearchedProductsPage() {
        await expect(this.searchedProduct).toBeVisible();
        await expect(this.searchedProduct).toHaveText(this.expectedSearchedProductText);
    }

    async addProductsToCartWithValidation(howMany: number) {
        let nameOnPage: string;
        let priceOnPage: string;

        const expectedQuantity = 1;

        for (let i = 0; i < howMany - 1; i++) {
            nameOnPage = await this.productNameOnPage.nth(i).innerText();
            priceOnPage = await this.productPriceOnPage.nth(i).innerText();
            await this.addToCartButton.nth(i).click();

            await this.viewCartButton.click();

            await expect(this.cartNameOnPage.nth(i)).toHaveText(nameOnPage);
            await expect(this.cartPriceOnPage.nth(i)).toHaveText(priceOnPage);
            await expect(this.cartQuantityOnPage.nth(i)).toHaveText(expectedQuantity.toString());

            await this.page.goBack();
        }
    }
}