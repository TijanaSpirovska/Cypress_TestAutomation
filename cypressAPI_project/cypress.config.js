const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    baseUrl:'https://iwjwt.iwcommerce.com/',
   
  },
  Products: {
    baseUrl:'https://iwapi.iwcommerce.com/api/',
  },

  
});



