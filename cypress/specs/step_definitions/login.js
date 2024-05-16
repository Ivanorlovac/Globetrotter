import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

Then('I get directed to the login page', () => {
  cy.get('h1').should("have.text", "Logga in")
});


When('I write my {string} under username', (username) => {
  cy.get('#username').type(username)
});

When('I write my {string} under password', (password) => {
  cy.get('#password').type(password)
});

Then('I will get logged in', () => {
  cy.get("#navbar-button").click()
  cy.get("#navlink-logout").should("exist")
});

Then('I will not get logged in', () => {
  cy.get('.blue_box_centered_login > form > p').should('have.text', 'Ett fel uppstod vid inloggning.')
});