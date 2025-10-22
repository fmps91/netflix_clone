

describe('functions home spec', () => {
  context('1024, 768 resolution', () => {
  
    it('Sign Up', () => {
      cy.wait(200)
      cy.viewport(1280, 720)
      cy.visit('http://localhost:3000/')
      cy.get('#root > div > div > div > p > span').click()
      cy.get('h1').should('contain', "Sign Up")
      cy.fixture('user.json').then((user)  => {
                cy.log("user: ",user);
                cy.wrap(user).as('result')
      })
      cy.get('@result').then((e) => {
        cy.get('#root > div > div > form > input[type=text]:nth-child(1)[placeholder=\'Your name\']').type(e.name)
        cy.get('#root > div > div > form > input[type=email]:nth-child(2)[placeholder=\'Email\']').type(e.email)
        cy.get('#root > div > div > form > input[type=password]:nth-child(3)[placeholder*="Password"]').type(e.password)
        cy.get('#root > div > div > form > button').click()
      })
      
    })

    

    

  })


});
