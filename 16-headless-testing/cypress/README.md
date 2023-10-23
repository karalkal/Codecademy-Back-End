`npm install cypress`

Next, initialize Cypress to create a new configuration file and example tests:  
`npx cypress open`
Click on your new spec and watch Cypress launch it.

Or without GUI:
`npx cypress run --headless --browser chrome`

Run specific test:
`npx cypress run --spec "cypress/e2e/00-my-test.cy.js"`
