

Cypress.Commands.add('getID', (responseBody) => {
    const id = responseBody.data[0].id;
    cy.log(id);
    return cy.wrap(id);
  });


Cypress.Commands.add('getName', (responseBody) => {
  const name = responseBody.data[0].name;
  cy.log(name);
  return cy.wrap(name);
});


Cypress.Commands.add('getCategory', (responseBody) => {
  const categories = responseBody.data[0].categories;
  cy.log(categories);
  return cy.wrap(categories);
});


Cypress.Commands.add('getStatus', (responseBody) => {
  const status = responseBody.data[0].status;
  cy.log(status);
  return cy.wrap(status);
});

Cypress.Commands.add('getCreatedAt', (responseBody) => {
  const created_at = responseBody.data[0].created_at;
  cy.log(created_at);
  return cy.wrap(created_at);
});

Cypress.Commands.add('getUniqueId', (responseBody) => {
  const unique_id = responseBody.data[0].unique_id;
  cy.log(unique_id);
  return cy.wrap(unique_id);
});

Cypress.Commands.add('getCustomerAddress1', (responseBody) => {
  const customerAddress1 = responseBody.data[0].customer_addresses[0].id;
  cy.log(customerAddress1);
  return cy.wrap(customerAddress1);
});

Cypress.Commands.add('getCustomerAddress2', (responseBody) => {
  const customerAddress2 = responseBody.data[0].customer_addresses[1].id;
  cy.log(customerAddress2);
  return cy.wrap(customerAddress2);
});

Cypress.Commands.add('getCustomerId1', (responseBody) => {
  const customerId1 = responseBody.data[0].customer_addresses[0].customer_id;
  cy.log(customerId1);
  return cy.wrap(customerId1);
});

Cypress.Commands.add('getCustomerId2', (responseBody) => {
  const customerId2 = responseBody.data[0].customer_addresses[0].customer_id;
  cy.log(customerId2);
  return cy.wrap(customerId2);
});

Cypress.Commands.add('getPriceId', (responseBody) => {
  const price_id = responseBody.data[0].product_variant_prices[0].id;
  cy.log(price_id);
  return cy.wrap(price_id);
});

Cypress.Commands.add('getPriceUniqueID', (responseBody) => {
  const price_unique_id = responseBody.data[0].product_variant_prices[0].unique_id;
  cy.log(price_unique_id);
  return cy.wrap(price_unique_id);
});

Cypress.Commands.add('getVariantUniqueID', (responseBody) => {
  const variant_unique_id = responseBody.data[0].variants[0].unique_id;
  cy.log(variant_unique_id);
  return cy.wrap(variant_unique_id);
});


Cypress.Commands.add('getUnique_Id', (responseBody) => {
  const unique_id = responseBody.data.unique_id;
  cy.log(unique_id);
  return cy.wrap(unique_id);
});


Cypress.Commands.add('get_ID', (responseBody) => {
  const id = responseBody.data.id;
  cy.log(id);
  return cy.wrap(id);
});

Cypress.Commands.add('getVariantId',(responseBody) =>{
  const variantId = responseBody.data[0].variants[0].id;
  cy.log(variantId);
  return cy.wrap(variantId);
})


Cypress.Commands.add('getIframe', (iframe) => {
  return cy.get(iframe)                    //find iframe on the page
      .its('0.contentDocument.body')         //access the body element of the frame (like opening a book and finding the first page)
      .should('be.visible')                 // iframe body if is visible 
      .then(cy.wrap);                      // (make things inside the window)
})
