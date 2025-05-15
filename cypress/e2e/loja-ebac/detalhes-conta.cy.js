/// <reference types = "cypress"/>

//Nesse teste vamos completar os detalhes da conta na loja ebac, mas para entra nessa página precisamos antes estar logados.
describe('Funcionalidade: Detalhes da conta.', () => {
    beforeEach(() => {
        cy.visit('minha-conta/edit-account')//Já temos a baseUrl, por isso deixamos somente a funcionalidade que queremos
        //Para logar podemos usar uma função que já criamos anteriomente com os comandos customizados que é o:
        
        cy.fixture('perfil').then(login => {//Usamos massa de dados do fixture, mas a função executada no bloco abaixo é a loginDetalhesConta
            cy.loginDetalhesConta(login.usuario, login.senha) 
        //Feito isso, antes de cada teste ele  irá fazer o login usando essa função com a massa de dados. 
        })
        
    });

    it('Deve completar os detalhes da conta com sucesso', () => {
        cy.detalhesConta('Diêgo', 'Ernandes', 'DiegoeQA')
    });
    
});