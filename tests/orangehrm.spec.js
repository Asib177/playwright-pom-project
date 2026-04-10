const { test, expect } = require('@playwright/test');
const { LoginPage }    = require('../pages/LoginPage');
const { PimPage }      = require('../pages/PimPage');
const { loginData, employeeData, loginDetails } = require('../utils/testData');

// ─────────────────────────────────────────────
// TEST 1: Login
// ─────────────────────────────────────────────
test('Step 1 - Login to OrangeHRM', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.username, loginData.password);

    const success = await loginPage.isLoginSuccessful();
    await expect(success).toBeTruthy();

});

// ─────────────────────────────────────────────
// TEST 2: PIM → Add Employee
// ─────────────────────────────────────────────
test('Step 2 - Navigate to PIM and Add Employee', async ({ page }) => {

    // ── Login first ──
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.username, loginData.password);
    await loginPage.isLoginSuccessful();

    // ── Go to PIM ──
    const pimPage = new PimPage(page);
    await pimPage.goToPim();

    // FIXED URL (regex + typo)
    await expect(page).toHaveURL(/web\/index.php\/pim\/viewEmployeeList/);

    // ── Click Add Employee ──
    await pimPage.clickAddEmployee();
    await expect(page).toHaveURL(/web\/index.php\/pim\/addEmployee/);
    // await expect(page.getByText('Add Employee')).toBeVisible();

    // ── Fill employee form ──
    await pimPage.fillEmployeeForm(employeeData);

    // ── Fill login details (optional) ──
    await pimPage.fillLoginDetails(loginDetails);

    // ── Save ──
    await pimPage.saveEmployee();

    // Dynamic URL check (best practice)
    // await expect(page).toHaveURL(/web\/index.php\/pim\/viewPersonalDetails\/empNumber\/\d+/);
});