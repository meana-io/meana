/// <reference types="cypress" />

context('Adding new node', () => {
  it('Drag and delete from dashboard', () => {
    cy.visit('https://meana.vercel.app');

    cy.contains('Capacity')
      .get('.MuiPaper-root.MuiPaper-outlined.MuiPaper-rounded.css-qqjb9z')
      .get(
        '.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorSecondary.MuiIconButton-sizeMedium.css-do5n5s'
      )
      .first()
      .click();
  });
});
