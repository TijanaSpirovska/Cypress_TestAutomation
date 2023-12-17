import { GetAuthToken } from '../Auth/Oauth2.cy'
import {LIMIT, Warehouses, API_URLS, WAREHOUSES_URL} from '../../../data/StaticData';


let access_token = '';
let postBodyWarehouses = '';
let putBodyWarehouses = '';
let updatedBody = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });
  cy.fixture('postBodyWarehouses.json').then((postBodyWarehousesData) => {
    postBodyWarehouses = postBodyWarehousesData;
});
cy.fixture('putBodyWarehouses.json').then((putBodyWarehousesData) => {
    putBodyWarehouses = putBodyWarehousesData;
});
});

describe("Negative tests for creating a new Warehouse", () => {

    it("Validation for Warehouse Name field in Create Warehouse Page", () => {
        postBodyWarehouses.name = "";
        updatedBody = postBodyWarehouses;
            cy.request({
                method: 'POST',
                url: `${API_URLS.TENANT_API}warehouses`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse First Name field in Create Warehouse Page", () => {
        postBodyWarehouses.first_name = "";
        updatedBody = postBodyWarehouses;
            cy.request({
                method: 'POST',
                url: `${API_URLS.TENANT_API}warehouses`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Last Name field in Create Warehouse Page", () => {
        postBodyWarehouses.last_name = "";
        updatedBody = postBodyWarehouses;
            cy.request({
                method: 'POST',
                url: `${API_URLS.TENANT_API}warehouses`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Email field in Create Warehouse Page", () => {
        postBodyWarehouses.email = "";
        updatedBody = postBodyWarehouses;
            cy.request({
                method: 'POST',
                url: `${API_URLS.TENANT_API}warehouses`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Address Name field in Create Warehouse Page", () => {
        postBodyWarehouses.address_name = "";
        updatedBody = postBodyWarehouses;
            cy.request({
                method: 'POST',
                url: `${API_URLS.TENANT_API}warehouses`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Address Number field in Create Warehouse Page", () => {
        postBodyWarehouses.address_number= "";
        updatedBody = postBodyWarehouses;
            cy.request({
                method: 'POST',
                url: `${API_URLS.TENANT_API}warehouses`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Zip Code field in Create Warehouse Page", () => {
        postBodyWarehouses.zip_code= "";
        updatedBody = postBodyWarehouses;
            cy.request({
                method: 'POST',
                url: `${API_URLS.TENANT_API}warehouses`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse City field in Create Warehouse Page", () => {
        postBodyWarehouses.city = "";
        updatedBody = postBodyWarehouses;
            cy.request({
                method: 'POST',
                url: `${API_URLS.TENANT_API}warehouses`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Country field in Create Warehouse Page", () => {
        postBodyWarehouses.country = "";
        updatedBody = postBodyWarehouses;
            cy.request({
                method: 'POST',
                url: `${API_URLS.TENANT_API}warehouses`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });
});

describe("Negative tests for updating a Warehouse", () => {

    it("Validation for Warehouse Name field in Edit Warehouse Page", () => {
        putBodyWarehouses.name = "";
        updatedBody = putBodyWarehouses;
            cy.request({
                method: 'PUT',
                url: `${API_URLS.TENANT_API}warehouses/707e0a1f70114f4486494185b0dc7a33`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse First Name field in Edit Warehouse Page", () => {
        putBodyWarehouses.first_name = "";
        updatedBody = putBodyWarehouses;
            cy.request({
                method: 'PUT',
                url: `${API_URLS.TENANT_API}warehouses/707e0a1f70114f4486494185b0dc7a33`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Last Name field in Edit Warehouse Page", () => {
        putBodyWarehouses.last_name = "";
        updatedBody = putBodyWarehouses;
            cy.request({
                method: 'PUT',
                url: `${API_URLS.TENANT_API}warehouses/707e0a1f70114f4486494185b0dc7a33`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Email field in Edit Warehouse Page", () => {
        putBodyWarehouses.email = "";
        updatedBody = putBodyWarehouses;
            cy.request({
                method: 'PUT',
                url: `${API_URLS.TENANT_API}warehouses/707e0a1f70114f4486494185b0dc7a33`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Address Name field in Edit Warehouse Page", () => {
        putBodyWarehouses.address_name = "";
        updatedBody = putBodyWarehouses;
            cy.request({
                method: 'PUT',
                url: `${API_URLS.TENANT_API}warehouses/707e0a1f70114f4486494185b0dc7a33`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Address Number field in Edit Warehouse Page", () => {
        putBodyWarehouses.address_number= "";
        updatedBody = putBodyWarehouses;
            cy.request({
                method: 'PUT',
                url: `${API_URLS.TENANT_API}warehouses/707e0a1f70114f4486494185b0dc7a33`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Zip Code field in Edit Warehouse Page", () => {
        putBodyWarehouses.zip_code= "";
        updatedBody = putBodyWarehouses;
            cy.request({
                method: 'PUT',
                url: `${API_URLS.TENANT_API}warehouses/707e0a1f70114f4486494185b0dc7a33`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse City field in Edit Warehouse Page", () => {
        putBodyWarehouses.city = "";
        updatedBody = putBodyWarehouses;
            cy.request({
                method: 'PUT',
                url: `${API_URLS.TENANT_API}warehouses/707e0a1f70114f4486494185b0dc7a33`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });

    it("Validation for Warehouse Country field in Edit Warehouse Page", () => {
        putBodyWarehouses.country = "";
        updatedBody = putBodyWarehouses;
            cy.request({
                method: 'PUT',
                url: `${API_URLS.TENANT_API}warehouses/707e0a1f70114f4486494185b0dc7a33`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    accept: 'application/json'
                },
                body: updatedBody,
                failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(422);
        });
    });
});