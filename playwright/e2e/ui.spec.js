import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

for (let index = 1; index <= 1000; index++) {
  test('user registration form test ' + index, async ({ page }) => {

    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      country: faker.location.country()
    };

    await page.goto('http://localhost:3000');

    await page.fill('#name', userData.name);
    await page.fill('#email', userData.email);
    await page.fill('#country', userData.country);

    await page.click('.btn');

    await expect(page.locator('#successMessage')).toBeVisible();

    const tableRow = page.locator('#tableBody tr:last-child');
    await expect(tableRow.locator('td:nth-child(1)')).toHaveText(userData.name);
    await expect(tableRow.locator('td:nth-child(2)')).toHaveText(userData.email);
    await expect(tableRow.locator('td:nth-child(3)')).toHaveText(userData.country);
  });
}

