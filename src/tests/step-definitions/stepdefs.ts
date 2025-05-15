import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium, expect, Page } from '@playwright/test';
import { SSManageUsersPage } from '../pages/ss-manageusers-page';
import { SSLoginPage } from '../pages/ss-login-page';
import 'dotenv/config'
import { SSUserComponent } from '../pages/user-component';

setDefaultTimeout(30 * 1000);

let page: Page, browser: Browser
const adminUsername = process.env.ADMIN_U!;
const adminPW = process.env.ADMIN_PW!;


Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    const loginPage = new SSLoginPage(page);
    await loginPage.goto()
    await loginPage.loginAsAdmin(adminUsername, adminPW);
});

After(async function () {
    // call function to delete test users
    await browser.close();
})

Given('the Admin has authenticated', async () => {
    const manageUsersPage = new SSManageUsersPage(page);
    await manageUsersPage.goto();
});

Given('the Admin is on the Manage Users page', async () => {
    const manageUsersPage = new SSManageUsersPage(page);
    await manageUsersPage.verifyUserListTableDisplays();
});

Given('the Admin clicks the Add User button', async () => {
    const manageUsersPage = new SSManageUsersPage(page);
    const userComponent = new SSUserComponent(page);

    await manageUsersPage.clickAddUser();
    userComponent.closeUserComponentWindow.waitFor();
});

Given('the Admin types {string} into the first name field', async (firstName) => {
    const userComponent = new SSUserComponent(page);
    userComponent.enterUsersFirstName(firstName);
});

Given('the Admin types {string} into the last name field', async (lastName) => {
    const userComponent = new SSUserComponent(page);
    userComponent.enterUsersLastName(lastName);
});

Given('the Admin types {string} into the email field', async (email) => {
    const userComponent = new SSUserComponent(page);
    userComponent.enterUsersEmailAddress(email);
});

Given('the Admin selects the {string} number code {string} from dropdown', async (country, countryCode) => {
    const userComponent = new SSUserComponent(page);
    userComponent.selectCountryCodeOnProfile(country);
});

Given('the Admin types {string} into the mobile number field', async (mobileNumber) => {
    const userComponent = new SSUserComponent(page);
    userComponent.enterUserMobileNumberOnProfile(mobileNumber);
});

When('the Admin clicks the Add User Save button', async () => {
    const userComponent = new SSUserComponent(page);
    userComponent.clickSaveButton();
});



// Then('the Manage Users page displays the user details {string} {string} {string}', async (first, last, email) => {
//     await page.getByText(`${first} ${last}`).waitFor();
//     let firstRowName = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(3)').textContent();
//     let firstRowEmail = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(5)').textContent();
//     expect(firstRowName).toBe(`${first} ${last}`);
//     expect(firstRowEmail).toBe(email);
// });

// Then('the user {string} {string} shows with the correct {string} {string}', async (first, last, countryCode, phoneNumber) => {
//     await page.getByText(`${first} ${last}`).waitFor();
//     let firstRowName = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(3)').textContent();
//     let firstRowPhoneNumber = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(6)').textContent();
//     let cleanPhoneNumber = await phoneNumber.replace(/[-\]) [(]/g, '');
//     expect(firstRowName).toBe(`${first} ${last}`);
//     expect(firstRowPhoneNumber).toBe(`${countryCode}${cleanPhoneNumber}`);
// });

// Then('the user {string} {string} shows status as {string}', async (first, last, status) => {
//     await page.getByText(`${first} ${last}`).waitFor();
//     let firstRowName = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(3)').textContent();
//     let firstRowStatus = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(4)').textContent();
//     let trimmedStatusText = trimWhiteSpaceFromText(firstRowStatus);
//     expect(firstRowName).toBe(`${first} ${last}`);
//     expect(trimmedStatusText).toBe(status);
// });

// When('the Admin sees the {string} toast message', async (message) => {
//     let toastMsgText = await getToastContent();
//     expect(toastMsgText).toBe(message);
// });

// When('does not see the {string} toast message', async (message) => {
//     let toastMsgText = await getToastContent();
//     expect(toastMsgText).not.toBe(message);
// });

// Given('the Admin adds a new user with {string} {string} {string}', async (first, last, email) => {
//     await clickAddUserButton();
//     await enterFirstNameOnProfile(first);
//     await enterLastNameOnProfile(last);
//     await enterUserEmailOnProfile(email);
//     await saveUserProfileSuccessfully();    
// });

// Given('the Manage Users page displays {string} {string} status as {string}', async (first, last, status) => {
//     await page.getByText(`${first} ${last}`).waitFor();
//     let firstRowName = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(3)').textContent();
//     let firstRowStatus = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(4)').textContent();
//     let trimmedStatusText = trimWhiteSpaceFromText(firstRowStatus);
//     expect(firstRowName).toBe(`${first} ${last}`);
//     expect(trimmedStatusText).toBe(status);
// });

// When('the Admin opens the user profile for {string} {string}', async (first, last) => {
//     await editUserProfile(first, last);
// });

// When('the Admin selects the {string} profile option', async (profileOption) => {
//     await page.getByText(profileOption).click();    
// });

// Then('a successful {string} toast message displays', async (message) => {
//     let inviteSent = await getToastContent();
//     expect(inviteSent).toBe(message);
// });

// When('the Admin adds a new user with the same email address {string}', async (email) => {
//     await clickAddUserButton();
//     await enterFirstNameOnProfile("first");
//     await enterLastNameOnProfile("last");
//     await enterUserEmailOnProfile(email);
//     await page.getByTestId('save-user').click();
// });

// Then('an {string} error toast message displays', async (message) => {
//     let emailInUseMsg = await getToastContent();
//     expect(emailInUseMsg).toBe(message);
// });

// Then('the Add User component is still visible', async () => {
//     await expect(page.locator('#btn-closeAddUser')).toBeVisible();
// });

// Then('the Admin closes the Add User component', async () => {
//     await page.locator('#btn-closeAddUser').click();
//     await expect(page.locator('#btn-closeAddUser')).not.toBeVisible({timeout: 5000});
// });


