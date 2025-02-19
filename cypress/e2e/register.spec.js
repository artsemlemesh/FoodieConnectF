describe('Registration Modal', () => {
  beforeEach(() => {
    cy.visit('/'); // Visit the homepage before each test
  });

  it('should register a user and close the modal', () => {
    // Generate random username, email, and password
    const username = 'user' + Math.random().toString(36).substring(2, 10);
    const email = `${username}@example.com`;
    const password = 'password' + Math.random().toString(36).substring(2, 10);

    // Step 1: Open the modal by clicking the "Log in" button
    cy.get('button').contains('Log in').click();

    // Step 2: Ensure the modal is visible
    cy.get('.fixed.inset-0').should('be.visible');

    // Step 3: Switch to the register form
    cy.get('button').contains('Switch to Register').click();

    // Step 4: Type the randomly generated username, email, and password
    cy.contains('label', 'Username').parent().find('input').type(username);
    cy.contains('label', 'Email').parent().find('input').type(email);
    cy.contains('label', 'Password').parent().find('input').type(password);
    cy.contains('label', 'Confirm the Password').parent().find('input').type(password);

    // Step 5: Intercept API request and wait for response
    cy.intercept('POST', '/api/register').as('registerRequest'); // Adjust URL if needed

    // Step 6: Submit the registration form
    cy.contains('button', 'Register').click();

    // Step 7: Wait for the API response before continuing
    cy.wait('@registerRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 201);

    // Step 8: Ensure the success message appears
    cy.contains('Welcome, ' + username).should('be.visible');

    // Step 9: Ensure the modal is no longer visible
    cy.get('.fixed.inset-0').should('not.exist');
  });
});