import 'cypress-file-upload';

describe('Recipe Creation Test', () => {
  before(() => {
    // Log in the user by interacting with the login form
    cy.visit('/login'); // Navigate to the login page
    cy.get('[label="Email"]').type('avishag.minnes@msmail.ariel.ac.il'); // Enter email
    cy.get('[label="Password"]').type('bite25'); // Enter password

    // Click the "Login" button
    cy.contains('ion-button', 'Login').click(); // Select by button text

    // Verify successful login by checking if redirected to the home page
    cy.url().should('eq', 'http://localhost:8100/home'); 
  });

  beforeEach(() => {
    // Visit the create recipe page before each test
    cy.visit('/create'); // Navigate to the "create post" page
  });

  it('should create a new recipe successfully', () => {

    // Enter title
    cy.get('[data-testid="title_field"]').type('Test Recipe!').trigger('change');

    // Enter ingredients
    cy.get('[data-testid="ingredients_field"]')
    .invoke('val', 'Ingredient 1\nIngredient 2\nIngredient 3')
    .trigger('change');

    // Enter instructions
    cy.get('[data-testid="instructions_field"]')
    .invoke('val', 'Step 1\nStep 2\nStep 3')
    .trigger('change');

    // Submit the form
    cy.contains('ion-button', 'Upload Recipe').click(); // Select by button text

    // Verify the recipe exists in the recipe list
    cy.visit('/private'); // Go to the recipe list page
    cy.contains('ion-button', 'Created Recipes').click(); // Select by button text
    cy.contains('Test Recipe!').should('be.visible');
  });
});