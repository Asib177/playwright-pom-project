// const { test, expect } = require('@playwright/test');
// const { LoginPage } = require('../pages/loginPage');   // reuse your existing login POM
// const { PimPage }   = require('../pages/pimPage');

// test.describe('PIM - Add Employee', () => {

//   // Login once before all tests in this suite
//   test.beforeEach(async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login('Admin', 'admin123');   // adjust credentials as needed
//   });

//   test('Navigate to PIM and open Add Employee page', async ({ page }) => {
//     const pim = new PimPage(page);

//     await pim.goToPim();
//     await expect(page).toHaveURL(/pim\/viewEmployeeList/);

//     await pim.clickAddEmployee();
//     await expect(page).toHaveURL(/pim\/addEmployee/);
//     await expect(page.getByText('Add Employee')).toBeVisible();
//   });

//   test('Add employee without login details', async ({ page }) => {
//     const pim = new PimPage(page);

//     await pim.addEmployee({
//       firstName:  'John',
//       middleName: 'W',
//       lastName:   'Doe',
//     });

//     // After save, OrangeHRM redirects to the employee's personal details page
//     await expect(page).toHaveURL(/pim\/personalDetails\/empNumber/);
//     await expect(page.getByText('John')).toBeVisible();
//   });

//   test('Add employee with login details enabled', async ({ page }) => {
//     const pim = new PimPage(page);

//     await pim.addEmployee(
//       {
//         firstName: 'Jane',
//         lastName:  'Smith',
//       },
//       {
//         username: 'jane.smith_' + Date.now(),   // unique username
//         password: 'Test@1234!',
//         status:   'enabled',
//       }
//     );

//     await expect(page).toHaveURL(/pim\/personalDetails\/empNumber/);
//     await expect(page.getByText('Jane')).toBeVisible();
//   });

//   test('Add employee with custom Employee ID', async ({ page }) => {
//     const pim = new PimPage(page);

//     await pim.goToPim();
//     await pim.clickAddEmployee();
//     await pim.fillEmployeeForm({
//       firstName:  'Alice',
//       lastName:   'Wonder',
//       employeeId: 'EMP-999',
//     });
//     await pim.saveEmployee();

//     await expect(page).toHaveURL(/pim\/personalDetails\/empNumber/);
//   });

//   test('Cancel add employee returns to employee list', async ({ page }) => {
//     const pim = new PimPage(page);

//     await pim.goToPim();
//     await pim.clickAddEmployee();
//     await pim.fillEmployeeForm({ firstName: 'Bob', lastName: 'Temp' });
//     await pim.cancelAddEmployee();

//     await expect(page).toHaveURL(/pim\/viewEmployeeList/);
//   });

// });
