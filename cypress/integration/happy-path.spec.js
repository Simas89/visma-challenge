/// <reference types="cypress" />

describe("Happy path coverage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Creates an address", () => {
    cy.wait(6000);
    cy.get('[data-cy="new-form-button"]').click();
    cy.get("#name").clear();
    cy.get("#name").type("Jon Snow");
    cy.get("#email").clear();
    cy.get("#email").type("snow@winterfell.com");
    cy.get("#city").clear();
    cy.get("#city").type("Winterfell");
    cy.get("#street").clear();
    cy.get("#street").type("Old st");
    cy.get("#houseNumber").clear();
    cy.get("#houseNumber").type("15");
    cy.get("#zip").clear();
    cy.get("#zip").type("abc123");
    cy.get('[data-cy="submit-form"]').click();
    cy.contains("snow@winterfell.com").should("exist");
  });

  it("Edits the address", () => {
    cy.wait(6000);
    cy.getAddressElementByString("happy.days@mail.co");
    cy.get("#email").clear();
    cy.get("#email").type("happy.days@mail.coxx");
    cy.get('[data-cy="submit-form"]').click();
    cy.reload();
    cy.contains("happy.days@mail.coxx").should("exist");
  });

  it("Deletes the address", () => {
    cy.wait(6000);
    cy.getAddressElementByString("happy.days@mail.co");

    cy.get('[data-cy="delete-item-button"]').click();
    cy.wait(100);

    cy.reload();

    cy.contains("happy.days@mail.co").should("not.exist");
  });

  it("Validates the address", () => {
    cy.wait(6000);
    cy.getAddressElementByString("sample@mail.com");

    cy.get('[data-cy="validate-form"]').click();

    cy.get('[data-cy="status-valid"]').should("exist");
  });
});
