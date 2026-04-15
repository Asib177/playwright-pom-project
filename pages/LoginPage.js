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
