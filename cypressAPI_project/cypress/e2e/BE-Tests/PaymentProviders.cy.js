// import { getAuthToken } from '../authentications/auth'
// // import { API_URLS, API_ENDPOINTS } from '../config/apiConfig'
// const { API_URLS, API_ENDPOINTS } = require(`../config/${require('../settings').ENV}.js`);
// import '../commands'

import { GetAuthToken } from './Auth/Oauth2.cy'
import { LIMIT, PaymentProviders, API_URLS, PAYMENTPROVIDERS_URL } from '../../data/StaticData';
import '../../support/commands'

let access_token = '';
let putBodyStripe = '';
let putBodyStripe1 = '';
let putBodySquare = '';
let putBodySquare1 = '';
let putBodyPayPal = '';
let putBodyPayPal1 = '';
let putBodyBankart = '';
let putBodyBankart1 = '';
let putBodyHalkBank = '';
let putBodyHalkBank1 = '';
let responseBody = '';

beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });
    cy.fixture('putBodyStripe.json').then((putBodyStripeData) => {
        putBodyStripe = putBodyStripeData;
    });
    cy.fixture('putBodyStripe1.json').then((putBodyStripeData1) => {
        putBodyStripe1 = putBodyStripeData1;
    });
    cy.fixture('putBodySquare.json').then((putBodySquareData) => {
        putBodySquare = putBodySquareData;
    });
    cy.fixture('putBodySquare1.json').then((putBodySquareData1) => {
        putBodySquare1 = putBodySquareData1;
    });
    cy.fixture('putBodyPayPal.json').then((putBodyPayPalData) => {
        putBodyPayPal = putBodyPayPalData;
    });
    cy.fixture('putBodyPayPal1.json').then((putBodyPayPalData1) => {
        putBodyPayPal1 = putBodyPayPalData1;
    });
    cy.fixture('putBodyBankart.json').then((putBodyBankartData) => {
        putBodyBankart = putBodyBankartData;
    });
    cy.fixture('putBodyBankart1.json').then((putBodyBankartData1) => {
        putBodyBankart1 = putBodyBankartData1;
    });
    cy.fixture('putBodyHalkBank.json').then((putBodyHalkBankData) => {
        putBodyHalkBank = putBodyHalkBankData;
    });
    cy.fixture('putBodyHalkBank1.json').then((putBodyHalkBankData1) => {
        putBodyHalkBank1 = putBodyHalkBankData1;
    });
});

describe("Get all Information", () => {
    it('Get All Payment Providers', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            responseBody = response.body
            cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.equal(200)
        });
    });
});

describe("Stripe update", () => {

    it("Update1 a Stripe Provider", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/1`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: putBodyStripe

        }).then((response) => {
            responseBody = response.body
            //   cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("message", "Successfully updated Payment Provider data!")
        });
    });
    it("Update2 a Stripe Provider", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/1`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: putBodyStripe1

        }).then((response) => {
            responseBody = response.body
            cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("message", "Successfully updated Payment Provider data!")
        });
    });
});

describe("Square update", () => {

    it("Update1 the Square Provider", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/2`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: putBodySquare

        }).then((response) => {
            responseBody = response.body
            //   cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("message", "Successfully updated Payment Provider data!")
        });
    });
    it("Update2 the Square Provider", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/2`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: putBodySquare1

        }).then((response) => {
            responseBody = response.body
            //   cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("message", "Successfully updated Payment Provider data!")
        });
    });
});
describe("PayPal update", () => {

    it("Update1 the PayPal Provider", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/3`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: putBodyPayPal

        }).then((response) => {
            responseBody = response.body
            // cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("message", "Successfully updated Payment Provider data!")
        });
    });
    it("Update2 the PayPal Provider", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/3`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: putBodyPayPal1

        }).then((response) => {
            responseBody = response.body
            // cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("message", "Successfully updated Payment Provider data!")
        });
    });

});
describe("Bankart update", () => {

    it("Update1 the Bankart Provider", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/4`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: putBodyBankart

        }).then((response) => {
            responseBody = response.body
            // cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("message", "Successfully updated Payment Provider data!")
        });
    });
    it("Update2 the Bankart Provider", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/4`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: putBodyBankart1

        }).then((response) => {
            responseBody = response.body
            // cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("message", "Successfully updated Payment Provider data!")
        });
    });
});
    describe("HalkBank update", () => {

        it("Update1 the HalkBank Provider", () => {
            cy.request({
                method: "PUT",
                url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/5`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: "*/*",
                    "Content-type": "application/json",
                },
                body: putBodyHalkBank

            }).then((response) => {
                responseBody = response.body
                // cy.writeFile('.data/test.txt', responseBody);
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property("message", "Successfully updated Payment Provider data!")
            });
        });
        it("Update2 the HalkBank Provider", () => {
            cy.request({
                method: "PUT",
                url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/5`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: "*/*",
                    "Content-type": "application/json",
                },
                body: putBodyHalkBank1

            }).then((response) => {
                responseBody = response.body
                // cy.writeFile('.data/test.txt', responseBody);
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property("message", "Successfully updated Payment Provider data!")
            });
        });
    });

