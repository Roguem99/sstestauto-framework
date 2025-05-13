# Feature: Creating Users

## Background: Authentication and Setup
* Given the Admin has authenticated
* Given the Admin is on the Manage Users page

### Scenario Outline: Admin is able to create a user with unique email
* Given a Admin clicks the Add User button
  * And the admin types <firstname> into the first name field
  * And the admin types <lastname> into the last name field
  * And the admin types <email> into the email field
  * And the admin types <phonenumber> into the mobile number field
  * And the Save button is clicked
* When the admin clicks the Save button
* Then the Manage User page is displayes the user <firstname> <lastname> <email> <phonenumber>
  * And the user shows as Active 

#### Examples:

  | firstname | lastname | email | phonenumber |
  | ----- | --- | ---- | ---- |
  | English | Smithers | seth.tarrants+english@gmail.com | 9194573589 |
  | French | Feline | seth.tarrants+french@gmail.com | 33 825 30 05 00 |
  | Arabic | Arachnid | seth.tarrants+arabic@gmail.com | 44 20 3026 4621 |