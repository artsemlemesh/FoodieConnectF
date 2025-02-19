describe('Registration Modal', () => {
  beforeEach(() => {
    cy.visit('/'); // Visit the homepage before each test
  });

  it('should log in a user and close the modal', () => {
    // Generate random username, email, and password
    const username = 'user' + Math.random().toString(36).substring(2, 10); // Random username
    const email = `${username}@example.com`; // Random email
    const password = 'password' + Math.random().toString(36).substring(2, 10); // Random password

    // Step 1: Open the modal by clicking the "Log in" button
    cy.get('button').contains('Log in').click();

    // Step 2: Ensure the modal is visible
    cy.get('.fixed.inset-0').should('be.visible');

    // Step 3: Switch to the register form
    cy.get('button').contains('Switch to Register').click();

    // Step 4: Type the randomly generated username, email, and password
    cy.contains('label', 'Username').parent().find('input').type(username); // Random username

    cy.contains('label', 'Email').parent().find('input').type(email); // Random email

    cy.contains('label', 'Password').parent().find('input').type(password); // Random password

    cy.contains('label', 'Confirm the Password')
      .parent()
      .find('input')
      .type(password); // Confirm password

    // Step 5: Submit the registration form
    cy.contains('button', 'Register').click(); // Adjust if needed for your form

    // Step 6: Optionally check for successful registration (e.g., verify a confirmation message)
    cy.contains('Welcome, ' + username).should('be.visible'); // Adjust this for your app's behavior after registration

    // Step 7: Ensure the modal is no longer visible
    cy.get('.fixed.inset-0').should('not.exist');
  });
});
