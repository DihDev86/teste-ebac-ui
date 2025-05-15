const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "a3jaa9",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    //Alteração global. Essa baseUrl serve para ser usada nos cy.visit 
    //Tiramos a baseUrl e dexamos somente a funcionalidade, ex.: cy.visit('minha-conta')
    
    video: true,
    //Serve para gerar vídeos de toda execução do teste em "Headless".
  },
});
