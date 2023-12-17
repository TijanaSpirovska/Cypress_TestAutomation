import { GetAuthToken } from '../Auth/Oauth2.cy'
import { API_URLS } from '../../../data/StaticData';

let access_token = '';
let putBodyCurrency = '';
let updatedBodyCurrencies = '';


beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });
    cy.fixture('putBodyCurrency.json').then((putBodyCurrencyData) => {
        putBodyCurrency = putBodyCurrencyData;
    });
});
describe("Negative tests for currencies", () => {
    it("System has minimum 1 default currency configured/1", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}tenant-configurations/currencies`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: {
                "value": [],
                "key": "currencies"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.value).to.include("You must have only one default currency, currently found: '0'!");
        });
    });
    it("System has minimum 1 default currency configured /2", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}tenant-configurations/currencies`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: {
                "value": [{
                        "name": "United States dollar",
                        "key": "USD",
                        "symbol": "&#36;",
                        "is_default": false
                    }
                ],
                "key": "currencies"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.value).to.include("You must have only one default currency, currently found: '0'!");
        });
    });
    it("System doesn't support duplicate currencies", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}tenant-configurations/currencies`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: {
                "value": [{
                        "name": "United States dollar",
                        "key": "USD",
                        "symbol": "&#36;",
                        "is_default": true
                    },
                    {
                        "name": "United States dollar",
                        "key": "USD",
                        "symbol": "&#36;",
                        "is_default": false
                    }
                ],
                "key": "currencies"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.value).to.include("Duplicate value");
        });
    });
    it("System can't work with multiple default currencies", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}tenant-configurations/currencies`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: {
                "value": [{
                    "name": "United States dollar",
                    "key": "USD",
                    "symbol": "&#36;",
                    "is_default": true
                }, {
                    "name": "Afghanistan Afghani",
                    "key": "AFN",
                    "symbol": "&#1547;",
                    "is_default": true
                }
            ],
            "key": "currencies"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.value).to.include("You must have only one default currency, currently found: '2'!");
        });
    });
    it("System can't work with none default currency", () => {
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}tenant-configurations/currencies`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: {
                "value": [{
                    "name": "United States dollar",
                    "key": "USD",
                    "symbol": "&#36;",
                    "is_default": false
                }, {
                    "name": "Afghanistan Afghani",
                    "key": "AFN",
                    "symbol": "&#1547;",
                    "is_default": false
                }
            ],
            "key": "currencies"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.value).to.include("You must have only one default currency, currently found: '0'!");
        });
    });
        it("System can't work with modified currency Key", () => {
            cy.request({
                method: "PUT",
                url: `${API_URLS.TENANT_API}tenant-configurations/currencies`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: "*/*",
                    "Content-type": "application/json",
                },
                body: {
                    "value": [{
                        "name": "United States dollar",
                        "key": "Test",
                        "symbol": "&#36;",
                        "is_default": true
                    }
                ],
                "key": "currencies"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body.errors.value).to.include("Currency contains key: 'Test' that is invalid!");
            });
        });
        it("System can't work with modified Currency Name", () => {
            cy.request({
                method: "PUT",
                url: `${API_URLS.TENANT_API}tenant-configurations/currencies`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: "*/*",
                    "Content-type": "application/json",
                },
                body: {
                    "value": [{
                        "name": "dollar",
                        "key": "USD",
                        "symbol": "&#36;",
                        "is_default": true
                    }
                ],
                "key": "currencies"
                },                
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(422);
                // expect(response.body.data.message).to.include('Successfully updated Configuration data!');
            });
        })
    });
    describe("Currency update", () => {
        it("Update Currency", () => {
            cy.request({
                method: "PUT",
                url: `${API_URLS.TENANT_API}tenant-configurations/currencies`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: "*/*",
                    "Content-type": "application/json",
                },
                body: putBodyCurrency,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.message).to.include('Successfully updated Configuration data');
            });


        });
});
