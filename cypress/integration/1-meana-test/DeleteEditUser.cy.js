/// <reference types="cypress" />

context('Check Existing Node', () => {
  it('Check node Test-Node', () => {
    cy.visit('https://meana.vercel.app');

    cy.contains('List').click();
    // cy.get(
    //   '.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textInherit.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-colorInherit.MuiButton-root.MuiButton-text.MuiButton-textInherit.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-colorInherit.css-1yk9ckv'
    // )
    //   .last()
    //   .click();

    // cy.get('#firstName').clear().type('Jon');
    // cy.get('#lastName').clear().type('Snow');
    // cy.get('#login').clear().type('jonsnow');
    // cy.get('#password').clear().type('123456789');
    // cy.get('#email').clear().type('jon@snow.com');
    // cy.contains('Submit').click();

    cy.get('[data-testid="DeleteIcon"]').click();
  });
});
