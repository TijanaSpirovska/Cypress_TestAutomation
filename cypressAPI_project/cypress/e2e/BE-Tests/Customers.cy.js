import { GetAuthToken } from './Auth/Oauth2.cy'
import { Customers, API_URLS, CUSTOMER_URL } from '../../data/StaticData';
import '../../support/commands'

let access_token = '';
let postBodyCustomers= '';
let putBodyCustomers = '';
let responseBody = '';

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

describe("Get all Information", () => {
  it('Get all customers', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CUSTOMER_URL.Get_All_Customers}`,
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

describe("Create a customer", () => {
  it('Creating a new customer', () => {
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}customers`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: postBodyCustomers
    }).then(response => {
      responseBody = response.body;
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Successfully created customer!");
    });
  });
});

describe("Verify that the customer has been created", () => {
  it('Filter new customer by first name', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CUSTOMER_URL.Filter_FirstName_Customers}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      responseBody = response.body;
      cy.writeFile('.data/test.txt',responseBody);
      expect(response.status).to.eq(200);
      // expect(response.body.data[0].first_name).to.eq(`${Customers.First_Name}`);

    });
  });
  it('Filter new customer by last name', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CUSTOMER_URL.Filter_LastName_Customers}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      cy.writeFile('.data/test.txt',responseBody);
      // expect(response.body.data[0].last_name).to.eq(`${Customers.Last_Name}`);
      expect(response.body).to.have.property('data')
    });
  });
  it('Filter new customer by username', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CUSTOMER_URL.Filter_Username_Customers}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].email).to.eq(`${Customers.Username}`);
      expect(response.body).to.have.property('data')
    });
  });
  it('Filter new customer by customer email', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CUSTOMER_URL.Filter_CustomerEmail_Customers}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].customer_email).to.eq(`${Customers.Customer_email}`);
      expect(response.body).to.have.property('data')
    });
  });
  it('Filter new customer by phone', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CUSTOMER_URL.Filter_Phone_Customers}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      // expect(response.body.data[0].phone).to.eq(Customers.Phone);  // da se prasha utre
    });
  });
});

describe("Customer update", () => {
  beforeEach(() => {
    cy.getCustomerAddress1(responseBody).then((customerAddress1) => {
      cy.getCustomerAddress2(responseBody).then((customerAddress2)=> {
        cy.getCustomerId1(responseBody).then((customerId1)=>{
          cy.getCustomerId2(responseBody).then((customerId2)=>{
              return cy.getID(responseBody).then((takenId) => {
                putBodyCustomers.address_list[0].id = customerAddress1;
                putBodyCustomers.address_list[0].customer_id = customerId1;
                putBodyCustomers.address_list[1].id = customerAddress2;
                putBodyCustomers.address_list[1].customer_id = customerId2;
                putBodyCustomers.id = takenId;
                // Return the updated putBodyCustomers to pass it to the next Cypress command
                return putBodyCustomers;
      });}) })})

    }).as('updatedBodyCustomers');
  });

  it("Update customer", () => {
    // Using 'cy.get' to access the updated putBodyCustomers from the 'beforeEach' 
    cy.get('@updatedBodyCustomers').then((updatedBodyCustomers) => {
      cy.getUniqueId(responseBody).then((unique_id) => {
        cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}customers/${unique_id}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
            accept: "*/*",
            "Content-type": "application/json",
          },
          body: updatedBodyCustomers, // Use the updated putBodyCustomers here
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Successfully updated Customer data!");
        });
      });
    });
  });
});

describe("Verify that the product has been updated", () => {
  it('Retrieve the name of the new product', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CUSTOMER_URL.Filter_Updated_Customers}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});


describe("Delete customer", () => {
  it('Delete newly created customer', () => {
    cy.getID(responseBody).then(takenId => {
      cy.request({
        method: 'DELETE',
        url: `${API_URLS.TENANT_API}customers/${takenId}`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Successfully deleted profile!");
      });
    });
  });
});

describe("Verify the customer is deleted", () => {
  it('Verify the customer is successfully deleted', () => {
    cy.getID(responseBody).then(takenId => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}customers/${takenId}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.empty;
      });
  });
});})