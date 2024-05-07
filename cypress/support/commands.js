Cypress.Commands.add('deleteTestUser', (username) => {
  cy.task('deleteTestUser', username)
})