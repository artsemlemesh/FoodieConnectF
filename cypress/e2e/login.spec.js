
describe('Login Modal', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should log in a user and close the modal', () => {
    cy.login('admin', 'admin'); // ✅ Reusing the command

    // Additional assertions if needed
    cy.contains('Welcome').should('be.visible');
  });
});