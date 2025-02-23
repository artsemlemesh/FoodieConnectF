describe('Homepage Search Test', () => {
    it('should search for a word from a random block and display only the corresponding block', () => {
      cy.visit('/'); // Visit the homepage
  
      // 1️⃣ Select a random div containing an h3 tag
      cy.get('div') // Get all divs
        .find('h3') // Find h3 elements inside the divs
        .should('have.length.greaterThan', 0) // Ensure there are h3 elements
        .then(($h3s) => {
          const randomIndex = Math.floor(Math.random() * $h3s.length); // Pick a random index
          const selectedH3 = $h3s[randomIndex];
  
          // 2️⃣ Retrieve the word inside the h3 tag
          const searchWord = selectedH3.innerText;
          cy.log(`Searching for: ${searchWord}`); // Log the word being searched
  
          // 3️⃣ Click on the search field and type the word
          cy.get('input[placeholder="Search..."]').type(searchWord); // Assuming the search input is a field with name="search"
  
          // 4️⃣ Wait for the search results to be visible
          cy.get('div')
            .find('h3')
            .should('be.visible') // Ensure the results are visible before proceeding
            .and(($filteredH3s) => {
              const filteredText = $filteredH3s[0].innerText;
              expect(filteredText).to.equal(searchWord); // Check that the text of the block matches the searched word
            });
        });
    });
  });