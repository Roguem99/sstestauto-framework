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
    };

    async clickAddUser(){
        await this.addUserButton.click();
    };

    // SUPPORTING FUNCTIONS MANAGE USERS PAGE

    /**
     * Waits for the toast message to appear and then returns 
     * the text within the toast message.
     * 
     * @returns {string} Text content from toast message.
     */
    async getToastContent() {
        await this.page.getByTestId('toast-content').waitFor();
        return await this.page.getByTestId('toast-content').textContent();
    };

    /**
     * Waits for the toast message to appear and then closes it.
     * 
     * note: Due to the dynamic nature of the data-testid, it requires
     * using regex to locate the element.
     * 
     */
    async closeToastAlert() {
        await this.page.getByTestId(/.*toast-item.*/).waitFor();
        await this.page.getByTestId(/.*toast-item.*/).getByRole('button').click();
    };

    /**
     * Clears white space from the start and end of a string
     * for more reader friendly scenario steps and validation.
     * 
     * @param text - Text with white spaces at front and end of text 
     * @returns {string} Text with no whitespace at beginning or end of string
     */
    trimWhiteSpaceFromText(text: string): string {
        return text.trim();
    };

    /**
     * Clicks on the Users Name to open the Modify User component.
     * 
     * @param first {string} First name of user to edit
     * @param last {string} Last name of user to edit
     */
    async editUserProfile(first: string, last: string) {
        await this.page.getByText(`${first} ${last}`).waitFor();
        await this.page.getByText(`${first} ${last}`).click();
        await this.page.getByText('Modify User').waitFor();
    };




    // Get test users api call and return array of ids


    // Delete test users api call
    // async function apiDeleteTestUsers(userId) {
    //     const apiRequestContext: APIRequestContext = await request.newContext();
    //     const deleteUser = await apiRequestContext.post(`https://beta.snippetsentry.com/graphql`, {
    //     data: {
    //     body: `{"operationName":"AuthzUpdateUser","query":"mutation AuthzUpdateUser($query: AuthzUpdateUserQuery!) {AuthzUpdateUser(query: $query) {id locale __typename}}","variables":{"query":{"id":"${userId}","status":"deleted"}}}`
    //     }
    // });
    // expect(deleteUser.ok()).toBeTruthy();
    // }

};

