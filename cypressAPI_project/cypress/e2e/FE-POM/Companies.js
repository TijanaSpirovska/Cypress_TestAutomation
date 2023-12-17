/// <reference types="cypress" />
import { baseUrl, url } from "../FE-Data/URLs";
import commonData from "../FE-Data/Common";
import companiesData from "../FE-Data/Companies";


class getCompaniesPage {
    navigate() {
        cy.get(companiesData.CompaniesLink).click()
        cy.url().should('be.equal', url.companiesPage);
        return this
    }
    verifyCompaniesPage() {
        cy.get(commonData.pageTitle).should('contain', companiesData.companyPageTitle)
        cy.get(commonData.table).should('exist').and('be.visible')
        cy.get(commonData.showPageItems).should('exist').and('be.visible')
        cy.get(commonData.itemsPerPage).should('exist').and('be.visible')
        cy.get(commonData.breadCrumb1).should('contain', 'Dashboard')
        cy.get(commonData.breadCrumb2).should('contain', 'Companies')
        return this
    }
    singleFilterCompanyByName() {
        cy.get(commonData.singleFilter).click().type('Name{enter}')
        cy.get(companiesData.filterCompanyByNameInput).click().type('Iwconect')
        cy.get(commonData.filterBtn).click({force: true})
        return this
    }
    singleFilterCompanyByVat() {
        // cy.countCompanies()
        // cy.get('@CompanyCount').then((count) => {
        //     cy.log(`Number of Companies: ${count}`);
        // });
        cy.get(commonData.singleFilter).click().type('Vat{enter}')
        cy.get(companiesData.filterCompanyByVatInput).click().type('Iwconnect')
        cy.get(commonData.filterBtn).click({force: true})
        cy.get(commonData.resetBtn).click()
        cy.get(commonData.table)
        return this
    }
    advancedFilterCompany() {
        cy.get(commonData.switchToAdvancedFilter).should('be.visible').click({ force: true })
        cy.get(companiesData.advancedFilterCompanyName).type('vale')
        cy.get(companiesData.advancedFilterCompanyVat).type('test')
        cy.get(commonData.filterBtn).click()
        return this
    }
    // verifyCompaniesPagination() {

    // }
    // exportSelectedCompanies() {

    // }
    // exportAllCompanies() {

    // }
}

class createCompany {
    navigate() {
        cy.visit(url.companiesPage)
        cy.url().should('be.equal', url.companiesPage)
        cy.get(commonData.addButton).click({ force: true })
        cy.wait(2000)
        cy.url().should('be.equal', url.createCompanyPage)
        cy.get(commonData.pageTitle).should('contain', companiesData.createCompanyPageTitle)
        return this
    }
    addCompany() {
        cy.get(companiesData.nameInputField).click().type(commonData.name)
        cy.get(companiesData.vatInputFiled).click().type(companiesData.vat)
        cy.get(commonData.fileField).attachFile('images/pre-condition.png')
        const fileName = 'pre-condition.png';
        cy.wait(3000)
        cy.get('.m-0 > .btn').click()
        cy.url().should('be.equal', url.companiesPage);
        return this
    }
}
class updateCompany {
    navigateAndFilter() {
        cy.visit(url.companiesPage)
        cy.url().should('be.equal', url.companiesPage)
        cy.get(commonData.singleFilter).click().type('Name{enter}')
        cy.get(companiesData.filterCompanyByNameInput).click().type(commonData.name)
        cy.get(commonData.filterBtn).click({ force: true })
        cy.wait(3000)
        cy.get(commonData.editBtn).click({ force: true })
        cy.get(commonData.pageTitle).should('contain', companiesData.editCompanyPageTitle)
        cy.get(companiesData.nameInputField).should('be.visible').click({ force: true }).clear()
            .type(commonData.updatedName);
        cy.get(commonData.CreateUpdateBtn).click({ force: true })
        cy.url().should('be.equal', url.companiesPage);
        return this
    }
}
class deleteCompany {
    delete() {
        cy.visit(url.companiesPage)
        cy.url().should('be.equal', url.companiesPage)
        cy.get(commonData.singleFilter).click().type('Vat{enter}')
        cy.get(companiesData.filterCompanyByVatInput).click({ force: true }).type(companiesData.vat)
        cy.get(commonData.filterBtn).click({force:true})
        cy.wait(3000)
        cy.get(commonData.deleteBtn).click({ force: true })
        cy.get(commonData.confirmBtn).click({ force: true })
        cy.get(commonData.singleFilter).click().type('Vat{enter}')
        cy.get(companiesData.filterCompanyByVatInput).click({ force: true }).type(companiesData.vat)
        cy.get(commonData.table).should('contain', 'No data')
        return this
    }
}

export default { getCompaniesPage, createCompany, updateCompany, deleteCompany };