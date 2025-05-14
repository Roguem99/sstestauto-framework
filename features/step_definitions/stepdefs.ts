import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, expect } from '@playwright/test';
import 'dotenv/config'

setDefaultTimeout(30 * 1000);

let page, browser
const adminPW = process.env.ADMIN_PW;
const adminUsername = process.env.ADMIN_U;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

After(async function () {
    // call function to delete test users
    await browser.close();
})

Given('the Admin has authenticated', async () => {
    await page.goto("https://beta.snippetsentry.com/app/client/dashboard");
    await page.getByLabel('Username').waitFor();
    await page.locator('#input-v-2').fill(adminUsername);
    await page.locator('#input-v-4').fill(adminPW);
    await page.getByText('Login').click();
    await page.getByTestId('nav-manageusers').waitFor();
});

Given('the Admin is on the Manage Users page', async () => {
    await page.goto("https://beta.snippetsentry.com/app/client/users");
    await page.getByText('Users List').waitFor();
});

Given('the Admin clicks the Add User button', async () => {
    await page.getByText('Add User').click();
});

Given('the Admin types {string} into the first name field', async (firstName) => {
    await page.locator('#textfield-adduser-firstname').fill(firstName);
});

Given('the Admin types {string} into the last name field', async (lastName) => {
    await page.locator('#textfield-adduser-lastname').fill(lastName);
});

Given('the Admin types {string} into the email field', async (email) => {
    await page.locator('#textfield-adduser-email').fill(email);
});

Given('the Admin selects the {string} number code {string} from dropdown', async (country, countryCode) => {
    await selectCountryCodeOnProfile(country);
});

Given('the Admin types {string} into the mobile number field', async (mobileNumber) => {
    await enterUserMobileNumberOnProfile(mobileNumber);
});

When('the Admin clicks the Add User Save button', async () => {
    await page.getByTestId('save-user').click();
});

Then('the Manage Users page displays the user details {string} {string} {string}', async (first, last, email) => {
    await page.getByText(`${first} ${last}`).waitFor();
    let firstRowName = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(3)').textContent();
    let firstRowEmail = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(5)').textContent();
    expect(firstRowName).toBe(`${first} ${last}`);
    expect(firstRowEmail).toBe(email);
});

Then('the user {string} {string} shows with the correct {string} {string}', async (first, last, countryCode, phoneNumber) => {
    await page.getByText(`${first} ${last}`).waitFor();
    let firstRowName = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(3)').textContent();
    let firstRowPhoneNumber = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(6)').textContent();
    let cleanPhoneNumber = await phoneNumber.replace(/[-\]) [(]/g, '');
    expect(firstRowName).toBe(`${first} ${last}`);
    expect(firstRowPhoneNumber).toBe(`${countryCode}${cleanPhoneNumber}`);
});

Then('the user {string} {string} shows status as {string}', async (first, last, status) => {
    await page.getByText(`${first} ${last}`).waitFor();
    let firstRowName = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(3)').textContent();
    let firstRowStatus = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(4)').textContent();
    let trimmedStatusText = trimWhiteSpaceFromText(firstRowStatus);
    expect(firstRowName).toBe(`${first} ${last}`);
    expect(trimmedStatusText).toBe(status);
});

When('the Admin sees the {string} toast message', async (message) => {
    let toastMsgText = await getToastContent();
    expect(toastMsgText).toBe(message);
});

When('does not see the {string} toast message', async (message) => {
    let toastMsgText = await getToastContent();
    expect(toastMsgText).not.toBe(message);
});

Given('the Admin adds a new user with {string} {string} {string}', async (first, last, email) => {
    await clickAddUserButton();
    await enterFirstNameOnProfile(first);
    await enterLastNameOnProfile(last);
    await enterUserEmailOnProfile(email);
    await saveUserProfileSuccessfully();    
});

Given('the Manage Users page displays {string} {string} status as {string}', async (first, last, status) => {
    await page.getByText(`${first} ${last}`).waitFor();
    let firstRowName = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(3)').textContent();
    let firstRowStatus = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(4)').textContent();
    let trimmedStatusText = trimWhiteSpaceFromText(firstRowStatus);
    expect(firstRowName).toBe(`${first} ${last}`);
    expect(trimmedStatusText).toBe(status);
});

When('the Admin opens the user profile for {string} {string}', async (first, last) => {
    await editUserProfile(first, last);
});

When('the Admin selects the {string} profile option', async (profileOption) => {
    await page.getByText(profileOption).click();    
});

Then('a successful {string} toast message displays', async (message) => {
    let inviteSent = await getToastContent();
    expect(inviteSent).toBe(message);
});

