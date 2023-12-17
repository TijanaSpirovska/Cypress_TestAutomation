import { GetAuthToken } from '../Auth/Oauth2.cy'
import { Categories, API_URLS, CATEGORY_URL } from '../../../data/StaticData';

let access_token = '';
let postBodyCategories = '';
let putBodyCategories = '';
let endpoint = "58deb363ad8f4687877fd0261b196d57";
let updatedBodyCategories = "";


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
describe("Negative tests for creating a new category", () => {
  it("Category is not created without Name", () => {
    postBodyCategories.data.name = "";
    updatedBodyCategories = postBodyCategories;
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}categories`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json',
      },
      body: updatedBodyCategories,
      failOnStatusCode: false
    }).then(response => {
      cy.writeFile('.data/test.txt', response);
      expect(response.status).to.eq(422);
      expect(response.body.errors.data[0]).to.include("name field is required.");
    });
  })
  it("Category is not created with duplicate slug", () => {
    postBodyCategories.slug = "monitors";
    updatedBodyCategories = postBodyCategories;
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}categories`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json',
      },
      body: updatedBodyCategories,
      failOnStatusCode: false
    }).then(response => {
      cy.writeFile('.data/test.txt', response);
      expect(response.status).to.eq(422);
      expect(response.body.errors.slug[0]).to.include("The slug has already been taken.");
    });
  })
  it("Category is not created without Slug", () => {
    postBodyCategories.slug = "";
    updatedBodyCategories = postBodyCategories;
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}categories`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json',
      },
      body: updatedBodyCategories,
      failOnStatusCode: false
    }).then(response => {
      cy.writeFile('.data/test.txt', response);
      expect(response.status).to.eq(422);
      expect(response.body.errors.slug[0]).to.include("slug field is required.");
    });
  });
  it("Category is not created without Image", () => {
    postBodyCategories.file = "";
    updatedBodyCategories = postBodyCategories;
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}categories`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json',
      },
      body: updatedBodyCategories,
      failOnStatusCode: false
    }).then(response => {
      cy.writeFile('.data/test.txt', response);
      expect(response.status).to.eq(422);
      expect(response.body.errors.file[0]).to.include("file field is required.");
    });
  });
  it("Category is not created without Description", () => {
    postBodyCategories.data.description = "";
    updatedBodyCategories = postBodyCategories;
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}categories`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json',
      },
      body: updatedBodyCategories,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(422);
      expect(response.body.errors.data[0]).to.include("description field is required.");
    });
  });
})
describe("Negative tests for updating a category", () => {
  it("Category is not updated with duplicate slug", () => {
    putBodyCategories.slug = "monitors";
    updatedBodyCategories = putBodyCategories;
    cy.request({
      method: 'PUT',
      url: `${API_URLS.TENANT_API}categories/${endpoint}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: updatedBodyCategories,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(422);
      expect(response.body.errors.slug[0]).to.eq('The slug has already been taken.');
    });
  });
  it("Category is not updated without Name", () => {
    putBodyCategories.data.name = "";
    updatedBodyCategories = putBodyCategories;
    cy.request({
      method: 'PUT',
      url: `${API_URLS.TENANT_API}categories/${endpoint}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: updatedBodyCategories,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(422);
      expect(response.body.errors.data[0]).to.include('name field is required.');
    });
  });
  it("Category is not updated without Slug", () => {
    putBodyCategories.slug = "";
    updatedBodyCategories = putBodyCategories;
    cy.request({
      method: 'PUT',
      url: `${API_URLS.TENANT_API}categories/${endpoint}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: updatedBodyCategories,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(422);
      expect(response.body.errors.slug[0]).to.eq('The slug field is required.');
    });
  });
  it("Category is not updated without Image", () => {
    putBodyCategories.file = "";
    updatedBodyCategories = putBodyCategories;
    cy.request({
      method: 'PUT',
      url: `${API_URLS.TENANT_API}categories/${endpoint}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: updatedBodyCategories,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(422);
      // expect(response.body.errors.file).to.eq('The file field is required.');
    });
  });
  it("Category is not updated without Description", () => {
    putBodyCategories.data.description = "";
    updatedBodyCategories = putBodyCategories;
    cy.request({
      method: 'PUT',
      url: `${API_URLS.TENANT_API}categories/${endpoint}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: updatedBodyCategories,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(422);
      expect(response.body.errors.data[0]).to.include('description field is required.');
    });
  });
});
describe("Negative test for deleting category", () => {
  it('Category with related products is not deleted', () => {
    cy.request({
      method: 'DELETE',
      url: `${API_URLS.TENANT_API}categories/${endpoint}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(422);
      expect(response.body.errors.unique_id[0]).to.include("delete category due to related products");
    });
  });
});

