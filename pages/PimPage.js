// class PimPage {
//     constructor(page) {
//         this.page = page;

//         this.pimButton = 'button[class="oxd-text oxd-text--span oxd-main-menu-item--name"]';
//         this.addEmployeeButton = 'button[type="button"]';
//         this.firstNameInput = 'input[name="firstName"]';
//         this.middleNameInput = 'input[name="middleName"]';
//         this.lastNameInput = 'input[name="lastName"]';
//         this.employeeIdInput = 'input[name="employeeId"]';
//         this.loginDretailsToggle = 'input[type="checkbox"]';
//         this.usernameLoginInput = 'input[name="user_name"]';
//         this.passwordLoginInput = 'input[name="user_password"]';
//         this.confirmPasswordLoginInput = 'input[name="re_password"]';
//         this.saveButton = 'button[type="submit"]';
//         this.personalDetailsText = 'text=Personal Details';

//         // // Sidebar
//         // this.pimMenu       = page.getByRole('link', { name: 'PIM' });

//         // // Top tabs
//         // this.addEmployeeTab = page.getByRole('link', { name: 'Add Employee' });

//         // // Add Employee form fields
//         // this.firstNameInput  = page.getByPlaceholder('First Name');
//         // this.middleNameInput = page.getByPlaceholder('Middle Name');
//         // this.lastNameInput   = page.getByPlaceholder('Last Name');
//         // this.employeeIdInput = page.locator('input.oxd-input').nth(3);

//         // // Create Login Details toggle
//         // this.createLoginToggle = page.locator('.oxd-switch-input');

//         // // Login detail fields
//         // this.usernameInput        = page.locator('input[autocomplete="username"]');
//         // this.passwordInput        = page.locator('input[autocomplete="new-password"]').first();
//         // this.confirmPasswordInput = page.locator('input[autocomplete="new-password"]').last();

//         // // Buttons
//         // this.saveButton   = page.getByRole('button', { name: 'Save' });
//         // this.cancelButton = page.getByRole('button', { name: 'Cancel' });
//     }

//     // Step 1: Click PIM from sidebar
//     async goToPim() {
//         await this.pimButton.click();
//         await this.page.waitForURL(/web/index.php/pim/viewEmployeeList);
//     }

//     // Step 2: Click Add Employee tab
//     async clickAddEmployee() {
//         await this.addEmployeeButton.click();
//         await this.page.waitForURL(/web/index.php/pim/addEmployee);
//     }

//     // Step 3: Fill the employee form
//     async fillEmployeeForm({ firstName, middleName = '', lastName, employeeId = '' }) {
//         await this.firstNameInput.fill(firstName);
//         if (middleName) {
//             await this.middleNameInput.fill(middleName);
//         }
//         await this.lastNameInput.fill(lastName);
//         if (employeeId) {
//             await this.employeeIdInput.clear();
//             await this.employeeIdInput.fill(employeeId);
//         }
//     }

//     // Optional: Fill login details
//     async fillLoginDetails({ username, password }) {
//         const isChecked = await this.createLoginToggle.isChecked().catch(() => false);
//         if (!isChecked) {
//             await this.createLoginToggle.click();
//         }
//         await this.usernameInput.fill(username);
//         await this.passwordInput.fill(password);
//         await this.confirmPasswordInput.fill(password);
//     }

//     // Step 4: Save
//     async saveEmployee() {
//         await this.saveButton.click();
//     }
// }

// module.exports = { PimPage };

// const { expect } = require('@playwright/test');
class PimPage {
    constructor(page) {
        this.page = page;

        // Sidebar & Tabs
        this.pimButton = page.getByRole('link', { name: 'PIM' });
        this.addEmployeeButton = page.getByRole('link', { name: 'Add Employee' });

        // Name fields - getByPlaceholder is highly reliable here
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');

        /**
         * ✅ FIXED LOCATOR: 
         * We use 'oxd-input-group' instead of 'oxd-form-row'.
         * 'oxd-input-group' is the specific container for a single field + label.
         * Using a regex /^Employee Id$/ ensures we don't accidentally match other fields.
         */
        this.employeeIdInput = page
            .locator('div.oxd-input-group')
            .filter({ hasText: /^Employee Id$/ })
            .locator('input');

        // Login toggle & detail fields
        // this.createLoginToggle = page.locator('input[type="checkbox"]');
        // this.usernameInput = page.locator('input[autocomplete="username"]');
        // this.passwordInput = page.locator('input[autocomplete="new-password"]').first();
        // this.confirmPasswordInput = page.locator('input[autocomplete="new-password"]').last();

        //////////////////
        // ✅ REFINED LOGIN DETAIL LOCATORS
        // Target the inputs based on their specific label containers
        this.usernameInput = page
            .locator('div.oxd-input-group')
            .filter({ hasText: /^Username$/ })
            .locator('input');

        this.passwordInput = page
            .locator('div.oxd-input-group')
            .filter({ hasText: /^Password$/ })
            .locator('input');

        this.confirmPasswordInput = page
            .locator('div.oxd-input-group')
            .filter({ hasText: /^Confirm Password$/ })
            .locator('input');

        ///////////////////////////////////

        // Action Buttons
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    async goToPim() {
        await this.pimButton.click();
        await this.page.waitForURL(/pim\/viewEmployeeList/);
    }

    async clickAddEmployee() {
        await this.addEmployeeButton.click();
        await this.page.waitForURL(/pim\/addEmployee/);
    }

    async fillEmployeeForm({ firstName, middleName = '', lastName, employeeId = '' }) {
        await this.firstNameInput.fill(firstName);
        await this.middleNameInput.fill(middleName);
        await this.lastNameInput.fill(lastName);

        if (employeeId) {
            // Ensure the input is ready
            await this.employeeIdInput.waitFor({ state: 'visible' });
            
            // OrangeHRM auto-generates IDs; we must clear it first
            await this.employeeIdInput.click();
            await this.page.keyboard.press('Control+A');
            await this.page.keyboard.press('Backspace');
            
            // pressSequentially ensures the app's internal state updates correctly
            await this.employeeIdInput.pressSequentially(employeeId, { delay: 30 });
        }
    }

    async fillLoginDetails({ username, password }) {
        const toggle = this.page.locator('.oxd-switch-wrapper');
        await toggle.click();

        // Now these will resolve correctly
        await this.usernameInput.waitFor({ state: 'visible' });
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
    }



    async saveEmployee() {
        await this.saveButton.click();
        // Best practice: wait for the post-save navigation or success toast
    }
}

module.exports = { PimPage };