Feature: Bidding

  Background: Login
    Given I am logged in

  Scenario: Place bid
    And I am on the "auction/2/blue-star-jaz-aquamarine-hurghada-kusten-egypten" page
    When I place a bid
    And I click on "place-bid-button"
    Then the bid placed alert will pop up
    And I can see my new bid

  Scenario: Place wrong bid
    And I am on the "auction/2/blue-star-jaz-aquamarine-hurghada-kusten-egypten" page
    And I have already a bid on the auction
    When I place a lower bid than my current
    And I click on "place-bid-button"
    Then the false bid alert will show up.