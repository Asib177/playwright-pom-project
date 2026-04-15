class PimPage {
    constructor(page) {
        this.page = page;

        this.pimButton = page.getByRole('link', { name: 'PIM' });
        this.addEmployeeButton = page.getByRole('link', { name: 'Add Employee' });

        this.firstNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');

        
        this.employeeIdInput = page
            .locator('div.oxd-input-group')
            .filter({ hasText: /^Employee Id$/ })
            .locator('input');

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
            
            await this.employeeIdInput.click();
            await this.page.keyboard.press('Control+A');
            await this.page.keyboard.press('Backspace');
            
            await this.employeeIdInput.pressSequentially(employeeId, { delay: 30 });
        }
    }

    async fillLoginDetails({ username, password }) {
        const toggle = this.page.locator('.oxd-switch-wrapper');
        await toggle.click();

        await this.usernameInput.waitFor({ state: 'visible' });
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
    }



    async saveEmployee() {
        await this.saveButton.click();
    }
}

module.exports = { PimPage };