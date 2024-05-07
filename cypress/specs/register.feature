Feature: Register

  Scenario: Access registration page
    Given I am on the "/" page
    When I click on "navbar-button"
    And I click on "navlink-register"
    Then I get directed to the register page

  @register
  Scenario: Register new buyer
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

  Scenario: Register new seller
    Given I am on the "/register" page
    When I write my "<username>" under username
    And I write my "<password>" under password
    And I write my "<name>" under name
    And I choose the role "<role>"
    And I write my "<companyName>" under company
    And I click on "register-button"
    Then I will get registered

    Examples:
      | username  | password | name | role   | companyName |
      | TestSeller | 321abc | testSell | Säljare | Testlicious AB |