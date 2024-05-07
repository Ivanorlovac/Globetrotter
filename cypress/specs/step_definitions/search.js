import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/* No duplicate steps, this one already in login.js
Given('I am on the {string} page', (a) => {});*/

Given('I click on the search field', () => {
cy.get('.form-control').click()
});

When('I write {string}', (searchTerm) => {
  cy.get('.form-control').type(searchTerm)
});

When('press the search button', () => {
  cy.get('#search_button').click()
});

Then('I will get to the {string} page', (a) => {
  cy.visit(a)
});

Then('I will get {string} in the results', (searchTerm) => {
  // TODO: implement step
});