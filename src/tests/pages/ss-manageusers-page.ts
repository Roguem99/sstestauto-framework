import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

type User = {
    name: string;
    status: string;
    email: string;
    mobileNum: string;
}

export class SSManageUsersPage extends BasePage {
    readonly url="https://beta.snippetsentry.com/app/client/users";

    addUserButton = this.page.getByText('Add User');
    navOptionManageUsers = this.page.getByTestId('nav-manageusers');
    usersListTitle = this.page.getByText('Users List');
    usersTableHeaderRow = this.page.locator('#virtualTable tr');
    usersTableColumnHeaderCheckbox = this.usersTableHeaderRow.locator('th:nth-child(1)');
    usersTableColumnHeaderName = this.usersTableHeaderRow.locator('th:nth-child(3)');
    usersTableColumnHeaderStatus = this.usersTableHeaderRow.locator('th:nth-child(4)');
    usersTableColumnHeaderEmail = this.usersTableHeaderRow.locator('th:nth-child(5)');
    usersTableColumnHeaderPhone = this.usersTableHeaderRow.locator('th:nth-child(6)');
    usersTableColumnHeaderAndroid = this.usersTableHeaderRow.locator('th:nth-child(7)');
    usersTableColumnHeaderWhatsApp = this.usersTableHeaderRow.locator('th:nth-child(8)');
    usersTableColumnHeaderiMessage = this.usersTableHeaderRow.locator('th:nth-child(9)');
    usersTableFirstRow = this.page.locator('#virtualTable tbody tr:nth-child(2)');
    usersTableColumnFirstRowCheckbox = this.usersTableFirstRow.locator('td:nth-child(1)');
    usersTableColumnFirstRowAdminIcon = this.usersTableFirstRow.locator('td:nth-child(2)');
    usersTableColumnFirstRowName = this.usersTableFirstRow.locator('td:nth-child(3)');
    usersTableColumnFirstRowStatus = this.usersTableFirstRow.locator('td:nth-child(4)');
    usersTableColumnFirstRowEmail = this.usersTableFirstRow.locator('td:nth-child(5)');
    usersTableColumnFirstRowPhone = this.usersTableFirstRow.locator('td:nth-child(6)');
    usersTableColumnFirstRowAndroid = this.usersTableFirstRow.locator('td:nth-child(7)');
    usersTableColumnFirstRowWhatsApp = this.usersTableFirstRow.locator('td:nth-child(8)');
    usersTableColumnFirstRowiMessage = this.usersTableFirstRow.locator('td:nth-child(9)');
    usersTableToastAlert = this.page.getByTestId('toast-content');
    saveUserButton = this.page.getByTestId('save-user');
    
    async goto() {
        await this.page.goto(this.url);
    };

    async verifyUserListTableDisplays() {
        await this.usersListTitle.waitFor();
    };

    async clickAddUser(){
        await this.addUserButton.click();
    };

    /**
     * Waits for the toast message to appear and then returns 
     * the text within the toast message.
     * 
     * @returns {string} Text content from toast message.
     */
    async getToastContent(): Promise<null | string> {
        await this.page.getByTestId('toast-content').waitFor();
        let toast = await this.usersTableToastAlert.textContent();
        return toast
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

    async getFirstRowUserDetails(): Promise<User> {
        let firstRowName = await this.usersTableColumnFirstRowName.textContent();
        let firstRowStatus = await this.usersTableColumnFirstRowStatus.textContent();
        let firstRowEmail = await this.usersTableColumnFirstRowEmail.textContent();
        let firstRowPhoneNumber = await this.usersTableColumnFirstRowPhone.textContent();
        const user: User = {
            name: firstRowName!,
            status: firstRowStatus!,
            email: firstRowEmail!,
            mobileNum: firstRowPhoneNumber!,
        }
        return user
    };

    async removePhoneSpacesDashesParens(number: string) {
        return number.replace(/[-\]) [(]/g, '');
    }

    async waitForUserToDisplayOnTable(firstname: string, lastName: string): Promise<void> {
        await this.page.getByText(`${firstname} ${lastName}`).waitFor();
    }

    /**
     * Clicks the Save button for the User Profile component and verifies
     * the correct 'User added successfully' message displays.
     */
    async saveUserProfileSuccessfully() {
        await this.saveUserButton.click();
        let toastMsgText = await this.getToastContent();
        expect(toastMsgText).toBe('User added successfully');
        await expect(this.page.getByTestId('toast-content')).toBeHidden({timeout: 10000});
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

