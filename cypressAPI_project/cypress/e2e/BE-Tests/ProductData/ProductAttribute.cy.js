import { GetAuthToken } from '../Auth/Oauth2.cy';
import { API_URLS, productAttribute_URL} from '../../../data/StaticData';
import { ProductAttribute } from '../../../data/StaticData';
import '../../../support/commands'

let access_token = '';
let responseBody = '';
let postProductAttributes = '';
let putProductAttributes = '';

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
});

describe("Get all Information", () => {
  it('Get all product attributes', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${productAttribute_URL.Get_All_productAttributes}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data')
    });
  });
});

describe("Create a product attribute", () => {
    it('Creating a new product attribute', () => {
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}attributes`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: postProductAttributes
      }).then(response => {
        
        expect(response.status).to.eq(201);
        // exepct(response.body.data.message).to.eq('Successfully created product attribute!');
      });
    });
  });
  
  describe("Verify that the product attribute has been created", () => {
    it('Filter new product attribute by name', () => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}${productAttribute_URL.Filter_Name_productAttributes}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        responseBody = response.body;
        
        expect(response.status).to.eq(200);
        // expect(response.body.data[0].name).to.deep.equal({ USD: `${ProductAttribute.Name}` });
        expect(response.body).to.have.property('data')
  
      });
    });
    it('Filter new product by type', () => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}${productAttribute_URL.Filter_Type_productAttributes}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        cy.writeFile('.data/test.txt',responseBody);
        // expect(response.body.data[0].type).to.eq(ProductAttribute.Filter_type);
        expect(response.body).to.have.property('data');
      });
    });
});
  describe("Product attribute update", () => {
    it("Update product attribute", () => {
        cy.getUniqueId(responseBody).then((unique_id) => {
          cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}attributes/${unique_id}`,
            headers: {
              Authorization: `Bearer ${access_token}`,
              accept: "*/*",
              "Content-type": "application/json",
            },
            body: putProductAttributes, 
          }).then((response) => {
            expect(response.status).to.eq(200);
            // exepct(response.message).to.eq("Successfully updated Attribute data!");
          });
        });
      });
    });
  
  
  describe("Verify that the product attribute has been updated", () => {
    it('Retrieve the name of the new product attribute', () => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}${productAttribute_URL.Filter_updatedName_productAttributes}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data')
      });
    });
  });
  
  
  describe("Delete product attribute", () => {
    it('Delete newly created product', () => {
      cy.getID(responseBody).then(takenId => {
        cy.request({
          method: 'DELETE',
          url: `${API_URLS.TENANT_API}attributes/${takenId}`,
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }).then(response => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
  
  describe("Verify the product attribute is deleted", () => {
    it('Verify the product attribute is successfully deleted', () => {
      cy.getID(responseBody).then(takenId => {
        cy.request({
          method: 'GET',
          url: `${API_URLS.TENANT_API}attributes/${takenId}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        }).then(response => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.be.empty;
        });
    });
  });})