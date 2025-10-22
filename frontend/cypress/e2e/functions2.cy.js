

describe('functions home spec', () => {
  context('1024, 768 resolution', () => {
  
    beforeEach('Sign In', () => {
      cy.wait(200)
      cy.fixture('user.json').then((user)  => {
                cy.log("user: ",user);
                cy.wrap(user).as('result')
      })
          
      cy.viewport(1280, 720)
      cy.visit('http://localhost:3000/')
      cy.wait(2000)  
      cy.get('@result').then((e) => {
          cy.get('h1').should('contain', "Sign In")
          cy.get('#root > div > div > form > input[type=email]:nth-child(1)[placeholder=\'Email\']').type(e.email)
          cy.get('#root > div > div > form > input[type=password]:nth-child(2)[placeholder*="Password"]').type(e.password)
          cy.get('#root > div > div > form > button').should("contain", "Sign In")
          cy.get('#root > div > div > form > button').click()
      })
      
      
    })

    it('Sign Out hover', () => {
      
      cy.wait(2000)
      cy.get('#root > div > div.navbar > div.navbar-right > div > div.dropdown',{ timeout: 5000 }).invoke('css', 'display', 'block') // esto es para que el objeto aparesca y pueda hacer click
      cy.get('#root > div > div.navbar > div.navbar-right > div > div > p').click()
      
    });

    

  })


});
