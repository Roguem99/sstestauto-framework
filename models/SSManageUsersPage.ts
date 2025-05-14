import { expect, Locator, Page } from '@playwright/test';

export class SSManageUsersPage{
    readonly url="https://beta.snippetsentry.com/app/client/users";
    readonly page: Page;
    readonly addUserButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.addUserButton = page.getByText('Add User');
    };

    async goToManageUsers(){
        await this.page.goto(this.url);
    };

    async addUser(){
        await this.addUserButton.click();
    };
};
