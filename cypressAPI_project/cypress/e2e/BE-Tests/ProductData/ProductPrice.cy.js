import { GetAuthToken } from '../Auth/Oauth2.cy';
import { API_URLS} from '../../../data/StaticData';
import '../../../support/commands'

let access_token = '';
let productPrice = '';


beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('productPrice.json').then((productPriceData) => {
    productPrice = productPriceData;
  });
});

describe("Get all Information", () => {
  it('Get all product prices', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}tenant-configurations/prices`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data')
    });
  });
});

describe("Update product price ", () => {
  it('Creating a new product price ', () => {
    cy.request({
      method: 'PUT',
      url: `${API_URLS.TENANT_API}tenant-configurations/prices`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: productPrice
    }).then(response => {
      // responseBody = response.body;
      expect(response.status).to.eq(200);
      // expect(response.body.data.message).to.eq('Successfully updated Configuration data!');
    });
  });
});
