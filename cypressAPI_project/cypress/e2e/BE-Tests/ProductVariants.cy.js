import { GetAuthToken } from './Auth/Oauth2.cy'
import { API_URLS, PRODUCT_URL, ProductVariant_URL } from '../../data/StaticData';
import { Products, productVariant } from '../../data/StaticData';
import '../../support/commands'
// require('cypress-plugin-api')

let access_token = '';
let postBodyProducts = '';
let postBodyProductVariant = '';
let putBodyProductVariant = '';
let responseBodyVariant = '';
let responseBody = '';
let postBodyProductVarinatPrice = '';
let putBodyProductVariantPrice = '';
let postBodyProductVariantPhoto = '';
let putBodyProductVariantPhoto = '';
let putBodyProductVariantInventory = '';
let postBodyProductVarinat3D = '';

beforeEach(() => {
  GetAuthToken().then(token => {
    access_token = token;
  });

  cy.fixture('postBodyProducts.json').then((postBodyProductsData) => {
    postBodyProducts = postBodyProductsData;
  });

  cy.fixture('postBodyProductVariant.json').then((postBodyProductVariantData) => {
    postBodyProductVariant = postBodyProductVariantData;
  });

  cy.fixture('putBodyProductVariant.json').then((putBodyProductVariantData) => {
    putBodyProductVariant = putBodyProductVariantData;
  });

  cy.fixture('postBodyProductVarinatPrice.json').then((postBodyProductVarinatPriceData) => {
    postBodyProductVarinatPrice = postBodyProductVarinatPriceData;
  });

  cy.fixture('putBodyProductVariantPrice.json').then((putBodyProductVariantPriceData) => {
    putBodyProductVariantPrice = putBodyProductVariantPriceData;
  });

  cy.fixture('postBodyProductVariantPhoto.json').then((postBodyProductVariantPhotoData) => {
    postBodyProductVariantPhoto = postBodyProductVariantPhotoData;
  });

  cy.fixture('putBodyProductVariantPhoto.json').then((putBodyProductVariantPhotoData) => {
    putBodyProductVariantPhoto = putBodyProductVariantPhotoData;
  });

  cy.fixture('putBodyProductVariantInventory.json').then((putBodyProductVariantInventoryData) => {
    putBodyProductVariantInventory = putBodyProductVariantInventoryData;
  });

  cy.fixture('postBodyProductVarinat3D.json').then((postBodyProductVarinat3DData) => {
    postBodyProductVarinat3D = postBodyProductVarinat3DData;
  });
});

describe("Get all Information", () => {
  it('Get all products', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${PRODUCT_URL.Get_All_Products}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      // cy.log(response.body);
      expect(response.body).to.have.property('data')
    });
  });
});

describe("Create a product", () => {
  it('Creating a new product', () => {
    cy.request({
      method: 'POST',
      url: `${API_URLS.TENANT_API}products`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      },
      body: postBodyProducts
    }).then(response => {
      responseBody = response.body;
      expect(response.status).to.eq(201);
    });
  });
});
describe("Verify that the product has been created", () => {
  it('Filter new product by name', () => {
    cy.request({
      method: 'GET',
      url: `${API_URLS.TENANT_API}${PRODUCT_URL.Filter_Name_Products}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(response => {
      responseBody = response.body;
      cy.writeFile('.data/test.txt',responseBody);

      expect(response.status).to.eq(200);
      // expect(response.body.data[0].name).to.eq(`{"USA":"${Products.Name}"}`);

    });
  });
});
describe("Create a product variant", () => {
  it('Creating a new product variant', () => {
    cy.getID(responseBody).then((productId) => {
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}products/${productId}/variants`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: postBodyProductVariant
      }).then(response => {
        expect(response.status).to.eq(201);
      });
    });
  })
})
describe("Verify that the product variant has been created", () => {
  it('Filter new product variant by name', () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}products/${unique_id}/${ProductVariant_URL.Filter_Name_productVariant}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        responseBodyVariant = response.body;
        // cy.writeFile('.data/test.txt', responseBodyVariant);

      });
    });
  })
  it('Filter new product variant by sku', () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}products/${unique_id}/${ProductVariant_URL.Filter_Sku_productVariant}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);


      });
    });
  })
});

