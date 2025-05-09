/// <reference types="cypress"/>

//Nesse teste vamos interagir com os elementos de login da página loja ebac.

describe('Funcionalidade: Login', () =>{//Bloco de describe(onde ficam os cenários)

    beforeEach(() => {//Executa o código antes de cada cenário
        cy.visit('http://lojaebac.ebaconline.art.br/my-account/')
    });

    afterEach(() => {
        //cy.screenshot() //Depois de cada teste tira uma screenshot(funcionou!)
    });


// Primeiro teste automatizado
    it('Deve fazer login com sucesso', () => {//Cenário
        cy.get('#username').type('diego.qa.teste@teste.com.br')
        cy.get('#password').type('teste123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, diego.qa.teste (não é diego.qa.teste? Sair)')//1º validação(resultado esperado)
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')//2º validação (verifica se o elemento existe no DOM)


    });

    //Cenário negatico com usuário inválido 
    it('Deve exibir uma mensagem de erro ao inserir usuário invalido', () => {
        cy.get('#username').type('diego.q.teste@teste.com.br')
        cy.get('#password').type('teste123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain', 'Endereço de e-mail desconhecido.')
    });

    //Cenário negativo com senha inválida
    it('Deve exibir uma mensagem de erro ao inserir a senha errada', () => {
        cy.get('#username').type('diego.qa.teste@teste.com.br')
        cy.get('#password').type('12345')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain','Erro: A senha fornecida para o e-mail diego.qa.teste@teste.com.br está incorreta. Perdeu a senha?' )
        
    });


})
