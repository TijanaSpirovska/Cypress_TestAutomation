// import { getAuthToken } from '../authentications/auth'
// // import { API_URLS, API_ENDPOINTS } from '../config/apiConfig'
// const { API_URLS, API_ENDPOINTS } = require(`../config/${require('../settings').ENV}.js`);
// import '../commands'

import { GetAuthToken } from './Auth/Oauth2.cy'
import { Categories, API_URLS, CATEGORY_URL} from '../../data/StaticData';
import '../../support/commands'

let access_token = '';
let postBodyCategories = '';
let putBodyCategories = '';
let responseBody = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });
  
  cy.fixture('postBodyCategories.json').then((postBodyCategoriesData) => {
    postBodyCategories = postBodyCategoriesData;
  });

  cy.fixture('putBodyCategories.json').then((putBodyCategoriesData) => {
    putBodyCategories = putBodyCategoriesData;
  });
});

describe("Get all Information", () => {
  it('Get All Categories', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${CATEGORY_URL.Get_All_Categories}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then((response) => {
      expect(response.status).to.equal(200)
      // expect(response.body).to.have.property('data', 'ValeTest12345')
      // add more assertions as needed
      // categoryId = response.body.unique_id
      // cy.wrap(categoryId).as('categoryId')
      // alreadyCreatedSlug = response.body.slug
      // cy.wrap(alreadyCreatedSlug).as('alreadyCreatedSlug')
      
    });
  });
});  

describe("Creating new category", () => {
  it("Create a category", () => {
      // cy.fixture('postBodyCategories.json').then((postBodyCategories) => {
        cy.request({
            method:'POST', 
            // failOnStatusCode: false,
            url:`${API_URLS.TENANT_API}categories`,
            headers: {
              Authorization: `Bearer ${access_token}`,
              accept: 'application/json'
            },
            body:postBodyCategories,
          // })      
        
        }).then(response => {
          // responseBody = response.body;
          // cy.writeFile('.data/test.txt');
          expect(response.status).to.eq(201);
          console.log(responseBody);
        });
      });
    });
      
describe("Verify that the category has been created", () => {
  it('Filter the newly create Category by name', () => {
      cy.request({
          method: 'GET',
          url: `${API_URLS.TENANT_API}${CATEGORY_URL.Filter_Name_Categories}`,
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }).then((response) => {
          expect(response.status).to.equal(200)
          // expect(response.body.data[0].name).to.eq(`{"USA":"${Categories.Name}"}`);
          responseBody=response.body;
          cy.writeFile('.data/test.txt',responseBody);
        //expect(response.body.data).to.have.property('name','ValeTest12345')
          // add more assertions as needed
          // categoryId = response.body.unique_id
          // cy.wrap(categoryId).as('categoryId')
          // alreadyCreatedSlug = response.body.slug
          // cy.wrap(alreadyCreatedSlug).as('alreadyCreatedSlug')
          
        });
      });
  it('Filter the newly create Category by slug', () => {
      cy.request({
          method: 'GET',
          url: `${API_URLS.TENANT_API}${CATEGORY_URL.Filter_Slug_Categories}`,
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }).then((response) => {
          expect(response.status).to.equal(200)
          // expect(response.body.data[0].slug).to.eq(`${Categories.Slug}`);
          
          // add more assertions as needed
          // categoryId = response.body.unique_id
          // cy.wrap(categoryId).as('categoryId')
          // alreadyCreatedSlug = response.body.slug
          // cy.wrap(alreadyCreatedSlug).as('alreadyCreatedSlug')
        });
      });
    });      

describe("Category update", () => {
  beforeEach(() => {
    cy.getUniqueId(responseBody).then((unique_id) => {
      return cy.getID(responseBody).then((categoryId) => {
        putBodyCategories.id = categoryId;
        putBodyCategories.slug = "new-unique-slug1";

        // Return the updated putBodyCategories to pass it to the next Cypress command
        return putBodyCategories;
      });
      }).as('updatedBodyCategories');
    });

  it("Update category", () => {
    // Using 'cy.get' to access the updated putBodyCategories from the 'beforeEach' 
    cy.get('@updatedBodyCategories').then((updatedBodyCategories) => {
      cy.getUniqueId(responseBody).then((unique_id) => {
        cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}categories/${unique_id}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
            accept: "*/*",
            "Content-type": "application/json",
          },
          body: updatedBodyCategories, // Use the updated putBodyCategories here
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
});
    
      
describe("Delete category", () => {
  it('Delete newly created/updated category', () => {
    cy.getID(responseBody).then(categoryId => {
      cy.request({
        method: 'DELETE',
        url: `${API_URLS.TENANT_API}categories/${categoryId}`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(response => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
       
    
