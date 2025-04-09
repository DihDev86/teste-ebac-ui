/// <reference types="cypress"/> 
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Cadastro', () => {
    
    beforeEach(() => {
        cy.visit('my-account')
    });
    
    it('Deve completar o cadastro com sucesso', () => {
        
        cy.get('#reg_email').type(faker.internet.email())
        cy.get('#reg_password').type('teste@123')
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(faker.person.firstName())
        cy.get('#account_last_name').type(faker.person.lastName())
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
        

    });

    it('Deve completar o cadastro com sucesso, usando variáveis', () => {

        /*Aqui estamos atribuindo o metódo faker as variáveis, assim conseguimos  deixar o código mais enxuto.
        Na variável email pedimos para o nome ser criado com o primeiro nome da pessoa. 
        */
        var nome = faker.person.firstName()
        var email = faker.internet.email(nome)
        var sobreNome = faker.person.lastName()

        
        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type('teste@123')
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nome)
        cy.get('#account_last_name').type(sobreNome)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
        

    });
});