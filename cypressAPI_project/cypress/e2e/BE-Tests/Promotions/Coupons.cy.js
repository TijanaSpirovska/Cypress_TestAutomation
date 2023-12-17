import { GetAuthToken } from '../Auth/Oauth2.cy';
import { API_URLS, Coupon_URL } from '../../../data/StaticData';
import { Coupons } from '../../../data/StaticData';
import '../../../support/commands'

let access_token = '';
let postBodyCoupons = '';
let putBodyCoupons = '';
let responseBody = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('postBodyCoupons.json').then((postBodyCouponsData) => {
    postBodyCoupons = postBodyCouponsData;
  });

  cy.fixture('putBodyCoupons.json').then((putBodyCouponsData) => {
    putBodyCoupons = putBodyCouponsData;
  });
});

describe("Get all Information", () => {
  it('Get all Coupons', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${Coupon_URL.Get_All_Coupon}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data')
    });
  });
});

describe("Create a coupons ", () => {
  it('Creating a new coupons ', () => {
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}coupons`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: postBodyCoupons
    }).then(response => {
      responseBody = response.body;
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Successfully created coupon!");
    });
  });
});

describe("Verify that the coupon  has been created", () => {
  it('Filter new coupon  by code', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${Coupon_URL.Filter_Code_Coupon}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      responseBody = response.body;
      
      expect(response.status).to.eq(200);
      cy.writeFile('.data/test.txt',responseBody);
    //   expect(response.body.data[0].name).to.eq(`{"USA":"${CouponGroup.Name}"}`);
      expect(response.body).to.have.property('data')

    });
  });
  
  it('Filter new coupon  by status', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${Coupon_URL.Filter_Status_Coupon}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      responseBody = response.body;
      
      expect(response.status).to.eq(200);
      cy.writeFile('.data/test.txt',responseBody);
    //   expect(response.body.data[0].name).to.eq(`{"USA":"${CouponGroup.Name}"}`);
      expect(response.body).to.have.property('data')

    });
  });

  it('Filter coupon by valid from', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${Coupon_URL.Filter_ValidFrom_Coupon}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].valid_from).to.eq(Coupons.Filter_validFrom);
      expect(response.body).to.have.property('data')
    });
  });
  it('Filter coupon  by valid to', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${Coupon_URL.Filter_ValidTo_Coupon}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data[0].valid_to).to.eq(Coupons.Filter_validTo);
    });
  });
});

describe("Coupon  update", () => {
  it("Update coupon croup", () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
        cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}coupons/${unique_id}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
            accept: "*/*",
            "Content-type": "application/json",
          },
          body: putBodyCoupons, // Use the updated putBodyCouponGroups here
        }).then((response) => {
            expect(response.status).to.eq(200);
            // expect(response.body.message).to.eq("Successfully updated Coupon Group data!");
        });
      });
    });
  });

describe("Verify that the coupon croup has been updated", () => {
  it('Retrieve the name of the new coupon croup', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${Coupon_URL.Filter_Updated_Coupon}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});


describe("Delete coupon ", () => {
  it('Delete newly created coupon', () => {
    cy.getID(responseBody).then(takenId => {
      cy.request({
        method: 'DELETE',
        url: `${API_URLS.TENANT_API}coupons/${takenId}`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        // expect(response.body.message).to.eq("Successfully deleted coupon!");
      });
    });
  });
});

describe("Verify the coupon is deleted", () => {
    it('Verify the coupon is successfully deleted', () => {
        cy.request({
          method: 'GET',
          url: `${API_URLS.TENANT_API}${Coupon_URL.Filter_Code_Coupon}`,
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