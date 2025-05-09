/// <reference types="cypress"/>

//Nesse teste vamos selecionar produtos na lista

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });

    //Ao selecionar os elementos devemos procurar manualmente listas com elementos e ver quantos "matches" temos, os "matches" e os itens que visivelmente são selecionados indicam que temos uma lista. Assim podermos usar metodos como o .first(), .last(), .eq() e .contais() que seleciona o primeiro item da lista.

    //Selecionando produto com o método .firt()
    it('Deve selecionar um produto da lista usando o método first()', () => {
        cy.get('.product-block >')//Elemento lista
        .first()//Seleciona o primeir da lista.
        .click()
        cy.get('.single_add_to_cart_button').should('contain', 'Comprar')


    });

    //Selecionando produto com o método .last()
    //Esse método não funciona por problemas na página
    it('Deve selecionar um produto da lista usando o método last()', () => {
        cy.get('.product-block >')//Elemento lista.
        .last()//Seleciona o último elemento da lista.
        .click()
        // cy.get('.single_add_to_cart_button').should('contain', 'Comprar')
    });

    //Selecionando produto pela posição no índice
    //A posição começa em zero
    it('Deve selecionar um produto na lista usando o método eq()', () => {
        cy.get('.product-block >')//lista de produtos.
        .eq(0)//Alguns itens da lista não carregam é da erro.
        .click()
        cy.get('.single_add_to_cart_button').should('contain', 'Comprar')  
    });
    
    //Selecionando produto pelo nome. Tive que capturar outro elemento onde o elemento com o nome do produto tivesse contido nele.
    it.only('Deve selecionar um produto da lista usando o método .contains()', () => {
        cy.get('.products > .row')//Elemento capturado onde tinhamos o nome do produto.
        .contains('Aero Daily Fitness Tee')//Seleciona o elemento pelo nome.
        .click()
        cy.get('.single_add_to_cart_button').should('contain', 'Comprar')   
    });
}); 