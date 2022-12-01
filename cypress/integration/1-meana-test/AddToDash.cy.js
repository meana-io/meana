/// <reference types="cypress" />

context('Adding new node', () => {
  it('Add to dashboard', () => {
    cy.visit('https://meana.vercel.app');

    cy.contains('test-node').click();

    cy.get('#disk').parent().click().get('[data-value=0]').click();

    cy.get('#partition').parent().click().get('[data-value=0]').click();

    cy.contains('Name').get('[data-testid="StarOutlineIcon"]').first().click();
  });
});
