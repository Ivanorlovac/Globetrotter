import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the {string} page', (url) => {
  cy.visit(url);
});

When('I click on {string}', (buttonId) => {
  cy.get(`#${buttonId}`).click()
});

Then('I can see the navbar', () => {
  cy.get("#offcanvasNavbar-expand-false").should("be.visible")
});
