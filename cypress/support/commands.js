Cypress.Commands.add('deleteTestUser', (username) => {
  cy.task('deleteTestUser', username)
})

Cypress.Commands.add('deleteBuyerBids', (username) => {
  cy.task('deleteBuyerBids', username)
})