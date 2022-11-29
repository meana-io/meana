/// <reference types="cypress" />

context('Adding new node', () => {
  beforeEach(() => {
    cy.visit('https://meana.vercel.app');
  });

  it('Click Add New Node', () => {
    cy.get('[data-testid=AddIcon]').click().type('Test-Cypress');

    cy.contains('Submit').click();
    cy.contains('Close').click();
  });
});
