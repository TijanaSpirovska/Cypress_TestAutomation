import { GetAuthToken } from '../Auth/Oauth2.cy';
import { API_URLS, CouponGroup_URL } from '../../../data/StaticData';
import { CouponGroup } from '../../../data/StaticData';


let access_token = '';
let postBodyCouponGroups = '';
let putBodyCouponGroups = '';


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

describe("Negative tests for creating a new Coupon Group", () => {
    it('Validation for Coupon group Name field in Create Coupon Group Page', () => {
        let updatedBodyCouponGroups = "";
        postBodyCouponGroups.data.name = "";
        updatedBodyCouponGroups = postBodyCouponGroups;
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}coupon-groups`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyCouponGroups,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage = "The [USA] name field is required.";
        expect(response.body.errors.data).to.include(errorMessage);
      });
    });
  });

  describe("Negative tests for updating a Coupon Group", () => {
    it('Validation for Coupon group Name field in Edit Coupon Group Page', () => {
        let updatedBodyCouponGroups = "";
        putBodyCouponGroups.data.name = "";
        updatedBodyCouponGroups = putBodyCouponGroups;
      cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}coupon-groups/4585069d19114ca2b1aacf908f2c5dff`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyCouponGroups,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage = "The [USA] name field is required.";
        expect(response.body.errors.data).to.include(errorMessage);
      });
    });
  });