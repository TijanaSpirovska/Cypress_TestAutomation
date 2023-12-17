import { GetAuthToken } from '../Auth/Oauth2.cy';
import { API_URLS,DISCOUNT_URL } from '../../../data/StaticData';
import { Discounts } from '../../../data/StaticData';
import '../../../support/commands'

let access_token = '';
let postBodyDiscounts = '';
let putBodyDiscounts = '';
let responseBody = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('postBodyDiscounts.json').then((postBodyDiscountsData) => {
    postBodyDiscounts = postBodyDiscountsData;
  });

  cy.fixture('putBodyDiscounts.json').then((putBodyDiscountsData) => {
    putBodyDiscounts = putBodyDiscountsData;
  });
});

describe("Get all Information", () => {
  it('Get all discounts', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${DISCOUNT_URL.Get_All_Discounts}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data')
    });
  });
});

describe("Create a discount", () => {
  it('Creating a new discount', () => {
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}discounts`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: postBodyDiscounts
    }).then(response => {
      responseBody = response.body;
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Successfully created discount!");
    });
  });
});

describe("Verify that the discount has been created", () => {
  it('Filter new discount by name', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${DISCOUNT_URL.Filter_Name_Discounts}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      responseBody = response.body;
      
      expect(response.status).to.eq(200);
      // expect(response.body.data[0].name).to.eq(`${Discounts.Name}`);
      expect(response.body).to.have.property('data');

    });
  });
  it('Filter new discount by priority', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${DISCOUNT_URL.Filter_Priority_Discounts}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      cy.writeFile('.data/test.txt',responseBody);
      expect(response.body).to.have.property('data');
      expect(response.body.data[0].priority).to.eq(Discounts.Priority);
    });
  });
  it('Filter new discount by type', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${DISCOUNT_URL.Filter_Type_Discounts}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].type).to.eq(`${Discounts.Type}`);
    });
  });
  it('Filter new discount by value', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${DISCOUNT_URL.Filter_Value_Discounts}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].value).to.eq(Discounts.Filter_value);
    });
  });
  it('Filter new discount by active from', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${DISCOUNT_URL.Filter_ActiveFrom_Discounts}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].active_from).to.eq(Discounts.Filter_activeFrom);
    });
  });
  it('Filter new discount by active to', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${DISCOUNT_URL.Filter_ActiveTo_Discounts}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].active_to).to.eq(Discounts.Filter_activeTo);
    });
  });
});

describe("Discount update", () => {
  it("Update discount", () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
        cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}discounts/${unique_id}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
            accept: "*/*",
            "Content-type": "application/json",
          },
          body: putBodyDiscounts, // Use the updated putBodyDiscounts here
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Successfully updated Discount data!");
        });
      });
    });
  });

describe("Verify that the discount has been updated", () => {
  it('Retrieve the name of the new discount', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${DISCOUNT_URL.Filter_Updated_Discounts}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});


describe("Delete discount", () => {
  it('Delete newly created discount', () => {
    cy.getID(responseBody).then(takenId => {
      cy.request({
        method: 'DELETE',
        url: `${API_URLS.TENANT_API}discounts/${takenId}`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Successfully deleted discount!");
      });
    });
  });
});

describe("Verify the discount is deleted", () => {
    it('Verify the product is successfully deleted', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${DISCOUNT_URL.Filter_Name_Discounts}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        }).then(response => {
            responseBody = response.body;
            expect(response.status).to.eq(200);
            // expect(response.body.data).to.be.empty;

        });
    })
})
