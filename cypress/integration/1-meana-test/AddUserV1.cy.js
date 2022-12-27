/// <reference types="cypress" />

describe('Add new user version 1', () => {
  beforeEach(() => {
    cy.visit('https://meana.vercel.app');
  });

  it('Add new user', () => {
    cy.contains('List').click();
    cy.contains('Create User').click();

    cy.get('[data-cy="FirstName"]').type('Jon');
    cy.get('[data-cy="LastName"]').type('Doe');
    cy.get('[data-cy="Login"]').type('jondoe');
    cy.get('[data-cy="Password"]').type('123456789');
    cy.get('[data-cy="Email"]').type('jon@doe.com');
    cy.contains('Cancel').click();

    cy.get('[data-cy="FirstName"]').type('Jon');
    cy.get('[data-cy="LastName"]').type('Doe');
    cy.get('[data-cy="Login"]').type('jondoe');
    cy.get('[data-cy="Password"]').type('123456789');
    cy.get('[data-cy="Email"]').type('jon@doe.com');
    cy.contains('Submit').click();
  });
});
