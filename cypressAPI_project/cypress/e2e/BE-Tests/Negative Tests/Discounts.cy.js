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



describe("Negative tests for creating a new Discount", () => {
    it('Validation for Discount Name field in Create Discount Page', () => {
    let updatedBodyDiscounts = "";
    postBodyDiscounts.name = "";
    updatedBodyDiscounts = postBodyDiscounts;
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}discounts`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyDiscounts,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage = "The name field is required.";
        expect(response.body.errors.name).to.include(errorMessage);
      });
    });

    it('Validation for Discount Value field in Create Discount Page', () => {
        let updatedBodyDiscounts = "";
        postBodyDiscounts.value = "";
        updatedBodyDiscounts = postBodyDiscounts;
          cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}discounts`,
            headers: {
              Authorization: `Bearer ${access_token}`,
              accept: 'application/json'
            },
            body: updatedBodyDiscounts,
            failOnStatusCode: false
          }).then(response => {
            expect(response.status).to.eq(422);
            const errorMessage = "The value field is required.";
            expect(response.body.errors.value).to.include(errorMessage);
          });
        });

    it('Validation for Discount Active From field in Create Discount Page', () => {
        let updatedBodyDiscounts = "";
        postBodyDiscounts.active_from = "";
        updatedBodyDiscounts = postBodyDiscounts;
            cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}discounts`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyDiscounts,
            failOnStatusCode: false
            }).then(response => {
            expect(response.status).to.eq(422);
            const errorMessage = "The active from field is required.";
            expect(response.body.errors.active_from).to.include(errorMessage);
            });
        });
    // it('Validation for Discount Active to field in Create Discount Page', () => {
    //     let updatedBodyDiscounts = "";
    //     postBodyDiscounts.active_to = "";
    //     updatedBodyDiscounts = postBodyDiscounts;
    //     cy.writeFile('.data/test.txt',updatedBodyDiscounts);
    //         cy.request({
    //         method: 'POST',
    //         url: `${API_URLS.TENANT_API}discounts`,
    //         headers: {
    //             Authorization: `Bearer ${access_token}`,
    //             accept: 'application/json'
    //         },
    //         body: updatedBodyDiscounts,
    //         // failOnStatusCode: false
    //         }).then(response => {
    //         expect(response.status).to.eq(422);
    //         const errorMessage = "The active to field is required.";
    //         expect(response.body.errors.active_to).to.include(errorMessage);
    //         });
    //     });
  });
  
describe("Negative tests for updating a  Discount", () => {
    it('Validation for Discount Name field in Edit Discount Page', () => {
    let updatedBodyDiscounts = "";
    putBodyDiscounts.name = "";
    updatedBodyDiscounts = putBodyDiscounts;
        cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}discounts/8c8dd18a40174759912cf2e5778b01e3`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBodyDiscounts,
        failOnStatusCode: false
        }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage = "The name field is required.";
        expect(response.body.errors.name).to.include(errorMessage);
        });
    });

    it('Validation for Discount Value field in Edit Discount Page', () => {
        let updatedBodyDiscounts = "";
        putBodyDiscounts.value = "";
        updatedBodyDiscounts = putBodyDiscounts;
            cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}discounts/8c8dd18a40174759912cf2e5778b01e3`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyDiscounts,
            failOnStatusCode: false
            }).then(response => {
            expect(response.status).to.eq(422);
            const errorMessage = "The value field is required.";
            expect(response.body.errors.value).to.include(errorMessage);
            });
        });

    it('Validation for Discount Active From field in Edit Discount Page', () => {
        let updatedBodyDiscounts = "";
        putBodyDiscounts.active_from = "";
        updatedBodyDiscounts = putBodyDiscounts;
            cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}discounts/8c8dd18a40174759912cf2e5778b01e3`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyDiscounts,
            failOnStatusCode: false
            }).then(response => {
            expect(response.status).to.eq(422);
            const errorMessage = "The active from field is required.";
            expect(response.body.errors.active_from).to.include(errorMessage);
            });
        });
    // it('Validation for Discount Active to field in Edit Discount Page', () => {
    //     let updatedBodyDiscounts = "";
    //     putBodyDiscounts.active_to = "";
    //     updatedBodyDiscounts = putBodyDiscounts;
    //     cy.writeFile('.data/test.txt',updatedBodyDiscounts);
    //         cy.request({
    //         method: 'PUT',
    //         url: `${API_URLS.TENANT_API}discounts/8c8dd18a40174759912cf2e5778b01e3`,
    //         headers: {
    //             Authorization: `Bearer ${access_token}`,
    //             accept: 'application/json'
    //         },
    //         body: updatedBodyDiscounts,
    //         // failOnStatusCode: false
    //         }).then(response => {
    //         expect(response.status).to.eq(422);
    //         const errorMessage = "The active to field is required.";
    //         expect(response.body.errors.active_to).to.include(errorMessage);
    //         });
    //     });
});