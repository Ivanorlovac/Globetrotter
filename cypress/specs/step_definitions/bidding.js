import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


When('I place a bid', () => {
  cy.get('.input-place-bid').type(10000)
});

When('I click on the {string}', (buttonClass) => {
  cy.get(`.${buttonClass}`).click()
});


Then('the bid placed alert will pop up', () => {
  cy.get('.fade').should("be.visible")
});

Then('I can see my new bid', () => {
  cy.get('p > span').should("have.text", "10000 kr")
});


When('I have already a bid on the auction', () => {
  cy.get('#navbar-button').click()
  cy.get('#navlink-my-page').click()
  cy.get('.btn-close').click()
  cy.get('.auctions-section').click()
  cy.get('.favorite-article').should('be.visible')
  cy.get('a > svg').click()
  cy.wait(2000)
});

When('I place a lower bid than my current', () => {
  cy.get('.input-place-bid').type(9000)
});


Then('the false bid alert will show up.', () => {
  cy.get('.fade').should("be.visible")  
});