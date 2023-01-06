/// <reference types="cypress" />
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
).set;

describe('Checking treshold values', () => {
  beforeEach(() => {
    cy.visit('https://meana.vercel.app');
  });

  it('Drag slider', () => {
    cy.contains('test-node').click();

    cy.get('#disk').parent().click().get('[data-value=0]').click();

    cy.get('#partition').parent().click().get('[data-value=0]').click();

    cy.get('#vertical-tab-6').click({ force: true });

    cy.get('#disk').parent().click().get('[data-value=sda]').click();

    cy.get('input[type="range"]').then(($range) => {
      const range = $range[0];

      nativeInputValueSetter.call(range, 40);

      range.dispatchEvent(new Event('change', { value: 15, bubbles: true }));
    });

    cy.get('[data-cy="SaveDisk"]').first().click();
  });
});
