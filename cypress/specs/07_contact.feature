  Feature: contact
  
  Scenario: access the contact page
    Given I am on the home page
    When I click on Kontakt
    Then I will be directed to the contact page
   


  Scenario: successful contact submission
    Given I am on the contact page
    When I fill in all required fields correctly
    And I submit the form
    Then a thank you message "Tack för ditt meddelande!" should be displayed


  Scenario: Resetting the form automatically after successful submission
    Given the user is on the contact page
    And the user has entered data into all fields
    When the user clicks the submit button
    Then a thank you message "Tack för ditt meddelande!" should be displayed 
    And all form fields should be cleared


  Scenario: failed contact submission with incomplete fields
    Given I am on the contact page
    When I leave a required field empty
    And I attempt to submit the form
    Then the form should not be submitted
    And an error message "Fyll i alla fält!" should be displayed



