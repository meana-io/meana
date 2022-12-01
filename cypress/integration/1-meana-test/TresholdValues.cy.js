/// <reference types="cypress" />
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
).set;

context('Checking treshold values', () => {
  it('Drag and delete from dashboard', () => {
    cy.visit('https://meana.vercel.app');

    cy.contains('test-node').click();

    cy.get('#disk').parent().click().get('[data-value=0]').click();

    cy.get('#partition').parent().click().get('[data-value=0]').click();

    cy.get('#vertical-tab-6').click({ force: true });

    cy.get('#disk').parent().click().get('[data-value=sda]').click();

    cy.get('input[type="range"]').then(($range) => {
      // get the DOM node
      const range = $range[0];
      // set the value manually
      nativeInputValueSetter.call(range, 15);
      // now dispatch the event
      range.dispatchEvent(new Event('change', { value: 15, bubbles: true }));
    });

    cy.get(
      '.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeLarge.MuiButton-containedSizeLarge.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeLarge.MuiButton-containedSizeLarge.css-1vtnqev'
    )
      .first()
      .click();
  });
});
