import { GetAuthToken } from '../Auth/Oauth2.cy';
import { API_URLS, Coupon_URL } from '../../../data/StaticData';
import { Coupons } from '../../../data/StaticData';


let access_token = '';
let postBodyCoupons = '';
let putBodyCoupons = '';


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

describe("Negative tests for creating a new Coupon", () => {
    it('Validation for Coupon Code field in Create Coupon Page', () => {
    let updatedBodyCoupons = "";
    postBodyCoupons.code = "";
    updatedBodyCoupons = postBodyCoupons;
    
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}coupons`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyCoupons,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage = "The Code field is required.";
        expect(response.body.errors.code).to.include(errorMessage);
      });
    });

    // it('Validation for Coupon Value field in Create Coupon Page', () => {
    //     let updatedBodyCoupons = "";
    //     postBodyCoupons.value = -10  ;
    //     updatedBodyCoupons = postBodyCoupons;
    //     cy.writeFile('.data/test.txt',updatedBodyCoupons);
    //       cy.request({
    //         method: 'POST',
    //         url: `${API_URLS.TENANT_API}coupons`,
    //         headers: {
    //           Authorization: `Bearer ${access_token}`,
    //           accept: 'application/json'
    //         },
    //         body: updatedBodyCoupons,
    //         // failOnStatusCode: false
    //       }).then(response => {
    //         expect(response.status).to.eq(422);
    //         const errorMessage = "The Value field is required.";
    //         expect(response.body.errors.value).to.include(errorMessage);
    //       });
    //     });

    // it('Validation for Coupon Value field in Create Coupon Page', () => {
    //     let updatedBodyCoupons = "";
    //     postBodyCoupons.value = null  ;
    //     updatedBodyCoupons = postBodyCoupons;
    //     cy.writeFile('.data/test.txt',updatedBodyCoupons);
    //       cy.request({
    //         method: 'POST',
    //         url: `${API_URLS.TENANT_API}coupons`,
    //         headers: {
    //           Authorization: `Bearer ${access_token}`,
    //           accept: 'application/json'
    //         },
    //         body: updatedBodyCoupons,
    //         // failOnStatusCode: false
    //       }).then(response => {
    //         expect(response.status).to.eq(422);
    //         const errorMessage = "The Value field is required.";
    //         expect(response.body.errors.value).to.include(errorMessage);
    //       });
    //     });
  });

describe("Negative tests for updating a Coupon", () => {
  it('Validation for Coupon Code field in Edit Coupon Page', () => {
  let updatedBodyCoupons = "";
  putBodyCoupons.code = "";
  updatedBodyCoupons = putBodyCoupons;
  
    cy.request({
      method: 'PUT',
      url: `${API_URLS.TENANT_API}coupons/e6c08880a2f24a96a2beb1e10aa68c92`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: updatedBodyCoupons,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(422);
      const errorMessage = "The Code field is required.";
      expect(response.body.errors.code).to.include(errorMessage);
    });
  });

  // it('Validation for Coupon Value field in Edit Coupon Page', () => {
  //     let updatedBodyCoupons = "";
  //     putBodyCoupons.value = -10  ;
  //     updatedBodyCoupons = putBodyCoupons;
  //     cy.writeFile('.data/test.txt',updatedBodyCoupons);
  //       cy.request({
  //         method: 'PUT',
  //         url: `${API_URLS.TENANT_API}coupons/e6c08880a2f24a96a2beb1e10aa68c92`,
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //           accept: 'application/json'
  //         },
  //         body: updatedBodyCoupons,
  //         // failOnStatusCode: false
  //       }).then(response => {
  //         expect(response.status).to.eq(422);
  //         const errorMessage = "The Value field is required.";
  //         expect(response.body.errors.value).to.include(errorMessage);
  //       });
  //     });

  // it('Validation for Coupon Value field in Edit Coupon Page', () => {
  //     let updatedBodyCoupons = "";
  //     putBodyCoupons.value = null  ;
  //     updatedBodyCoupons = putBodyCoupons;
  //     cy.writeFile('.data/test.txt',updatedBodyCoupons);
  //       cy.request({
  //         method: 'PUT',
  //         url: `${API_URLS.TENANT_API}coupons/e6c08880a2f24a96a2beb1e10aa68c92`,
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //           accept: 'application/json'
  //         },
  //         body: updatedBodyCoupons,
  //         // failOnStatusCode: false
  //       }).then(response => {
  //         expect(response.status).to.eq(422);
  //         const errorMessage = "The Value field is required.";
  //         expect(response.body.errors.value).to.include(errorMessage);
  //       });
  //     });
});