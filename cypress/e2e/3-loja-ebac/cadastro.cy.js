/// <reference types="cypress"/>
//Aqui vamos trabalhar com massa de dados fakes, para isso precisamos instalar o faker-js. Sua documentação está nesse site: https://www.npmjs.com/package/@faker-js/faker e para instalar precisamos abrir o terminal, onde iremos usar a mesma versão usada no curso que é a 8.3.1 e para instalar usamos o seguinte comando: npm i @faker-js/faker@8.3.1.

//Dessa forma teremos acesso a uma vasta biblioteca onde poderemos criar dados fakes para nossos teste, esse dados são criados de forma dinâmica e nos ajuda a criar os dados que precisamos. 

//No arquivo package-lock.json podemos ver qual a versão instalada do faker-js.

//Nesse teste vamos interagir com os elementos de cadastro da página loja ebac.

import{faker} from '@faker-js/faker'//Importa a biblioteca de dados do faker para nosso projeto

describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('my-account')
        //Endereço jogado em um arquivo de configuração global.
        //Funcionalidade mantida.
        //No arquivo Cypress.config.js faremos a modificação.
    });
    //Nesse teste vamos criar um novo usuário
    
    // it('Deve completar o cadastro com sucesso', () => {
    //     cy.get('#reg_email').type('diegoqa2025@teste.com.br')
    //     cy.get('#reg_password').type('teste2025')
    //     cy.get(':nth-child(4) > .button').click()
        
    //     //Nesse teste ao executa-lo novamente irá dá erro, porque o email já está registrado     
    // });

    //Teste de criação de novo cadastro usando a biblioteca do faker
    it('Deve completar o cadastro com sucesso', () => {
        //Cadastrando novo usuário com dados faker
        cy.get('#reg_email').type(faker.internet.email())
        cy.get('#reg_password').type('teste2025')
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2) > a').should('exist')
        //Alterando os detalhes da conta com dados faker
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(faker.person.firstName())
        cy.get('#account_last_name').type(faker.person.lastName())
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain','Detalhes da conta modificados com sucesso.')

    });

    //Vamos refazer o mesmo teste de cima usando variáveis 
    it('Deve completar o cadastro com sucesso - Usando variáveis', () => {
        //Variáveis usadas para guardar email, nome e sobre nome criados pelo faker 
        var nome = faker.person.firstName()
        var email = faker.internet.email(nome)//Vai gerar o email com o firstName para não ficar muito aleatório
        var sobreNome = faker.person.lastName() 

        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type('teste2025')
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2) > a').should('exist')
        
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nome)
        cy.get('#account_last_name').type(sobreNome)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain','Detalhes da conta modificados com sucesso.')
    });

    it.only('Deve fazer o cadastro usando commands customizados', () => {
        cy.preCadastro(faker.internet.email(),'teste2025',faker.person.firstName(),faker.person.lastName())
        //A função preCadastro via ser executada usando o comando customizado do arquivo commands.js 
        //Cada parâmetro dado na função, será armazanado em cy.commands, ou seja, ocorre uma comunicação entre os arquivos para haver essa customização.
        //Aqui temos o a função que executa o comando em commands.js
        //Toda e qualquer alteração deverá ser feita no arquivo commands.js 
        cy.get('.woocommerce-message').should('contain','Detalhes da conta modificados com sucesso.') 
    });
});