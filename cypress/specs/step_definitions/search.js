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
  cy.visit(a, { headers: { "Accept-Encoding": "gzip, deflate" } })
});

Then('I will get {string} in the results', (searchTerm) => {
  cy.get('h5').invoke('text').then((text) => {
    // Normalize the text: convert to lower case and remove punctuation
    const normalizedText = text.toLowerCase().replace(/[^\w\s]|_/g, "");
    // Split the normalized text into an array of words
    const words = normalizedText.split(' ');
    // Check if 'egypten' is one of the words
    expect(words).to.include(searchTerm);
  });
});