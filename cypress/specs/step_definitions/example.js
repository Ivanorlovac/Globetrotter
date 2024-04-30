import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on home page', () => {
  cy.visit("/");
});