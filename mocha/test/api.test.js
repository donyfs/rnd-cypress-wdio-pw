const { expect } = require('chai');
const axios = require('axios');
const { faker } = require('@faker-js/faker');

describe('API User Registration', () => {
  // Fungsi helper untuk membuat request
  async function registerUser(userData) {
    return axios.post('http://localhost:3000/api/users', userData, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      }
    });
  }

  // Membuat 5000 test case
  for (let index = 1; index <= 5000; index++) {
    it(`should successfully register users via API ${index}`, async () => {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        country: faker.location.country()
      };

      const response = await registerUser(userData);
      
      expect(response.status).to.equal(201);
      expect(response.data).to.have.property('name', userData.name);
      expect(response.data).to.have.property('email', userData.email);
      expect(response.data).to.have.property('country', userData.country);
    });
  }
}); 