// import { getAuthToken } from '../authentications/auth'
// // import { API_URLS, API_ENDPOINTS } from '../config/apiConfig'
// const { API_URLS, API_ENDPOINTS } = require(`../config/${require('../settings').ENV}.js`);
// import '../commands'

import { GetAuthToken } from './Auth/Oauth2.cy'
import { LIMIT, ShippingProviders, API_URLS, SHIPPINGPROVIDERS_URL} from '../../data/StaticData';
import '../../support/commands'

let access_token = '';
let putBodyFedex = '';
let putBodyFedex1 = '';
let putBodyEasyPost = '';
let putBodyEasyPost1 = '';
let putBodyKolporter = '';
let putBodyKolporter1 = '';
let responseBody = '';

beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });
    cy.fixture('putBodyFedex.json').then((putBodyFedexData) => {
      putBodyFedex = putBodyFedexData;
    });
    cy.fixture('putBodyFedex1.json').then((putBodyFedexData1) => {
      putBodyFedex1 = putBodyFedexData1;
    });
    cy.fixture('putBodyFedex.json').then((putBodyEasyPostData) => {
      putBodyEasyPost = putBodyEasyPostData;
    });
    cy.fixture('putBodyEasyPost1.json').then((putBodyEasyPostData1) => {
      putBodyEasyPost1 = putBodyEasyPostData1;
    });
    cy.fixture('putBodyKolporter.json').then((putBodyKolporterData) => {
        putBodyKolporter = putBodyKolporterData;
      });
      cy.fixture('putBodyKolporter1.json').then((putBodyKolporterData1) => {
        putBodyKolporter1 = putBodyKolporterData1;
      });
});

describe("Get all Information", () => {
    it('Get All Shipping Providers', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            responseBody=response.body
            cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.equal(200)
        });
    });
});

describe("Fedex update", () => {

  it("Update1 a Fedex Provider", () => {
      cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}/1`,
          headers: {
              Authorization: `Bearer ${access_token}`,
              accept: "*/*",
              "Content-type": "application/json",
              // "Content-type": "text/plain"
          },
          body: putBodyFedex

      }).then((response) => {
          responseBody = response.body
          cy.writeFile('.data/test.txt', responseBody);
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("message", "Successfully updated Shipping Provider data!")
      });
  });
  it("Update2 a Fedex Provider", () => {
      cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}/1`,
          headers: {
              Authorization: `Bearer ${access_token}`,
              accept: "*/*",
              "Content-type": "application/json",
              // "Content-type": "text/plain"
          },
          body: putBodyFedex1

      }).then((response) => {
          responseBody = response.body
          cy.writeFile('.data/test.txt', responseBody);
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("message", "Successfully updated Shipping Provider data!")
      });
  });
});

describe("EasyPost update", () => {

  it("Update1 the EasyPost Provider", () => {
      cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}/2`,
          headers: {
              Authorization: `Bearer ${access_token}`,
              accept: "*/*",
              "Content-type": "application/json",
              // "Content-type": "text/plain"
          },
          body: putBodyEasyPost

      }).then((response) => {
          responseBody = response.body
          cy.writeFile('.data/test.txt', responseBody);
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("message", "Successfully updated Shipping Provider data!")
      });
  });
  it("Update2 the EasyPost Provider", () => {
      cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}/2`,
          headers: {
              Authorization: `Bearer ${access_token}`,
              accept: "*/*",
              "Content-type": "application/json",
          },
          body: putBodyEasyPost1
      }).then((response) => {
          responseBody = response.body
          cy.writeFile('.data/test.txt', responseBody);
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("message", "Successfully updated Shipping Provider data!")
      });
  });
});
describe("Kolporter update", () => {

    it("Update1 the Kolporter Provider", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}/3`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: putBodyKolporter
        }).then((response) => {
            responseBody = response.body
            cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("message", "Successfully updated Shipping Provider data!")
        });
    });
    it("Update2 the Kolporter Provider", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}/3`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: putBodyKolporter1
  
        }).then((response) => {
            responseBody = response.body
            cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("message", "Successfully updated Shipping Provider data!")
        });
    });
   
  });




