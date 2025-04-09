/// <reference types="cypress"/> 
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta') 
    });

    // afterEach(() => {
    //     cy.screenshot()
    // });

    it('Deve fazer login com sucesso', () => {

        cy.get('#username').type('diegoqa.teste@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, diegoqa.teste (não é diegoqa.teste? Sair)')
    })

    it('Deve exibir uma mensagem de erro ao inserir um usuário inválido', () => {
        
        cy.get('#username').type('diego@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        
        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido.')
        //cy.get('.woocommerce-error').should('exist')
        

    });

    it('Deve exibir uma mensagem de erro ao inserir uma senha inválida', () => {


        cy.get('#username').type('diegoqa.teste@teste.com.br')
        cy.get('#password').type('teste@000')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('exist')
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail diegoqa.teste@teste.com.br está incorreta. Perdeu a senha?' )
        
    });

    it.only('Deve fazer login com sucesso - Usando massa de dados', () => {

        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, diegoqa.teste (não é diegoqa.teste? Sair)')
        
    });

    it.only('Deve fazer login com sucesso - Usando fixture ', () => {
        cy.fixture('peril').then(dados => {

        cy.get('#username').type(dados.usuario)
        cy.get('#password').type(dados.senha)
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, diegoqa.teste (não é diegoqa.teste? Sair)')

        })
        
        
    });

})