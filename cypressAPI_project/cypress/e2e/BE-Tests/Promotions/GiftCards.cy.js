import { GetAuthToken } from '../Auth/Oauth2.cy';
import { API_URLS, GiftCard_URL } from '../../../data/StaticData';
import { GiftCards } from '../../../data/StaticData';
import '../../../support/commands'

let access_token = '';
let postBodyGiftCards = '';
let putBodyGiftCards = '';
let responseBody = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('postBodyGiftCards.json').then((postBodyGiftCardsData) => {
    postBodyGiftCards = postBodyGiftCardsData;
  });

  cy.fixture('putBodyGiftCards.json').then((putBodyGiftCardsData) => {
    putBodyGiftCards = putBodyGiftCardsData;
  });
});

describe("Get all Information", () => {
  it('Get all GiftCards', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${GiftCard_URL.Get_All_GiftCards}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data')
    });
  });
});

describe("Create a gift card", () => {
  it('Creating a new gift card', () => {
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}gift-cards`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: postBodyGiftCards
    }).then(response => {
      responseBody = response.body;
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Successfully created gift card!");
    });
  });
});

describe("Verify that the gift card has been created", () => {
  it('Filter new gift card by customer email', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${GiftCard_URL.Filter_CustomerEmail_GiftCards}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      responseBody = response.body;
      
      expect(response.status).to.eq(200);
      expect(response.body.data[0].customer_email).to.eq(`${GiftCards.Customer_email}`);
      expect(response.body).to.have.property('data')

    });
  });
  it('Filter new gift card by total amount', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${GiftCard_URL.Filter_TotalAmount_GiftCards}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      cy.writeFile('.data/test.txt',responseBody);
      expect(response.body).to.have.property('data');
      // expect(response.body.data[0].total_amount).to.eq(GiftCards.Total_amount);
    });
  });
  it('Filter new gift card by redeem amount', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${GiftCard_URL.Filter_RedeemAmount_GiftCards}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].redeem_amount).to.eq(GiftCards.Redeeem_amount);
    });
  });
  it('Filter new gift card by status', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${GiftCard_URL.Filter_Status_GiftCards}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].status).to.eq(GiftCards.Filter_status);
    });
  });
  it('Filter new gift card by valid from', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${GiftCard_URL.Filter_ValidFrom_GiftCards}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].valid_from).to.eq(GiftCards.Filter_validFrom);
    });
  });
  it('Filter new gift card by valid to', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${GiftCard_URL.Filter_ValidTo_GiftCards}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].valid_to).to.eq(GiftCards.Filter_validTo);
    });
  });
});

describe("Gift Cards update", () => {
  it("Update gift cards", () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
        cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}gift-cards/${unique_id}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
            accept: "*/*",
            "Content-type": "application/json",
          },
          body: putBodyGiftCards, // Use the updated putBodyGiftCards here
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Successfully updated Gift Card data!");
        });
      });
    });
  });

describe("Verify that the gift card has been updated", () => {
  it('Retrieve the name of the new gift card', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${GiftCard_URL.Filter_Updated_GiftCards}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});


describe("Delete gift card", () => {
  it('Delete newly created gift card', () => {
    cy.getID(responseBody).then(takenId => {
      cy.request({
        method: 'DELETE',
        url: `${API_URLS.TENANT_API}gift-cards/${takenId}`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Successfully deleted gift card!");
      });
    });
  });
});

describe("Verify the gift card is deleted", () => {
    it('Verify the gift card is successfully deleted', () => {
        cy.request({
          method: 'GET',
          url: `${API_URLS.TENANT_API}${GiftCard_URL.Filter_CustomerEmail_GiftCards}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        }).then(response => {
          responseBody = response.body;
          
          expect(response.status).to.eq(200);
          expect(response.body.data).to.be.empty;
    
});
})
})