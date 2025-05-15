import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class SSLoginPage extends BasePage {
    readonly url="https://beta.snippetsentry.com/app/client/users";

    usernameInput = this.page.locator('#input-v-2');
    passwordInput = this.page.locator('#input-v-4');
    loginButton = this.page.getByText('Login');
    
    async goto() {
        await this.page.goto(this.url);
    };

    async loginAsAdmin(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.loginButton.waitFor({state: 'hidden'})
    };
};
