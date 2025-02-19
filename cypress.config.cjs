const { defineConfig } = require('cypress');

module.exports = defineConfig({

  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    
    specPattern: 'cypress/e2e/**/*.{js,jsx}',
    baseUrl: 'http://localhost:3001', // Replace with your app's base URL
    video: true, // Records test runs
    screenshotOnRunFailure: true, // Saves a screenshot if a test fails
  },
});