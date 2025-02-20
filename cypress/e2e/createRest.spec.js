describe('Create Restaurant test', () => {
    beforeEach(() => {
      cy.visit('/');




      cy.login('admin', 'admin'); // ✅ Logs in before each test
    });
  
    it('should navigate to /admin/ and click Create Restaurant', () => {
      cy.visit('/admin/'); // Go to the admin page
  
      // Click on "Create Restaurant" in the navigation menu
      cy.contains('Create Restaurant').click();
  
      // Fill in the form fields
      cy.get('input[placeholder="Name"]').type('Test Restaurant');
      cy.get('input[placeholder="Description"]').type('A great place for testing');
      cy.get('input[placeholder="Address"]').type('123 Test Street');


      cy.get('button').contains('Create').click();
    });
  });


