import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the home page', () => {
  cy.visit('/')
});

When('I click on Kontakt', () => {
  cy.get('#link_contact').click()
});

Then('I will be directed to the contact page', () => {
   cy.url().should('include', '/contact')
});

Given('I am on the contact page', () => {
  cy.visit('/contact')
});

When('I fill in all required fields correctly', () => {
  cy.get('input#firstName').type('Julia')
  cy.get('input#email').type('hdgjd@gmail.com')
  cy.get('input#phone').type('0760899663')
  cy.get('textarea#message').type('Julia was here.')
});

When('I submit the form', () => {
  cy.get('.button').click()
});

Then('a thank you message {string} should be displayed', (expectedMessage) => {
  cy.on('window:alert', (txt) => {
      expect(txt).to.contains(expectedMessage)
    })
});

Given('the user is on the contact page', () => {
 cy.visit('/contact')
});

Given('the user has entered data into all fields', () => {
  cy.get('input#firstName').type('Gabriel')
  cy.get('input#email').type('gabriel@gmail.com')
  cy.get('input#phone').type('0760894684')
  cy.get('textarea#message').type('Gabriel was here.')
});

When('the user clicks the submit button', () => {
  cy.get('.button').click()
});

/* No duplicate steps, this one already above
Then('a thank you message {string} should be displayed', (a) => {});*/

Then('all form fields should be cleared', () => {
  cy.get('input#firstName').should('have.value', '')
  cy.get('input#email').should('have.value', '')
  cy.get('input#phone').should('have.value', '')
  cy.get('textarea#message').should('have.value', '')
});

/* No duplicate steps, this one already above
Given('I am on the contact page', () => {});*/

When('I leave a required field empty', () => {
  cy.get('input#firstName').clear()
  cy.get('input#email').type('elena@gmail.com')
  cy.get('input#phone').type('0760894684')
  cy.get('textarea#message').type('Elena was here.')
});

When('I attempt to submit the form', () => {
  
});

Then('the form should not be submitted', () => {
  cy.url().should('include', '/contact')
});

Then('an error message {string} should be displayed', (expectedMessage) => {
   cy.on('window:alert', (txt) => {
      expect(txt).to.contains(expectedMessage)
    })
});