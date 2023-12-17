import { GetAuthToken } from './Auth/Oauth2.cy'
import { API_URLS} from '../../data/StaticData';
import '../../support/commands'


let access_token = '';
let putBodyLanguages = '';


beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('putBodyLanguages.json').then((putBodyLanguagesData) => {
    putBodyLanguages = putBodyLanguagesData;
  });
});

describe("Language update", () => {
    it("Update language", () => {
          cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}tenant-configurations/countries`,
            headers: {
              Authorization: `Bearer ${access_token}`,
              accept: "*/*",
              "Content-type": "application/json",
            },
            body: putBodyLanguages, 
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.message).to.eq('Successfully updated Configuration data!');
          });
          
          
        });
      });
   
