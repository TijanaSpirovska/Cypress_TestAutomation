import { GetAuthToken } from '../Auth/Oauth2.cy'
import { API_URLS } from '../../../data/StaticData';

let access_token = '';
let postBodyProductVariants = '';
let putBodyProductVariants = '';
let postBodyProductVariantPhoto = '';
let putBodyProductVariantPhoto = '';
let postBodyProductVariantPrice = '';
let putBodyProductVariantPrice = '';
let putBodyProductVariantInventory = '';
let updatedBodyProductVariants = '';
let updatedBodyProductVariantPrices = '';
let updatedBodyProductVariantInventory = '';
let endpoint1 = "products/675/variants";
let endpoint3 = "products/668/variants";
let endpoint2 = "product-variant/clone";
let variantToUpdate = "products/a4cdaf7861754f5185e981e84cc5b822/variants/f0b41ba44de042a3ab5f25566a9fa3a9"
let variantToUpdate1 = "products/a4cdaf7861754f5185e981e84cc5b822/variants/b38c28ba23644e9394a418e918ab0d7d"
let variantUniqueId = "f0b41ba44de042a3ab5f25566a9fa3a9"
let endpointPrice = "product-variant/price"
let endpointInventory = "product-variant/inventory"

beforeEach(() => {
    GetAuthToken().then(token => {
        access_token = token;
    });

    cy.fixture('postBodyProductVariant.json').then((postBodyProductVariantsData) => {
        postBodyProductVariants = postBodyProductVariantsData;
    });
    cy.fixture('putBodyProductVariant.json').then((putBodyProductVariantsData) => {
        putBodyProductVariants = putBodyProductVariantsData;
    });
    cy.fixture('postBodyProductVariantPhoto.json').then((postBodyProductVariantPhotoData) => {
        postBodyProductVariantPhoto = postBodyProductVariantPhotoData;
    });
    cy.fixture('putBodyProductVariantPhoto.json').then((putBodyProductVariantPhotoData) => {
        putBodyProductVariantPhoto = putBodyProductVariantPhotoData;
    });
    cy.fixture('postBodyProductVarinatPrice.json').then((postBodyProductVariantPriceData) => {
        postBodyProductVariantPrice = postBodyProductVariantPriceData;
    });
    cy.fixture('putBodyProductVariantPrice.json').then((putBodyProductVariantPriceData) => {
        putBodyProductVariantPrice = putBodyProductVariantPriceData;
    });
    cy.fixture('putBodyProductVariantInventory.json').then((putBodyProductVariantInventoryData) => {
        putBodyProductVariantInventory = putBodyProductVariantInventoryData;
    });
});



