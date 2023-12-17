import { GetAuthToken } from '../Auth/Oauth2.cy';
import { API_URLS, productAttribute_URL} from '../../../data/StaticData';
import '../../../support/commands'

let access_token = '';
let updatedBody = '';
let postProductAttributes = '';
let putProductAttributes = '';
let productPrice = '';
let productType = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('postProductAttributes.json').then((postProductAttributesData) => {
    postProductAttributes  = postProductAttributesData;
  });

  cy.fixture('putProductAttributes.json').then((putProductAttributesData) => {
    putProductAttributes  = putProductAttributesData;
  });
  cy.fixture('productPrice.json').then((productPriceData) => {
    productPrice = productPriceData;
  });
  cy.fixture('productType.json').then((productTypeData) => {
    productType = productTypeData;
  });
});

describe("Negative tests for creating a new Product Attribute", () => {
    it('Validation for Product Attribute Name field in Create Product Attribute Page', () => {
        postProductAttributes.name = "";
        updatedBody = postProductAttributes;
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}attributes`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBody,
        failOnStatusCode: false 
      }).then(response => {
        expect(response.status).to.eq(422);
      });
    });

    it('Validation for Product Attribute Type field in Create Product Attribute Page', () => {
        postProductAttributes.type = "";
        updatedBody = postProductAttributes;
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}attributes`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBody,
        failOnStatusCode: false 
      }).then(response => {
        expect(response.status).to.eq(422);
      });
    });
  });

describe("Negative tests for updating a Product Attribute", () => {
    it('Validation for Product Attribute Name field in Edit Product Attribute Page', () => {
        putProductAttributes.name = "";
        updatedBody = putProductAttributes;
      cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}attributes/07b30ff654854e8ca0ccd84a27ff7a3c`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBody,
        failOnStatusCode: false 
      }).then(response => {
        expect(response.status).to.eq(422);
      });
    });

    it('Validation for Product Attribute Type field in Edit Product Attribute Page', () => {
        putProductAttributes.type = "";
        updatedBody = putProductAttributes;
      cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}attributes/07b30ff654854e8ca0ccd84a27ff7a3c`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBody,
        failOnStatusCode: false 
      }).then(response => {
        expect(response.status).to.eq(422);
      });
    });
});

describe("Negative tests for deleting a used Product Attribute", () => {
  it('Deleting the used Product Attribute', () => {
      cy.request({
        method: 'DELETE',
        url: `${API_URLS.TENANT_API}attributes/121`,
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        failOnStatusCode:false
      }).then(response => {
        expect(response.status).to.eq(422);
      });
    });
  });


describe("Negative tests for deleiting a used Product Price ", () => {
    it('Deleting the used Product Price', () => {
        productPrice.value = "";
        updatedBody = productPrice;
        cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}tenant-configurations/prices`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBody,
        failOnStatusCode: false 
        }).then(response => {
        expect(response.status).to.eq(422);
        });
    });
});

describe("Negative tests for deleting a used Product Type ", () => {
    it('Deleting the used Product Type', () => {
        productType.value = "";
        updatedBody = productType;
        cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}tenant-configurations/product_types`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBody,
        failOnStatusCode: false 
        }).then(response => {
        expect(response.status).to.eq(422);
        });
    });
});

