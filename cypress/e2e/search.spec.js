describe('Homepage Search Test', () => {
    it('should search for a word from a random block and display only the corresponding block', () => {
      cy.visit('/'); // Visit the homepage
  
      // 1️⃣ Select a random div containing an h3 tag
      cy.get('div')
        // .filter(':has(h3)') // Filter divs that contain h3 tags
        .then(($divs) => {
          const randomIndex = Math.floor(Math.random() * $divs.length); // Pick a random index
          const selectedDiv = $divs[randomIndex];
  
          // 2️⃣ Retrieve the word inside the h3 tag
          const searchWord = selectedDiv.querySelector('h3').innerText;
          cy.log(`Searching for: ${searchWord}`); // Log the word being searched
  
          // 3️⃣ Click on the search field and type the word
          cy.get('input[placeholder="Search..."]').type(searchWord); // Assuming the search input is a field with name="search"
  
          // 4️⃣ Wait for the search results to be visible
          cy.get('div')
            // .filter(':has(h3)')
            .should('be.visible') // Ensure the results are visible before proceeding
            .and(($filteredDivs) => {
              const filteredText = $filteredDivs[0].querySelector('h3').innerText;
              expect(filteredText).to.equal(searchWord); // Check that the text of the block matches the searched word
            });
        });
    });
  });