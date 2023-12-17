import { GetAuthToken } from './Auth/Oauth2.cy';
import { API_URLS, CustomerData_URL} from '../../data/StaticData';
import { CustomerData } from '../../data/StaticData';
import '../../support/commands'

let access_token = '';
let responseBody = '';
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

describe("Get all Information", () => {
  it('Get all customer attributes', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CustomerData_URL.Get_All_customerAttributes}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data')
    });
  });
});

describe("Create a customer attribute", () => {
    it('Creating a new customer attribute', () => {
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}customer-attributes`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: postCustomerAttributes
      }).then(response => {
        responseBody = response.body;
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq("Successfully created customer attribute!")
      });
    });
  });
  
  describe("Verify that the customer attribute has been created", () => {
    it('Filter new customer attribute by name', () => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}${CustomerData_URL.Filter_Name_customerAttributes}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        responseBody = response.body;
        expect(response.status).to.eq(200);
        expect(response.body.data[0].name).to.deep.equal({ USA: `${CustomerData.Name}` });
        expect(response.body).to.have.property('data')
  
      });
    });
    it('Filter new customer by type', () => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}${CustomerData_URL.Filter_Type_customerAttributes}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        cy.writeFile('.data/test.txt',responseBody);
        expect(response.body.data[0].type).to.eq(CustomerData.Type);
        expect(response.body).to.have.property('data');
      });
    });
    it('Filter new customer by required', () => {
        cy.request({
          method: 'GET',
          url: `${API_URLS.TENANT_API}${CustomerData_URL.Filter_Hidden_customerAttributes}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        }).then(response => {
          expect(response.status).to.eq(200);
          cy.writeFile('.data/test.txt',responseBody);
          // expect(response.body.data[0].required).to.eq(CustomerData.Required);
          expect(response.body).to.have.property('data');
        });
      });
});
  describe("Customer attribute update", () => {
    it("Update customer attribute", () => {
        cy.getUniqueId(responseBody).then((unique_id) => {
          cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}customer-attributes/${unique_id}`,
            headers: {
              Authorization: `Bearer ${access_token}`,
              accept: "*/*",
              "Content-type": "application/json",
            },
            body: putCustomerAttributes, 
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.message).to.eq("Successfully updated Customer Attribute data!")
          });
        });
      });
    });
  
  
  describe("Verify that the customer attribute has been updated", () => {
    it('Retrieve the name of the new customer attribute', () => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}${CustomerData_URL.Filter_updatedName_customerAttributes}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data')
      });
    });
  });
  
  
  describe("Delete customer attribute", () => {
    it('Delete newly created customer attribute', () => {
      cy.getID(responseBody).then(takenId => {
        cy.request({
          method: 'DELETE',
          url: `${API_URLS.TENANT_API}customer-attributes/${takenId}`,
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }).then(response => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
  
  describe("Verify the customer attribute is deleted", () => {
    it('Verify the customer attribute is successfully deleted', () => {
      cy.getID(responseBody).then(takenId => {
        cy.request({
          method: 'GET',
          url: `${API_URLS.TENANT_API}customer-attributes/${takenId}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        }).then(response => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.be.empty;
        });
    });
  });})