/// <reference types="cypress" />
import { baseUrl, url } from "../FE-Data/URLs";
import commonData from "../FE-Data/Common";
import categoriesData from "../FE-Data/Categories";

class getCategoriesPage {
    navigate() {
        cy.get(categoriesData.categoriesLink).click()
        cy.url().should('be.equal', url.categoriesPage);
        return this
    }
    verifyCategoriesPage() {
        cy.get(commonData.pageTitle).should('contain', categoriesData.categoryPageTitle)
        cy.get(commonData.table).should('exist').and('be.visible')
        cy.get(commonData.showPageItems).should('exist').and('be.visible')
        cy.get(commonData.itemsPerPage).should('exist').and('be.visible')
        cy.get(commonData.breadCrumb1).should('contain', 'Dashboard')
        cy.get(commonData.breadCrumb2).should('contain', 'Categories')
        return this
    }
    singleFilterCategoryByName() {
        cy.get(commonData.singleFilter).click().type('Name{enter}')
        cy.get(categoriesData.filterCategoryByNameInput).click().type('Office')
        cy.get(commonData.filterBtn).click({force: true})
        return this
    }
    singleFilterCategoryBySlug() {
        cy.get(commonData.singleFilter).click().type('Slug{enter}')
        cy.get(categoriesData.filterCategoryBySlugInput).click().type('Office')
        cy.get(commonData.filterBtn).click({ force: true })
        cy.get(commonData.resetBtn).click()
        cy.get(commonData.table)
        return this
    }
    advancedFilterCategory() {
        cy.get(commonData.switchToAdvancedFilter).should('be.visible').click({ force: true })
        cy.get(categoriesData.advancedFilterCategoryName).type('vale')
        cy.get(categoriesData.advancedFilterCategorySlug).type('test')
        cy.get(commonData.filterBtn).click()
        return this
    }
    // verifyCategoriesPagination() {

    // }
    // exportSelectedCategories() {

    // }
    // exportAllCategories() {

    // }
}

class createCategory {
    navigate() {
        cy.visit(url.categoriesPage)
        cy.url().should('be.equal', url.categoriesPage)
        cy.get(commonData.addButton).click()
        cy.url().should('be.equal', url.createCategoryPage)
        cy.get(commonData.pageTitle).should('contain', categoriesData.createCategoryPageTitle)
        return this
    }
    addCategory() {
        cy.get(commonData.fileField).attachFile('images/pre-condition.png')
        cy.get(commonData.nameMultiInput).viewport(1920, 1080)
        cy.get(commonData.nameMultiInput).click().type(commonData.name)
        cy.get('iframe[title="Rich Text Area"]').then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).as('textArea'); // Assign an alias to the element
        });
        cy.get('@textArea').click({ force: true }).type(commonData.descriptionText); // Use the alias to refer to the element
        cy.get(commonData.CreateUpdateBtn).click()
        cy.url().should('be.equal', url.categoriesPage);
        return this
    }
}
class updateCategory {
    navigateAndFilter() {
        cy.visit(url.categoriesPage)
        cy.url().should('be.equal', url.categoriesPage)
        cy.get(commonData.singleFilter).click().type('Name{enter}')
        cy.get(categoriesData.filterCategoryByNameInput).click().type(commonData.name)
        cy.get(commonData.filterBtn).click({ force: true })
        cy.wait(3000)
        cy.get(commonData.editBtn).click()
        cy.get(commonData.pageTitle).should('contain', categoriesData.editCategoryPageTitle)
        cy.get(commonData.nameMultiInput).should('be.visible').click({ force: true }).clear()
            .type(commonData.updatedName);
        cy.get(commonData.CreateUpdateBtn).click()
        cy.url().should('be.equal', url.categoriesPage);
    }
}
class deleteCategory {
    delete() {
        cy.visit(url.categoriesPage)
        cy.url().should('be.equal', url.categoriesPage)
        cy.get(commonData.singleFilter).click().type('Name{enter}')
        cy.get(categoriesData.filterCategoryByNameInput).click().type(commonData.updatedName)
        cy.get(commonData.filterBtn).click({ force: true })
        cy.wait(3000)
        cy.get(commonData.deleteBtn).click()
        cy.get(commonData.confirmBtn).click()
        cy.get(commonData.singleFilter).click().type('Name{enter}')
        cy.get(categoriesData.filterCategoryByNameInput).click().type(commonData.updatedName)
        cy.get(commonData.table).should('contain', 'No data')
    }
}

export default { getCategoriesPage, createCategory, updateCategory, deleteCategory };