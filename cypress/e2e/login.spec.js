describe('Login Modal', () => {
  beforeEach(() => {
    cy.visit('/'); // Visit the homepage before each test
  });

  it('should log in a user and close the modal', () => {
    // Step 1: Open the modal by clicking the "Log in" button
    cy.get('button').contains('Log in').click();

    // Step 2: Ensure the modal is visible
    cy.get('.fixed.inset-0').should('be.visible');

    // Step 3: Type the username and password (admin credentials)
    // Find input fields based on their label text
    cy.contains('label', 'Username') // Find the label with the text "Username"
      .parent() // Get the parent element (which is the TextField container)
      .find('input') // Find the input element
      .type('admin'); // Type username

    cy.contains('label', 'Password') // Find the label with the text "Password"
      .parent() // Get the parent element (which is the TextField container)
      .find('input') // Find the input element
      .type('admin'); // Type password
    // Step 4: Submit the login form
    cy.contains('button', 'Login').click(); // Adjust if you want to click "Register" instead
    // Step 5: Optionally check for successful login (e.g., verify if the user dashboard is visible or some user-specific content)
    // cy.get('.dashboard').should('be.visible'); // Adjust this selector to match your app's post-login state

    // Step 6: Close the modal by clicking the close button (✕)
    cy.get('.fixed.inset-0 button').contains('✕').click();

    // Step 7: Ensure the modal is no longer visible
    cy.get('.fixed.inset-0').should('not.exist');
  });
});
