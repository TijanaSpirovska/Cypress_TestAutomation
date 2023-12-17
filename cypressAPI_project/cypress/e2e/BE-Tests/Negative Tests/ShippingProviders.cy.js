import { GetAuthToken } from '../Auth/Oauth2.cy'
import { LIMIT, ShippingProviders, API_URLS, SHIPPINGPROVIDERS_URL} from '../../../data/StaticData';


let access_token = '';
let putBodyFedex = '';
let putBodyEasyPost = '';


beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });
    cy.fixture('putBodyFedex.json').then((putBodyFedexData) => {
        putBodyFedex = putBodyFedexData;
    });

    cy.fixture('putBodyFedex.json').then((putBodyEasyPostData) => {
        putBodyEasyPost = putBodyEasyPostData;
    });

   7
});

describe("Negative tests for updating Fedex shipping provider", () => {

    it("Validation for Fedex Key field in Update Shipping provider Fedex Page", () => {
        let updatedBodyFedex = {};
        putBodyFedex.cfg['FEDEX_KEY'] = "";
        updatedBodyFedex = putBodyFedex;
        putBodyFedex.status = true;
        
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}/1`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBodyFedex,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            
        });
    });

    it("Validation for Fedex Password field in Update Shipping provider Fedex Page", () => {
        let updatedBodyFedex = {};
        putBodyFedex.cfg['FEDEX_PASSWORD'] = "";
        putBodyFedex.status = true;
        updatedBodyFedex = putBodyFedex;
        cy.writeFile('.data/test.txt',updatedBodyFedex);
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}/1`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBodyFedex,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            
        });
    });

    it("Validation for Fedex Account number field in Update Shipping provider Fedex Page", () => {
        let updatedBodyFedex = {};
        putBodyFedex.cfg['FEDEX_ACCOUNT_NUMBER'] = "";
        putBodyFedex.status = true;
        updatedBodyFedex = putBodyFedex;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}/1`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBodyFedex,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            
        });
    });

    it("Validation for Fedex Meter Number field in Update Shipping provider Fedex Page", () => {
        let updatedBodyFedex = {};
        putBodyFedex.cfg['FEDEX_METER_NUMBER'] = "";
        putBodyFedex.status = true;
        updatedBodyFedex = putBodyFedex;
        cy.writeFile('.data/test.txt',updatedBodyFedex);
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}/1`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBodyFedex,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            
        });
    });

    
})

describe("Negative tests for updating EasyPost shipping provider", () => {
    it("Validation for EasyPost field in Update Shipping provider EasyPost Page", () => {
        let updatedBodyEasyPost = {};
        putBodyEasyPost.cfg['EASYPOST_KEY'] = "";
        putBodyEasyPost.status = true;
        updatedBodyEasyPost = putBodyEasyPost;
        cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}${SHIPPINGPROVIDERS_URL.Get_All_ShippingProviders}/2`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: "*/*",
                "Content-type": "application/json",
                // "Content-type": "text/plain"
            },
            body: updatedBodyEasyPost,
            failOnStatusCode: false
  
        }).then((response) => {
            expect(response.status).to.eq(422);
            
        });
    });
})

