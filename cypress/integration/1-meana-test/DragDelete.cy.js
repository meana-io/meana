/// <reference types="cypress" />

describe('Drag and delete element from dashboard', () => {
  beforeEach(() => {
    cy.visit('https://meana.vercel.app');
  });

  it('Drag element', () => {});

  it('Delete from dashboard', () => {
    cy.contains('Capacity')
      .get('.MuiPaper-root.MuiPaper-outlined.MuiPaper-rounded.css-qqjb9z')
      .get(
        '.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorSecondary.MuiIconButton-sizeMedium.css-do5n5s'
      )
      .first()
      .click();
  });
});
