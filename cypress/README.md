# Cypress Testing for HolistiPlan

This directory contains end-to-end tests for the HolistiPlan rewards application using Cypress.

## Prerequisites

1. **Node.js and npm**: Ensure you have Node.js installed
2. **Application Running**: The application should be running at `http://localhost:3000`
3. **Docker Setup**: Start the application using Docker:
   ```bash
   docker-compose -f local.yml up --build -d
   ```

## Test Structure

### Test Files

- **`generalTests.cy.js`** - Basic home page and loading tests
- **`authentication.cy.js`** - Login, logout, and authentication flow tests
- **`rewards.cy.js`** - Rewards system functionality tests
- **`ui-accessibility.cy.js`** - UI/UX and accessibility tests
- **`api-integration.cy.js`** - API integration and data flow tests

### Test Data

- **`fixtures/example.json`** - Contains test user credentials and API endpoints
- **`fixtures/large-dataset.json`** - Mock data for performance testing

### Support Files

- **`support/commands.js`** - Custom Cypress commands for reusable test actions
- **`support/e2e.js`** - Global test configuration and setup

## Running Tests

### Interactive Mode (Recommended for Development)

Open the Cypress Test Runner:
```bash
npm run cypress:open
```

This allows you to:
- Select and run individual tests
- Watch tests run in real-time
- Debug test failures
- Use the Cypress selector playground

### Headless Mode (CI/CD)

Run all tests in headless mode:
```bash
npm run test:e2e
```

### Specific Test Categories

Run specific test suites:
```bash
# Authentication tests only
npm run test:auth

# Rewards functionality tests
npm run test:rewards

# Smoke tests (quick essential tests)
npm run test:smoke
```

### Browser-Specific Testing

Test in different browsers:
```bash
# Chrome (default)
npm run cypress:run:chrome

# Firefox
npm run cypress:run:firefox

# Edge
npm run cypress:run:edge
```

### Advanced Options

```bash
# Run with browser window visible
npm run test:e2e:headed

# Run all tests
npm run test:full

# Run with proxy-friendly extended timeouts
npm run test:e2e:proxy
npm run cypress:run:proxy

# Run smoke tests with proxy-friendly settings
npm run test:smoke:proxy

# Run specific test file
npx cypress run --spec "cypress/e2e/authentication.cy.js"

# Run with custom configuration
npx cypress run --config baseUrl=http://localhost:8000

# Run with extended timeouts for slow networks/proxies
npx cypress run --config defaultCommandTimeout=20000,requestTimeout=30000,responseTimeout=45000
```

## Test Configuration

### Base Configuration (`cypress.config.js`)

- **Base URL**: `http://localhost:3000`
- **Viewport**: 1280x720
- **Video Recording**: Enabled
- **Screenshots**: Enabled on failure
- **Extended Timeouts for Proxy Environments**:
  - Default Command Timeout: 15 seconds (increased from 4 seconds)
  - Request Timeout: 20 seconds (increased from 5 seconds)  
  - Response Timeout: 30 seconds
  - Page Load Timeout: 60 seconds
  - Task Timeout: 120 seconds
- **Retries**: 2 attempts in headless mode
- **Chrome Web Security**: Disabled for proxy compatibility

### Default Test User

The tests use a default user account:
- **Email**: `someone@holistiplan.com`
- Please enter the password in example.json

## Test Coverage

### 🔐 Authentication Testing
- Login with valid/invalid credentials
- Logout functionality
- Registration flow
- Password security
- Session management

### 🏆 Rewards System Testing
- Rewards display and interaction
- Point/badge systems
- Reward claiming/redeeming
- Data integrity checks

### 🎨 UI/UX Testing
- Responsive design across devices
- Visual consistency
- Interactive elements
- Error handling
- Loading states

### ♿ Accessibility Testing
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Form labeling
- Heading hierarchy

### 🔌 API Integration Testing
- API response validation
- Error handling
- Data consistency
- Performance monitoring
- Network resilience

## Custom Commands

The test suite includes custom Cypress commands for common actions:

```javascript
// Login with default user
cy.loginAsDefaultUser()

// Login with specific credentials
cy.login('email@example.com', 'password')

// Check accessibility
cy.checkA11y()

// Test responsive design
cy.testResponsive()

// Wait for complete page load
cy.waitForPageLoad()

// Check for console errors
cy.checkConsoleErrors()

// Simulate slow network
cy.simulateSlowNetwork(2000)
```

## Debugging Tests

### Visual Debugging
1. Use `npm run cypress:open` for interactive mode
2. Use `.pause()` command to pause test execution
3. Use `.debug()` command to drop into debugger

### Screenshots and Videos
- Screenshots are automatically taken on test failures
- Videos are recorded for all test runs
- Files are saved in `cypress/screenshots/` and `cypress/videos/`

### Console Logging
```javascript
cy.log('Custom message for debugging')
cy.task('log', 'Server-side logging')
```

## Best Practices

### Test Organization
- Group related tests using `describe()` blocks
- Use descriptive test names with `it()`
- Keep tests independent and isolated
- Use `beforeEach()` for common setup

### Selectors
- Prefer `data-cy` attributes for test-specific selectors
- Avoid brittle CSS selectors that may change
- Use semantic selectors when possible

### Assertions
- Use specific assertions over generic ones
- Test user-visible behavior, not implementation details
- Include both positive and negative test cases

### Performance
- Keep tests focused and fast
- Use fixtures for test data
- Minimize network requests in tests

## Continuous Integration

### GitHub Actions Example
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Start application
        run: docker-compose -f local.yml up -d
      - name: Run Cypress tests
        run: npm run test:e2e
```

## Troubleshooting

### Common Issues

1. **Application not running**: Ensure `http://localhost:3000` is accessible
2. **Test timeouts**: Increase timeout values in `cypress.config.js` or use proxy-friendly scripts
3. **Element not found**: Check if selectors match current DOM structure
4. **Flaky tests**: Add proper waits and assertions

### Proxy Environment Issues
- Use proxy-friendly test scripts: `npm run test:e2e:proxy`
- Extended timeouts are pre-configured for proxy setups
- Web security is disabled to handle proxy certificate issues
- Network request delays are automatically handled

### Environment Issues
- Ensure Docker containers are running
- Check that all dependencies are installed
- Verify Node.js version compatibility
- For slow networks, use the `:proxy` variants of test scripts

### Getting Help
- Check Cypress documentation: https://docs.cypress.io
- Use browser developer tools to inspect elements
- Review test videos and screenshots for failures

## Contributing

When adding new tests:
1. Follow existing naming conventions
2. Add appropriate comments and documentation
3. Test both happy path and error scenarios
4. Update this README if adding new test categories
5. Ensure tests are reliable and not flaky

## Reports and Results

Test results are displayed in the terminal and can be exported in various formats:
- JUnit XML for CI/CD integration
- Mochawesome for HTML reports
- JSON for custom processing

Configure reporting in `cypress.config.js` as needed for your workflow.
