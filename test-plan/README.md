# Snippet Sentry - Manage Users Test Plan

## Focus
"We’d like to see how you would test some functionality found under the “Manage Users” section of our website. Specifically, please create 
a test plan for how you would handle the “CRUD” operations for our “users”. I would expect no less than 5-7 test cases in this plan, but 
don’t go past 15."


## Scope of Testing
### Within Scope:
- Manage Users (https://beta.snippetsentry.com/app/client/users)
  - Add User functionality
  - Users List

### Out of Scope:
- Dashboard
- Manage Users (https://beta.snippetsentry.com/app/client/users)
  - Bulk Upload
  - Bulk Invite
  - Export
- Advanced Features
- Admin Resources
- Channel Dashboard
- User Profile

## Exploratory Testing Objectives:
-  Can you figure out the different statuses a user can have, and what each one means?
- Think not just about the user you create in isolation, but also how other created users could impact it. And what about the user you’re 
logged in as?

## Example Gherkin Syntax highlighting for markdown
```
# Feature: Staying alive

This is about actually staying alive,
not the [Bee Gees song](https://www.youtube.com/watch?v=I_izvAbhExY).

## Rule: If you don't eat you die

![xkcd](https://imgs.xkcd.com/comics/lunch_2x.png)

`@important` `@essential`
### Scenario Outline: eating

* Given there are <start> cucumbers
* When I eat <eat> cucumbers
* Then I should have <left> cucumbers

#### Examples:

  | start | eat | left |
  | ----- | --- | ---- |
  |    12 |   5 |    7 |
  |    20 |   5 |   15 |
  ```
