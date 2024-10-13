describe("Sections Management", () => {
  beforeEach(() => {
    // Log in as an author before each test
    cy.visit("/login");
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get("button").contains("Log in").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/dashboard`);
  });

  it("should add a new section", () => {
    cy.get("button").contains("Add New Section").click();
    cy.get("input").type("New Section");
    cy.get("button").contains("Submit").click();
    cy.contains(".section-title", "New Section", { timeout: 10000 });
  });

  it("should edit an existing section", () => {
    cy.contains(".section-title", "New Section", { timeout: 10000 })
      .parent()
      .find("button")
      .contains("Edit")
      .click();
    cy.get("input").clear().type("Updated Section");
    cy.get("button").contains("Submit").click();
    cy.contains(".section-title", "Updated Section", { timeout: 10000 });
  });

  it("should delete an existing section", () => {
    cy.contains(".section-title", "Updated Section", { timeout: 10000 })
      .parent()
      .find("button")
      .contains("Delete")
      .click();

    // Verify the section is no longer present
    cy.contains(".section-title", "Updated Section", { timeout: 10000 }).should(
      "not.exist"
    );
  });
});
