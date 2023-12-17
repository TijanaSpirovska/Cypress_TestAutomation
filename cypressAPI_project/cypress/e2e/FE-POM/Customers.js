/// <reference types="cypress" />
import { baseUrl, url } from "../FE-Data/URLs";
import commonData from "../FE-Data/Common";
import customersData from "../FE-Data/Customers";


class getCustomersPage {
    navigate() {
        cy.get(customersData.CustomersLink).click()
        cy.url().should('be.equal', url.customersPage);
        return this
    }
    verifyCustomersPage() {
        // cy.get(select.pageTitle).should('contain', variables.customersPageTitle)
        cy.get(commonData.table).should('exist').and('be.visible')
        cy.get(commonData.showPageItems).should('exist').and('be.visible')
        cy.get(commonData.itemsPerPage).should('exist').and('be.visible')
        cy.get(commonData.breadCrumb1).should('contain', 'Dashboard')
        cy.get(commonData.breadCrumb2).should('contain', 'Customers')
        return this
    }
    singleFilterCustomerByFirstName() {
        cy.get(commonData.singleFilter).click({force: true}).type('First name{enter}')
        cy.get(customersData.filterCustomerByFirstNameInput).click().type('Vale')
        cy.get(commonData.filterBtn).click({force: true})
        return this
    }
    singleFilterCustomerByLastName() {
        cy.get(commonData.singleFilter).click({force: true}).type('Last name{enter}')
        cy.get(customersData.filterCustomerByLastNameInput).click().type('Palko')
        cy.get(commonData.filterBtn).click({force: true})
        return this
    }
    singleFilterCustomerByUsername() {
        cy.get(commonData.singleFilter).click({force: true}).type('Username {enter}')
        cy.get(customersData.filterCustomerByUsernameInput).click().type(commonData.email)
        cy.get(commonData.filterBtn).click({force: true})
        cy.get(commonData.resetBtn).click({force: true})
        cy.get(commonData.table)
        return this
    }
    singleFilterCustomerByCustomerEmail() {
        cy.get(commonData.singleFilter).click({force: true}).type('Customer email {enter}')
        cy.get(customersData.filterCustomerByCustomerEmail).click().type(commonData.email)
        cy.get(commonData.filterBtn).click({force: true})
        cy.get(commonData.resetBtn).click({force: true})
        cy.get(commonData.table)
        return this
    }
    singleFilterCustomerByPhone() {
        cy.get(commonData.singleFilter).click().type('Phone {enter}')
        cy.get(customersData.filterCustomerByPhone).click().type(customersData.phone1)
        cy.get(commonData.filterBtn).click({force: true})
        cy.get(commonData.resetBtn).click({force: true})
        cy.get(commonData.table)
        return this
    }    
    advancedFilterCustomer() {
        cy.get(commonData.switchToAdvancedFilter).should('be.visible').click({ force: true })
        cy.get(customersData.advancedFilterFirstName).type('Vale')
        cy.get(customersData.advancedFilterLastName).type('Palko')
        cy.get(customersData.advancedFilterUsername).type(commonData.email)
        cy.get(customersData.advancedFilterCustomerEmail).type(commonData.email)
        cy.get(customersData.advancedFilterPhone).type(customersData.phone1)
        cy.get(commonData.filterBtn).click({force: true})
        return this
    }
    // verifyCompaniesPagination() {

    // }
    // exportSelectedCompanies() {

    // }
    // exportAllCompanies() {

    // }
}

class createCustomer {
    navigate() {
        cy.visit(url.customersPage)
        cy.url().should('be.equal', url.customersPage)
        cy.get(commonData.addButton).click()
        cy.wait(2000)
        cy.url().should('be.equal', url.createCustomerPage)
        cy.get(commonData.pageTitle).should('contain', customersData.createCustomerPageTitle)
        return this
    }

    addMandatoryValues() {
        cy.get(customersData.firstNameInputField).click({force: true}).type(customersData.firstName)
        cy.get(customersData.lastNameInputField).click({force: true}).type(customersData.lastName)
        cy.get(customersData.usernameInputField).click({force: true}).type(customersData.customerUsername)
        cy.get(customersData.addressNameInputField).click({force: true}).clear().type(customersData.addressName)
        cy.get(customersData.addressNumberInputField).click({force: true}).clear().type(customersData.addressNumber)
        cy.get(customersData.zipCodeInputField).click({force: true}).clear().type(customersData.zipCode)
        cy.get(customersData.cityInputField).click({force: true}).clear().type(customersData.city)
        
        cy.get('#country_code_0 > div > div.select__value-container.css-13t1v1n').type('Albania {enter}')
        cy.get(customersData.sameAsBillingCheckBox).check({force: true}).should('be.checked')
        // cy.get(commonData.StateField).click({force: true}).type(`customersData.state{enter}`)
        // cy.wait(3000)
        // cy.get('.m-0 > .btn').click({force: true})
    //     return this
    // }
    // createTheCustomer() {
    //     cy.get('.m-0 > .btn').click()
    //     cy.url().should('be.equal', url.customersPage);
    // }
    // assertCustomerIsCreated() {
    //     cy.get('.m-0 > .btn').click()
    //     cy.url().should('be.equal', url.customersPage);
    }

}
class updateCustomer {
    navigateAndFilter() {
        cy.visit(url.customersPage)
        cy.url().should('be.equal', url.customersPage)
        cy.get(commonData.singleFilter).click().type('Username{enter}')
        cy.get(customersData.filterCustomerByUsernameInput).click().type(commonData.email)
        cy.get(commonData.filterBtn).click()
        cy.wait(3000)
        cy.get('.me-2 > .ms-1').click()
        cy.get(commonData.pageTitle).should('contain', customersData.editCustomerPageTitle)
        cy.get(customersData.firstNameInputField).should('be.visible').click({ force: true }).clear()
            .type(commonData.updatedName);
        cy.get('.m-0 > .btn').click()
        cy.url().should('be.equal', url.customersPage);
    }
}
class deleteCustomer {
    delete() {
        cy.visit(url.customersPage)
        cy.url().should('be.equal', url.customersPage)
        cy.get(commonData.singleFilter).click().type('First name{enter}')
        cy.get(customersData.filterCustomerByFirstNameInput).click().type(commonData.updated)
        cy.get(commonData.filterBtn).click()
        cy.wait(3000)
        cy.get('.flex > .ms-1').click()
        cy.get(':nth-child(2) > .btn').click()
        cy.get(commonData.singleFilter).click().type('First name{enter}')
        cy.get(customersData.filterCustomerByFirstNameInput).click().type(commonData.updatedName)
        cy.get(commonData.table).should('contain', 'No data')

    }
}

export default { getCustomersPage, createCustomer, updateCustomer, deleteCustomer };