When('the Admin adds a new user with the same email address {string}', async (email) => {
    await clickAddUserButton();
    await enterFirstNameOnProfile("first");
    await enterLastNameOnProfile("last");
    await enterUserEmailOnProfile(email);
    await page.getByTestId('save-user').click();
});

Then('an {string} error toast message displays', async (message) => {
    let emailInUseMsg = await getToastContent();
    expect(emailInUseMsg).toBe(message);
});

Then('the Add User component is still visible', async () => {
    await expect(page.locator('#btn-closeAddUser')).toBeVisible();
});

Then('the Admin closes the Add User component', async () => {
    await page.locator('#btn-closeAddUser').click();
    await expect(page.locator('#btn-closeAddUser')).not.toBeVisible({timeout: 5000});
});


// SUPPORTING FUNCTIONS

/**
 * Waits for the toast message to appear and then returns 
 * the text within the toast message.
 * 
 * @returns {string} Text content from toast message.
 */
async function getToastContent() {
    await page.getByTestId('toast-content').waitFor();
    return await page.getByTestId('toast-content').textContent();
};

/**
 * Waits for the toast message to appear and then closes it.
 * 
 * note: Due to the dynamic nature of the data-testid, it requires
 * using regex to locate the element.
 * 
 */
async function closeToastAlert() {
    await page.getByTestId(/.*toast-item.*/).waitFor();
    await page.getByTestId(/.*toast-item.*/).getByRole('button').click();
};


/**
 * Clears white space from the start and end of a string
 * for more reader friendly scenario steps and validation.
 * 
 * @param text - Text with white spaces at front and end of text 
 * @returns {string} Text with no whitespace at beginning or end of string
 */
function trimWhiteSpaceFromText(text) {
    return text.trim();
};

/**
 * Clicks the "Add User" button to open the User Profile component.
 */
async function clickAddUserButton() {
    await page.getByText('Add User').click();
};

/**
 * Fills in text within the "First Name" input field within
 * the User Profile component.
 * 
 * @param firstName {string} First name of user
 */
async function enterFirstNameOnProfile(firstName) {
    await page.locator('#textfield-adduser-firstname').fill(firstName);
};

/**
 * Fills in text within the "Last Name" input field within
 * the User Profile component.
 * 
 * @param lastName - {string} Last name of user
 */
async function enterLastNameOnProfile(lastName) {
    await page.locator('#textfield-adduser-lastname').fill(lastName);
};

/**
 * Fills in text within the "Email Address" input field within
 * the User Profile component.
 * 
 * @param emailAddress {string} Email address of user. Must be unique.
 */
async function enterUserEmailOnProfile(emailAddress) {
    await page.locator('#textfield-adduser-email').fill(emailAddress);
};

/**
 * Filters and selects the country for the mobile phone number input field.
 * 
 * @param country {string} Name of Country for mobile number Country Code selection
 */
async function selectCountryCodeOnProfile(country) {
    await page.locator('#input-adduser-phone').getByRole('button').click();
    await page.getByRole('listbox').waitFor();
    await page.getByPlaceholder('Search by country name or code').fill(country);
    await page.getByText(country).waitFor();
    await page.getByRole('option').getByText(country).click();
};

/**
 * Fills in the mobile phone number on the User Profile component.
 * 
 * @param phoneNumber {string}
 */
async function enterUserMobileNumberOnProfile(phoneNumber) {
    await page.getByPlaceholder('Enter Mobile Number').fill(phoneNumber);
};

/**
 * Clicks the Save button for the User Profile component and verifies
 * the correct 'User added successfully' message displays.
 */
async function saveUserProfileSuccessfully() {
    await page.getByTestId('save-user').click();
    let toastMsgText = await getToastContent();
    expect(toastMsgText).toBe('User added successfully');
    await expect(await page.getByTestId('toast-content')).toBeHidden({timeout: 10000});
};

/**
 * Clicks on the Users Name to open the Modify User component.
 * 
 * @param first {string} First name of user to edit
 * @param last {string} Last name of user to edit
 */
async function editUserProfile(first, last) {
    await page.getByText(`${first} ${last}`).waitFor();
    await page.getByText(`${first} ${last}`).click();
    await page.getByText('Modify User').waitFor();
};




// Get test users api call and return array of ids


// Delete test users api call
// async function apiDeleteTestUsers(userId) {
//     const apiRequestContext: APIRequestContext = await request.newContext();
//     const deleteUser = await apiRequestContext.post(`https://beta.snippetsentry.com/graphql`, {
//     data: {
//       body: `{"operationName":"AuthzUpdateUser","query":"mutation AuthzUpdateUser($query: AuthzUpdateUserQuery!) {AuthzUpdateUser(query: $query) {id locale __typename}}","variables":{"query":{"id":"${userId}","status":"deleted"}}}`
//     }
//   });
//   expect(deleteUser.ok()).toBeTruthy();
// }
