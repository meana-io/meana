/// <reference types="cypress" />

describe('Adding new element to dashboard', () => {
  beforeEach(() => {
    cy.visit('https://meana.vercel.app');
  });

  it('Add to dashboard', () => {
    cy.contains('test-node').click();

    cy.get('#disk').parent().click().get('[data-value=0]').click();

    cy.get('#partition').parent().click().get('[data-value=0]').click();

    cy.contains('Name').get('[data-testid="StarOutlineIcon"]').first().click();
  });
});
