import { GetAuthToken } from './Auth/Oauth2.cy'
import { LIMIT, Companies, API_URLS, COMPANY_URL } from '../../data/StaticData';
import '../../support/commands'

let access_token = '';
let postBodyCompanies = '';
let putBodyCompanies = '';
let responseBody = '';

beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });

    cy.fixture('postBodyCompanies.json').then((postBodyCompaniesData) => {
        postBodyCompanies = postBodyCompaniesData;
    });

    cy.fixture('putBodyCompanies.json').then((putBodyCompaniesData) => {
        putBodyCompanies = putBodyCompaniesData;
    });
});

describe("Get all Information", () => {
    it('Get All Companies', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${COMPANY_URL.Get_All_Companies}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
        });
    });
});

describe("Creating new company", () => {
    it("Create a company", () => {
        cy.fixture('postBodyCompanies.json').then((postBodyCompanies) => {
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}companies`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: postBodyCompanies,
            })

        }).then(response => {
             responseBody = response.body;
            expect(response.status).to.eq(201);
            console.log(responseBody);
        });
    });
});

describe("Verify that the company has been created", () => {
    it('Filter the newly create Company by name', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${COMPANY_URL.Filter_Name_Companies}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            responseBody = response.body;
            // cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.equal(200)
            expect(response.body.data[0].name).to.eq(`${Companies.Name}`);
        });
    });
    it('Filter the newly create Company by vat', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${COMPANY_URL.Filter_Vat_Companies}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.data[0].vat).to.eq(`${Companies.Vat}`);
        });
    });
});

describe("Company update", () => {
    beforeEach(() => {
        cy.getUniqueId(responseBody).then((unique_id) => {
            return cy.getID(responseBody).then((companyId) => {
                putBodyCompanies.id = companyId;
                // Return the updated putBodyCompanies to pass it to the next Cypress command
                return putBodyCompanies;
            });
        }).as('updatedBodyCompanies');
    });

    it("Update company", () => {
        // Using 'cy.get' to access the updated putBodyCompanies from the 'beforeEach' 
        cy.get('@updatedBodyCompanies').then((updatedBodyCompanies) => {
            cy.getUniqueId(responseBody).then((unique_id) => {
                cy.request({
                    method: "PUT",
                    url: `${API_URLS.TENANT_API}companies/${unique_id}`,
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        accept: "*/*",
                        "Content-type": "application/json",
                    },
                    body: updatedBodyCompanies, // Use the updated putBodyCompanies here
                }).then((response) => {
                    responseBody = response.body;
                    cy.writeFile('.data/test.txt', responseBody);
                    expect(response.status).to.eq(200);
                });
            });
        });
    });
});
describe("Delete company", () => {
    it('Delete newly created/updated company', () => {
        cy.get_ID(responseBody).then(companyId => {
            cy.request({
                method: 'DELETE',
                url: `${API_URLS.TENANT_API}companies/${companyId}`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then(response => {
                expect(response.status).to.eq(200);
            });
        });
    });
});


