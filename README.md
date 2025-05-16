# Snippet Sentry QA Exercise

Author: Seth Tarrants - <seth.tarrants@gmail.com>

## Snippet Sentry - Manage Users Test Plan

### Intro

"We'd like to see how you would test some functionality found under the "Manage Users" section of our website. Specifically, please create
a test plan for how you would handle the "CRUD" operations for our "users"."

### Overview

- `./test-automated` contains the playwright cucumber test framework which automates the test cases from the test-plan.
  - Follow the README [Getting Started](./README.md#getting-started) section for details on setting up execution

### Scope of Testing

#### Within Scope

- Manage Users (<https://beta.snippetsentry.com/app/client/users>)
  - Add User
  - Modify User
  - Users List

#### Out of Scope

- Dashboard
- Manage Users (<https://beta.snippetsentry.com/app/client/users>)
  - Bulk Upload
  - Bulk Invite
  - Export
- Advanced Features
- Admin Resources
- Channel Dashboard
- User Profile

#### Exploratory Testing Objectives

- Charter: Explore Add/Modify User communication method
- Charter: Explore User Status changes
- Charter: Explore matching User details
- Charter: Explore deletion of user profile after email delivery
- Charter: Explore authentication from Invited to Deleted flow

#### Other Testing Areas to Pursue

- Identify Integrations and API testing improvements
- Identify database access and utilization for automated tests CRUD processes
- Identify Performance Testing approaches

### Testing Suspension and Resume Criteria

#### Testing Suspension

- Critical Bugs Found
- Security Concerns Identified

#### Resume Criteria

- Critical Bugs Reviewed, Merged and Included in Test build
- Confirmation on agreement for adjusted Schedule from Stakeholders, Product Owner, Lead Developer and Lead QA
  - Schedule updated and updated Test Plan communicated to all relevant parties

### Deliverables

- Link to Test Plan and Documentation
- Status of concluded Test Plan to include:
  - Report of Tests Passed/Failed
    - Reasoning behind Failed Tests
  - Bugs found
    - Reasoning behind bugs severity and agreed resolution timeline

### Schedule

- 3-4 days
- Completion on Thursday May 13, 2025 by 5pm PT

## Snippet Sentry - Manage Users Test Automation

### Tools

| Tool | Version |
| ------------- | ------------- |
| Nodejs | 22 |
| Playwright | latest |
| Cucumber | latest |

### Language

- Typescript
- Gherkin

### Getting Started

Tool Setup:

- Ensure you are using Node v 22
- Run `npm i` to install project dependencies
- Run `npx playwright install` to install playwright browsers and support utilities

Running Tests:

- Now that you are setup to run the tests. Run the cmd 'npm run test' to execute the existing tests against chrome.
