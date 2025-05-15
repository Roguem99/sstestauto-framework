import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class SSManageUsersPage extends BasePage {
    readonly url="https://beta.snippetsentry.com/app/client/users";

    addUserButton = this.page.getByText('Add User');
    navOptionManageUsers = this.page.getByTestId('nav-manageusers');
    usersListHeader = this.page.getByText('Users List');

    
    async goto() {
        await this.page.goto(this.url);
    };

    async verifyUserListTableDisplays() {
        await this.usersListHeader.waitFor();
    }

    async addNewUser(){
        await this.addUserButton.click();
    }
};
