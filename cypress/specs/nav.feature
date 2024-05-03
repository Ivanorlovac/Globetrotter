Feature: Navbar

Scenario: Show navbar
  Given I am on the "/" page
  When I click on "navbar-button"
  Then I can see the navbar 