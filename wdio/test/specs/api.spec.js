import { faker } from '@faker-js/faker';

describe('API User Registration', () => {
  it('should successfully register users via API', async () => {
    for (let index = 1; index <= 1000; index++) {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        country: faker.location.country()
      };

      const response = await browser.call(async () => {
        return fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
      });

      await expect(response.status).toBe(201);

      const responseData = await response.json();
      await expect(responseData).toHaveProperty('name', userData.name);
      await expect(responseData).toHaveProperty('email', userData.email);
      await expect(responseData).toHaveProperty('country', userData.country);
    }
  });
}); 