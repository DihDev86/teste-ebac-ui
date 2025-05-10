const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://lojaebac.ebaconline.art.br/'
    //Alteração global. Essa baseUrl serve para ser usada nos cy.visit 
    //Tiramos a baseUrl e dexamos somente a funcionalidade, ex.: cy.visit('minha-conta')
  },
});
