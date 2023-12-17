import { GetAuthToken } from '../Auth/Oauth2.cy'
import {API_URLS} from '../../../data/StaticData';

let access_token = '';
let postBodySystemTaxes = '';
let putBodySystemTaxes = '';
let updatedBody = '';


beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });

    cy.fixture('postBodySystemTaxes.json').then((postBodySystemTaxesData) => {
        postBodySystemTaxes = postBodySystemTaxesData;
    });

    cy.fixture('putBodySystemTaxes.json').then((putBodySystemTaxesData) => {
        putBodySystemTaxes = putBodySystemTaxesData;
    });
});


describe("Negative tests for creating System Taxes", () => {
    it("Validation for Tax Name field in Create System Tax Page", () => {
        postBodySystemTaxes.name = "";
        updatedBody = postBodySystemTaxes;
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}configuration/system-taxes`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode:false
            
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Tax Key field in Create System Tax Page", () => {
        postBodySystemTaxes.key = "";
        updatedBody = postBodySystemTaxes;
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}configuration/system-taxes`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode:false
            
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Tax Category Name field in Create System Tax Page", () => {
        postBodySystemTaxes.tax_categories[0].name = "";
        updatedBody = postBodySystemTaxes;
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}configuration/system-taxes`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode:false
            
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Tax Category Country field in Create System Tax Page", () => {
        postBodySystemTaxes.tax_categories[0].country_code = "";
        updatedBody = postBodySystemTaxes;
        cy.writeFile('.data/test.txt',updatedBody);
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}configuration/system-taxes`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode:false
            
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Tax Rate field in Create System Tax Page", () => {
        postBodySystemTaxes.tax_categories[0].rate= "";
        updatedBody = postBodySystemTaxes;
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}configuration/system-taxes`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode:false
            
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });
  })

describe("Negative tests for updating System Taxes", () => {
    it("Validation for Tax Name field in Edit System Tax Page", () => {
        putBodySystemTaxes.name = "";
        updatedBody = putBodySystemTaxes;
            cy.request({
                method: 'PUT',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}configuration/system-taxes/4d71119644de41b3a45d5d8d31ee87a6`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode:false
            
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Tax Key field in Edit System Tax Page", () => {
        putBodySystemTaxes.key = "";
        updatedBody = putBodySystemTaxes;
            cy.request({
                method: 'PUT',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}configuration/system-taxes/4d71119644de41b3a45d5d8d31ee87a6`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode:false
            
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Tax Category Name field in Edit System Tax Page", () => {
        putBodySystemTaxes.tax_categories[0].name = "";
        updatedBody = putBodySystemTaxes;
            cy.request({
                method: 'PUT',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}configuration/system-taxes/4d71119644de41b3a45d5d8d31ee87a6`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode:false
            
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Tax Category Country field in Edit System Tax Page", () => {
        putBodySystemTaxes.tax_categories[0].country_code = "";
        updatedBody = putBodySystemTaxes;
        cy.writeFile('.data/test.txt',updatedBody);
            cy.request({
                method: 'PUT',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}configuration/system-taxes/4d71119644de41b3a45d5d8d31ee87a6`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode:false
            
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Tax Rate field in Edit System Tax Page", () => {
        putBodySystemTaxes.tax_categories[0].rate= "";
        updatedBody = putBodySystemTaxes;
            cy.request({
                method: 'PUT',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}configuration/system-taxes/4d71119644de41b3a45d5d8d31ee87a6`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode:false
            
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });
})