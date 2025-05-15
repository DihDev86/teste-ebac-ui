/// <reference types="cypress"/>

//Nesse teste vamos selecionar produtos na lista

//Importação do "Page objects" para o arquivo de testes.

//Agora todas as vezes que digitarmos a função produtosPage e der o "." ele vai reconhecer todos os métodos criados no arquivo de "Page Objetcs"

import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        // cy.visit('produtos/')
        // O cy.visit será substituido por um método "Page Objects".
        // Para criar o "Page Object" vamos a pasta suporte e criaremos uma nova pasta (nome a seu critério) mas vou criar uma pasta com o nome "Page objects".
        //Dentro da pasta "Page objects" criaremos um arquivo js chamado produtos.page
        produtosPage.visitarUrl()
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
    //Esse método não funciona por problemas na página ao clicar no last produto.
    it('Deve selecionar um produto da lista usando o método last()', () => {
        cy.get('.product-block >')//Elemento lista.
        .last()//Seleciona o último elemento da lista.
        .click()
        cy.get('.single_add_to_cart_button').should('contain', 'Comprar')
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
    it('Deve selecionar um produto da lista usando o método .contains()', () => {
        cy.get('.products > .row')//Elemento capturado onde tinhamos o nome do produto.
        .contains('Aero Daily Fitness Tee')//Seleciona o elemento pelo nome.
        .click()
        cy.get('.single_add_to_cart_button').should('contain', 'Comprar')   
    });

    /*PAGE OBJECTS */

    //Os testes abaixo serão feitos com "Page Objects"
    //Vamos começar criando a estrutura de page, ou seja, criando os métodos/funções para rodar os testes. 

    it('Deve buscar produto na lista - Page Objetcs', () => {
        produtosPage.buscarProdutoLista()
        cy.get('.single_add_to_cart_button').should('contain', 'Comprar') 
        
    });

    it('Deve buscar um produto com sucesso - Page Objects ', () => {
        produtosPage.buscarProduto()        
        cy.get('.single_add_to_cart_button').should('contain', 'Comprar')
    });

    it('Deve adicionar um produto ao carrinho', () => {
        produtosPage.buscarProdutoLista()
        produtosPage.addProdutoCarrinho()
    });

    it('Deve adicionar um produto no carrinho de depois exlui-lo - Page Objects', () => {
        produtosPage.buscarProdutoLista()
        produtosPage.addProdutoCarrinho()
        produtosPage.exluirProdutoCarrinho()
    });


    //Esse teste será feito usando a barra de pesquisa da página, e para isso vamos seleciona-lá usando o DOM.

    //Clicamos e selecionamos o elemento da mesma forma que fazemos cypresse e capturamos o elemento do campo de busca. Para ver se os elementos desse campo são único precisamos usa o Ctrl + F para usarmos a barra de pesquisa para isso.

    //Para pesquisar os elementos, precisamos coloca-los dentro de [ ], depois de capturarmos o elemento da barra de pesquisa, podemos usa-ló no código.
    it('Deve buscar produtos usando o search - Page Objects', () => {
        produtosPage.buscarProdutoNoSearch()
    });

    //Nesse teste usei parâmetros no aquivo produtos.page que guarda o nome do produto dado aqui como parâmentro nele.
    it('Deve adicionar um produto no carrinho pesquisado na barra de pesquisa - Page Objetcs - Parâmetros', () => {
            produtosPage.buscarProdutoBarraPesquisa('Apollo Running Short')
        });
    
    it('Deve visitar um produto específico.', () => {
        produtosPage.visitarProdutoEspecifico('Apollo Running Short')
        //Ao selecionar o produto, precisamos colocar o nome separado por "-"
        //Mas podemos usar um método para eliminar o "-"
        //Para isso precisamos criar um const para receber a url formatada.
        cy.get('.product_title').should('contain', 'Apollo Running Short')
    });

    it('Deve adicionar produtos no carrinho - Massa de dados em lista', () => {
        
        let qtd = 2 // Podemos guardar a quantidade numa variável e usa-la
        produtosPage.buscarProdutoBarraPesquisa('Ajax Full-Zip Sweatshirt')
        produtosPage.addProdutoCarrinho2('XL', 'Blue', qtd )//Agora podemos digitar aqui o que queremos passar para o produtos.page para ser escolhido.
        //O valores passados aqui serão salvos nos parâmetros no arquivo produtos.page, ele é quem executa os comandos quando chamamos as função acima.
        
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Ajax Full-Zip Sweatshirt” foram adicionados no seu carrinho.')
        //Se eu colocasse um número diferente como parâmentro iria dá erro na validação, porque temos uma validação com 5.
        //guardando a quantidade numa variável evitamos o erro de validação.
        
    });

    it.only('Deve adicionar produtos no carrinho buscando da Massa de dados em lista', () => {
        
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProdutoBarraPesquisa(dados[1].nomeProduto)
            produtosPage.addProdutoCarrinho2(
                dados[1].tamanho, 
                dados[1].cor, 
                dados[1].quantidade)
            
            //Agora podemos digitar aqui o que queremos passar para o produtos.page 
            //Aqui iremos usar os produtos de uma massa de dados em um arquivo da pasta fixture
            //Como temos vários produtos, precisamos selecionar o produto através de dados. + nome do que queremos e em seguida o índice
            //Precisamos de uma função de busca e nela coloraremos o ítem da massa de dados fixtures que queremos.
            //Em seguida precisamos de uma função que adicone o ítem no carrinho e que antes selecione as caracteristicas do ítem.
            
            cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)//Aqui faremos a validação com nome do produto.
            



        })
    });

    
}); 