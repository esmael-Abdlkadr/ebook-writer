/// <reference types="cypress" />

describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("/sign-up");
  });

  it("should display the signup form", () => {
    cy.get("h2").contains("Sign up");
  });

  it("should show validation errors for empty fields", () => {
    cy.get("button").contains("Sign up").click();
    cy.get("p").contains("Full Name is required");
    cy.get("p").contains("Email is required");
    cy.get("p").contains("Password is required");
  });

  it("should signup a new user", () => {
    cy.get('input[name="FullName"]').type("Test User");
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get("button").contains("Sign up").click();

    // Check if redirected to home page
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
