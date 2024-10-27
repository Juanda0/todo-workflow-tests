import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole("navigation").getByRole("link", { name: "Login" });
    }

    async open() {
        await this.page.goto("http://127.0.0.1:5000/");
    }

    async login() {
        await this.loginButton.click();
    }
}