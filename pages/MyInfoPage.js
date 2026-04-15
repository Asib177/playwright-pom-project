// pages/MyInfoPage.js
const { expect } = require('@playwright/test');

class MyInfoPage {
  constructor(page) {
    this.page = page;
    this.myInfoButton = page.getByRole('link', { name: 'My Info' });
    this.contactDetails = page.getByRole('link', { name: 'Contact Details' });
    this.street1 = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[1]/div/div[1]/div/div[2]/input');
    this.street2 = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[1]/div/div[2]/div/div[2]/input');
    this.city = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[1]/div/div[3]/div/div[2]/input');
    this.state_province = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[1]/div/div[4]/div/div[2]/input');
    this.zip_postal_code = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[1]/div/div[5]/div/div[2]/input');

    this.countryDropdown = page.locator('div.oxd-select-text'); 
    this.countryOption = page.getByRole('option', { name: 'Bangladesh' });

    this.home = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[2]/div/div[1]/div/div[2]/input');
    this.mobile = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[2]/div/div[2]/div/div[2]/input');
    this.work = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[2]/div/div[3]/div/div[2]/input');
    this.work_email = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[3]/div/div[1]/div/div[2]/input');
    this.other_email = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[3]/div/div[2]/div/div[2]/input');

    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async clickMyInfo() {
    await this.myInfoButton.click();
  }

  async clickContactDetails() {
    await this.contactDetails.click();
  }

  async inputContactDetails({ street1, street2, city, state_province, zip_postal_code, home, mobile, work, work_email, other_email }) {
    await this.street1.fill(street1);
    await this.street2.fill(street2);
    await this.city.fill(city);
    await this.state_province.fill(state_province);
    await this.zip_postal_code.fill(zip_postal_code);

    // await this.country.click();
    // await this.selectCountry.click();

    const selectedCountry = await this.countryDropdown.textContent();

    if (!selectedCountry.includes('Bangladesh')) {
      await this.countryDropdown.click();
      await this.countryOption.click();
    }

    await this.home.fill(home);
    await this.mobile.fill(mobile);
    await this.work.fill(work);
    await this.work_email.fill(work_email);
    await this.other_email.fill(other_email);
  }

  async saveButtonClick() {
    await this.saveButton.click();

    // Wait and verify success message
    const successMessage = this.page.locator('text=Successfully Updated');

    await expect(successMessage).toBeVisible();
  }
}

module.exports = { MyInfoPage };