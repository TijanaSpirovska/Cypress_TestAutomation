/// <reference types="cypress" />
import { getProductsPage, createProduct} from "../FE-POM/Products"
import loginPage from "../FE-POM/Login";
// import 'cypress-file-upload';

describe("Test Products", function () {
    let getProductPage;
    let addProduct;
    // let editCategory;
    // let deleteACategory;

    beforeEach(() => {
        const login = new loginPage
        login.Precondition()
    })
    getProductPage = new getProductsPage();
    // it("Verify Products page", function () {
    //     getProductPage
    //         .navigate().verifyProductsPage()
    // });
    // it("Single filter Products by Name", function () {
    //     getProductPage
    //         .singleFilterProductByName()
    // });
    // it("Single filter Products by Slug", function () {
    //     getProductPage
    //         .singleFilterProductBySlug()
    // });
    // it("Single filter Products by Category", function () {
    //     getProductPage
    //         .singleFilterProductByCategories()
    // });
    // it("Single filter Products by Status", function () {
    //     getProductPage
    //         .singleFilterProductByStatus()
    // });
    // it("Single filter Products by Created at", function () {
    //     getProductPage
    //         .singleFilterProductByCreatedAt()
    // });
    // it("Advanced filter Products by Name+Slug+Category+Status+Created_at", function () {
    //     getProductPage
    //         .navigate().verifyProductsPage()
    //         .advancedFilterProduct()
    // });
    addProduct = new createProduct();
    it("Create Product", function () {
        addProduct
            .navigate().addProduct()
    });
    // editCategory = new updateCategory();
    // it("Update Category", function () {
    //     editCategory
    //         .navigateAndFilter()
    // });
    // deleteACategory = new deleteCategory();
    // it("Delete Category", function () {
    //     deleteACategory
    //         .delete()
    // });
})