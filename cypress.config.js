const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    // Increased timeouts for proxy setups and slower networks
    defaultCommandTimeout: 15000,        // Default: 4000ms
    requestTimeout: 20000,               // Default: 5000ms
    responseTimeout: 30000,              // Default: 30000ms
    pageLoadTimeout: 60000,              // Default: 60000ms
    taskTimeout: 120000,                 // Default: 60000ms
    execTimeout: 120000,                 // Default: 60000ms
  },
  component: {
    devServer: {
      framework: 'webpack',
      bundler: 'webpack',
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.js',
    // Increased timeouts for component tests too
    defaultCommandTimeout: 15000,
    requestTimeout: 20000,
    responseTimeout: 30000,
  },
  video: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1280,
  viewportHeight: 720,
  // Global timeout settings that affect all tests
  watchForFileChanges: false,            // Disable file watching for better performance with proxies
  numTestsKeptInMemory: 5,               // Reduce memory usage
  retries: {
    runMode: 2,                          // Retry failed tests 2 times in headless mode
    openMode: 0                          // No retries in interactive mode
  },
  // Additional proxy-friendly settings
  chromeWebSecurity: false,              // Disable web security for proxy environments
  modifyObstructiveCode: false,          // Don't modify application code
  blockHosts: [],                        // Don't block any hosts by default
})
