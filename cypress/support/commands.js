//Aqui em commands.js criamos comandos customizados para cypress.
//Os comandos custumizados servem para otimizar os teste, ou seja, servem para dimunir as linhas de códigos do teste e também serve para reaproveitamento.

//Aqui temos todos os comandos do teste, no arquivo de teste derivado deste comando temos a função que executa ele.
Cypress.Commands.add('login', (usuario, senha) => { 
//O nome do comando é login e passamos dois parâmetros para ele "usuário" e "senha".
        cy.get('#username').type(usuario)
        cy.get('#password').type(senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, diego.qa.teste (não é diego.qa.teste? Sair)')
})

Cypress.Commands.add('preCadastro',(email,senha,nome,sobreNome) => {
        //Cadastrando novo usuário com dados faker
        cy.get('#reg_email').type(email , {log: false})
        cy.get('#reg_password').type(senha , {log: false})
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2) > a').should('exist')
        //Alterando os detalhes da conta com dados faker
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nome)
        cy.get('#account_last_name').type(sobreNome)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain','Detalhes da conta modificados com sucesso.')
})

Cypress.Commands.add('loginDetalhesConta', (usuario, senha) => { 
//Aqui estamos fazendo um login no beforeEach para que seja logado, para que assim consigamos alterar os detalhes da conta. 
        cy.get('#username').type(usuario)
        cy.get('#password').type(senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain','Detalhes da conta')
        
})

//Esse é o comando que vai alterar os detalhes da conta assim que a função detalhesConta for chamada no arquivo de teste.
//O comando .clear() serve para limpar a caixa de texto antes de preenche-la, o site tá bugado precisei fazer isso. 
Cypress.Commands.add('detalhesConta', (nome,sobreNome,usuario)=>{
        cy.get('#account_first_name').clear().type(nome)
        cy.get('#account_last_name').clear().type(sobreNome)
        cy.get('#account_display_name').clear().type(usuario)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
})