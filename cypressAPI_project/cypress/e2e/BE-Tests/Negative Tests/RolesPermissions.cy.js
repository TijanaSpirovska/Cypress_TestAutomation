import { GetAuthToken } from '../Auth/Oauth2.cy'
import { API_URLS } from '../../../data/StaticData';

let access_token = '';
let postBodyRolesPermissions = '';
let putBodyRolesPermissions = '';
let putBodyPermissions = '';
let putNoAdminPermissions = '';
let putNoSuperAdminPermissions = '';
let updatedBodyRolesPermissions = "";
let roles = 'configuration/roles';
let endpoint = '39';
let rolesPermissions = "configuration/roles-and-permissions"
let duplicate = 'automatedrole';


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
    cy.fixture('putBodyPermissions.json').then((putBodyPermissionsData) => {
        putBodyPermissions = putBodyPermissionsData;
    });
    cy.fixture('putNoAdminPermissions.json').then((putNoAdminPermissionsData) => {
        putNoAdminPermissions = putNoAdminPermissionsData;
    });
    cy.fixture('putNoSuperAdminPermissions.json').then((putNoSuperAdminPermissionsData) => {
        putNoSuperAdminPermissions = putNoSuperAdminPermissionsData;
    });
});
describe("Negative tests for creating a new user role", () => {
    it("User role is not created without Name", () => {
        postBodyRolesPermissions.name = "";
        updatedBodyRolesPermissions = postBodyRolesPermissions;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${roles}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyRolesPermissions,
            failOnStatusCode: false
        }).then(response => {
            cy.writeFile('.data/test.txt', response);
            expect(response.status).to.eq(422);
            expect(response.body.errors.name[0]).to.include("name field is required.");
        });
    })
    it("User role is not created with duplicate name", () => {
        postBodyRolesPermissions.name = duplicate;
        updatedBodyRolesPermissions = postBodyRolesPermissions;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${roles}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyRolesPermissions,
            failOnStatusCode: false
        }).then(response => {
            cy.writeFile('.data/test.txt', response);
            expect(response.status).to.eq(422);
            expect(response.body.errors.name[0]).to.include("name has already been taken.");
        });
    });
});
describe("Negative tests for updating user role", () => {
    it("User role is not updated without Name", () => {
        putBodyRolesPermissions.name = "";
        updatedBodyRolesPermissions = putBodyRolesPermissions;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${roles}/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyRolesPermissions,
            failOnStatusCode: false
        }).then(response => {
            cy.writeFile('.data/test.txt', response);
            expect(response.status).to.eq(422);
            expect(response.body.errors.name[0]).to.include("name field is required.");
        });
    })
    it("User role is not updated with duplicate name", () => {
        putBodyRolesPermissions.name = duplicate;
        updatedBodyRolesPermissions = putBodyRolesPermissions;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${roles}/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyRolesPermissions,
            failOnStatusCode: false
        }).then(response => {
            cy.writeFile('.data/test.txt', response);
            expect(response.status).to.eq(422);
            expect(response.body.errors.name[0]).to.include("name has already been taken.");
        });
    });
});
describe("Negative test for deleting user role", () => {
    it('User role with related users is not deleted', () => {
        cy.request({
            method: 'DELETE',
            url: `${API_URLS.TENANT_API}${roles}/104`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.unique_id[0]).to.include("related");
        });
    });
});
describe("Negative test for removing hardcoded permissions", () => {
    it('Permissions can not be removed from Super Admin role', () => {
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${rolesPermissions}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: putNoSuperAdminPermissions,
            failOnStatusCode: false
        }).then(response => {
            cy.writeFile('.data/test.txt', response);
            expect(response.status).to.eq(422);
            // the response code should be corrected into 422, as this PUT call does not remove the permissions from Super admin as it(which is correct)
        });
    });
    it('Permissions can not be removed from Admin role', () => {
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${rolesPermissions}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: putNoAdminPermissions,
            failOnStatusCode: false
        }).then(response => {
            cy.writeFile('.data/test.txt', response);
            expect(response.status).to.eq(422);
            // this should be fixed, the PUT call removes permissions from Admin despite being hardcoded
        });
    });
    it('Reset initial permissions for Super Admin & Admin role', () => {
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${rolesPermissions}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: putBodyPermissions,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(200);
            // expect(response.body.errors.roles[0]).to.include("");
        });
    });
})
