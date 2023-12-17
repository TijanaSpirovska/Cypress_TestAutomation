import { GetAuthToken } from '../Auth/Oauth2.cy'
import { API_URLS, TAXPROVIDERS_URL } from '../../../data/StaticData';


let access_token = '';
let putBodyTaxJar = '';
let putBodyTaxAvalara = '';
let putBodyTaxVertex = '' ;
let updatedBody = '' ;

beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });
    cy.fixture('putBodyTaxJar.json').then((putBodyTaxJarData) => {
        putBodyTaxJar = putBodyTaxJarData;
    });
    cy.fixture('putBodyTaxAvalara.json').then((putBodyTaxAvalaraData) => {
        putBodyTaxAvalara = putBodyTaxAvalaraData;
    });
    cy.fixture('putBodyVertex.json').then((putBodyTaxVertexData) => {
        putBodyTaxVertex = putBodyTaxVertexData;
    });
});

// describe("Negative tests for updating TaxJar tax provider", () => {
//     it("Validation for TaxJar API Token field in Update Tax provider TaxJar Page", () => {
//         putBodyTaxJar.cfg['TAXJAR_API_TOKEN'] = "";
//         updatedBody = putBodyTaxJar;
//         putBodyTaxJar.status = true;
//         cy.request({
//             method: "PUT",
//             url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/1`,
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//                 accept: "*/*",
//                 "Content-type": "application/json",
//             },
//             body: updatedBody,
//             failOnStatusCode: false

//         }).then((response) => {
//             expect(response.status).to.eq(422);
//         });
//     });
// });

// describe("Negative tests for updating TaxAvalara tax provider", () => {
//     it("Validation for TaxAvalara Username field in Update Tax provider Avalara Page", () => {
//         putBodyTaxAvalara.cfg['AVALARA_USERNAME'] = "";
//         updatedBody = putBodyTaxAvalara;
//         putBodyTaxAvalara.status = true;
//         cy.request({
//             method: "PUT",
//             url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/2`,
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//                 accept: "*/*",
//                 "Content-type": "application/json",
//             },
//             body: updatedBody,
//             failOnStatusCode: false

//         }).then((response) => {
//             expect(response.status).to.eq(422);
//         });
//     });

//     it("Validation for TaxAvalara Account ID field in Update Tax provider Avalara Page", () => {
//         putBodyTaxAvalara.cfg['AVALARA_ACCOUNT_ID'] = "";
//         updatedBody = putBodyTaxAvalara;
//         putBodyTaxAvalara.status = true;
//         cy.request({
//             method: "PUT",
//             url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/2`,
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//                 accept: "*/*",
//                 "Content-type": "application/json",
//             },
//             body: updatedBody,
//             failOnStatusCode: false

//         }).then((response) => {
//             expect(response.status).to.eq(422);
//         });
//     });

//     it("Validation for TaxAvalara Password field in Update Tax provider Avalara Page", () => {
//         putBodyTaxAvalara.cfg['AVALARA_PASSWORD'] = "";
//         updatedBody = putBodyTaxAvalara;
//         putBodyTaxAvalara.status = true;
//         cy.request({
//             method: "PUT",
//             url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/2`,
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//                 accept: "*/*",
//                 "Content-type": "application/json",
//             },
//             body: updatedBody,
//             failOnStatusCode: false

//         }).then((response) => {
//             expect(response.status).to.eq(422);
//         });
//     });

//     it("Validation for TaxAvalara Company ID field in Update Tax provider Avalara Page", () => {
//         putBodyTaxAvalara.cfg['AVALARA_COMPANY_ID'] = "";
//         updatedBody = putBodyTaxAvalara;
//         putBodyTaxAvalara.status = true;
//         cy.request({
//             method: "PUT",
//             url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/2`,
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//                 accept: "*/*",
//                 "Content-type": "application/json",
//             },
//             body: updatedBody,
//             failOnStatusCode: false

//         }).then((response) => {
//             expect(response.status).to.eq(422);
//         });
//     });

//     it("Validation for TaxAvalara Taxprayer ID field in Update Tax provider Avalara Page", () => {
//         putBodyTaxAvalara.cfg['AVALARA_TAXPAYER_ID'] = "";
//         updatedBody = putBodyTaxAvalara;
//         putBodyTaxAvalara.status = true;
//         cy.request({
//             method: "PUT",
//             url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/2`,
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//                 accept: "*/*",
//                 "Content-type": "application/json",
//             },
//             body: updatedBody,
//             failOnStatusCode: false

//         }).then((response) => {
//             expect(response.status).to.eq(422);
//         });
//     });
// });

// describe("Negative tests for updating Vertex tax provider", () => {
//     it("Validation for Vertex API Token field in Update Tax provider VertexPage", () => {
//         putBodyTaxVertex.cfg['VERTEX_API_TOKEN'] = "";
//         updatedBody = putBodyTaxVertex;
//         putBodyTaxVertex.status = true;
//         cy.request({
//             method: "PUT",
//             url: `${API_URLS.TENANT_API}${TAXPROVIDERS_URL.Get_All_TaxProviders}/3`,
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//                 accept: "*/*",
//                 "Content-type": "application/json",
//             },
//             body: updatedBody,
//             failOnStatusCode: false

//         }).then((response) => {
//             expect(response.status).to.eq(422);
//         });
//     });
// });