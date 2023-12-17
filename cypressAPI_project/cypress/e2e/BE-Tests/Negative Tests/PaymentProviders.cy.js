import { GetAuthToken } from '../Auth/Oauth2.cy'
import {  API_URLS, PAYMENTPROVIDERS_URL } from '../../../data/StaticData';


let access_token = '';
let putBodyStripe = '';
let putBodySquare = '';
let putBodyPayPal = '';
let putBodyBankart = '';
let putBodyHalkBank = '';
let updatedBody = '' ;


beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });
    cy.fixture('putBodyStripe.json').then((putBodyStripeData) => {
        putBodyStripe = putBodyStripeData;
    });
    cy.fixture('putBodySquare.json').then((putBodySquareData) => {
        putBodySquare = putBodySquareData;
    });
    cy.fixture('putBodyPayPal.json').then((putBodyPayPalData) => {
        putBodyPayPal = putBodyPayPalData;
    });
    cy.fixture('putBodyBankart.json').then((putBodyBankartData) => {
        putBodyBankart = putBodyBankartData;
    });
    cy.fixture('putBodyHalkBank.json').then((putBodyHalkBankData) => {
        putBodyHalkBank = putBodyHalkBankData;
    });
});


describe("Negative tests for updating Stripe payment provider", () => {

    it("Validation for Stripe Public Key field in Update Payment provider Stripe Page", () => {
        putBodyStripe.cfg['STRIPE_KEY'] = "";
        updatedBody = putBodyStripe;
        putBodyStripe.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/1`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Stripe Secret Key field in Update Payment provider Stripe Page", () => {
        putBodyStripe.cfg['STRIPE_SECRET'] = "";
        updatedBody = putBodyStripe;
        putBodyStripe.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/1`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });
})

describe("Negative tests for updating Sguare payment provider", () => {

    it("Validation for Square Application ID field in Update Payment provider Square Page", () => {
        putBodySquare.cfg['SQUARE_APPLICATION_ID'] = "";
        updatedBody = putBodySquare;
        putBodySquare.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/2`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Square Token field in Update Payment provider Squre Page", () => {
        putBodySquare.cfg['SQUARE_TOKEN'] = "";
        updatedBody = putBodySquare;
        putBodySquare.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/2`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Square Location field in Update Payment provider Squre Page", () => {
        putBodySquare.cfg['SQUARE_LOCATION'] = "";
        updatedBody = putBodySquare;
        putBodySquare.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/2`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });


})

describe("Negative tests for updating PayPal payment provider", () => {

    it("Validation for PayPal Clinet ID field in Update Payment provider PayPal Page", () => {
        putBodyPayPal.cfg['PAYPAL_SANDBOX_CLIENT_ID'] = "";
        updatedBody = putBodyPayPal;
        putBodyPayPal.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/3`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for PayPal Client Secret field in Update Payment provider PayPal Page", () => {
        putBodyPayPal.cfg['PAYPAL_SANDBOX_CLIENT_SECRET'] = "";
        updatedBody = putBodyPayPal;
        putBodyPayPal.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/3`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });


})

describe("Negative tests for updating Bankart payment provider", () => {

    it("Validation for Bankart API Key field in Update Payment provider Bankart Page", () => {
        putBodyBankart.cfg['BANKART_API_KEY'] = "";
        updatedBody = putBodyBankart;
        putBodyBankart.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/4`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Bankart Shared Secret  field in Update Payment provider Bankart Page", () => {
        putBodyBankart.cfg['BANKART_SHARED_SECRET'] = "";
        updatedBody = putBodyBankart;
        putBodyBankart.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/4`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Bankart Public Integration Key field in Update Payment provider Bankart Page", () => {
        putBodyBankart.cfg['BANKART_PUBLIC_INTEGRATION_KEY'] = "";
        updatedBody = putBodyBankart;
        putBodyBankart.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/4`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Bankart Username field in Update Payment provider Bankart Page", () => {
        putBodyBankart.cfg['BANKART_USERNAME'] = "";
        updatedBody = putBodyBankart;
        putBodyBankart.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/4`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Bankart Password field in Update Payment provider Bankart Page", () => {
        putBodyBankart.cfg['BANKART_PASSWORD'] = "";
        updatedBody = putBodyBankart;
        putBodyBankart.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/4`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Bankart URL field in Update Payment provider Bankart Page", () => {
        putBodyBankart.cfg['BANKART_URL'] = "";
        updatedBody = putBodyBankart;
        putBodyBankart.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/4`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });
})

describe("Negative tests for updating Halkbank payment provider", () => {

    it("Validation for Halkbank URL field in Update Payment provider Halkbank Page", () => {
        putBodyHalkBank.cfg['HALKBANK_URL'] = "";
        updatedBody = putBodyHalkBank;
        putBodyHalkBank.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/5`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Halkbank Clinet ID field in Update Payment provider Halkbank Page", () => {
        putBodyHalkBank.cfg['HALKBANK_CLIENT_ID'] = "";
        updatedBody = putBodyHalkBank;
        putBodyHalkBank.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/5`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Halkbank Store Key field in Update Payment provider Halkbank Page", () => {
        putBodyHalkBank.cfg['HALKBANK_STORE_KEY'] = "";
        updatedBody = putBodyHalkBank;
        putBodyHalkBank.status = true;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${PAYMENTPROVIDERS_URL.Get_All_PaymentProviders}/5`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBody,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });


})