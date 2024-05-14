Cypress.Commands.add('login', (username, password) => {
    cy.visit('/login', { headers: { "Accept-Encoding": "gzip, deflate" } })
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
})