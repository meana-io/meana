/// <reference types="cypress" />

describe('Edit and delete user', () => {
  beforeEach(() => {
    cy.visit('https://meana.vercel.app');
  });

  it('Edit user', () => {
    cy.contains('List').click();
    cy.get('[data-cy="EditUser"]').last().click();

    cy.get('[data-cy="FirstName"]').type('Jon');
    cy.get('[data-cy="LastName"]').type('Doe');
    cy.get('[data-cy="Login"]').type('jondoe');
    cy.get('[data-cy="Password"]').type('123456789');
    cy.get('[data-cy="Email"]').type('jon@doe.com');
    cy.contains('Submit').click();

    cy.get('[data-testid="DeleteIcon"]').click();
  });

  it('Delete user', () => {
    cy.contains('List').click();
    cy.get('[data-testid="DeleteIcon"]').click();
  });
});
