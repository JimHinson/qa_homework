// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom login command with extended timeouts for proxy environments
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/', { timeout: 60000 })  // Extended page load timeout
  
  // Wait for page to be fully loaded
  cy.waitForPageLoad()
  
  // Fill in login form with longer timeouts
  cy.get('input[type="email"], input[name*="email"], input[placeholder*="email"]', { timeout: 15000 })
    .first()
    .clear()
    .type(email, { delay: 50 })  // Add slight delay between keystrokes
  
  cy.get('input[type="password"], input[name*="password"], input[placeholder*="password"]', { timeout: 15000 })
    .first()
    .clear()
    .type(password, { delay: 50 })
  
  // Submit form and wait longer for response
  cy.get('button[type="submit"], button').contains(/login|sign in/i, { timeout: 15000 }).click()
  
  // Wait for login to complete with extended timeout
  cy.wait(5000)  // Increased wait time for proxy environments
})

// Custom command to login with default user
Cypress.Commands.add('loginAsDefaultUser', () => {
  cy.fixture('example').then((data) => {
    cy.login(data.users.defaultUser.email, data.users.defaultUser.password)
  })
})

// Custom command to check for accessibility issues
Cypress.Commands.add('checkA11y', (selector = null) => {
  const target = selector || 'body'
  
  cy.get(target).within(() => {
    // Check for images without alt text
    cy.get('img').each(($img) => {
      expect($img).to.have.attr('alt')
    })
    
    // Check for form inputs without labels
    cy.get('input, select, textarea').each(($input) => {
      const id = $input.attr('id')
      const ariaLabel = $input.attr('aria-label')
      const ariaLabelledBy = $input.attr('aria-labelledby')
      
      if (id) {
        cy.get(`label[for="${id}"]`).should('exist')
      } else {
        expect(ariaLabel || ariaLabelledBy).to.exist
      }
    })
  })
})

// Custom command to test responsive design
Cypress.Commands.add('testResponsive', (selector = 'body') => {
  const viewports = [
    { width: 320, height: 568, name: 'Mobile' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1440, height: 900, name: 'Desktop' }
  ]
  
  viewports.forEach((viewport) => {
    cy.viewport(viewport.width, viewport.height)
    cy.get(selector).should('be.visible')
    
    // Log current viewport for debugging
    cy.log(`Testing ${viewport.name} viewport: ${viewport.width}x${viewport.height}`)
  })
})

// Custom command to wait for page to load completely (proxy-friendly)
Cypress.Commands.add('waitForPageLoad', (timeout = 30000) => {
  // Wait for window and document to be available
  cy.window({ timeout }).should('have.property', 'document')
  cy.document({ timeout }).should('have.property', 'readyState', 'complete')
  
  // Wait for body to be visible
  cy.get('body', { timeout }).should('be.visible')
  
  // Wait for any initial network requests to complete
  cy.wait(3000) // Extended buffer for proxy environments
  
  // Ensure no active network requests (if possible)
  cy.window().then((win) => {
    // Check if jQuery is available and wait for ajax to complete
    if (win.jQuery) {
      expect(win.jQuery.active).to.equal(0)
    }
  })
})

// Custom command to check for console errors
Cypress.Commands.add('checkConsoleErrors', () => {
  cy.window().then((win) => {
    const errors = []
    const originalError = win.console.error
    
    win.console.error = (...args) => {
      errors.push(args.join(' '))
      originalError.apply(win.console, args)
    }
    
    cy.wait(2000).then(() => {
      if (errors.length > 0) {
        cy.log('Console errors found:', errors)
        // You can choose to fail the test or just log warnings
        // throw new Error(`Console errors found: ${errors.join(', ')}`)
      }
    })
  })
})

// Custom command to simulate slow network (improved for proxy testing)
Cypress.Commands.add('simulateSlowNetwork', (delay = 2000) => {
  cy.intercept('**/*', (req) => {
    // Don't delay static assets as much to avoid excessive test times
    const isStaticAsset = req.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/i)
    const actualDelay = isStaticAsset ? Math.min(delay / 2, 1000) : delay
    
    req.reply((res) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(res), actualDelay)
      })
    })
  }).as('slowNetwork')
  
  cy.log(`Simulating slow network with ${delay}ms delay`)
})

// Custom command to check if element is in viewport
Cypress.Commands.add('isInViewport', { prevSubject: 'element' }, (subject) => {
  cy.window().then((win) => {
    const rect = subject[0].getBoundingClientRect()
    const isInViewport = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= win.innerHeight &&
      rect.right <= win.innerWidth
    )
    expect(isInViewport).to.be.true
  })
})

// Custom command to find element by ID with better error handling
Cypress.Commands.add('getById', (id, options = {}) => {
  const selector = id.startsWith('#') ? id : `#${id}`
  return cy.get(selector, options)
})

// Custom command to find element by data-cy attribute (recommended approach)
Cypress.Commands.add('getByTestId', (testId, options = {}) => {
  return cy.get(`[data-cy="${testId}"]`, options)
})

// Custom command to find element by ID or data-cy with fallback
Cypress.Commands.add('findElement', (identifier, options = {}) => {
  // Try data-cy first (recommended)
  return cy.get('body').then(($body) => {
    if ($body.find(`[data-cy="${identifier}"]`).length > 0) {
      return cy.get(`[data-cy="${identifier}"]`, options)
    } else if ($body.find(`#${identifier}`).length > 0) {
      // Fallback to ID
      return cy.get(`#${identifier}`, options)
    } else {
      // Fallback to contains text
      return cy.contains(identifier, options)
    }
  })
})
