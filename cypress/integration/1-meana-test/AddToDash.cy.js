/// <reference types="cypress" />

context('Adding new node', () => {
  it('Add to dashboard', () => {
    cy.visit('https://meana.vercel.app');

    cy.contains('Capacity').get('[data-testid="StarOutlineIcon"]').click();
  });
});
