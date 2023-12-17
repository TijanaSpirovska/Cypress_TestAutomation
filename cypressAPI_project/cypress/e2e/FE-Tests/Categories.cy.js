/// <reference types="cypress" />
import { getCategoriesPage, createCategory, updateCategory, deleteCategory } from "../FE-POM/Categories"
import loginPage from "../FE-POM/Login"
import 'cypress-file-upload';

describe("Test Categories", function () {
    let getCategoryPage;
    let addCategory;
    let editCategory;
    let deleteACategory;

    beforeEach(() => {
        const login = new loginPage
        login.Precondition()
    })
    getCategoryPage = new getCategoriesPage();
    it("Verify Categories page", function () {
        getCategoryPage
            .navigate().verifyCategoriesPage()
    });
    it("Single filter categories by Name", function () {
        getCategoryPage
            .navigate().verifyCategoriesPage()
            .singleFilterCategoryByName()
    });
    it("Single filter categories by Slug", function () {
        getCategoryPage
            .navigate().verifyCategoriesPage()
            .singleFilterCategoryBySlug()
    });
    it("Advanced filter categories by Name+Slug", function () {
        getCategoryPage
            .navigate().verifyCategoriesPage()
            .advancedFilterCategory()
    });
    addCategory = new createCategory();
    it("Create Category", function () {
        addCategory
            .navigate().addCategory()
    });
    editCategory = new updateCategory();
    it("Update Category", function () {
        editCategory
            .navigateAndFilter()
    });
    deleteACategory = new deleteCategory();
    it("Delete Category", function () {
        deleteACategory
            .delete()
    });
})