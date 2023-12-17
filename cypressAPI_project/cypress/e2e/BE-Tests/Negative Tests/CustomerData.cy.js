import { GetAuthToken } from '../Auth/Oauth2.cy';
import { API_URLS, CustomerData_URL} from '../../../data/StaticData';



let access_token = '';
let updatedBody = '';
let postCustomerAttributes = '';
let putCustomerAttributes = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('postBodyCustomerData.json').then((postBodyCustomerData) => {
    postCustomerAttributes  = postBodyCustomerData;
  });

  cy.fixture('putBodyCustomerData.json').then((putBodyCustomerData) => {
    putCustomerAttributes = putBodyCustomerData;
  });
});

describe("Negative tests for creating a new Customer Attribute", () => {
    it('Validation for Customer Attribute Name field in Create Customer Attribute Page', () => {
        postCustomerAttributes.name = "";
        updatedBody = postCustomerAttributes;
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}customer-attributes`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBody,
        failOnStatusCode: false 
      }).then(response => {
        expect(response.status).to.eq(422);
      });
    });

    it('Validation for Customer Attribute type field in Create Customer Attribute Page', () => {
        postCustomerAttributes.type = "";
        updatedBody = postCustomerAttributes;
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}customer-attributes`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBody,
        failOnStatusCode: false 
      }).then(response => {
        expect(response.status).to.eq(422);
      });
    });
  });

describe("Negative tests for creating a new Customer Attribute", () => {
    it('Validation for Customer Attribute Name field in Edit Customer Attribute Page', () => {
        putCustomerAttributes.name = "";
        updatedBody = putCustomerAttributes;
        cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}customer-attributes/b2e55b8dc8814d1ea30fd014850cb01f`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBody,
        failOnStatusCode: false 
        }).then(response => {
        expect(response.status).to.eq(422);
        });
    });

    it('Validation for Customer Attribute type field in Edit Customer Attribute Page', () => {
        putCustomerAttributes.type = "";
        updatedBody = putCustomerAttributes;
        cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}customer-attributes/b2e55b8dc8814d1ea30fd014850cb01f`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBody,
        failOnStatusCode: false 
        }).then(response => {
        expect(response.status).to.eq(422);
        });
    });
});

describe("Delete customer attribute", () => {
  it('Delete newly created customer attribute', () => {
      cy.request({
        method: 'DELETE',
        url: `${API_URLS.TENANT_API}customer-attributes/b2e55b8dc8814d1ea30fd014850cb01f`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(response => {
        expect(response.status).to.eq(422);
      });
    });
});
