import { GetAuthToken } from './Auth/Oauth2.cy'
import { API_URLS} from '../../data/StaticData';
import '../../support/commands'

let access_token = '';
let putBodyCurrency = '';


beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('putBodyCurrency.json').then((putBodyCurrencyData) => {
    putBodyCurrency = putBodyCurrencyData;
  });
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
            // expect(response.body.data.message).to.eq('Successfully updated Configuration data!');
          });
          
          
        });
      });
   
