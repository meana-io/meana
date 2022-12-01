/// <reference types="cypress" />

context('Check Existing Node', () => {
  it('Check node Test-Node', () => {
    cy.visit('https://meana.vercel.app');

    cy.contains('List').click();
    cy.contains('Create User').click();

    cy.get('#firstName').type('Jon');
    cy.get('#lastName').type('Doe');
    cy.get('#login').type('jondoe');
    cy.get('#password').type('123456789');
    cy.get('#email').type('jon@doe.com');
    cy.contains('Cancel').click();

    cy.contains('Create User').click();
    cy.get('#firstName').type('Jon');
    cy.get('#lastName').type('Doe');
    cy.get('#login').type('jondoe');
    cy.get('#password').type('123456789');
    cy.get('#email').type('jon@doe.com');
    cy.contains('Submit').click();
  });
});
