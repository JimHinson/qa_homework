describe('HolistiPlan Home Page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/', { timeout: 60000 })
  })

  it('should load the home page successfully', () => {
    // Check that the page loads without errors
    cy.get('body').should('be.visible')
    
    // Verify the page has a proper title
    cy.title().should('not.be.empty')
    
    // Check for common page elements
    cy.get('html').should('have.attr', 'lang')
  })

  it('should display navigation elements', () => {
    // Look for navigation or header elements
    // These selectors may need adjustment based on actual DOM structure
    cy.get('nav, header, [role="navigation"]').should('exist')
  })
  

  it('should have responsive design', () => {
    // Test mobile viewport
    cy.viewport(375, 667) // iPhone 6/7/8 size
    cy.get('body').should('be.visible')
    
    // Test tablet viewport
    cy.viewport(768, 1024) // iPad size
    cy.get('body').should('be.visible')
    
    // Test desktop viewport
    cy.viewport(1280, 720) // Desktop size
    cy.get('body').should('be.visible')
  })

  it('should not have JavaScript errors', () => {
    // Listen for uncaught exceptions
    cy.window().then((win) => {
      win.addEventListener('error', (e) => {
        throw new Error(`JavaScript error: ${e.message}`)
      })
    })
    
    // Wait a moment for any async operations
    cy.wait(1000)
  })

  it('should load within reasonable time', () => {
    const startTime = Date.now()
    cy.visit('/', { timeout: 60000 }).then(() => {
      const loadTime = Date.now() - startTime
      expect(loadTime).to.be.lessThan(60000) // Should load within 60 seconds
    })
  })
})
