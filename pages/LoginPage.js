class LoginPage {
    constructor(page) {
        this.page = page;

        this.usernameInput = 'input[name="username"]';
        this.passwordInput = 'input[name="password"]';
        this.loginButton = 'button[type="submit"]';
        this.dashboardText = 'text=Dashboard';
    }

    async gotoLoginPage() {
        await this.page.goto('/web/index.php/auth/login');
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async isLoginSuccessful() {
        await this.page.waitForSelector(this.dashboardText);
        return await this.page.isVisible(this.dashboardText);
    }
}

module.exports = { LoginPage };


// class LoginPage {
//     constructor(page) {
//         this.page = page;

//         this.usernameInput = page.locator('input[name="username"]');
//         this.passwordInput = page.locator('input[name="password"]');
//         this.loginButton   = page.locator('button[type="submit"]');
//         this.dashboardText = page.getByRole('heading', { name: 'Dashboard' });
//     }

//     async gotoLoginPage() {
//         await this.page.goto('/web/index.php/auth/login');
//     }

//     async login(username, password) {
//         await this.usernameInput.fill(username);
//         await this.passwordInput.fill(password);
//         await this.loginButton.click();
//     }

//     async isLoginSuccessful() {
//         await this.dashboardText.waitFor({ state: 'visible', timeout: 10000 });
//         return await this.dashboardText.isVisible();
//     }
// }

// module.exports = { LoginPage };
