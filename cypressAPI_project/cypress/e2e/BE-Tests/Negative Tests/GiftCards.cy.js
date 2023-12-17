import { GetAuthToken } from '../Auth/Oauth2.cy';
import { API_URLS, GiftCard_URL } from '../../../data/StaticData';
import { GiftCards } from '../../../data/StaticData';


let access_token = '';
let postBodyGiftCards = '';
let putBodyGiftCards = '';


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
  

describe("Negative tests for creating a new Gift Card", () => {
    it('Validation for Total Amount field in Create Gift Card Page', () => {
        let updatedBodyGiftCards = "";
        postBodyGiftCards.total_amount = "";
        updatedBodyGiftCards = postBodyGiftCards;
        cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}gift-cards`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBodyGiftCards,
        failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            const errorMessage = "The Total amount field is required.";
            expect(response.body.errors.total_amount).to.include(errorMessage);
        });
    });

    it('Validation for Customer email field in Create Gift Card Page', () => {
        let updatedBodyGiftCards = "";
        postBodyGiftCards.customer_email = "";
        updatedBodyGiftCards = postBodyGiftCards;
        cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}gift-cards`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBodyGiftCards,
        failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            const errorMessage = "The Customer email field is required.";
            expect(response.body.errors.customer_email).to.include(errorMessage);
        });
    });
});

describe("Negative tests for updating a Gift Card", () => {
    it('Validation for Total Amount field in Edit Gift Card Page', () => {
        let updatedBodyGiftCards = "";
        putBodyGiftCards.total_amount = "";
        updatedBodyGiftCards = putBodyGiftCards;
        cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}gift-cards/cede6b25adad4711b6e17d3adfca92c2`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBodyGiftCards,
        failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            const errorMessage = "The Total amount field is required.";
            expect(response.body.errors.total_amount).to.include(errorMessage);
        });
    });

    it('Validation for Customer email field in Edit Gift Card Page', () => {
        let updatedBodyGiftCards = "";
        putBodyGiftCards.customer_email = "";
        updatedBodyGiftCards = putBodyGiftCards;
        cy.request({
        method: 'PUT',
        url: `${API_URLS.TENANT_API}gift-cards/cede6b25adad4711b6e17d3adfca92c2`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json'
        },
        body: updatedBodyGiftCards,
        failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            const errorMessage = "The Customer email field is required.";
            expect(response.body.errors.customer_email).to.include(errorMessage);
        });
    });
});