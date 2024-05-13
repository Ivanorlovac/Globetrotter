Feature: Auctions

  Scenario: Creating a new auction as a seller
    Given I am logged in as a seller
    Given I am on the "Skapa Auktion" page
    When I fill in the auction form with the following details:
      | Title           | Description                     | Valuationprice | Pricerange | Images                                                                                   | Category  | Endtime         |
      | Sommarlands Kap | En upplevelse för hela familjen | 2000           | 1500       | https://thumbs.dreamstime.com/b/lantligt-sommarlandskap-med-soluppg%C3%A5ng-77915003.jpg | Adventure | 2024-12-24T20:00 |
    And I press "Skapa Auktion"
    # Then I should see a alert saying "Auktion skapad!"
    # And the auction with the specified details should be listed in my auctions

  Scenario: Editing an Auction as a Seller
    Given I am logged in as a seller
    When i press "Ändra" on the "/SellersPage" page
    And I update the auction form with the following details:
      | Title | Description | Värdering | Sluttid | Lägst godkända pris | 
      | VANDRING GENOM SPANSKA PYRENÉERNA | En upplevelse för hela familjen | 50000 | 2024-12-24T20:00 | 8000 |
    And I press "Spara ändringar"
    Then auction with the changed details should be listed in "/SellersPage" page

  

  Scenario: Deleting an Auction as a Seller
    Given I am logged in as a seller
    When I press "Radera auktion" on the "/SellersPage" page
    Then the auction should be deleted from the "/SellersPage" page

 