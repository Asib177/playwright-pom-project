const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { loginData } = require('../utils/testData');

test.describe('Login Functionality', () => {
    test('Step 1 - Login to OrangeHRM', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.gotoLoginPage();
        await loginPage.login(loginData.username, loginData.password);

        const success = await loginPage.isLoginSuccessful();
        await expect(success).toBeTruthy();
    });
});