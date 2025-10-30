import {Locator, expect, Page} from '@playwright/test';
import { HeaderBase } from './base_header';

export class ProductsPage extends HeaderBase {
    allProducts: Locator;
    expectedTitle = 'All Products';

    searchBarInput: Locator;
    searchButton: Locator;

    searchedProduct: Locator;
    expectedSearchedProductText = 'Searched Products';

    constructor(page: Page) {
        super(page);
        this.allProducts = page.locator('h2[class="title text-center"]');
        this.searchBarInput = page.locator('input[id="search_product"]');
        this.searchButton = page.locator('button[id="submit_search"]');

        this.searchedProduct = page.locator('h2[class="title text-center"]');
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
}