describe("Negative tests for creating a new Product Variant", () => {
    it('1. Variant is not created for product with no attributes', () => {
        postBodyProductVariants.sku = "testnoattributes";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint1}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            //    expect(response.body.errors.data).to.include(errorMessage);
        });
    });
    it('2. Variant is not cloned from product with no attributes', () => {
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint2}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: { "id": "f0b41ba44de042a3ab5f25566a9fa3a9" },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.data).to.include(errorMessage);
        });
    });
    it('3. Variant is not created without name', () => {
        postBodyProductVariants.data.name = "";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint3}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.data).to.include("name field is required.");
        });
    });
    it('4. Variant is not created without sku', () => {
        postBodyProductVariants.sku = "";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint3}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.sku).to.include('The Sku field is required.');
        });
    });
    it('5. Variant is not created with duplicate sku', () => {
        postBodyProductVariants.sku = "uniquesku";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint3}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.sku).to.include("The Sku has already been taken.");
        });
    });
    it('6. Variant is not created without description', () => {
        postBodyProductVariants.data.description = "";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint3}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.data).to.include("The [USA] description field is required.");
        });
    });
    it('7. Variant is not created without selected attribute ID', () => {
        postBodyProductVariants.selected_attributes.id = "";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint3}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.selected_attributes.0.id.to.eq("The selected_attributes.0.id field is required."))
        });
    });
    it('8. Variant is not created without selected attribute value', () => {
        postBodyProductVariants.selected_attributes.value = "";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint3}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.selected_attributes.0.id.to.eq("Selected Attribute [1] Value field is required."))
        });
    });
    it('9. Variant is not created without Shipping weight value', () => {
        postBodyProductVariants.product_data.fedEx_attributes.wight = "";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint3}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors).to.include("Weight has invalid value. Maximum 2 decimals")
        });
    });
    it('10. Variant is not created without Shipping units value', () => {
        postBodyProductVariants.product_data.fedEx_attributes.units = "";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint3}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors).to.include("The Units field is required.")
        });
    });
    it('11. Variant is not created without Shipping width value', () => {
        postBodyProductVariants.product_data.fedEx_attributes.width = "";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint3}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors).to.include("Width has invalid value. Maximum 2 decimals")
        });
    });
    it('12. Variant is not created without Shipping length value', () => {
        postBodyProductVariants.product_data.fedEx_attributes.length = "";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint3}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors).to.include("Length has invalid value. Maximum 2 decimals")
        });
    });
    it('13. Variant is not created without Shipping length value', () => {
        postBodyProductVariants.product_data.fedEx_attributes.length = "";
        updatedBodyProductVariants = postBodyProductVariants;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpoint3}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors).to.include("Length has invalid value. Maximum 2 decimals")
        });
    });
})
describe("Negative tests for updating a Product Variant ", () => {
    it('14. Variant is not updated without name', () => {
        putBodyProductVariants.data.name = "";
        updatedBodyProductVariants = putBodyProductVariants;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${variantToUpdate}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.data).to.include("name field is required.");
        });
    });
    it('15. Variant is not updated without sku', () => {
        putBodyProductVariants.data.sku = "";
        updatedBodyProductVariants = putBodyProductVariants;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${variantToUpdate}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.data).to.include("sku field is required.");
        });
    });
    it('16. Variant is not updated with duplicate sku', () => {
        putBodyProductVariants.data.sku = "uniquesku";
        updatedBodyProductVariants = putBodyProductVariants;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${variantToUpdate}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.data).to.include("The Sku has already been taken.");
        });
    });
    it('17. Variant is not updated without description', () => {
        putBodyProductVariants.data.description = "";
        updatedBodyProductVariants = putBodyProductVariants;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${variantToUpdate}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.data).to.include("description field is required.");
        });
    });

    it('18. Variant is not updated without selected attribute ID', () => {
        putBodyProductVariants.selected_attributes.id = "";
        updatedBodyProductVariants = putBodyProductVariants;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${variantToUpdate1}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.selected_attributes.0.id.to.eq("The selected_attributes.0.id field is required."))
        });
    });
    it('19. Variant is not updated without selected attribute value', () => {
        putBodyProductVariants.selected_attributes.value = "";
        updatedBodyProductVariants = putBodyProductVariants;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${variantToUpdate1}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.selected_attributes.0.id.to.eq("Selected Attribute [1] Value field is required."))
        });
    });
    it('20. Variant is not updated without Shipping weight value', () => {
        putBodyProductVariants.product_data.fedEx_attributes.wight = "";
        updatedBodyProductVariants = putBodyProductVariants;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${variantToUpdate}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.product_data.fedEx_attributes.weight).to.include("Weight has invalid value. Maximum 2 decimals")
        });
    });
    it('21. Variant is not updated without Shipping units value', () => {
        putBodyProductVariants.product_data.fedEx_attributes.units = "";
        updatedBodyProductVariants = putBodyProductVariants;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${variantToUpdate}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.product_data.fedEx_attributes.units).to.include("The Units field is required.")
        });
    });
    it('22. Variant is not updated without Shipping width value', () => {
        putBodyProductVariants.product_data.fedEx_attributes.width = "";
        updatedBodyProductVariants = putBodyProductVariants;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${variantToUpdate}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.product_data.fedEx_attributes.width).to.include("Width has invalid value. Maximum 2 decimals")
        });
    });
    it('23. Variant is not updated without Shipping length value', () => {
        putBodyProductVariants.product_data.fedEx_attributes.length = "";
        updatedBodyProductVariants = putBodyProductVariants;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${variantToUpdate}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.product_data.fedEx_attributes.width).to.include("Length has invalid value. Maximum 2 decimals")
        });
    });
    it('24. Variant is not updated without Shipping length value', () => {
        putBodyProductVariants.product_data.fedEx_attributes.length = "";
        updatedBodyProductVariants = putBodyProductVariants;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${variantToUpdate}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariants,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.product_data.fedEx_attributes.width).to.include("Length has invalid value. Maximum 2 decimals")
        });
    });
})
describe("Negative tests for creating a Variant price ", () => {
    it('25. Variant price is not created without Currency', () => {
        postBodyProductVariantPrice.product_variant_unique_id = variantUniqueId;
        postBodyProductVariantPrice.currency_key = "";
        updatedBodyProductVariantPrices = postBodyProductVariantPrice;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpointPrice}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.currency_key).to.include("The Currency field is required.");
        });
    });

    it('26. Variant price is not created without Price', () => {
        postBodyProductVariantPrice.product_variant_unique_id = variantUniqueId;
        postBodyProductVariantPrice.price = "";
        updatedBodyProductVariantPrices = postBodyProductVariantPrice;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpointPrice}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.price).to.include("The Price field is required.");
        });
    });
    it('27. Variant price is not created without Country', () => {
        postBodyProductVariantPrice.product_variant_unique_id = variantUniqueId;
        postBodyProductVariantPrice.country_key = "";
        updatedBodyProductVariantPrices = postBodyProductVariantPrice;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpointPrice}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.country_key).to.include("The Country field is required.");
        });
    });
    it('28. Variant price is not created with negative value', () => {
        postBodyProductVariantPrice.product_variant_unique_id = variantUniqueId;
        postBodyProductVariantPrice.price = -5000;
        updatedBodyProductVariantPrices = postBodyProductVariantPrice;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpointPrice}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.price).to.include("The Price must be at least 0.01.");
        });
    });
    it('29. Variant price is not created with invalid Currency key', () => {
        postBodyProductVariantPrice.product_variant_unique_id = variantUniqueId;
        postBodyProductVariantPrice.currency_key = "test";
        updatedBodyProductVariantPrices = postBodyProductVariantPrice;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpointPrice}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.price).to.include("The Price must be at least 0.01.");
        });
    });
    it('30. Variant price is not created with invalid Country key', () => {
        postBodyProductVariantPrice.product_variant_unique_id = variantUniqueId;
        postBodyProductVariantPrice.country_key = "test";
        updatedBodyProductVariantPrices = postBodyProductVariantPrice;
        cy.request({
            method: 'POST',
            url: `${API_URLS.TENANT_API}${endpointPrice}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.price).to.include("The Price must be at least 0.01.");
        });
    });
})
describe("Negative tests for updating a Variant price ", () => {
    it('31. Variant price is not updated without Currency', () => {
        putBodyProductVariantPrice.currency_key = "";
        updatedBodyProductVariantPrices = putBodyProductVariantPrice;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${endpointPrice}/${variantUniqueId}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.currency_key).to.include("The Currency field is required.");
        });
    });
    it('32. Variant price is not updated without Price', () => {
        putBodyProductVariantPrice.price = "";
        updatedBodyProductVariantPrices = putBodyProductVariantPrice;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${endpointPrice}/${variantUniqueId}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.price).to.include("The Price field is required.");
        });
    });
    it('33. Variant price is not updated without Country', () => {
        putBodyProductVariantPrice.country_key = "";
        updatedBodyProductVariantPrices = putBodyProductVariantPrice;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${endpointPrice}/${variantUniqueId}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.country_key).to.include("The Country field is required.");
        });
    });
    it('34. Variant price is not updated with negative value', () => {
        putBodyProductVariantPrice.price = -5000;
        updatedBodyProductVariantPrices = putBodyProductVariantPrice;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${endpointPrice}/${variantUniqueId}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.price).to.include("The Price must be at least 0.01.");
        });
    });
    it('35. Variant price is not updated with invalid Currency key', () => {
        putBodyProductVariantPrice.currency_key = "test";
        updatedBodyProductVariantPrices = putBodyProductVariantPrice;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${endpointPrice}/${variantUniqueId}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.price).to.include("The Price must be at least 0.01.");
        });
    });
    it('36. Variant price is not updated with invalid Country key', () => {
        putBodyProductVariantPrice.country_key = "test";
        updatedBodyProductVariantPrices = putBodyProductVariantPrice;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${endpointPrice}/${variantUniqueId}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.price).to.include("The Price must be at least 0.01.");
        });
    });
})
describe("Negative tests for updating a Variant inventory ", () => {
    it('37. Variant inventory is not updated without Quantity', () => {
        putBodyProductVariantInventory.quantity = "";
        updatedBodyProductVariantInventory = putBodyProductVariantInventory;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${endpointInventory}/${variantUniqueId}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.quantity).to.include("The quantity field is required.");
        });
    });
    it('38. Variant inventory is not updated without Warehouse Id', () => {
        putBodyProductVariantInventory.warehouse_id = "";
        updatedBodyProductVariantInventory = putBodyProductVariantInventory;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${endpointInventory}/${variantUniqueId}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantInventory,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.warehouse_id).to.include("The warehouse id field is required.");
        });
    });
    it('39. Variant inventory is not updated with invalid Warehouse Id ', () => {
        putBodyProductVariantInventory.warehouse_id = 1000;
        updatedBodyProductVariantInventory = putBodyProductVariantInventory;
        cy.request({
            method: 'PUT',
            url: `${API_URLS.TENANT_API}${endpointInventory}/${variantUniqueId}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json'
            },
            body: updatedBodyProductVariantPrices,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(422);
            // expect(response.body.errors.price).to.include("The Price field is required.");
        });
    });

})