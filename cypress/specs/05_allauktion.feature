Feature: All auctions

  Scenario: access "alla auktioner" page
    Given I am on the "/" page
    When i click the navbar
    And I click "Se alla auktioner"
    Then I get directed to the  "Alla auktioner" page
    And a list of all auctions is displayed




  