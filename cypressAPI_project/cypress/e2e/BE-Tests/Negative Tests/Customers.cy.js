import { GetAuthToken } from '../Auth/Oauth2.cy'
import { API_URLS} from '../../../data/StaticData';

let access_token = '';
let postBodyCustomers= '';
let putBodyCustomers = '';
let updatedBodyCustomers = "";


beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('postBodyCustomers.json').then((postBodyCustomersData) => {
    postBodyCustomers = postBodyCustomersData;
  });

  cy.fixture('putBodyCustomers.json').then((putBodyCustomersData) => {
    putBodyCustomers = putBodyCustomersData;
  });
});



describe("Negative tests for creating a new Customer", () => {
    it('Validation for Customer Username field in Create Customer Page', () => {
        postBodyCustomers.email = "";
        updatedBodyCustomers = postBodyCustomers;
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}customers`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyCustomers,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(422);
        // const errorMessage = "The [USA] name field is required.";
        // expect(response.body.errors.data).to.include(errorMessage);
      });
    });

    it('Validation for Customer First Name field in Create Customer Page', () => {
        postBodyCustomers.first_name = "";
        updatedBodyCustomers = postBodyCustomers;
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}customers`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyCustomers,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage =  "The first name field is required.";
        expect(response.body.errors.first_name).to.include(errorMessage);
      });
    });

    it('Validation for Customer Last Name field in Create Customer Page', () => {
        postBodyCustomers.last_name = "";
        updatedBodyCustomers = postBodyCustomers;
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}customers`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyCustomers,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage =  "The last name field is required.";
        expect(response.body.errors.last_name).to.include(errorMessage);
      });
    });

    // it('Validation for Customer Billing Address Name field in Create Customer Page', () => {
    //     postBodyCustomers.address_list[1].zip_code = "";
    //     updatedBodyCustomers = postBodyCustomers;
    //     cy.writeFile('.data/test.txt',updatedBodyCustomers);
    //   cy.request({
    //     method: 'POST',
    //     url: `${API_URLS.TENANT_API}customers`,
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,
    //       accept: 'application/json'
    //     },
    //     body: updatedBodyCustomers,
    //     // failOnStatusCode: false
    //   }).then(response => {
    //     expect(response.status).to.eq(422);
    //     const errorMessage =  "The last name field is required.";
    //     expect(response.body.errors.last_name).to.include(errorMessage);
    //   });
    // });
  });

describe("Negative tests for updating a new Customer", () => {
    
    it('Validation for Customer Username field in Edit Customer Page', () => {
        putBodyCustomers.email = "";
        updatedBodyCustomers = putBodyCustomers;
      cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}customers/2030543f5afa4a78bfc3e91e1ef7c42a`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyCustomers,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(422);
        // const errorMessage = "The [USA] name field is required.";
        // expect(response.body.errors.data).to.include(errorMessage);
      });
    });

    it('Validation for Customer First Name field in Edit Customer Page', () => {
        putBodyCustomers.first_name = "";
        updatedBodyCustomers = putBodyCustomers;
      cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}customers/2030543f5afa4a78bfc3e91e1ef7c42a`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyCustomers,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage =  "The first name field is required.";
        expect(response.body.errors.first_name).to.include(errorMessage);
      });
    });

    it('Validation for Customer Last Name field in Edit Customer Page', () => {
        putBodyCustomers.last_name = "";
        updatedBodyCustomers = putBodyCustomers;
      cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}customers/2030543f5afa4a78bfc3e91e1ef7c42a`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyCustomers,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage =  "The last name field is required.";
        expect(response.body.errors.last_name).to.include(errorMessage);
      });
    });
  })
// describe("Negative tests for deleting customers",()=>{
//     it('Delete newly created customer', () => {
//         cy.request({
//           method: 'DELETE',
//           url: `${API_URLS.TENANT_API}customers/2030543f5afa4a78bfc3e91e1ef7c42a`,
//           headers: {
//             Authorization: `Bearer ${access_token}`
//           }
//         }).then(response => {
//           expect(response.status).to.eq(422);
//         });
//       });
// });

