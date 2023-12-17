import { GetAuthToken } from '../Auth/Oauth2.cy'
import { API_URLS} from '../../../data/StaticData';
import '../../../support/commands'

let access_token = '';
let productType = '';
let responseBody = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('productType.json').then((productTypeData) => {
    productType = productTypeData;
  });
});

describe("Get all Information", () => {
  it('Get all product types', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}tenant-configurations/product_types`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data')
    });
  });
});

describe("Update product type ", () => {
  it('Creating a new product type ', () => {
    cy.request({
      method: 'PUT',
      url: `${API_URLS.TENANT_API}tenant-configurations/product_types`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: productType
    }).then(response => {
      responseBody = response.body;
      expect(response.status).to.eq(200);
      expect(response.body.data.message).to.eq('Successfully updated Configuration data!');
    });
  });
});

