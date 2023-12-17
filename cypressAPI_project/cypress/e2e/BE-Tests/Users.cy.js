// import { getAuthToken } from '../authentications/auth'
// // import { API_URLS, API_ENDPOINTS } from '../config/apiConfig'
// const { API_URLS, API_ENDPOINTS } = require(`../config/${require('../settings').ENV}.js`);
// import '../commands'

import { GetAuthToken } from './Auth/Oauth2.cy'
import { LIMIT, Users, API_URLS, USER_URL } from '../../data/StaticData';
import '../../support/commands'

let access_token = '';
let postBodyUsers = '';
let putBodyUsers = '';
let responseBody = '';

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

describe("Get all Information", () => {
    it('Get All Users', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${USER_URL.Get_All_Users}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            // expect(response.body).to.have.property('data', 'ValeTest12345')
            // add more assertions as needed
            // USERId = response.body.unique_id
            // cy.wrap(USERId).as('USERId')
            // alreadyCreatedSlug = response.body.slug
            // cy.wrap(alreadyCreatedSlug).as('alreadyCreatedSlug')

        });
    });
});

describe("Creating new user", () => {
    it("Create a user", () => {
        cy.fixture('postBodyUsers.json').then((postBodyUsers) => {
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: `${API_URLS.TENANT_API}users`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: postBodyUsers,
            })
        }).then(response => {
            // responseBody = response.body;
            // cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(201);
        });
    });
});

describe("Verify that the user has been created", () => {
    it('Filter the newly created user by name', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${USER_URL.Filter_Name_Users}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            
            // expect(response.body.data[0].name).to.eq(`${Users.Name}`);
            //expect(response.body.data).to.have.property('name','ValeTest12345')
            // add more assertions as needed
            // USERId = response.body.unique_id
            // cy.wrap(USERId).as('USERId')
            // alreadyCreatedSlug = response.body.slug
            // cy.wrap(alreadyCreatedSlug).as('alreadyCreatedSlug')

        });
    });
    it('Filter the newly created user by email', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${USER_URL.Filter_Email_Users}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            responseBody = response.body;
            // cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.equal(200)
            // expect(response.body.data[0].email).to.eq(`${Users.Email}`);
            // add more assertions as needed
            // USERId = response.body.unique_id
            // cy.wrap(USERId).as('USERId')
            // alreadyCreatedSlug = response.body.slug
            // cy.wrap(alreadyCreatedSlug).as('alreadyCreatedSlug')
        });
    });
});

describe("User update", () => {
    beforeEach(() => {
        cy.getUniqueId(responseBody).then((unique_id) => {
            return cy.getID(responseBody).then((userId) => {
                putBodyUsers.id = userId;
                // Return the updated putBodyUsers to pass it to the next Cypress command
                return putBodyUsers;
            });
        }).as('updatedBodyUsers');
    });

    it("Update the user", () => {
        // Using 'cy.get' to access the updated putBodyUsers from the 'beforeEach' 
        cy.get('@updatedBodyUsers').then((updatedBodyUsers) => {
            cy.getUniqueId(responseBody).then((unique_id) => {
                cy.request({
                    method: "PUT",
                    url: `${API_URLS.TENANT_API}users/${unique_id}`,
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        accept: "*/*",
                        "Content-type": "application/json",
                    },
                    body: updatedBodyUsers, // Use the updated putBodyUsers here
                }).then((response) => {
                    
                    
                    expect(response.status).to.eq(200);
                });
            });
        });
    });
});

describe("Verify that the uer has been updated", () => {
    it('Filter the updated user by email', () => {
        cy.request({
            method: 'GET',
            url: `${API_URLS.TENANT_API}${USER_URL.Filter_Updated_Users}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        }).then(response => {
            responseBody = response.body;
            cy.writeFile('.data/test.txt', responseBody);
            expect(response.status).to.eq(200);
        });
    });
});
describe("Delete a user", () => {
    it('Delete newly created/updated user', () => {
        cy.getID(responseBody).then(userId => {
            cy.request({
                method: 'DELETE',
                url: `${API_URLS.TENANT_API}users/${userId}`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then(response => {
                expect(response.status).to.eq(200);
            });
        });
    });
});


