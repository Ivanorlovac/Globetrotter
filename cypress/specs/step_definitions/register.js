import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.deleteTestUser('TestBuyer')
});

When('I write my {string} under name', (name) => {
  cy.get('#name').type(name)
});

When('I choose the role {string}', (role) => {
  cy.get('#role-dropdown').select(role)
});


Then('I will get registered', () => {
  // TODO: implement step
});