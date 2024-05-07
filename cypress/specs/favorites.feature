Feature: Favorites

    Background: Login
        Given I am logged in

    Scenario: Favorite-star turn yellow
        And I am on the "auction/2/blue-star-jaz-aquamarine-hurghada-kusten-egypten" page
        When I click on an empty star
        Then the star should turn yellow

    Scenario: favorites added to my pages
        And I am on the "/auction/27/varnding-tour-du-mont-blanc" page
        When I click on an empty star
        And I go to my pages
        Then the auction should appear in my favorites on my pages


    Scenario: favorites on my pages
        And I am on the "/mina-sidor" page
        When I click on my favorites
        Then a list of my favorites should appear


    Scenario: remove favorites
        And I am on the "/mina-sidor" page
        And I click on my favorites
        When I click on the star
        Then the favorite will be removed
