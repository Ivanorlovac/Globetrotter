Feature: Search


    Scenario Outline: 'Get search results'
        Given I am on the "/" page
        And I click on the search field
        When I write "<searchTerm>"
        And press the search button
        Then I will get to the "/alla-auktioner/?search=<searchTerm>" page
        And I will get "<searchTerm>" in the results

        Examples:
            | searchTerm |
            | mexico |
            | paris |
            | egypten |