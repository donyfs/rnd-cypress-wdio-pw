import { faker } from '@faker-js/faker';

describe('User Registration Form', () => {
  for (let index = 1; index <= 10; index++) {
    it('should successfully submit registration form multiple times ' + index, async () => {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        country: faker.location.country()
      };

      await browser.url('http://localhost:3000');

      await $('#name').setValue(userData.name);
      await $('#email').setValue(userData.email);
      await $('#country').setValue(userData.country);

      await $('.btn').click();

      await expect($('#successMessage')).toBeDisplayed();

      const lastRow = await $('#tableBody tr:last-child');
      await expect(await lastRow.$('td:nth-child(1)')).toHaveText(userData.name);
      await expect(await lastRow.$('td:nth-child(2)')).toHaveText(userData.email);
      await expect(await lastRow.$('td:nth-child(3)')).toHaveText(userData.country);
    });
  }
}); 