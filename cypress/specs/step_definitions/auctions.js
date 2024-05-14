import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";



Given('I am logged in as a seller', () => {
  cy.visit('/', { headers: { "Accept-Encoding": "gzip, deflate" } });
  cy.get('.navbar-toggler-icon').click();
  cy.get('#navlink-login').click();
  cy.get('.btn-close').click();
  cy.wait(1000);
  cy.get('[type="text"]').focus().type('horisont_resebyra@flynow.com');
  cy.get('[type="password"]').type('123456');
  cy.get('.button_smooth').click();
  cy.wait(1000);
  
});



When('I fill in the auction form with the following details:', () => {
  cy.visit('/skapa-auktion', { headers: { "Accept-Encoding": "gzip, deflate" } });
  cy.get('#title').type('Sommarlands Kap');
  cy.get('#description').type('En kap till sommarland');
  cy.get('#valuationPrice').type(2000);
  cy.get('#priceRange').type(1000);
  cy.get('#imageInput').type('https://thumbs.dreamstime.com/b/lantligt-sommarlandskap-med-soluppg%C3%A5ng-77915003.jpg{enter}');
  cy.get('#endTime').type('2024-12-31T23:59');
  cy.get('#category').select('Adventure');
  



});

When ('I press "Skapa Auktion"', () => {
  cy.get('.btn').click();
});

// Then('I should see a alert saying "Auktion skapad!"', (a) => {
//  cy.get('#alert').should('contain', 'Auktion skapad!');
// });

// Then('the auction with the specified details should be listed in my auctions', () => {
  
// });


Given('I am on {string} page', (url) => {
  cy.visit(url, { headers: { "Accept-Encoding": "gzip, deflate" } });
  cy.url().should('include', SellersPage);

});

When('i press {string} on the {string} page', (a, b) => {

  cy.get('ul > :nth-child(1) > :nth-child(6)').should('be.visible').click();

  
});

And('I update the auction form with the following details:', () => {
cy.get('#title').clear().type('VANDRING GENOM SPANSKA PYRENÉERNAAAAAA');
cy.get('#description').clear().type('Under vår vandring genom spanska Pyrenéerna utforskar vi ett enastående landskap med imponerande bergstoppar, grönskimrande alpängar, frodiga dalar och vackra små byar. En utmanande men storslagen resa!!!!');
cy.get('#valuationPrice').clear().type('60000');
cy.get('#endTime').clear().type('2024-06-15T10:42');
cy.get('#priceRange').clear().type('30000');
  
});

When('I press "Spara ändringar"', () => {
  cy.get('[type="submit"]').click();
}
);
Then('auction with the changed details should be listed in {string} page', (SellersPage) => {
  cy.visit(SellersPage, { headers: { "Accept-Encoding": "gzip, deflate" } });
  cy.url().should('include', SellersPage);

});

When('I press {string} on the {string} page', (buttonText) => {
  cy.get(':nth-child(6) > :nth-child(5)').should('contain', buttonText).click();
}
);




Then('the auction should be deleted from the {string} page', (SellersPage) => {
  cy.visit(SellersPage);
  cy.url(SellersPage).should('include', SellersPage);
}
);











  









