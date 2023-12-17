import { GetAuthToken } from '../Auth/Oauth2.cy'
import { Companies, API_URLS, COMPANY_URL } from '../../../data/StaticData';

let access_token = '';
let postBodyCompanies = '';
let putBodyCompanies = '';
let endpoint = "84926f1f71484800bb86e76d94c494e9";
let updatedBodyCompanies = "";

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
describe("Negative tests for creating a new company", () => {
    it("Company is not created without name", () => {
        postBodyCompanies.name = "";
        updatedBodyCompanies = postBodyCompanies;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}companies`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyCompanies,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.name[0]).to.include("name field is required.");
        });
    })
    it("Company is not created with duplicate name", () => {
        postBodyCompanies.name = "iwconnect";
        updatedBodyCompanies = postBodyCompanies;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}companies`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyCompanies,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.name[0]).to.include("The name has already been taken.");
        });
    })
})
describe("Negative tests for updating a company", () => {
    it("Company is not updated without name", () => {
        putBodyCompanies.name = "";
        updatedBodyCompanies = putBodyCompanies;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}companies/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyCompanies,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.name[0]).to.include('The name field is required.');
        });
    });
    it("Company is not updated with duplicate name", () => {
        putBodyCompanies.name = "iwconnect";
        updatedBodyCompanies = putBodyCompanies;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}companies/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyCompanies,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.name[0]).to.eq('The name has already been taken.');
        });
    });
});
describe("Negative test for deleting Company", () => {
    it('Company with related products is not deleted', () => {
        cy.request({
            method: 'DELETE',
            url: `${API_URLS.TENANT_API}companies/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.unique_id[0]).to.include("Can't delete Company due to related products");
        });
    });
});

