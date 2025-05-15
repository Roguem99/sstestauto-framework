import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class SSUserComponent extends BasePage {
    userFirstNameInput = this.page.locator('#textfield-adduser-firstname');
    userLastNameInput = this.page.locator('#textfield-adduser-lastname');
    userEmailInput = this.page.locator('#textfield-adduser-email');
    
    async loginAsAdmin(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.loginButton.waitFor({state: 'hidden'})
    };
};
