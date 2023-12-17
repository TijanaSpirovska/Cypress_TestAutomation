import { GetAuthToken } from './Auth/Oauth2.cy'
import '../../support/commands'
import {API_URLS, SYSTEMTAXES_URL } from '../../data/StaticData';

let access_token = '';
let postBodySystemTaxes = '';
let putBodySystemTaxes = '';
let responseBody = '';

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

describe("Get all Information", () => {
    it('Get All System Taxes', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${SYSTEMTAXES_URL.Get_All_SystemTaxes}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
        });
    });
});

describe("Creating new system tax", () => {
    it("Create a system tax", () => {
        cy.fixture('postBodySystemTaxes.json').then((postBodySystemTaxes) => {
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}configuration/system-taxes`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: postBodySystemTaxes,
            })

        }).then(response => {
             responseBody = response.body;
            expect(response.status).to.eq(201);
            console.log(responseBody);
        });
    });
});

describe("Verify that the system tax has been created", () => {
    it('Filter the newly created System Tax by name', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${SYSTEMTAXES_URL.Filter_Name_SystemTax}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            responseBody = response.body;
            cy.writeFile('.data/test.txt',responseBody)
            expect(response.status).to.equal(200)
            
        });
    });
    it('Filter the newly created System Tax by key', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${SYSTEMTAXES_URL.Filter_Key_SystemTax}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            
        });
    });

    it('Filter the newly created System Tax by description', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${SYSTEMTAXES_URL.Filter_Description_SystemTax}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            
        });
    });
});

describe("System Tax update", () => {
    beforeEach(() => {
        cy.getUniqueId(responseBody).then((unique_id) => {
            return cy.getID(responseBody).then((SystemTaxId) => {
                putBodySystemTaxes.tax_categories[0].id = SystemTaxId;
                return putBodySystemTaxes;
            });
        }).as('updatedBodySystemTaxes');
    });

    it("Update System Tax", () => {
        // Using 'cy.get' to access the updated putBodySystemTaxes from the 'beforeEach' 
        cy.get('@updatedBodySystemTaxes').then((updatedBodySystemTaxes) => {
            cy.getUniqueId(responseBody).then((unique_id) => {
                cy.request({
                    method: "PUT",
                    url: `${API_URLS.TENANT_API}configuration/system-taxes/${unique_id}`,
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        accept: "*/*",
                        "Content-type": "application/json",
                    },
                    body: updatedBodySystemTaxes, // Use the updated putBodyCompanies here
                }).then((response) => {
                    cy.writeFile('.data/test.txt', responseBody);
                    expect(response.status).to.eq(200);
                });
            });
        });
    });
});
describe("Delete System Tax", () => {
    it('Delete newly created/updated System Tax', () => {
        cy.getUniqueId(responseBody).then(SystemTaxId => {
            cy.request({
                method: 'DELETE',
                url: `${API_URLS.TENANT_API}configuration/system-taxes/${SystemTaxId}`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then(response => {
                expect(response.status).to.eq(200);
            });
        });
    });
});


