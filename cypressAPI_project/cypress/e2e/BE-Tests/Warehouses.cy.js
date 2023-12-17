import { GetAuthToken } from './Auth/Oauth2.cy'
import {LIMIT, Warehouses, API_URLS, WAREHOUSES_URL} from '../../data/StaticData';
import '../../support/commands'

let access_token = '';
let postBodyWarehouses = '';
let putBodyWarehouses = '';
let responseBody = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });
  cy.fixture('postBodyWarehouses.json').then((postBodyWarehousesData) => {
    postBodyWarehouses = postBodyWarehousesData;
});
cy.fixture('putBodyWarehouses.json').then((putBodyWarehousesData) => {
    putBodyWarehouses = putBodyWarehousesData;
});
});

// describe("Get all Information", () => {
//     it('Get All Warehouses', () => {
//       cy.request({
//         method: 'GET',
//         url: `${API_URLS.TENANT_API}${WAREHOUSES_URL.Get_All_Warehouses}`,
//         headers: {
//           Authorization: `Bearer ${access_token}`
//         }
//       }).then((response) => {
//         // responseBody = response.body;
//         // cy.writeFile('.data/test.txt', responseBody);
//         expect(response.status).to.equal(200)
//       });
//     });
//   });

//   describe("Creating a new warehouse", () => {
//     it("Create a warehouse", () => {
//         cy.fixture('postBodyWarehouses.json').then((postBodyWarehouses) => {
//             cy.request({
//                 method: 'POST',
//                 failOnStatusCode: false,
//                 url: `${API_URLS.TENANT_API}warehouses`,
//                 headers: {
//                     Authorization: `Bearer ${access_token}`,
//                     accept: 'application/json'
//                 },
//                 body: postBodyWarehouses,
//             })
//         }).then(response => {
//             responseBody = response.body;
//             cy.writeFile('.data/test.txt', responseBody);
//             expect(response.status).to.eq(201);
//             // expect(response.body).to.have.property("message", "Successfully created warehouse")
//         });
//     });
// });
describe("Verify that the warehouse has been created", () => {
    it('Filter the newly create Warehouse by name', () => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}${WAREHOUSES_URL.Filter_Name_Warehouse}`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then((response) => {
        responseBody = response.body;
        cy.writeFile('.data/test.txt', responseBody);
        expect(response.status).to.equal(200)
        // expect(responseBody.data[0].name).to.eq(`${Warehouses.Name}`);
        //expect(response.body.data).to.have.property('name','ValeTest12345')
        // add more assertions as needed  
      });
    });
    // it('Filter the newly create Warehouse by primary', () => {
    //     cy.request({
    //       method: 'GET',
    //       url: `${API_URLS.TENANT_API}${WAREHOUSES_URL.Filter_Primary_Warehouse}`,
    //       headers: {
    //         Authorization: `Bearer ${access_token}`
    //       }
    //     }).then((response) => {
          
    //       // cy.writeFile('.data/test.txt', responseBody);
    //       expect(response.status).to.equal(200)
    //     //   expect(responseBody.data[0].primary).to.eq(`${Warehouses.Primary}`);
    //     //   expect(responseBody.data).to.have.property('name', Warehouses.Name)
    //       // add more assertions as needed  
    //     });
    //   });
    //   it('Filter the newly create Warehouse by status', () => {
    //     cy.request({
    //       method: 'GET',
    //       url: `${API_URLS.TENANT_API}${WAREHOUSES_URL.Filter_Status_Warehouses}`,
    //       headers: {
    //         Authorization: `Bearer ${access_token}`
    //       }
    //     }).then((response) => {
          
    //       // cy.writeFile('.data/test.txt', responseBody);
    //       expect(response.status).to.equal(200)
    //     //   expect(responseBody.data[0].status).to.eq(`${Warehouses.Status}`);
    //     //   expect(responseBody.data).to.have.property('name', Warehouses.Name)
    //       // add more assertions as needed  
    //     });
    //   });
});

describe("Warehouse update", () => {
    beforeEach(() => {
        cy.getUniqueId(responseBody).then((unique_id) => {
            return cy.getID(responseBody).then((warehouseId) => {
                putBodyWarehouses.id = warehouseId;
                // Return the updated putBodyWarehouses to pass it to the next Cypress command
                return putBodyWarehouses;
            });
        }).as('updatedBodyWarehouses');
    });

    it("Update the warehouse", () => {
        // Using 'cy.get' to access the updated putBodyWarehouses from the 'beforeEach' 
        cy.get('@updatedBodyWarehouses').then((updatedBodyWarehouses) => {
            cy.getUniqueId(responseBody).then((unique_id) => {
                cy.request({
                    method: "PUT",
                    url: `${API_URLS.TENANT_API}warehouses/${unique_id}`,
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        accept: "*/*",
                        "Content-type": "application/json",
                    },
                    body: updatedBodyWarehouses, // Use the updated putBodyWarehouses here
                }).then((response) => {
                    responseBody = response.body
                    cy.writeFile('.data/test.txt', responseBody);
                    expect(response.status).to.eq(200);
                });
            });
        });
    });
});

describe("Delete warehouse", () => {
    it('Delete newly created/updated warehouse', () => {
      cy.getID(responseBody).then(warehouseId => {
        cy.request({
          method: 'DELETE',
          url: `${API_URLS.TENANT_API}warehouses/${warehouseId}`,
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }).then(response => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
  
  