Cypress.Commands.add("getAddressElementByString", (string) => {
  cy.get('[data-cy="item"')
    .contains(".value-field", new RegExp(string, "g"), { matchCase: true })
    .trigger("mouseover")
    .wait(300)
    .get('[data-cy="edit-form-button"]', { matchCase: true })
    .click();
});
