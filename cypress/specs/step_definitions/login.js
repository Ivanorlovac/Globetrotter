import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.task('resetDatabase');
})

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

Then('I will not get logged in {string} and {string}', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:5173/api/login',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: username,
      password: password
    },
    failOnStatusCode: false
  }).then((resp) => {
    expect(resp.status).to.eq(500);
  });
});