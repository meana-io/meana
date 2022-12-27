/// <reference types="cypress" />

describe('Create Raport', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Creating raport', () => {
    cy.get('[data-cy="CreateReports"]').contains('Create').click();

    cy.wait(4000);

    cy.get('[data-cy="date-from"]').click('right').contains('Dzisiaj').click();
    cy.get('[data-cy="date-to"]').click().contains('Dzisiaj').click();

    cy.get('[data-cy="node"]').parent().click().get('[data-value=0]').click();
    cy.get('[data-cy="prop"]').parent().click().get('[data-value=0]').click();
  });
});
