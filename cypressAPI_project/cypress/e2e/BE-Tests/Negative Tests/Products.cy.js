import { GetAuthToken } from '../Auth/Oauth2.cy'
import { API_URLS} from '../../../data/StaticData';

let access_token = '';
let postBodyProducts = '';
let putBodyProducts = '';


beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('postBodyProducts.json').then((postBodyProductsData) => {
    postBodyProducts = postBodyProductsData;
  });

  cy.fixture('putBodyProducts.json').then((putBodyProductsData) => {
    putBodyProducts = putBodyProductsData;
  });
});



describe("Negative tests for creating a new Product", () => {
    it('Validation for Product Name field in Create Product Page', () => {
      let updatedBodyProducts = "";
      postBodyProducts.data.name = "";
      updatedBodyProducts = postBodyProducts;
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}products`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json',
        },
        body: updatedBodyProducts,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage = "The [USA] name field is required.";
        expect(response.body.errors.data).to.include(errorMessage);
      });
      
      });
  
    it('Validation for Product Description field in Create Product Page', () => {
        let updatedBodyProducts = "";
        postBodyProducts.data.description = "";
        updatedBodyProducts = postBodyProducts;
        cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}products`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBodyProducts,
        failOnStatusCode: false
        }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage = "The [USA] description field is required.";
        expect(response.body.errors.data).to.include(errorMessage);
        });
    });

    it('Validation for Product Slug field in Create Product Page', () => {
        let updatedBodyProducts = "";
        postBodyProducts.data.name = "";
        postBodyProducts.data.slug = "";
        updatedBodyProducts = postBodyProducts;
        cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}products`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBodyProducts,
        failOnStatusCode: false
        }).then(response => {
        expect(response.status).to.eq(422);
        const errorMessage = "The [USA] name field is required.";
        expect(response.body.errors.data).to.include(errorMessage);
        });
    });

    it('Validation for Product Duplicate Slug field in Create Product Page', () => {
        let updatedBodyProducts = "";
        postBodyProducts.data.name = "Glasses";
        postBodyProducts.data.slug = "glasses";
        updatedBodyProducts = postBodyProducts;
            cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}products`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProducts,
            failOnStatusCode: false
            }).then(response => {
            expect(response.status).to.eq(422);
            const errorMessage = "The [USA] name field is required.";
            expect(response.body.errors.data).to.include(errorMessage);
            });
        });

    it('Validation for Product Type field in Create Product Page', () => {
        let updatedBodyProducts = "";
        postBodyProducts.product_data.product_type = "";
        updatedBodyProducts = postBodyProducts;
        cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}products`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBodyProducts,
        failOnStatusCode: false
        }).then(response => {
            // expect(response.body.errors.slug[0]).to.eq("The slug has already been taken.");
            expect(response.body.errors["product_data.product_type"][0]).to.eq("The Product Type field is required.");
        });
    });

    it('Validation for Product Category field in Create Product Page', () => {
        let updatedBodyProducts = "";
        postBodyProducts.category_ids = "";
        updatedBodyProducts = postBodyProducts;
        cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}products`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBodyProducts,
        failOnStatusCode: false
        }).then(response => {
            // expect(response.body.errors.slug[0]).to.eq("The slug has already been taken.");
            expect(response.body.errors.category_ids[0]).to.eq("The category ids field is required.");
        });
    });
  
  });

describe("Negative tests for updating a Product ", () => {
    it("Validation for Product Name field in Edit Product Page", () => {
        let updatedBodyProducts = "";
        putBodyProducts.data.name = "";
        updatedBodyProducts = putBodyProducts;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}products/d0e041be145643be8f597b0c040cd308`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: updatedBodyProducts,
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(422);
            const errorMessage = "The [USA] name field is required.";
            expect(response.body.errors.data).to.include(errorMessage);
        });
    });

    it("Validation for Product Description field in Edit Product Page", () => {
        let updatedBodyProducts = "";
        putBodyProducts.data.description = "";
        updatedBodyProducts = putBodyProducts;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}products/d0e041be145643be8f597b0c040cd308`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: updatedBodyProducts,
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(422);
            const errorMessage = "The [USA] description field is required.";
            expect(response.body.errors.data).to.include(errorMessage);
        });
    });

    it("Validation for Product Slug field in Edit Product Page", () => {
        let updatedBodyProducts = "";
        putBodyProducts.data.name = "";
        putBodyProducts.data.slug = "";
        updatedBodyProducts = putBodyProducts;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}products/d0e041be145643be8f597b0c040cd308`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: updatedBodyProducts,
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(422);
            // expect(response.body).to.contain("500: Internal Server Error");
        });
    });

    it("Validation for Product Type field in Edit Product Page", () => {
        let updatedBodyProducts = "";
        putBodyProducts.product_data.product_type = "";
        updatedBodyProducts = putBodyProducts;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}products/d0e041be145643be8f597b0c040cd308`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: updatedBodyProducts,
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(422);
            // expect(response.body).to.contain("500: Internal Server Error");
        });
    });

    it("Validation for Product Category field in Edit Product Page", () => {
        let updatedBodyProducts = "";
        putBodyProducts.category_ids = "";
        updatedBodyProducts = putBodyProducts;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}products/d0e041be145643be8f597b0c040cd308`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
            },
            body: updatedBodyProducts,
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(422);
          
        });
    });
})

describe("Negative tests for deleting a Product ", () => {
    it('Deleting a Product with related orders', () => {
        cy.request({
          method: 'DELETE',
          url: `${API_URLS.TENANT_API}products/d002d426fa174de19047ad4e843f6576`,
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          failOnStatusCode:false
        }).then(response => {
          expect(response.status).to.eq(422);

        });
      });
});
  