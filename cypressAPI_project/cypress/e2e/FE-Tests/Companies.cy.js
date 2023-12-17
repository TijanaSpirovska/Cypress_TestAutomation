/// <reference types="cypress" />
import {getCompaniesPage, createCompany,updateCompany, deleteCompany } from "../FE-POM/Companies"
import loginPage from "../FE-POM/Login"
import 'cypress-file-upload';

describe("Test Companies", function () {
    let getCompanyPage;
    let addCompany;
    let editCompany;
    let deleteACompany;    

    beforeEach(() => {
        const login = new loginPage
        login.Precondition()
    })
    getCompanyPage = new getCompaniesPage();
    it("Verify Companies page", function () {
        getCompanyPage
            .navigate().verifyCompaniesPage()
    });
    it("Single filter Companies by Name", function () {
        getCompanyPage
            .navigate().verifyCompaniesPage()
            .singleFilterCompanyByName()
    });
    it("Single filter Companies by Vat", function () {
        getCompanyPage
            .navigate().verifyCompaniesPage()
            .singleFilterCompanyByVat()
    });
    it("Advanced filter Companies by Name+Slug", function () {
        getCompanyPage
            .navigate().verifyCompaniesPage()
            .advancedFilterCompany()
    });
    addCompany = new createCompany();
    it("Create Company", function () {
        addCompany
            .navigate().addCompany()
    });
    editCompany = new updateCompany();
    it("EditCompany", function () {
        editCompany
            .navigateAndFilter()
    });
        deleteACompany = new deleteCompany();
    it("DeleteCompany", function () {
        deleteACompany
            .delete()
    });
})