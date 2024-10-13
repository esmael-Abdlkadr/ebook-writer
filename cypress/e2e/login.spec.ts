describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display the login form", () => {
    cy.get("h2").contains("Log in");
  });

  it("should show validation errors for empty fields", () => {
    cy.get("button").contains("Log in").click();
    cy.get("p").contains("Email is required");
    cy.get("p").contains("Password is required");
  });

  it("should login an existing user", () => {
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get("button").contains("Log in").click();

    // Check if redirected to home page
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
