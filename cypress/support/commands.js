Cypress.Commands.add('deleteTestUser', (username) => {
  cy.task('deleteTestUser', username)
})

Cypress.Commands.add('deleteBuyerBids', (username) => {
  cy.task('deleteBuyerBids', username)
})

Cypress.Commands.add('loginUser', (username, password) => {
    cy.visit('/login')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
    cy.wait(1000)
})