describe("Upload product variant photo", () => {
  beforeEach(() => {

    return cy.getUniqueId(responseBodyVariant).then((variant_id) => {
      postBodyProductVariantPhoto.product_variant_unique_id = `${variant_id}`;
      return postBodyProductVariantPhoto;

    }).as('updatedBodyPhoto');
  });
  it('Creating a new product photo', () => {
    cy.get('@updatedBodyPhoto').then((updatedBodyPhoto) => {
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}product-variant/photo`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyPhoto
      }).then(response => {
        expect(response.status).to.eq(201);
      });
    });
  });
})

describe("Product variant photo update", () => {
  it("Update product variant photo", () => {
    cy.getVariantUniqueID(responseBody).then((photo_unique_id) => {
      cy.request({
        method: "PUT",
        url: `${API_URLS.TENANT_API}product-variant/photo/${photo_unique_id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: "*/*",
          "Content-type": "application/json",
        },
        body: putBodyProductVariantPhoto,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});

// describe("Upload product variant 3D model", () => {
//   beforeEach(() => {

//     return cy.getUniqueId(responseBodyVariant).then((variant_id) => {
//       postBodyProductVarinat3D.product_variant_unique_id = `${variant_id}`;
//       return postBodyProductVarinat3D;

//     }).as('updatedBody3D');
//   });
//   it('Creating a new product photo', () => {
//     cy.getVariantUniqueID(responseBody).then((unique_id_variant) =>{
//     cy.get('@updatedBody3D').then((updatedBody3D) => {
//       cy.request({
//         method: 'PUT',
//         url: `${API_URLS.TENANT_API}product-variant/model/${unique_id_variant}`,
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//           accept: 'application/json',
//           'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryUGnYAeeFmYOO945G'
//         },
//         body: updatedBody3D,
//       }).then(response => {
//         expect(response.status).to.eq(204);
//       });
//     });
//   });
// })})



describe("Create a product price", () => {
  beforeEach(() => {
    return cy.getUniqueId(responseBodyVariant).then((variant_id) => {
      postBodyProductVarinatPrice.product_variant_unique_id = `${variant_id}`;
      return postBodyProductVarinatPrice;

    }).as('updatedBodyPrice');
  });
  it('Creating a new product price', () => {
    cy.get('@updatedBodyPrice').then((updatedBodyPrice) => {
      cy.request({
        method: 'POST',
        url: `${API_URLS.TENANT_API}product-variant/price`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        },
        body: updatedBodyPrice
      }).then(response => {
        expect(response.status).to.eq(201);
      });
    });
  });
})

describe("Verify that the product variant price has been created", () => {
  it('Filter new product variant price by price', () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}product-variant/${unique_id}/${ProductVariant_URL.Filter_Price_productVariant}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {

        expect(response.status).to.eq(200);


      });
    });
  })
  it('Filter new product variant by name', () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}products/${unique_id}/${ProductVariant_URL.Filter_Name_productVariant}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        responseBodyVariant = response.body;
        cy.writeFile('.data/test1.txt', responseBody);

      });
    });
  })
  it('Filter new product variant price by country', () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}product-variant/${unique_id}/${ProductVariant_URL.Filter_Country_productVariant}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);

      });
    });
  })
  it('Filter new product variant price by valid from', () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}product-variant/${unique_id}/${ProductVariant_URL.Filter_validFrom_productVariant}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);

      });
    });
  })
  it('Filter new product variant price by valid to', () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}product-variant/${unique_id}/${ProductVariant_URL.Filter_validTo_productVariant}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);

      });
    });
  })
});

