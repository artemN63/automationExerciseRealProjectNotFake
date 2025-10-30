import {Page, Locator} from '@playwright/test';

export class HeaderBase {
    protected page: Page;
    navBarElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBarElement = page.locator('ul[class="nav navbar-nav"] li a');
    }

    async clickNavLink(linkText: string) {
        await this.navBarElement.getByText(linkText).click();
    }
}