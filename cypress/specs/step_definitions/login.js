import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

let userN = ''
let userP = ''

Then('I get directed to the login page', () => {
  cy.get('h1').should("have.text", "Logga in")
});


When('I write my {string} under username', (username) => {
  cy.get('#username').type(username)
  userN = username
});

When('I write my {string} under password', (password) => {
  cy.get('#password').type(password)
  userP = password
});

Then('I will get logged in', () => {
  cy.get("#navbar-button").click()
  cy.get("#navlink-logout").should("exist")
});

Then('I will not get logged in', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:5173/api/login',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: userN,
      password: userP
    },
    failOnStatusCode: false
  }).then((resp) => {
    expect(resp.status).to.eq(500);
  });
});