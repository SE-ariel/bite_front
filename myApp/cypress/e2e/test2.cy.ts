describe('Save User Recipe Test', () => {
    before(() => {
      // Log in the user
      cy.visit('/login'); // Navigate to the login page
      cy.get('[label="Email"]').type('avishag.minnes@msmail.ariel.ac.il'); // Enter email
      cy.get('[label="Password"]').type('bite25'); // Enter password
      cy.contains('ion-button', 'Login').click(); // Click the login button
      cy.url().should('eq', 'http://localhost:8100/home'); // Ensure login was successful
    });
  
    it('should navigate to a user profile, save the "Test1" recipe, and verify it in saved recipes', () => {
      // Navigate directly to the user profile
      cy.visit('/profile/RAGSrG9i4chHIxr9Q7Dutq18TVo1');
  
      // Click the "Created Recipes" button
      cy.contains('ion-button', 'Created Recipes').click(); // Ensure the button text matches exactly
  
      // Select the recipe named "test1"
      cy.contains('test1') 
        .click(); // Click on the recipe to navigate to its details page
  
      // Save the recipe
      cy.contains('ion-button', 'Save Recipe').click(); // Click the save button
  
      // Navigate to the private zone to check saved recipes
      cy.visit('/private'); // Navigate to the private zone
      cy.contains('ion-button', 'Saved Recipes').click(); // Click the saved recipes button
  
      // Verify the saved recipe is present
      cy.contains('test1') 
        .should('be.visible');
    });
  });
  
  
  
  
  
