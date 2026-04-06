import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from '../utils/testData';

test('OrangeHRM Login Test', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.username, loginData.password);

    const success = await loginPage.isLoginSuccessful();
    expect(success).toBeTruthy();

});