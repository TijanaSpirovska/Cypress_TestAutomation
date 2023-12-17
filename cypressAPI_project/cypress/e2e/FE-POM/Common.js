import productsData from '../FE-Data/Products'
import commonData from '../FE-Data/Common'


function  multiLanguageField(selector, inputText, useIframe) {
        cy.get(selector).then(($element) => {
          const index = $element.length - 1;
          let x = 26;
      
           function populateMultipleFieldIndex(index) {
            cy.log(index);
            if (index < 0) {
              return;
            }
      
            if (useIframe) {
              // Use iframe logic
              cy.getIframe(`iframe[title="Rich Text Area"]`)
                .xpath(commonData.descriptionInput)
                .type(`${inputText}`);
              x += 27;
            } else {
              // Use regular XPath logic
              cy.get(selector).eq(index).click({force:true});
              cy.get(selector).eq(index).type(`${inputText}`);
            }
      
            index--;
            populateMultipleFieldIndex(index);
          }
      
          populateMultipleFieldIndex(index);
        });
      } 


function populateFields (selector, inputText) {
  cy.get(selector).click({force:true});
  cy.wait(2000);
  cy.get(selector).type(`${inputText}{enter}`,{force:true});     
}

class moreOptions {
    ExportData(selectedItems, userSelection) {
    cy.wait(1000);
    cy.get(commonData.checkBox).click();
    cy.get(commonData.moreOptions).click();
    cy.get(`${selectedItems}`).click();
    if (userSelection == "confirm") {
        cy.get(commonData.confirmBtn).click();
        cy.contains("File successfully downloaded").should("exist");
    }
    if (userSelection == 'cancel') {
        cy.get(commonData.cancelBtn).click();
        cy.contains("File successfully downloaded").should("not.exist");
    }
    };

    modifyStatus(itemStatus, selectedItems, userSelection) {
    cy.wait(1000);
    cy.get(commonData.checkBox).click();
    cy.get(commonData.moreOptions).click();
    cy.get(`${selectedItems}`).click();
    cy.get(commonData.selectStatus).click();
    cy.get(commonData.selectStatus).type(`${itemStatus}{enter}`);
    if (userSelection == "confirm") {
        cy.get(commonData.confirmBtn).click();
        cy.contains("Successfully updated Product data!").should("exist");
    }
    if (userSelection == "cancel") {
        cy.get(commonData.cancelBtn).click();
        cy.contains("Successfully updated Product data!").should("not.exist");
    }
}}


function  filterItems(page, filterType, filterValue, operator) {
    cy.visit(page);
    cy.url().should('eq', page);
    cy.get(commonData.singleFilter).click().type(`${filterType}{enter}`);
    
    
    switch (filterType){
        case "Created_at":
        case "Order date" :
        case "Fully paid date":
        case "Active_from":
        case "Active_to" :
        case "Valid_from" :
        case "Valid_to":
            cy.get(commonData.operator).click();
            cy.get(commonData.operator).type(`${operator}{enter}`);
            cy.get(commonData.filterDate).click();
            cy.get(commonData.filterDate).type(filterValue);
            cy.get(commonData.filterBtn).click({force: true});
            break;
        case "Status":
        case "Type":
            cy.get(commonData.selectStatusFilter).click();
            cy.get(commonData.selectStatusFilter).type(`${filterValue}{enter}`);
            cy.get(commonData.filterBtn).click({force: true});
            break;
        case "Name" :
        case "Slug" :
        case "Categories" :
        case "Order number" :
        case "Customer" :
        case "Order amount" :
        case "First name" :
        case "Last name" :
        case "Username":
        case "Customer email" :
        case "Phone":
        case "Vat":
        case "Priority" :
        case "Value" :
        case "Code" :
        case "Total Amount" :
        case "Redeem amount":
            cy.get(commonData.filterInput).type(filterValue);
            cy.get(commonData.filterBtn).click({force: true});
            cy.wait(3000);
            break;
        default:
            cy.log("Wrong filter type");
  
  
    }
}

export default { moreOptions };
module.exports = {
  filterItems,
  multiLanguageField,
  populateFields
};