/// <reference types="cypress" />

describe('Check Existing Node', () => {
  beforeEach(() => {
    cy.visit('https://meana.vercel.app');
  });

  it('Check node Test-Node', () => {
    cy.contains('test-node').click();

    cy.get('#disk').parent().click().get('[data-value=0]').click();

    cy.get('#partition').parent().click().get('[data-value=0]').click();

    cy.get('#vertical-tab-1').click({ force: true });

    cy.get('#vertical-tab-2').click({ force: true });

    cy.get('#vertical-tab-3').click({ force: true });

    cy.get('#vertical-tab-4').click({ force: true });

    cy.get('#vertical-tab-5').click({ force: true });

    cy.get('#mui-component-select-logFileName')
      .parent()
      .click()
      .get('[data-value="auth.log"]')
      .click();
  });
});
