describe( 'test constructor', () => {
   beforeEach( () => {
      const email = 'test@mail.ru'
      const password = 'test'

      cy.intercept( 'GET', 'ingredients', { fixture: 'ingredients.json' } )
      cy.intercept( 'POST', 'login', { fixture: 'login.json' } )
      cy.intercept( 'POST', 'orders', { fixture: 'orders.json' } )
      cy.visit( 'http://localhost:3000/login' )

      cy.get( '[data-cy=email_input]' ).type( `${ email }{enter}` )
      cy.get( '[data-cy=password_input]' ).type( `${ password }{enter}` )
   } )


   it( 'check drag and drop + order ', () => {
      const dataTransfer = new DataTransfer()

      cy.contains( 'Краторная булка N-200i' ).trigger( 'dragstart', { dataTransfer } )
      cy.get( '[data-cy=constructor]' ).trigger( 'drop', { dataTransfer } )

      cy.contains( 'Соус Spicy-X' ).trigger( 'dragstart', { dataTransfer } )
      cy.get( '[data-cy=constructor]' ).trigger( 'drop', { dataTransfer } )
         .should( ( $c ) => {
            $c.map( ( i, $el ) => {
               expect( $el ).to.contain( 'Краторная булка N-200i' )
               expect( $el ).to.contain( 'Соус Spicy-X' )
            } )
         } )

      cy.get( 'button' ).contains( 'Оформить заказ' ).click()

      cy.get( '[data-cy=order_id]' ).should( 'have.text', '46861' )
   } )

   it( 'check modal', () => {
      cy.contains( 'Краторная булка N-200i' ).click()
      cy.get( '[data-cy=modal_ingredient_name]' ).should( 'have.text', 'Краторная булка N-200i' )
      cy.get( '[data-cy=close_btn]' ).click().should( 'not.exist' )
   } )

} )