describe('Create Product test', () => {
    beforeEach(() => {
      cy.visit('/');




      cy.login('admin', 'admin'); // ✅ Logs in before each test
    });
  
    it('should navigate to /admin/ and click Create Product', () => {
      cy.visit('/admin/'); // Go to the admin page
  
      // Click on "Create Restaurant" in the navigation menu
      cy.contains('Create Product').click();
  
      // Fill in the form fields
      cy.get('input[placeholder="Name"]').type('Test Product');
      cy.get('input[placeholder="Price"]').type('45');
      cy.get('textarea[placeholder="Description"]').type('A great place for testing New products');
      cy.get('input[placeholder="Category"]').type('test');


      cy.get('button').contains('Create').click();
    });
  });


