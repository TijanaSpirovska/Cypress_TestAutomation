import { GetAuthToken } from './Auth/Oauth2.cy'
import { API_URLS, PRODUCT_URL} from '../../data/StaticData';
import { Products } from '../../data/StaticData';
import '../../support/commands'
import { writeFile } from 'fs';

let access_token = '';
let postBodyProducts = '';
let putBodyProducts = '';
let responseBody = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('postBodyProducts.json').then((postBodyProductsData) => {
    postBodyProducts = postBodyProductsData;
  });

  cy.fixture('putBodyProducts.json').then((putBodyProductsData) => {
    putBodyProducts = putBodyProductsData;
  });
});

describe("Get all Information", () => {
  it('Get all products', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${PRODUCT_URL.Get_All_Products}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      // cy.log(response.body);
      expect(response.body).to.have.property('data')
    });
  });
});

describe("Create a product", () => {
  it('Creating a new product', () => {
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}products`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: postBodyProducts
    }).then(response => {
      expect(response.status).to.eq(201);
    });
  });
});

describe("Verify that the product has been created", () => {
  it('Filter new product by name', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${PRODUCT_URL.Filter_Name_Products}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      responseBody = response.body;
      cy.writeFile('.data/test.txt',responseBody);
      expect(response.status).to.eq(200);
      // expect(response.body.data[0].name).to.eq(`{"USA":"${Products.Name}"}`);

    });
  });
  it('Filter new product by slug', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${PRODUCT_URL.Filter_Slug_Products}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      
      // expect(response.body.data[0].slug).to.eq(`${Products.Slug}`);
    });
  });
  it('Filter new product by status', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${PRODUCT_URL.Filter_Status_Products}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].status).to.eq(`${Products.Status}`)
    });
  });
  it('Filter new product by created_at', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${PRODUCT_URL.Filter_Created_Products}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
  it('Filter new product by categories', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${PRODUCT_URL.Filter_Categories_Products}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});

describe("Product update", () => {
  beforeEach(() => {
    cy.getUniqueId(responseBody).then((unique_id) => {
      return cy.getID(responseBody).then((takenId) => {
        putBodyProducts.id = takenId;
        putBodyProducts.product_data.selected_attributes[0].unique_id = unique_id;

        // Return the updated putBodyProducts to pass it to the next Cypress command
        return putBodyProducts;
      });
    }).as('updatedBodyProducts');
  });

  it("Update product", () => {
    // Using 'cy.get' to access the updated putBodyProducts from the 'beforeEach' 
    cy.get('@updatedBodyProducts').then((updatedBodyProducts) => {
      cy.getUniqueId(responseBody).then((unique_id) => {
        cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}products/${unique_id}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
            accept: "*/*",
            "Content-type": "application/json",
          },
          body: updatedBodyProducts, // Use the updated putBodyProducts here
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
});

describe("Verify that the product has been updated", () => {
  it('Retrieve the name of the new product', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${PRODUCT_URL.Filter_Updated_Products}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});


// describe("Delete product", () => {
//   it('Delete newly created product', () => {
//     cy.getUniqueId(responseBody).then(takenId => {
//       cy.request({
//         method: 'DELETE',
//         url: `${API_URLS.TENANT_API}products/${takenId}`,
//         headers: {
//           Authorization: `Bearer ${access_token}`
//         }
//       }).then(response => {
//         expect(response.status).to.eq(200);
//       });
//     });
//   });
// });

// describe("Verify the product is deleted", () => {
//   it('Verify the product is successfully deleted', () => {
//     cy.getID(responseBody).then(takenId => {
//       cy.request({
//         method: 'GET',
//         url: `${API_URLS.TENANT_API}products/${takenId}`,
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         }
//       }).then(response => {
//         expect(response.status).to.eq(200);
//         cy.writeFile('.data/test.txt',response.body.data);
//         // expect(response.body.data).to.be.empty;
//       });
//   });
// });
// })

