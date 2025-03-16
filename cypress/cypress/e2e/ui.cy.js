import { faker } from '@faker-js/faker';

describe('User Registration Form', () => {
  it('should successfully submit registration form multiple times', () => {
    for (let index = 1; index <= 10; index++) {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        country: faker.location.country()
      };

      cy.visit('http://localhost:3000');

      cy.get('#name').type(userData.name);
      cy.get('#email').type(userData.email);
      cy.get('#country').type(userData.country);

      cy.get('.btn').click();

      cy.get('#successMessage').should('be.visible');

      cy.get('#tableBody tr:last-child').within(() => {
        cy.get('td').eq(0).should('have.text', userData.name);
        cy.get('td').eq(1).should('have.text', userData.email);
        cy.get('td').eq(2).should('have.text', userData.country);
      });
    }
  });
}); 