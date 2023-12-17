import { GetAuthToken } from '../Auth/Oauth2.cy';
import { API_URLS, CouponGroup_URL } from '../../../data/StaticData';
import { CouponGroup } from '../../../data/StaticData';
import '../../../support/commands'

let access_token = '';
let postBodyCouponGroups = '';
let putBodyCouponGroups = '';
let responseBody = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('postBodyCouponGroups.json').then((postBodyCouponGroupsData) => {
    postBodyCouponGroups = postBodyCouponGroupsData;
  });

  cy.fixture('putBodyCouponGroups.json').then((putBodyCouponGroupsData) => {
    putBodyCouponGroups = putBodyCouponGroupsData;
  });
});

describe("Get all Information", () => {
  it('Get all Coupon Groups', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CouponGroup_URL.Filter_Name_CouponGroup}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data')
    });
  });
});

describe("Create a coupon groups", () => {
  it('Creating a new coupon groups', () => {
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}coupon-groups`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: postBodyCouponGroups
    }).then(response => {
      responseBody = response.body;
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Successfully created coupon group!");
    });
  });
});

describe("Verify that the coupon croup has been created", () => {
  it('Filter new coupon group by name', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CouponGroup_URL.Filter_Name_CouponGroup}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      responseBody = response.body;
      
      expect(response.status).to.eq(200);
      cy.writeFile('.data/test.txt',responseBody);
      // expect(response.body.data[0].name).to.eq(`{"USA":"${CouponGroup.Name}"}`);
      expect(response.body).to.have.property('data')

    });
  });
  
  it('Filter coupon group card by valid from', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CouponGroup_URL.Filter_ValidFrom_CouponGroup}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].valid_from).to.eq(CouponGroup.Filter_validFrom);
      expect(response.body).to.have.property('data')
    });
  });
  it('Filter coupon group card by valid to', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CouponGroup_URL.Filter_ValidTo_CouponGroup}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data[0].valid_to).to.eq(CouponGroup.Filter_validTo);
    });
  });
});

describe("Coupon Group update", () => {
  it("Update coupon group", () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
        cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}coupon-groups/${unique_id}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
            accept: "*/*",
            "Content-type": "application/json",
          },
          body: putBodyCouponGroups, // Use the updated putBodyCouponGroups here
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Successfully updated Coupon Group data!");
        });
      });
    });
  });

describe("Verify that the coupon group has been updated", () => {
  it('Retrieve the name of the new coupon group', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CouponGroup_URL.Filter_Updated_CouponGroup}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});


describe("Delete coupon group", () => {
  it('Delete newly created coupon group', () => {
    cy.getID(responseBody).then(takenId => {
      cy.request({
        method: 'DELETE',
        url: `${API_URLS.TENANT_API}coupon-groups/${takenId}`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Successfully deleted coupon group!");
      });
    });
  });
});

describe("Verify the coupon group is deleted", () => {
    it('Verify the coupon group is successfully deleted', () => {
        cy.request({
          method: 'GET',
          url: `${API_URLS.TENANT_API}${CouponGroup_URL.Filter_Name_CouponGroup}`,
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