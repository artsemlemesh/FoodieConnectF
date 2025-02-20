describe('Login to admin panel', () => {
  it('should navigate to /admin/ and click Create Restaurant', () => {
    cy.visit('http://127.0.0.1:8000/admin/');

    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin', { log: false }); // Hides password from logs
    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/admin/');
    cy.contains('Django administration').should('be.visible');
  });
});
