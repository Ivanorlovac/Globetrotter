Feature: Register


  Scenario: Register a buyer
    Given I am on the "/register" page
    When I write my "<username>" under username
    And I write my "<password>" under password
    And I write my "<name>" under name
    And I choose the role "<role>"
    And I click on "register-button"
    Then I will get registered

    Examples:
      | username | password | name | role |
      | TestBuyer | 321abc   | test | Köpare|