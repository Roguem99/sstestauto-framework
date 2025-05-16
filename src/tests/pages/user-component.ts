import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class SSUserComponent extends BasePage {
    userAdminCheckbox = this.page.locator("#checkbox-adduser-admin");
    userAdminOptionText = this.userAdminCheckbox.locator("label");
    inviteUserCheckbox = this.page.getByTestId('send-email-checkbox');
    inviteUserOptiontext = this.inviteUserCheckbox.locator('label');
    userFirstNameInput = this.page.locator('#textfield-adduser-firstname');
    userLastNameInput = this.page.locator('#textfield-adduser-lastname');
    userEmailInput = this.page.locator('#textfield-adduser-email');
    saveUserButton = this.page.getByTestId('save-user');
    cancelUserEditsButton = this.page.getByTestId('save-user');
    closeUserComponentWindow = this.page.locator('#btn-closeAddUser');
    
    async enterUsersFirstName(firstname: string) {
        await this.userFirstNameInput.fill(firstname);
    };

    async enterUsersLastName(lastname: string) {
        await this.userLastNameInput.fill(lastname);
    };

    async enterUsersEmailAddress(email: string) {
        await this.userEmailInput.fill(email);
    };


    async addReqUserDetailsOnly(first: string, last: string, email: string){
        await this.userFirstNameInput.fill(first);
        await this.userLastNameInput.fill(last);
        await this.userEmailInput.fill(email);
        await this.saveUserButton.click();
        await this.saveUserButton.waitFor({state: 'hidden'})
    };

    /**
     * Filters and selects the country for the mobile phone number input field.
     * 
     * @param country {string} Name of Country for mobile number Country Code selection
     */
    async selectCountryCodeOnProfile(country: string) {
        await this.page.locator('#input-adduser-phone').getByRole('button').click();
        await this.page.getByRole('listbox').waitFor();
        await this.page.getByPlaceholder('Search by country name or code').fill(country);
        await this.page.getByText(country).waitFor();
        await this.page.getByRole('option').getByText(country).click();
    };

    /**
     * Fills in the mobile phone number on the User Profile component.
     * 
     * @param phoneNumber {string}
     */
    async enterUserMobileNumberOnProfile(phoneNumber: string) {
        await this.page.getByPlaceholder('Enter Mobile Number').fill(phoneNumber);
    };

    async clickSaveButton() {
        await this.saveUserButton.click();
    };


};
