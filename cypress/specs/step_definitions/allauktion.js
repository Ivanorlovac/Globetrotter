import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";



When('i click the navbar', () => {
  cy.get('.navbar-toggler-icon').click();
});

When('I click {string}', (a) => {
  cy.contains("Se alla auktion").click();
});

Then('I get directed to the  {string} page', (a) => {
  cy.url().should('include', '/alla-auktioner');
});

Then('a list of all auctions is displayed', () => {
  cy.get('.btn-close').click();
  cy.get('#see_all_auctions')
});