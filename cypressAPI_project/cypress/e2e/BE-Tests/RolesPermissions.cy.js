import { GetAuthToken } from './Auth/Oauth2.cy'
import { API_URLS } from '../../data/StaticData';
import '../../support/commands'

let access_token = '';
let postBodyRolesPermissions = '';
let putBodyRolesPermissions = '';
let endpoint = 'configuration/roles';
let responseBody = '';

beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });
    cy.fixture('postBodyRolesPermissions.json').then((postBodyRolesPermissionsData) => {
        postBodyRolesPermissions = postBodyRolesPermissionsData;
    });
    cy.fixture('putBodyRolesPermissions.json').then((putBodyRolesPermissionsData) => {
        putBodyRolesPermissions = putBodyRolesPermissionsData;
    });
});
describe("Get all user roles", () => {
    it('Get All Categories', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
        });
    });
});
describe("Creating new user role", () => {
    it("Create a role", () => {
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: postBodyRolesPermissions,
        }).then(response => {
            responseBody = response.body;
            cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(201);
            console.log(responseBody);
        });
    });
    it("Update user role", () => {
        cy.get_ID(responseBody).then(id => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${endpoint}/${id}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: putBodyRolesPermissions,
        }).then((response) => {
            responseBody = response.body;
            expect(response.status).to.eq(200);
        });});
    });
    it('Delete newly created/updated sser role', () => {
        cy.get_ID(responseBody).then(id => {
        cy.request({
            method: 'DELETE',
            url: `${API_URLS.TENANT_API}${endpoint}/${id}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(response => {
            expect(response.status).to.eq(200);
        });
    });})
});



