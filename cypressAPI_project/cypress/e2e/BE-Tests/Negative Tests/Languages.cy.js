import { GetAuthToken } from '../Auth/Oauth2.cy'
import { API_URLS } from '../../../data/StaticData';

let access_token = '';
let putBodyLanguages = '';
let updatedBodyLanguages = '';


beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });
    cy.fixture('putBodyLanguages.json').then((putBodyLanguagesData) => {
        putBodyLanguages = putBodyLanguagesData;
    });
});
describe("Negative tests for languages", () => {
    it("System has minimum 1 default language configured/1", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}tenant-configurations/countries`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: {
                "value": [],
                "key": "languages"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.value).to.include("You must have only one default language, currently found: '0'!");
        });
    });
    it("System has minimum 1 default language configured /2", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}tenant-configurations/countries`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: {
                "value":
                    [
                        {
                            "name": "United States of America (the)",
                            "key": "USA",
                            "is_default": false
                        }
                    ],
                "key": "languages"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.value).to.include("You must have only one default language, currently found: '0'!");
        });
    });
    it("System doesn't support duplicate languages", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}tenant-configurations/countries`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: {
                "value":
                    [
                        {
                            "name": "United States of America (the)",
                            "key": "USA",
                            "is_default": true
                        },
                        {
                            "name": "United States of America (the)",
                            "key": "USA",
                            "is_default": false
                        }
                    ],
                "key": "languages"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.value).to.include("Duplicate value");
        });
    });
    it("System can't work with multiple default languages", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}tenant-configurations/countries`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: {
                "value":
                    [
                        {
                            "name": "United States of America (the)",
                            "key": "USA",
                            "is_default": true
                        },
                        {
                            "name": "Afghanistan",
                            "key": "AFG",
                            "is_default": true
                        }
                    ],
                "key": "languages"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.value).to.include("You must have only one default language, currently found: '2'!");
        });
    });
    it("System can't work with none default language", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}tenant-configurations/countries`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: {
                "value":
                    [
                        {
                            "name": "United States of America (the)",
                            "key": "USA",
                            "is_default": false
                        },
                        {
                            "name": "Afghanistan",
                            "key": "AFG",
                            "is_default": false
                        }
                    ],
                "key": "languages"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.value).to.include("You must have only one default language, currently found: '0'!");
        });
    });
        it("System can't work with modified Language Key", () => {
            cy.request({
                method: "PUT",
                url: `${API_URLS.TENANT_API}tenant-configurations/countries`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: "*/*",
                    "Content-type": "application/json",
                },
                body: {
                    "value": [{
                            "name": "United States of America (the)",
                            "key": "Test",
                            "is_default": true
                        }
                    ],
                    "key": "languages"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body.errors.value).to.include("Language contains key: 'Test' that is invalid!");
            });
        });
        it("System can't work with modified Language Name", () => {
            cy.request({
                method: "PUT",
                url: `${API_URLS.TENANT_API}tenant-configurations/countries`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: "*/*",
                    "Content-type": "application/json",
                },
                body: {
                    "value": [{
                            "name": "United States",
                            "key": "USA",
                            "is_default": true
                        }
                    ],
                    "key": "languages"
                },
            }).then((response) => {
                expect(response.status).to.eq(422);
                // expect(response.body.data.message).to.include('Successfully updated Configuration data!');
            });
        })
    });
    describe("Language update", () => {
        it("Update language", () => {
            cy.request({
                method: "PUT",
                url: `${API_URLS.TENANT_API}tenant-configurations/countries`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: "*/*",
                    "Content-type": "application/json",
                },
                body: putBodyLanguages,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.message).to.include('Successfully updated Configuration data');
            });


        });
});
