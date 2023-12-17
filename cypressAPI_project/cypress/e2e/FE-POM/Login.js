/// <reference types="cypress" />
import { baseUrl, url } from "../FE-Data/URLs";
import loginData from "../FE-Data/Login";


class loginPage {
    navigate() {
        cy.visit(baseUrl.tenant);
        return this
    }
    loggingIn() {
        cy.get(loginData.loginBtn).click();
        return this
    }
    enterEmail(email) {
        cy.get(loginData.email_inputField)
            .clear()
            .type(email);
        return this;
    }
    enterPassword(password) {
        cy.get(loginData.password_inputField)
            .clear()
            .type(password);
        return this;
    }
    submit() {
        cy.get(loginData.login_btn).click();
        cy.url().then((url) => {
            if (url.includes(loginData.authEndpoint)) {
                cy.get(loginData.authorizeBtn).should('be.visible').click()
            }
        });
        return this
    }
    logout1() {
        cy.get(loginData.profileBtn).click()
        return this
    }
    softLogout() {
        cy.get(loginData.softLogout).click()
        cy.wait(3000)
        cy.url().should('be.equal', baseUrl.tenant);
        return this
    }
    hardLogout() {
        cy.get(loginData.hardLogout).click()
        cy.wait(3000);
        cy.url().should('be.equal', baseUrl.tenant);
        return this
    }
    assertLogin() {
        cy.wait(3000)
        cy.url().should('be.equal', url.dashboardPage);
    }
    assertInvalidLogin() {
        cy.url().should('be.equal', url.loginPage)
        cy.get(loginData.warningMessage).should('be.visible');
    }
    assertEmptyCredentialsLogin() {
        cy.url().should('be.equal', url.loginPage)
        cy.get(loginData.warningMessage).should('be.visible');
    }
    assertSoftLogout() {
        cy.wait(3000)
        cy.url().should('be.equal', baseUrl.tenant)
        cy.get(loginData.loginBtn).click()
        cy.url().should('include', url.dashboardPage);
    }
    assertHardLogout() {
        cy.wait(3000)
        cy.url().should('be.equal', baseUrl.tenant)
        cy.get(loginData.loginBtn).click()
        cy.url().should('include', url.loginPage);
    }
    Precondition() {
        cy.clearCookies()
        this.navigate().loggingIn()
            .enterEmail(loginData.validEmail).enterPassword(loginData.validPassword)
            .submit().assertLogin()
    }
}


export default loginPage