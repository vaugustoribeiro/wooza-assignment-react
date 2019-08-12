/// <reference types="Cypress" />

describe('Plan subscription', function() {

    it('Opens platforms selection page', function() {
        cy.visit('/plataformas')
    })

    it('Choose a platform', function() {
        cy.contains('Escolher').click()
    })

    it('Choose a plan', function() {
        cy.contains('Contratar Agora').click()
    })

    it('Fill form', function() {
        cy.get('input[name=name]').type('Vinicius Augusto Ribeiro da Silva')
        cy.get('input[name=email]').type('vinicius.silv@hotmail.com')
        cy.get('input[name=cellPhone]').type('21979871965')
        cy.get('input[name=cpf]').type('12857877730')
        cy.get('input[name=birthDate]').type('1991-07-31')
        cy.contains('Contratar').click()
    })

    it('Display congrats message', function() {
        cy.contains('Assinatura realizada com sucesso!')
        cy.get('h6').contains('Parabéns')
    })
})