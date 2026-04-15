const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PimPage } = require('../pages/PIMPage');
const { loginData, employeeData, loginDetails } = require('../utils/testData');

test.describe('PIM Module', () => {
    
    // Login before each test in this file
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(loginData.username, loginData.password);
        await loginPage.isLoginSuccessful();
    });

    test('Step 2 - Navigate to PIM and Add Employee', async ({ page }) => {
        const pimPage = new PimPage(page);

        await pimPage.goToPim();
        await expect(page).toHaveURL(/web\/index.php\/pim\/viewEmployeeList/);

        await pimPage.clickAddEmployee();
        await expect(page).toHaveURL(/web\/index.php\/pim\/addEmployee/);

        await pimPage.fillEmployeeForm(employeeData);

        await pimPage.fillLoginDetails(loginDetails);

        await pimPage.saveEmployee();
    });
});