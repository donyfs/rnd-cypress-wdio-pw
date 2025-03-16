import { faker } from '@faker-js/faker';

describe('API User Registration', () => {
  for (let index = 1; index <= 1000; index++) {
    it('should successfully register users via API ' + index, () => {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        country: faker.location.country()
      };

      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/users',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: userData
      }).then((response) => {
        expect(response.status).to.eq(201);

        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('email', userData.email);
        expect(response.body).to.have.property('country', userData.country);
      });
    });
  }
}); 