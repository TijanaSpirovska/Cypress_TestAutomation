/// <reference types="cypress" />
import { baseUrl, url } from "../FE-Data/URLs";
import commonData from "../FE-Data/Common";
import productsData from "../FE-Data/Products";
import {filterItems} from '../FE-POM/Common';
import {multiLanguageField, populateFields} from '../FE-POM/Common';
require('cypress-xpath')

class getProductsPage {
    navigate() {
        cy.get(productsData.productsLink).click({force:true});
        cy.url().should('eq', url.productsPage);
        return this
    }

    verifyProductsPage() {
        cy.get(commonData.pageTitle).should('contain', productsData.productPageTitle)
        cy.get(commonData.table).should('exist').and('be.visible')
        cy.get(commonData.showPageItems).should('exist').and('be.visible')
        cy.get(commonData.itemsPerPage).should('exist').and('be.visible')
        cy.get(commonData.breadCrumb1).should('contain', 'Dashboard')
        cy.get(commonData.breadCrumb2).should('contain', 'Products')
        return this
    }
    singleFilterProductByName() {
        filterItems(url.productsPage,'Name',productsData.productName)
        return this
    }
    singleFilterProductBySlug() {
        filterItems(url.productsPage,'Slug',productsData.productSlug)
        return this
    }
    singleFilterProductByCategories() {
        filterItems(url.productsPage,'Categories',productsData.productCategory)
        return this
    }
    singleFilterProductByStatus() {
        filterItems(url.productsPage,'Status',productsData.productStatus)
        return this
    }
    singleFilterProductByCreatedAt() {
        filterItems(url.productsPage,'Created_at',productsData.productCreatedAt,"==")
        return this
    }
    advancedFilterProduct() {
        cy.get(commonData.switchToAdvancedFilter).should('be.visible').click({ force: true })
        cy.get(productsData.advancedFilterProductName).type(productsData.productName);
        cy.get(productsData.advancedFilterProductSlug).type(productsData.productSlug);
        cy.get(productsData.advancedFilterProductCategory).type(productsData.productCategory);
        cy.get(productsData.advancedFilterProductStatus).type(productsData.productStatus);
        cy.get(productsData.advancedFilterProductCreatedAt).type(productsData.productCreatedAt);
        cy.get(commonData.filterBtn).click({force:true})
        return this
    }
}

class createProduct {
    navigate() {
        cy.visit(url.productsPage)
        cy.url().should('be.equal', url.productsPage)
        cy.get(commonData.addButton).click()
        cy.url().should('be.equal', url.createProductPage)
        cy.get(commonData.pageTitle).should('contain', productsData.createProductPageTitle)
        return this
    }
    addProduct() {
        multiLanguageField(productsData.productNameField,productsData.productName,false);
        multiLanguageField(productsData.shortDescription,productsData.productName,false);
        multiLanguageField(productsData.productNameField,productsData.productName,true);
        cy.get(productsData.shippingType).click({ force: true });
        cy.wait(3000);

        // Scroll the clicked element into view
        cy.get(productsData.shippingType).scrollIntoView();

        // Type into the field
        cy.get(productsData.shippingType).type('Default{enter}',{force:true});
        cy.debug()
        return this
    }
}

export default {getProductsPage, createProduct};