# language: en
Feature: Creating Users

Background: Authentication and Setup
  Given the Admin has authenticated
  Given the Admin is on the Manage Users page

Scenario Outline: Admin is able to create a user with unique email
  Given the Admin clicks the Add User button
    And the Admin types "<firstname>" into the first name field
    And the Admin types "<lastname>" into the last name field
    And the Admin types "<email>" into the email field
    And the Admin selects the "<country>" number code "<phonenumber>" from dropdown
    And the Admin types "<phonenumber>" into the mobile number field
  When the Admin clicks the Add User Save button
    And the Admin sees the "User added successfully" toast message
    But does not see the "email already in use" toast message
  Then the Manage Users page displays the user details "<firstname>" "<lastname>" "<email>"
    And the user "<firstname>" "<lastname>" shows with the correct "<countryCode>" "<phonenumber>"
    And the user "<firstname>" "<lastname>" shows status as "Pending"

Examples:
  | firstname | lastname | email | country | countryCode | phonenumber |
  | English | Smithers | seth.tarrants+ssenglish@gmail.com | United States | +1 | (714) 781-4636 |
  # | French | Feline | seth.tarrants+ssfrench@gmail.com | France | +33 | 825 30 05 00 |

# Scenario: Admin is able to invite a user
#   Given the Admin adds a new user with "Tobe" "Nottobe" "seth.tarrants+ssthequestion@gmail.com"
#     And the Manage Users page displays "Tobe" "Nottobe" status as "Pending" 
#   When the Admin opens the user profile for "Tobe" "Nottobe"
#     And the Admin selects the "Send Email Invite" profile option
#   Then a successful "Invitation sent" toast message displays
#     And the Manage Users page displays "Tobe" "Nottobe" status as "Invited"

# Scenario: New users require unique email address
#   Given the Admin adds a new user with "Thefirst" "Juan" "seth.tarrants+first@gmail.com"
#   When the Admin adds a new user with the same email address "seth.tarrants+first@gmail.com"
#   Then an "Email is already in use" error toast message displays
#     And the Add User component is still visible
#     And the Admin closes the Add User component

# Scenario: Admin is able to disable an active nonAdmin user
#   Given the Admin adds a new user with "Zem" "Zorg" "seth.tarrants+zemzorg@gmail.com"
#   When the Admin clicks the Suspend button within user profile
#     And the Admin clicks the Save button
#   Then the Manage Users page displays the user status as Suspended
#     And the Modify User page displays the button to "Delete"

# Scenario: Admin is able to add user with minimum requirements
#   Given the Admin clicks the Add User button
#     And the Admin types "Minimum" into the first name field
#     And the Admin types "Req" into the last name field
#     And the Admin types "seth.tarrants+ssminreq@gmail.com" into the email field
#   When the Admin clicks the Save button
#   Then the Manage Users page is displayes the user "Minimum" "Req"
#     And the user "Minimum" "Req" shows as "Pending"

# Scenario: Admin is blocked from adding user without minimum requirements met
#   Given the Admin clicks the Add User button
#     And the Admin types "John" into the first name field
#     And the Admin types "Nancy" into the last name field
#   When the Admin clicks the Save button
#   Then the Add User screen displays the red error message "This field is required"
#     And the Add User screen remains visible
