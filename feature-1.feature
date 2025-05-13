# language: en
Feature: Creating Users

Background: Authentication and Setup
  Given the Admin has authenticated
  Given the Admin is on the Manage Users page

Scenario Outline: Admin is able to create a user with unique email
  Given the Admin clicks the Add User button
    And the Admin types <firstname> into the first name field
    And the Admin types <lastname> into the last name field
    And the Admin types <email> into the email field
    And the Admin types <phonenumber> into the mobile number field
    And the Save button is clicked
  When the Admin clicks the Save button
  Then the Manage User page is displayes the user <firstname> <lastname> <email>
    And the user <firstname> <lastname> shows with the correct <phonenumber>
    And the user <firstname> <lastname> shows as "Invited"

Examples:
  | firstname | lastname | email | phonenumber |
  | English | Smithers | seth.tarrants+ssenglish@gmail.com | 9194573589 |
  | French | Feline | seth.tarrants+ssfrench@gmail.com | 33 825 30 05 00 |
  | Arabic | Arachnid | seth.tarrants+ssarabic@gmail.com | 44 20 3026 4621 |

Scenario: Admin is able to edit an existing user
  Given the Admin clicks on the user "Existing" "User"
  When the Admin edits the users name to "Changed" "Fortest"
    And the Admin clicks the Save button
  Then the Manage user page displays the user "Changed" "Fortest"
    And the Manage user page does not display the user "Persist" "Autouser"

Scenario: Admin is able to disable an active nonAdmin user
  Given the Admin adds a new user with "Zem" "Zorg" "seth.tarrants+zemzorg@gmail.com"
  When the Admin clicks the Suspend button within user profile
    And the Admin clicks the Save button
  Then the Manage user page displays the user status as Suspended
    And the Modify User page displays the button to "Delete"

Scenario: Admin is able to add user with minimum requirements
  Given the Admin clicks the Add User button
    And the Admin types "Minimum" into the first name field
    And the Admin types "Req" into the last name field
    And the Admin types "seth.tarrants+ssminreq@gmail.com" into the email field
  When the Admin clicks the Save button
  Then the Manage User page is displayes the user "Minimum" "Req"
    And the user "Minimum" "Req" shows as "Pending"

Scenario: Admin is blocked from adding user without minimum requirements met
  Given the Admin clicks the Add User button
    And the Admin types "John" into the first name field
    And the Admin types "Nancy" into the last name field
  When the Admin clicks the Save button
  Then the Add User screen displays the red error message "This field is required"
    And the Add User screen remains visible


