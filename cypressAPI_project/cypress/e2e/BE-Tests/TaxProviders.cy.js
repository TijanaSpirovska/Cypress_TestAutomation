// import { getAuthToken } from '../authentications/auth'
// // import { API_URLS, API_ENDPOINTS } from '../config/apiConfig'
// const { API_URLS, API_ENDPOINTS } = require(`../config/${require('../settings').ENV}.js`);
// import '../commands'

import { GetAuthToken } from './Auth/Oauth2.cy'
import { API_URLS, TAXPROVIDERS_URL } from '../../data/StaticData';
import '../../support/commands'

let access_token = '';
let putBodyTaxJar = '';
let putBodyTaxJar1 = '';
let putBodyVertex = '';
let putBodyVertex1 = '';
let putBodyTaxAvalara = '';
let putBodyTaxAvalara1 = '';
let responseBody = '';

beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });
    cy.fixture('putBodyTaxJar.json').then((putBodyTaxJarData) => {
        putBodyTaxJar = putBodyTaxJarData;
    });
    cy.fixture('putBodyTaxJar1.json').then((putBodyTaxJarData1) => {
        putBodyTaxJar1 = putBodyTaxJarData1;
    });
    cy.fixture('putBodyVertex.json').then((putBodyVertexData) => {
        putBodyVertex = putBodyVertexData;
    });
    cy.fixture('putBodyVertex1.json').then((putBodyVertexData1) => {
        putBodyVertex1 = putBodyVertexData1;
    });
    cy.fixture('putBodyTaxAvalara.json').then((putBodyTaxAvalaraData) => {
        putBodyTaxAvalara = putBodyTaxAvalaraData;
    });
    cy.fixture('putBodyTaxAvalara1.json').then((putBodyTaxAvalaraData1) => {
        putBodyTaxAvalara1 = putBodyTaxAvalaraData1;
    });
});
describe("Get all Information", () => {
    it('Get All Tax Providers', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}`,
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
describe("Tax Providers update", () => {
 
    it("Update TaxJar", () => {
          cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/1`,
            headers: {
              Authorization: `Bearer ${access_token}`,
              accept: "*/*",
              "Content-type": "application/json",
            },
              body: putBodyTaxJar
            
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property("message", "Successfully updated Tax Provider data!")
          });
        });
        it("Update 2 TaxJar", () => {
            cy.request({
              method: "PUT",
              url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/1`,
              headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
              },
                body: putBodyTaxJar1
              
              }).then((response) => {
                  expect(response.status).to.eq(200);
                  expect(response.body).to.have.property("message", "Successfully updated Tax Provider data!")
            });
          });
        //   it("Update Avalara", () => {
        //     cy.request({
        //       method: "PUT",
        //       url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/2`,
        //       headers: {
        //         Authorization: `Bearer ${access_token}`,
        //         accept: "*/*",
        //         "Content-type": "application/json",
        //       },
        //         body: putBodyTaxAvalara1
        //       }).then((response) => {
        //           expect(response.status).to.eq(200);
        //           expect(response.body).to.have.property("message", "Successfully updated Tax Provider data!")
        //     });
        //   });
        //   it("Update 2 Avalara", () => {
        //       cy.request({
        //         method: "PUT",
        //         url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/2`,
        //         headers: {
        //           Authorization: `Bearer ${access_token}`,
        //           accept: "*/*",
        //           "Content-type": "application/json",
        //         },
        //           body: putBodyTaxAvalara
                
        //         }).then((response) => {
        //             expect(response.status).to.eq(200);
        //             expect(response.body).to.have.property("message", "Successfully updated Tax Provider data!")
        //       });
        //     });
            it("Update Vertex", () => {
                cy.request({
                  method: "PUT",
                  url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/3`,
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: "*/*",
                    "Content-type": "application/json",
                  },
                    body: putBodyVertex
                  }).then((response) => {
                      expect(response.status).to.eq(200);
                      expect(response.body).to.have.property("message", "Successfully updated Tax Provider data!")
                });
              });
              it("Update 2 Vertex", () => {
                  cy.request({
                    method: "PUT",
                    url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/3`,
                    headers: {
                      Authorization: `Bearer ${access_token}`,
                      accept: "*/*",
                      "Content-type": "application/json",
                    },
                      body: putBodyVertex1        
                    }).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body).to.have.property("message", "Successfully updated Tax Provider data!")
                  });
                });
      });

  