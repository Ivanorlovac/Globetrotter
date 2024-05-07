import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";


Before({tags: '@register'} , () => {
  cy.deleteTestUser('TestBuyer')  
  cy.deleteTestUser('TestSeller')  
})

When('I write my {string} under name', (name) => {
  cy.get('#name').type(name)
});

When('I write my {string} under company', (company) => {
  cy.get('#companyName').type(company)
});

When('I choose the role {string}', (role) => {
  cy.get('#role-dropdown').select(role)
});


Then('I will get registered', () => {
  cy.on('window:alert',(txt)=>{
    expect(txt).to.contains("Registrering lyckades!");
  })
});

Then('I get directed to the register page', () => {
  cy.get('h2').should("have.text", "Registrera ny användare")
});