describe("Product variant price update", () => {
  it("Update product variant", () => {
    cy.getPriceUniqueID(responseBodyVariant).then((price_unique_id) => {
      cy.request({
        method: "PUT",
        url: `${API_URLS.TENANT_API}product-variant/price/${price_unique_id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: "*/*",
          "Content-type": "application/json",
        },
        body: putBodyProductVariantPrice,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});


describe("Delete product variant price", () => {
  it('Delete newly created product variant price', () => {
    cy.getPriceId(responseBodyVariant).then(price_id => {
      cy.request({
        method: 'DELETE',
        url: `${API_URLS.TENANT_API}product-variant/price/${price_id}`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(response => {
        expect(response.status).to.eq(200);
      });
    });
  });
});

describe("Product variant inventory update", () => {
  beforeEach(() => {

    return cy.getVariantId(responseBody).then((unique_id) => {
      putBodyProductVariantInventory.product_variant_id = unique_id;
      return putBodyProductVariantInventory;
    })
      .as('updatedBodyProductVariantInventory');
  });
  it("Update product variant inventory", () => {
    cy.get('@updatedBodyProductVariantInventory').then((updatedBodyInventory) => {
      cy.getUniqueId(responseBodyVariant).then((variant_unique_id) => {
        cy.request({
          method: "PUT",
          url: `${API_URLS.TENANT_API}product-variant/inventory/${variant_unique_id}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
            accept: "*/*",
            "Content-type": "application/json",
          },
          body: updatedBodyInventory,
        }).then((response) => {
          expect(response.status).to.eq(201);
        });
      });
    });
  });
})


describe("Product variant update", () => {
  beforeEach(() => {
    cy.getID(responseBodyVariant).then((variant_id) => {
      return cy.getID(responseBody).then((product_id) => {
        putBodyProductVariant.variant_id = variant_id;
        putBodyProductVariant.product_id = product_id;
        return putBodyProductVariant;
      });
    }).as('updatedBodyProductVariant');
  });

  it("Update product variant", () => {
    cy.get('@updatedBodyProductVariant').then((updatedBodyProductVariant) => {
      cy.getUniqueId(responseBodyVariant).then((unique_id_variant) => {
        cy.getUniqueId(responseBody).then((unique_id) => {
          cy.request({
            method: "PUT",
            url: `${API_URLS.TENANT_API}products/${unique_id}/variants/${unique_id_variant}`,
            headers: {
              Authorization: `Bearer ${access_token}`,
              accept: "*/*",
              "Content-type": "application/json",
            },
            body: updatedBodyProductVariant,
          }).then((response) => {
            expect(response.status).to.eq(200);
          });
        });
      });
    });
  })
});

describe("Verify that the product has been updated", () => {
  it('Retrieve the name of the new product', () => {
    cy.getUniqueId(responseBody).then((unique_id) => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}products/${unique_id}/${ProductVariant_URL.Filter_updatedName_productVariant}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);
      });
    });
  })
});

describe("Delete product variant", () => {
  it('Delete newly created product variant', () => {
    cy.getID(responseBodyVariant).then((variant_id) => {
      cy.getID(responseBody).then(takenId => {
        cy.request({
          method: 'DELETE',
          url: `${API_URLS.TENANT_API}products/${takenId}/variants/${variant_id}`,
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }).then(response => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
})

describe("Verify the product variant is deleted", () => {
  it('Verify the product variant is successfully deleted', () => {
    cy.getID(responseBodyVariant).then((variant_id) => {
      cy.getID(responseBody).then(takenId => {
        cy.request({
          method: 'GET',
          url: `${API_URLS.TENANT_API}products/${takenId}/variants/${variant_id}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        }).then(response => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.be.empty;
        });
      });
    });
  })
})

describe("Delete product", () => {
  it('Delete newly created product', () => {
    cy.getUniqueId(responseBody).then(takenId => {
      cy.request({
        method: 'DELETE',
        url: `${API_URLS.TENANT_API}products/${takenId}`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(response => {
        expect(response.status).to.eq(200);
      });
    });
  });
});

describe("Verify the product is deleted", () => {
  it('Verify the product is successfully deleted', () => {
    cy.getID(responseBody).then(takenId => {
      cy.request({
        method: 'GET',
        url: `${API_URLS.TENANT_API}products/${takenId}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.empty;
      });
    });
  });
})
