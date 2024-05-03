
Feature: login

Scenario: Access login page
  Given I am on the "/" page
  When I click on "navbar-button"
  And I click on "navlink-login"
  Then I get directed to the login page

Scenario: Login failed
    Given I am on the "/login" page
    When I write my "<username>" under username
    And I write my "<password>" under password
    And I click on "login-button"
    Then I will not get logged in

    Examples:
      | username | password |
      | test0000 | 321abc   |

Scenario: Login
  Given I am on the "/login" page
  When I write my "<username>" under username
    And I write my "<password>" under password
    And I click on "login-button"
  Then I will get logged in

  Examples:
      | username | password |
      | test1337 | abc123   |

