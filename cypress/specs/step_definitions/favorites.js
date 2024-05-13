import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in', () => {
    cy.loginUser("TestBuyer", "321abc")
});

When('I click on an empty star', () => {
  cy.get('.align-items-end').click()
});

Then('the star should turn yellow', () => {
  cy.get('.d-flex > svg > path')
});

/* No duplicate steps, this one already above
When('I click on an empty star', () => {});*/

When('I go to my pages', () => {
  cy.visit("/mina-sidor")
});

Then('the auction should appear in my favorites on my pages', () => {
  cy.get('.favorite-section').click()
  cy.get('.favorite-article')

});

When('I click on my favorites', () => {
  cy.get('.favorite-section').click()
});

Then('a list of my favorites should appear', () => {
  cy.get('.favorite-article')
});

When('I click on the star', () => {
  cy.get('.favorite-star > svg > path').click()

  // behöver definiera vilken stjärna om det finns flera
});

Then('the favorite will be removed', () => {
  cy.get('.favorite-article')

});