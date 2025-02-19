describe('Registration Modal', () => {
  beforeEach(() => {
    cy.visit('/'); // Visit the homepage before each test
  });

  it('should register a user and close the modal', () => {
    const username = 'user' + Math.random().toString(36).substring(2, 10);
    const email = `${username}@example.com`;
    const password = 'password' + Math.random().toString(36).substring(2, 10);

    cy.log('Opening login modal');
    cy.get('button').contains('Log in').click();

    cy.log('Checking if modal is visible');
    cy.get('.fixed.inset-0').should('be.visible');

    cy.log('Switching to register form');
    cy.get('button').contains('Switch to Register').click();

    cy.log(`Typing username: ${username}`);
    cy.contains('label', 'Username').parent().find('input').type(username);

    cy.log(`Typing email: ${email}`);
    cy.contains('label', 'Email').parent().find('input').type(email);

    cy.log(`Typing password`);
    cy.contains('label', 'Password').parent().find('input').type(password);

    cy.log(`Confirming password`);
    cy.contains('label', 'Confirm the Password').parent().find('input').type(password);

    

    cy.log('Clicking register button');
    cy.contains('button', 'Register').click();

    

    cy.log('Checking for welcome message');
    cy.contains(`Welcome, ${username}`).should('be.visible');

    cy.log('Ensuring modal is closed');
    cy.get('.fixed.inset-0').should('not.exist');
  });
});