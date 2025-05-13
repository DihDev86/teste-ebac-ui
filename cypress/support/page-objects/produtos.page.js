//Agora vamos criar uma classe chamada ProdutosPage e dentro dela vamos criar todos os nosso métodos.

class ProdutosPage{

    visitarUrl(){//Método = função e {}
        cy.visit('produtos')
        //dentro do método colocamos o comando que será executado ao chamarmos o "Page Objects" no arquivo de teste. 
    }

    buscarProdutoNoSearch(){
        cy.get('[name="s"]').eq(1).type('Apollo Running Short')//Elemento da barra de pesquisas capturado no DOM.
        //Como o elemento não é único, precisamos identifica-lo através do índice
        //Em seguida escrevemos o nome do produto que será escrito na barra de pequisa e damos o click
        cy.get('.button-search').eq(1).click()//Lembrar-se sempre de usar o método eq para selecionar o elemento no índice pelo DOM
        cy.get('.product_title').should('exist')
        cy.get('.button-variable-item-36').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type(10)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', '10 × “Apollo Running Short” foram adicionados no seu carrinho.')

    }


    buscarProduto(){
        cy.get('.product-block >')//Elemento lista
        .first()//Seleciona o primeir da lista.
        .click()
    }

    buscarProdutoLista(){
        cy.get('.products > .row')//Elemento capturado onde tinhamos o nome do produto.
        .contains('Aether Gym Pant')//Seleciona o elemento pelo nome.
        .click()
    
    }

    addProdutoCarrinho(){
        cy.get('.input-text').clear().type(10)
        cy.get('.button-variable-item-32').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message > .button').click()
        cy.get('.page-title').should('exist')

    }

    exluirProdutoCarrinho(){
        cy.get('.remove > .fa').click()
        cy.get('.cart-empty').should('contain', 'Seu carrinho está vazio.')
    }

    buscarProdutoBarraPesquisa(nomeProduto){//Aqui passamos o parâmetro nomeProduro que irá armazenar o nome do produto escrito no teste o digitará 
        cy.get('[name="s"]').eq(1).type(nomeProduto)//Elemento da barra de pesquisas capturado no DOM.
        //Como o elemento não é único, precisamos identifica-lo através do índice
        //Em seguida escrevemos o nome do produto que será escrito na barra de pequisa e damos o click.
        cy.get('.button-search').eq(1).click()//Lembrar-se sempre de usar o método eq para selecionar o elemento no índice pelo DOM
        
    }

    //Neste teste vamos visitar um produto especifico.
    visitarProdutoEspecifico(){
        
    }

}

//Para que esses métodos fique disponíveis para podermos usa-lós em outros arquivos, precisamos exporta-los.

export default new ProdutosPage()

//Agora precisamos fazer a importação para o arquivo de testes.
