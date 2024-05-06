    Scenario: favorite-star turn yellow
        Given I am logged in
        And I am on the "auction" page
        When I click on an empty star
        Then the star should turn yellow

    Scenario: favorites added to my pages
        Given I am logged in
        And I am on the "auction" page
        When I click on an empty star
        And I go to my pages
        Then the auction should appear in my favorites on my pages

    Scenario: favorites on my pages
        Given I am logged in
        And I am on my pages
        When I click on my favorites
        Then a list of my favorites should appear

    Scenario: remove favorites
        Given I am logged in
        And I am on my pages
        And I have clicked on my favorites
        When I click on the star
        Then the favorite will be removed
