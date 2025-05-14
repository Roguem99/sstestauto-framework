import { expect, Locator, Page } from '@playwright/test';

const adminPW = process.env.ADMIN_PW;
const adminUsername = process.env.ADMIN_U;

export class SSDashboardPage{
    readonly url="https://beta.snippetsentry.com/app/client/dashboard";
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.getByText('Add User');
        this.passwordInput = page.getByText('Add User');
        this.loginBtn = page.getByText('Add User');
    };

    async goToDashboard(){
        await this.page.goto(this.url);
        await this.usernameInput.waitFor();
    };

    async logUserIn(){
        await this.usernameInput.fill(adminPW);
        await this.passwordInput.fill(adminUsername);
        await this.loginBtn.click();
    };
};
