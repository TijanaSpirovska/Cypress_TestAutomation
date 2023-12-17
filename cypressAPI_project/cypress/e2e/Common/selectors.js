// selectors.js
require('cypress-xpath')

const selectors = {
  homeLoginButton: '//a[@class="Home_btn__1I3Uw home-btn btn btn-btn-red"]',
  emailInput: '//input[@id="email" and @name="email" and @placeholder="Username"] ',
  passwordInput:'//input[@id="password" and @name="password" and @placeholder="Password"]',
  authRequestCardBox:'//*[contains(@class, "card box")]',
  authorizeButton: '//*[@class="btn btn-red btn-approve"]',
  cancelButton:'//*[@class="btn btn-inverse mr-15"]',
  loginButton:'//button[text()="Login"]',
  wrongEmailPassword:'//div[@class="alert alert-danger mt-5"]',
  accessDenied: '//div[@class="modal-content"]',
  profilePic: '//button[@class="dropdown-toggle btn btn-primary"]/img[@class="profile-photo"]',
  hardLogoutButton: '//a[@class="text-left dropdown-item" and text()="Hard Logout"]',
  createButton: '//button[@class="btn btn-primary" and text()="Create"]',
  singleFilter: '//div[@class="switch-item active"]  ',
  advancedFilter: '//div[@class="switch-item" and text()="Advanced"] ',
  advancedFilterActive: '//div[@class="switch-item active" and text()="Advanced"]',
  filterFiled: '//*[@id="singleSelectedFilterStatus"] ',
  filterInputFiled: '//input[@id="n/a"]',
  filterDate: '//input[@placeholder="mm/dd/yyyy"]',
  filterButton: '//button[@type="submit"]',
  selectStatusFilter: '//div[@class="select__value-container css-13t1v1n"]',
  checkBox: '(//div[contains(@class, "checkbox-nice")])[1]',
  moreOptions: '//button[@class="px-4 dropdown-toggle btn btn-primary" and text()="+ More Options"]',
  moreOptChangeStatusSelected: '//a[@class="text-right dropdown-item" and text()="Change status (selected)"]',
  moreOptChangeStatusAll: '//a[@class="text-right dropdown-item" and text()="Change status (all found)"]',
  exportSelected: '//a[@class="text-right dropdown-item" and text()="Export (selected)"]',
  exportAll: '//a[@class="text-right dropdown-item" and text()="Export (all found)"]',
  selectStatus: '//div[@class="select__placeholder css-oefkzl-placeholder" and text()="Select status"]',
  cancelButtonPopUp:'//button[@class="btn btn-light" and text()="Cancel"]',
  confirmButton: '//button[@class="btn btn-primary" and text()="Confirm"]',
  logoutButton: '//a[@class="text-left dropdown-item" and text()="Logout"]'



  };
const productSelectors = {
  addProduct: '//button[@class="btn btn-light" and contains (.,"+ Add Product")] ',
  productName: '//input[@id="name-0-usa"]',
  productType: '//*[@id="product_type"]',
  productTax: '//*[@id="product_tax"]',
  restrictedCountries: '//div[@class="select__placeholder css-oefkzl-placeholder" and text()="Search for restricted countries"]',
  productDescriptionFrame: '//div[@id="mceu_26"]/iframe ',
  productDescriptionInput: '//*[@id="tinymce"]',
  shippingType: '//*[@id="shipping_type_id"]',
  productCategories: '(//input[@autocomplete="off"])[6]',
  productAttribute: '(//input[@autocomplete="off"])[7]',
  linkProducts: '(//div[@class=" css-13t1v1n"])[3]',
}
  
  export default {selectors,productSelectors}; //because of export default the import in the different file is without curly braces
  