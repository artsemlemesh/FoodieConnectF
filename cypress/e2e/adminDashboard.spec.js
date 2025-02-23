describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should log in a user and close the modal', () => {
    cy.login('admin', 'admin'); // ✅ Reusing the command

    cy.contains('Dashboard').click();
    cy.contains('Statistics').click();
    cy.contains('Restaurant Dashboard').should('be.visible');
    cy.contains('Users').click();
    cy.contains('Manage Users').should('be.visible');
    cy.contains('Orders').click();
    cy.contains('Manage Orders').should('be.visible');

    cy.get('nav ul li a').contains('Restaurants').click();
    cy.contains('Manage Restaurants').should('be.visible');

    cy.contains('Products').click();
    cy.contains('Manage Products').should('be.visible');

    cy.get('button')
      .contains('Approve')
      .then(($button) => {
        if ($button.length > 0 && $button.is(':visible')) {
          // If the button exists and is visible, click it
          $button.click();
        } else {
          // If the button is not found or not visible, skip
          cy.log('Approve button not found or not visible, skipping...');
        }
      });
  });
});
