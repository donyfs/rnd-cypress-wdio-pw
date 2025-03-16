import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

for (let index = 1; index <= 1000; index++) {
  test('API user registration test ' + index, async ({ request }) => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      country: faker.location.country()
    };

    const response = await request.post('http://localhost:3000/api/users', {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      data: userData
    });

    expect(response.status()).toBe(201);

    const responseData = await response.json();
    expect(responseData).toHaveProperty('name', userData.name);
    expect(responseData).toHaveProperty('email', userData.email);
    expect(responseData).toHaveProperty('country', userData.country);
  });
}