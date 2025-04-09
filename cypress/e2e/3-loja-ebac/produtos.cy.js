/// <reference types = "cypress"/>

describe('Funcionalidade: produtos', () => {
    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block ')
            //.first() Pega o primeiro item da lista
            //.last() Pega o ultimo item da lista
            //.eq(2) Pega o item dois do índice que começa em zero
            .contains('Ariel Roll Sleeve Sweatshirt') //Pega o item pelo nome
            .click()

            cy.get('#tab-title-description > a').should('exist')
        
    });
    
});