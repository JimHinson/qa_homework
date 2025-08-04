describe('Authentication System', () => {
  let testData

  before(() => {
    cy.fixture('example').then((data) => {
      testData = data
    })
  })

  beforeEach(() => {
    cy.visit('/', { timeout: 60000 }) // Extended timeout for proxy environments
    cy.waitForPageLoad()
    cy.get('#log-in-link').click()  // Using ID selector

  })

  describe('Login Functionality', () => {
    it('should display login form', () => {
    //   cy.get('#log-in-link').click()  // Using ID selector
      // Look for login-related elements
     
      // Check if login form is visible or accessible
      cy.get('input[type="email"], input[name*="email"], input[placeholder*="email"]').should('exist')
      cy.get('input[type="password"], input[name*="password"], input[placeholder*="password"]').should('exist')
    })

    it('should login with valid credentials', () => {
        // cy.get('#log-in-link').click()  // Using ID selector

      // Attempt to find and fill login form with extended timeouts
      cy.get('input[type="email"], input[name*="email"], input[placeholder*="email"]', { timeout: 15000 })
        .first()
        .type(testData.users.defaultUser.email)
      
      cy.get('input[type="password"], input[name*="password"], input[placeholder*="password"]', { timeout: 15000 })
        .first()
        .type(testData.users.defaultUser.password)
      
      // Look for login button and click it
      cy.get('button[type="submit"], button').contains(/login|sign in/i, { timeout: 15000 }).click()
      
      // Verify successful login (adjust based on actual behavior) with extended timeout
      cy.url({ timeout: 30000 }).should('not.contain', 'login')
      //workaround for bug #7 
      cy.visit('/', { timeout: 60000 }) // Extended timeout for proxy environments
      cy.contains(/welcome|dashboard|logout|profile/i, { timeout: 20000 }).should('exist')
    })

    it('should show error for invalid credentials', () => {
      // Try to login with invalid credentials
      cy.get('input[type="email"], input[name*="email"], input[placeholder*="email"]')
        .first()
        .type('invalid@example.com')
      
      cy.get('input[type="password"], input[name*="password"], input[placeholder*="password"]')
        .first()
        .type('wrongpassword')

    //TODO: improve locator
      cy.get('button[type="submit"], button').contains(/login|sign in/i).click()
      
      // Look for error message
      cy.contains(/error|invalid|not correct|failed/i, { timeout: 60000 }).should('exist')
    })

    it('should validate required fields', () => {
      //TODO: improve locator
      // Try to submit empty form
      cy.get('button[type="submit"], button').contains(/login|sign in/i).click()
      
      // Check for validation messages
      cy.get('input:invalid, .error, .invalid, [aria-invalid="true"]').should('exist')
      //TODO: Add specific checks for password
    })
  })

  describe('Logout Functionality', () => {
    beforeEach(() => {
      // Login before each logout test
      cy.visit('/')
      cy.get('#log-in-link').click()  // Using ID selector
      cy.get('input[type="email"], input[name*="email"], input[placeholder*="email"]')
        .first()
        .type(testData.users.defaultUser.email)
      
      cy.get('input[type="password"], input[name*="password"], input[placeholder*="password"]')
        .first()
        .type(testData.users.defaultUser.password)
      
      cy.get('button[type="submit"], button').contains(/login|sign in/i).click()
      cy.wait(2000) // Wait for login to complete
    //workaround for bug #7 
      cy.visit('/', { timeout: 60000 }) // Extended timeout for proxy environments
    })

    it('should logout successfully', () => {
      // Look for logout button and click it
      cy.contains(/logout|sign out/i).click()
      // Handle signout confirmation
      cy.contains(/logout|sign out/i, { timeout: 5000 }).click()
      
      // Verify successful logout
      cy.contains(/login|sign in/i, { timeout: 5000 }).should('exist')
      cy.url().should('not.contain', 'dashboard')
    })
  })

  describe.skip('Registration/Sign Up', () => {
    it('should display sign up form', () => {
      // Look for sign up link/button
      cy.contains(/sign up|register|create account/i).should('exist')
    })

    it('should navigate to sign up page', () => {
      // Click sign up link
      cy.contains(/sign up|register|create account/i).click()
      
      // Verify we're on sign up page
      cy.url().should('match', /signup|register|create/i)
      cy.contains(/sign up|register|create/i).should('exist')
    })
  })

  describe.skip('Password Security', () => {
    it('should mask password input', () => {
      cy.get('input[type="password"]').should('have.attr', 'type', 'password')
    })

    it('should not reveal password in page source', () => {
      cy.get('input[type="password"]')
        .type('testpassword')
        .should('not.have.value', 'testpassword') // Value should be masked
    })
  })
})
