Cypress.Commands.add('login', (username, password) => {
  // Open the modal by clicking the "Log in" button
  cy.get('button').contains('Log in').click();

  // Ensure the modal is visible
  cy.get('.fixed.inset-0').should('be.visible');

  // Fill in username and password
  cy.contains('label', 'Username')
    .parent()
    .find('input')
    .type(username);

  cy.contains('label', 'Password')
    .parent()
    .find('input')
    .type(password);

  // Submit the login form
  cy.contains('button', 'Login').click();


  // Ensure the modal is closed after login
  cy.get('.fixed.inset-0').should('not.exist');
});