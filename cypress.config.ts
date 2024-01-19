import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      baseUrl: "https://5ftapart.vercel.app", // Replace with your API's base URL
    },
    specPattern: "cypress/**/*.cy.ts",
  },
});
