// cypress.config.ts
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}", // Update the specPattern to match your file naming convention
  },
});
