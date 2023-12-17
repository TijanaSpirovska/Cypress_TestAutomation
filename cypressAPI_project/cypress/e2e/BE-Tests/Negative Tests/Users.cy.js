import { GetAuthToken } from '../Auth/Oauth2.cy'
import { Users, API_URLS, USER_URL } from '../../../data/StaticData';

let access_token = '';
let postBodyUsers = '';
let putBodyUsers = '';
let endpoint = "f778799d6a1b41a8b23bd163461774b5";
let updatedBodyUsers = "";


beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });
    cy.fixture('postBodyUsers.json').then((postBodyUsersData) => {
        postBodyUsers = postBodyUsersData;
    });
    cy.fixture('putBodyUsers.json').then((putBodyUsersData) => {
        putBodyUsers = putBodyUsersData;
    });
});
describe("Negative tests for creating a new user", () => {
    it("User is not created without Name", () => {
        postBodyUsers.name = "";
        updatedBodyUsers = postBodyUsers;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}users`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.name[0]).to.include("name field is required.");
        });
    })
    it("User is not created with duplicate email", () => {
        postBodyUsers.email = "super.admin@iwcommerce.com";
        updatedBodyUsers = postBodyUsers;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}users`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.email[0]).to.include("The email has already been taken.");
        });
    })
    it("User is not created without email", () => {
        postBodyUsers.email = "";
        updatedBodyUsers = postBodyUsers;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}users`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.email[0]).to.include("email field is required.");
        });
    });
    it("User is not created without a role", () => {
        postBodyUsers.roles = "";
        updatedBodyUsers = postBodyUsers;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}users`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.roles[0]).to.include("roles field is required.");
        });
    });
    it("User is not created with duplicate roles", () => {
        postBodyUsers.roles = [39, 39];
        updatedBodyUsers = postBodyUsers;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}users`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.roles[0]).to.include("User cannot be created due to invalid roles.");
        });
    });
    it("User is not created with Super Admin role", () => {
        postBodyUsers.roles = [3];
        updatedBodyUsers = postBodyUsers;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}users`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.roles[0]).to.include("User cannot be created due to invalid roles.");
        });
    });
    it("User is not created with non-existing role", () => {
        postBodyUsers.roles = [2222];
        updatedBodyUsers = postBodyUsers;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}users`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.roles[0]).to.include("User cannot be created due to invalid roles.");
        });
    });
    it("User is not created with Customer role", () => {
        postBodyUsers.roles = [2];
        updatedBodyUsers = postBodyUsers;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}users`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.roles[0]).to.include("User cannot be created due to invalid roles.");
        });
    });
    it("User is not created as Active", () => {
        postBodyUsers.name = "User created as Active"
        postBodyUsers.status = "1";
        updatedBodyUsers = postBodyUsers;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}users`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            //   expect(response.body.errors.roles[0]).to.include("User cannot be created due to invalid roles.");
        });
    });
})
describe("Negative tests for updating User", () => {
    it("User name is not updated", () => {
        putBodyUsers.name = "should not be updated";
        updatedBodyUsers = putBodyUsers;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}users/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            //   expect(response.body.errors.slug[0]).to.eq('User name can not be updated');
        });
    });
    it("User email is not updated", () => {
        putBodyUsers.email = "shouldnotbeupdated@test.com";
        updatedBodyUsers = putBodyUsers;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}users/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            //   expect(response.body.errors.slug[0]).to.eq('email can not be updated');
        });
    });
    it("User is not updated without a name", () => {
        putBodyUsers.name = "";
        updatedBodyUsers = putBodyUsers;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}users/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.name[0]).to.include('The name field is required.');
        });
    });
    it("User is not updated without email", () => {
        putBodyUsers.email = "";
        updatedBodyUsers = putBodyUsers;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}users/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.email[0]).to.include('The email field is required.');
        });
    });
    it("User is not updated with non-existing roles", () => {
        putBodyUsers.roles = [2222];
        updatedBodyUsers = putBodyUsers;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}users/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.roles[0]).to.include('invalid roles');
        });
    });
    it("User is not updated without roles", () => {
        putBodyUsers.roles = [];
        updatedBodyUsers = putBodyUsers;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}users/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.roles[0]).to.include('roles field is required.');
        });
    });
    it("User is not updated with Super Admin role", () => {
        putBodyUsers.roles = [3];
        updatedBodyUsers = putBodyUsers;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}users/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.roles[0]).to.include("invalid roles.");
        });
    });
    it("User is not updated with Customer role", () => {
        putBodyUsers.roles = [2];
        updatedBodyUsers = putBodyUsers;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}users/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.roles[0]).to.include("invalid roles.");
        });
    });
    it("User is not updated with duplicate roles", () => {
        putBodyUsers.roles = [1, 1];
        updatedBodyUsers = putBodyUsers;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}users/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            // response code should be changed into 422, currently test fails as the response is 200, despite user not being updated with duplicate roles
            expect(response.status).to.eq(422);
            // expect(response.body.errors.roles[0]).to.include("invalid roles.");
        });
    });
    it("User is not updated to be Active", () => {
        putBodyUsers.status = "1";
        updatedBodyUsers = putBodyUsers;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}users/${endpoint}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyUsers,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.file).to.eq('The file field is required.');
        });
    });
});
// describe("Negative test for deleting users", () => {
//   it('Super Admin user can not be deleted', () => {
//     cy.request({
//       method: 'DELETE',
//       url: `${API_URLS.TENANT_API}users/1`,
//       headers: {
//         Authorization: `Bearer ${access_token}`
//       },
//       failOnStatusCode: false
//     }).then(response => {
//       expect(response.status).to.eq(422);
//       expect(response.body.errors.unique_id[0]).to.include("");
//     });
//   });
// });

