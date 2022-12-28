/// <reference types="cypress" />

describe('Create Raport', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Creating raport', () => {
    cy.get('[data-cy="CreateReports"]').contains('Create').click();

    cy.wait(5000);

    // cy.get('[data-cy="date-from"]').click('right').contains('Dzisiaj').click();
    cy.get('[data-cy="date-from"]').type('2022-12-24T09:09');
    cy.get('[data-cy="date-to"]').type('2022-12-25T09:09');

    cy.get('[data-cy="node"]').click().get('[data-cy="first-arg"]').click();
    cy.get('[data-cy="prop"]')
      .click()
      .get('[name="properties[0].properties"]')
      .click();
    cy.get('body').focus();

    cy.get('[data-cy="run"]').click();
    cy.get('[data-cy="download"]').click();
  });
});
