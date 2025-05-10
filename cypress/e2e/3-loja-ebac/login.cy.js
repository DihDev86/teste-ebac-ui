/// <reference types="cypress"/>

const perfil = require('../../fixtures/perfil.json')
//Precisei criar uma variável guarda o perfil.json que foi importado para usarmos a massa de dados no projeto.

//Nesse teste vamos interagir com os elementos de login da página loja ebac.

describe('Funcionalidade: Login', () =>{//Bloco de describe(onde ficam os cenários)

    beforeEach(() => {//Executa o código antes de cada cenário
        cy.visit('my-account/')
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

    //Usando a mesma lógica do baseUrl, podemos fazer algo semelhante com a massa de dados usada aqui para fazer os testes de login, e para isso usaremos o "fixtures", onde já temos um arquivo de exemplo que serve como base para a criação de massa de dados.


    /* 
    Criei um novo aquivo foi criado na pasta "fixtures" e o chamei de perfil.jason, nele é colocada a massa de dados que foi:
    {
    "usuario": "diego.qa.teste@teste.com.br" ,
    "senha" : "teste123"
    }
    
    Agora para alterarmos os dados precisamos ir até o arquivo perfil.json.
    */

    //Teste usando a massa de dados criada no fixtures - perfil.jason
    it('Deve fazer login com sucesso usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)//Puxa massa de dados do perfil.json
        cy.get('#password').type(perfil.senha)//Puxa massa de dados do perfil.json
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, diego.qa.teste (não é diego.qa.teste? Sair)')//1º validação(resultado esperado)
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')//2º validação (verifica se o elemento existe no DOM)
    });

    //Nesse teste estamos usando a função nativa "fixture" nela temos acesso direto a massa de dados, onde criamos uma ação com o .then e em seguida damos a uma função "dados" que usando o "." acessa a massa de dados pelo seu nome, ex.: dados.usuario
    it('Deve fazer login com sucesso usando fixture', () => {
        cy.fixture('perfil').then(dados =>{
            cy.get('#username').type(dados.usuario,{log: false})// o ,{log: false} serve para ocultar tanto senha quanto usuário no resultado do teste. "Recomendado para ocultar dados sensiveís"
            cy.get('#password').type(dados.senha,{log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, diego.qa.teste (não é diego.qa.teste? Sair')
        })
        
    });


})
