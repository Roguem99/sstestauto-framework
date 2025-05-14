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

Given('the Admin types {string} into the mobile number field', async (mobileNumber) => {
    await page.getByPlaceholder('Enter Mobile Number').fill(mobileNumber);
});

When('the Admin clicks the Add User Save button', async () => {
    await page.getByTestId('save-user').click();
});

Then('the Manage User page displays the user details {string} {string} {string}', async (first, last, email) => {
    await page.getByText(`${first} ${last}`).waitFor();
    let firstRowName = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(3)').textContent();
    let firstRowEmail = await page.locator('#virtualTable tbody tr:nth-child(2) td:nth-child(5)').textContent();
    expect(firstRowName).toBe(`${first} ${last}`);
    expect(firstRowEmail).toBe(email);
});

Then('the user {string} {string} shows with the correct {string}', async (first, last, phoneNumber) => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('the user {string} {string} shows as {string}', async (string, string2, string3) => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
