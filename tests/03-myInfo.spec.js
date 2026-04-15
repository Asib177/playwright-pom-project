const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { MyInfoPage } = require('../pages/MyInfoPage');
const { myUser } = require('../utils/testData');
const {cInput} = require('../utils/contactInformationData');

test.describe('My Info Module', () => {

  // Login myUser before each test in this file
  test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.gotoLoginPage();
      await loginPage.login(myUser.username, myUser.password);
      await loginPage.isLoginSuccessful();
  });
  
  test('Step-1: Verify My Info page loads correctly', async ({ page }) => {
    console.log('Test is running');
  });

  test('Step-2: Click My Info page', async ({ page }) => {
    const myInfoPage = new MyInfoPage(page);

    await myInfoPage.clickMyInfo();
    await myInfoPage.clickContactDetails();

    // await myInfoPage.inputContactDetails(cInput.street1, cInput.street2, cInput.city, cInput.state_province, cInput.zip_postal_code, cInput.home, cInput.mobile, cInput.work, cInput.work_email, cInput.other_email);

    await myInfoPage.inputContactDetails(cInput);
    await myInfoPage.saveButtonClick();
  });
});