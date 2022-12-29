/// <reference types="cypress" />

describe('Delete element from dashboard', () => {
  beforeEach(() => {
    cy.visit('https://meana.vercel.app');
  });

  it('Delete from dashboard', () => {
    cy.contains('Capacity').get('[data-cy="Element"]').first().click();
  });
});
