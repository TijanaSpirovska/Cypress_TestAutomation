/// <reference types="cypress" />
import loginPage from "../FE POM/Login";
import loginData from "../FE Data/Login";


describe("Verify Login/Logout actions", function () {
    let login;
    beforeEach(function () {

        login = new loginPage();
        cy.clearCookies();
        login.navigate().loggingIn();
    })
        it("Login with valid credentials", function () {
            login.enterEmail(loginData.validEmail).enterPassword(loginData.validPassword).submit()
                .assertLogin();
        }),
        it("Login with invalid credentials", function () {
            login.enterEmail(loginData.invalidEmail).enterPassword(loginData.invalidPassword).submit()
                .assertInvalidLogin();
        }),
        it("Login with empty credentials fields", function () {
            login.submit()
                .assertEmptyCredentialsLogin()
        }),
        it("Soft logout", function () {
            login.enterEmail(loginData.validEmail).enterPassword(loginData.validPassword).submit()
                .assertLogin()
            login.logout1().softLogout()
                .assertSoftLogout()
        }),
        it("Hard logout", function () {
            login.enterEmail(loginData.validEmail).enterPassword(loginData.validPassword).submit()
                .assertLogin()
            login.logout1().hardLogout()
                .assertHardLogout()
        })
})
