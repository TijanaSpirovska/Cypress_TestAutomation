
const Products = {
  Name : 'Automated Test Product ',
  Slug : 'automated-test-product',
  Categories : 'Clothes',
  Status : 'modified',
  Created_at : '2022-08-18',
  Update : 'Automated Test Product Update'


}
const LIMIT = {
  limit_value : '5',
  page_number : '1'
}
const Customers = {
First_Name : 'Automated',
Last_Name : 'Test Customer',
Phone : '1162023',
Customer_email : 'automatedtestcustomer@test.com',
Username : 'automatedtestcustomer@test.com',
Update : 'Automated Update'
}
const Discounts = {
Priority : 2,
Name : 'Automated Test Discount',
Type : 'Percentage',
Value : '10',
Active_from: '2023-08-18',
Active_to : '2025-08-18',
Filter_activeFrom: '2023-08-18 02:00:00',
Filter_activeTo : '2025-08-18 02:00:00',
Filter_value: '10.00',
Update: 'Automated Test Discount Update'
}
const GiftCards = {
Customer_email : 'automatedtestcustomer@test.com',
Total_amount : '15000',
Redeeem_amount : '0',
Status : '1',
Valid_from: '2023-08-18',
Valid_to : '2025-08-18',
Filter_validFrom: '2023-08-18 02:00:00',
Filter_validTo: '2025-08-18 02:00:00',
Filter_status: true,
Update: 'automatedtestcustomerupdate@test.com'
}
const CouponGroup = {
Name : 'Automated Test Coupon Group',
Valid_from: '2023-08-18',
Valid_to : '2025-08-18',
Filter_validFrom: '2023-08-18 02:00:00',
Filter_validTo: '2025-08-18 02:00:00',
Update: 'Automated Test Coupon Group Update'
}

const Coupons = {
Code : 'Automated Test Coupons',
Status : 'created',
Valid_from: '2023-08-18',
Valid_to : '2025-08-18',
Filter_validFrom: '2023-08-18 02:00:00',
Filter_validTo: '2025-08-18 02:00:00',

}
const Categories = {
  Name : 'Automated Test Category',
  Slug : 'automated-test-category',
  UpdatedName : 'Automated Test Category Update'
}

const ProductAttribute = {
Name : 'Automated Test Product Attribute',
Type : 'Input',
Filter_type : 1,
Update : 'Automated Test Product Attribute Update'
}

const CustomerData = {
Name : 'Automated Test Customer Data',
Type : 1,
Hidden : 1,
Update : 'Automated Test Customer Data Update'
}

const  productVariant = {
Name : 'Automated Test Product Variant',
Sku : 'IWC0000251-11122',
Update : 'Automated Test Product Variant Update',
Price : 10,
Country : 'Andorra',
Valid_from: '2023-08-18',
Valid_to : '2025-08-18',
Filter_validFrom: '2023-08-18 02:00:00',
Filter_validTo: '2025-08-18 02:00:00',
UpdatePrice: 20
}

const Companies = {
  Name : 'Automated Test Company',
  Vat : '81',
  UpdatedName : 'Automated Test Company Update'
}

const Users = {
  Name : 'Automated Test User',
  Status : 'inactive',
  Email: 'automatedtestuser@test.com' ,
  Roles: 'Admin',
  UpdatedEmail: 'automatedtestuserupdate@test.com'
}

const TaxProviders = {
  ApiToken : "123"
}

const ShippingProviders = {
  FedexKey : "123",
  FedexPassword : "test123",
  FedexAccountNumber : "123",
  FedexMeterNumber : "123",
  EasyPostKey : "123"
}

const PaymentProviders = {
  StripePublicKey : "123",
  StripeSecretKey : "",
  SquareApplicationID : "",
  SqaureToken : "",
  SqaureLocation : "",
  PaypalClientID : "",
  PeyopleClientSecret : ""
}

const Warehouses = {
  Name : "Automated Test Warehouse",
  Primary : false,
  Status : true,
  Contact : "Automated Test Contact",
  Inventories : "N/A",
  UpdatedContact : "Automated Test Warehouse Update"
}
const API_URLS = {
  TENANT_API : 'https://iwapi.iwcommerce.com/api/'

}

const SystemTaxes = {
  Name : 'Automated Test System Tax',
  Key : 'Automated Test System Tax Key',
  Description : 'Automated Test System Description'
}
const PRODUCT_URL = {
  Get_All_Products : `products?limit=${LIMIT.limit_value}`,
  Filter_Name_Products : `products?filter[name]=${Products.Name}&limit=${LIMIT.limit_value}`,
  Filter_Updated_Products : `products?filter[name]=${Products.Update}&limit=${LIMIT.limit_value}`,
  Filter_Categories_Products : `products?filter[categories]=${Products.Categories}&limit=${LIMIT.limit_value}`,
  Filter_Status_Products: `products?filter[status]=${Products.Status}&limit=${LIMIT.limit_value}`,
  Filter_Created_Products: `products?filter[created_at]=${Products.Created_at}.&limit=${LIMIT.limit_value}`,
  Filter_Slug_Products: `products?filter[slug]=${Products.Slug}.&limit=${LIMIT.limit_value}`
}

const CUSTOMER_URL = {
  Get_All_Customers : `customers?limit=${LIMIT.limit_value}`,
  Filter_FirstName_Customers : `customers?filter[first_name]=${Customers.First_Name}&limit=${LIMIT.limit_value}`,
  Filter_LastName_Customers : `customers?filter[last_name]=${Customers.Last_Name}&limit=${LIMIT.limit_value}`,
  Filter_Username_Customers : `customers?filter[email]=${Customers.Username}&limit=${LIMIT.limit_value}`,
  Filter_CustomerEmail_Customers: `customers?filter[customer_email]=${Customers.Customer_email}&limit=${LIMIT.limit_value}`,
  Filter_Phone_Customers: `customers?filter[phone]=${Customers.Phone}.&limit=${LIMIT.limit_value}`,
  Filter_Updated_Customers : `customers?filter[first_name]=${Customers.Update}&limit=${LIMIT.limit_value}`,
}

const DISCOUNT_URL = {
  Get_All_Discounts : `discounts?limit=${LIMIT.limit_value}`,
  Filter_Name_Discounts : `discounts?filter[name]=${Discounts.Name}&limit=${LIMIT.limit_value}`,
  Filter_Priority_Discounts : `discounts?filter[priority]=${Discounts.Priority}&limit=${LIMIT.limit_value}`,
  Filter_Type_Discounts : `discounts?filter[type]=${Discounts.Type}&limit=${LIMIT.limit_value}`,
  Filter_Value_Discounts: `discounts?filter[value]=${Discounts.Value}&limit=${LIMIT.limit_value}`,
  Filter_ActiveFrom_Discounts: `discounts?filter[active_from]=${Discounts.Active_from}.&limit=${LIMIT.limit_value}`,
  Filter_ActiveTo_Discounts : `discounts?filter[active_to]=${Discounts.Active_to}&limit=${LIMIT.limit_value}`,
  Filter_Updated_Discounts : `discounts?filter[name]=${Discounts.Update}&limit=${LIMIT.limit_value}`,
}

const GiftCard_URL = {
  Get_All_GiftCards : `gift-cards?limit=${LIMIT.limit_value}`,
  Filter_CustomerEmail_GiftCards : `gift-cards?filter[customer_email]=${GiftCards.Customer_email}&limit=${LIMIT.limit_value}`,
  Filter_TotalAmount_GiftCards : `gift-cards?filter[total_amount]=${GiftCards.Total_amount}&limit=${LIMIT.limit_value}`,
  Filter_RedeemAmount_GiftCards : `gift-cards?filter[redeem_amount]=${GiftCards.Redeeem_amount}&limit=${LIMIT.limit_value}`,
  Filter_Status_GiftCards: `gift-cards?filter[status]=${GiftCards.Status}&limit=${LIMIT.limit_value}`,
  Filter_ValidFrom_GiftCards: `gift-cards?filter[valid_from]=${GiftCards.Valid_from}.&limit=${LIMIT.limit_value}`,
  Filter_ValidTo_GiftCards : `gift-cards?filter[valid_to]=${GiftCards.Valid_to}&limit=${LIMIT.limit_value}`,
  Filter_Updated_GiftCards : `gift-cards?filter[customer_email]=${GiftCards.Update}&limit=${LIMIT.limit_value}`,
}

const CouponGroup_URL = {
  Get_All_CouponGroup : `coupon-groups?limit=${LIMIT.limit_value}`,
  Filter_Name_CouponGroup: `coupon-groups?filter[name]=${CouponGroup.Name}&limit=${LIMIT.limit_value}`,
  Filter_ValidFrom_CouponGroup: `coupon-groups?filter[valid_from]=${CouponGroup.Valid_from}.&limit=${LIMIT.limit_value}`,
  Filter_ValidTo_CouponGroup : `coupon-groups?filter[valid_to]=${CouponGroup.Valid_to}&limit=${LIMIT.limit_value}`,
  Filter_Updated_CouponGroup : `coupon-groups?filter[name]=${CouponGroup.Update}&limit=${LIMIT.limit_value}`,
}

const Coupon_URL = {
  Get_All_Coupon : `coupons?limit=${LIMIT.limit_value}`,
  Filter_Code_Coupon: `coupons?filter[code]=${Coupons.Code}&limit=${LIMIT.limit_value}`,
  Filter_Status_Coupon: `coupons?filter[status]=${Coupons.Status}&limit=${LIMIT.limit_value}`,
  Filter_ValidFrom_Coupon: `coupons?filter[valid_from]=${Coupons.Valid_from}.&limit=${LIMIT.limit_value}`,
  Filter_ValidTo_Coupon : `coupons?filter[valid_to]=${Coupons.Valid_to}&limit=${LIMIT.limit_value}`,
  Filter_Updated_Coupon : `coupons?filter[code]=${Coupons.Update}&limit=${LIMIT.limit_value}`,
}

const CATEGORY_URL = {
  Get_All_Categories : `categories?limit=${LIMIT.limit_value}`,
  Filter_Name_Categories : `categories?filter[name]=${Categories.Name}&limit=${LIMIT.limit_value}`,
  Filter_Slug_Categories : `categories?filter[slug]=${Categories.Slug}&limit=${LIMIT.limit_value}`,
  Filter_Updated_Categories : `categories?filter[name]=${Categories.UpdatedName}&limit=${LIMIT.limit_value}`
}

const productAttribute_URL = {
  Get_All_productAttributes : `attributes?limit=${LIMIT.limit_value}`,
  Filter_Name_productAttributes : `attributes?filter[name]=${ProductAttribute.Name}&limit=${LIMIT.limit_value}`,
  Filter_Type_productAttributes : `attributes?filter[type]=${ProductAttribute.Filter_type}&limit=${LIMIT.limit_value}`,
  Filter_updatedName_productAttributes : `attributes?filter[name]=${ProductAttribute.Update}&limit=${LIMIT.limit_value}`,
}



const CustomerData_URL = {
  Get_All_customerAttributes : `customer-attributes?limit=${LIMIT.limit_value}`,
  Filter_Name_customerAttributes : `customer-attributes?filter[name]=${CustomerData.Name}&limit=${LIMIT.limit_value}`,
  Filter_Type_customerAttributes : `customer-attributes?filter[type]=${CustomerData.Type}&limit=${LIMIT.limit_value}`,
  Filter_Hidden_customerAttributes : `customer-attributes?filter[hidden]=${CustomerData.Hidden}&limit=${LIMIT.limit_value}`,
  Filter_updatedName_customerAttributes : `customer-attributes?filter[name]=${CustomerData.Update}&limit=${LIMIT.limit_value}`,
}


const ProductVariant_URL = {
  Get_All_productVariant : `variants?limit=${LIMIT.limit_value}`,
  Filter_Name_productVariant : `variants?filter[name]=${productVariant.Name}&limit=${LIMIT.limit_value}`,
  Filter_Sku_productVariant : `variants?filter[sku]=${productVariant.Sku}&limit=${LIMIT.limit_value}`,
  Filter_updatedName_productVariant : `variants?filter[name]=${productVariant.Update}&limit=${LIMIT.limit_value}`,
  Filter_Price_productVariant:`price?filter[price]=${productVariant.Price}&limit=${LIMIT.limit_value}`,
  Filter_Country_productVariant:`price?filter[country]=${productVariant.Country}&limit=${LIMIT.limit_value}`,
  Filter_validFrom_productVariant:`price?filter[valid_from]=${productVariant.Valid_from}&limit=${LIMIT.limit_value}`,
  Filter_validTo_productVariant:`price?filter[valid_to]=${productVariant.Valid_to}&limit=${LIMIT.limit_value}`,

}

const COMPANY_URL = {
  Get_All_Companies : `companies?limit=${LIMIT.limit_value}`,
  Filter_Name_Companies : `companies?filter[name]=${Companies.Name}&limit=${LIMIT.limit_value}`,
  Filter_Vat_Companies : `companies?filter[vat]=${Companies.Vat}&limit=${LIMIT.limit_value}`,
}

const USER_URL = {
  Get_All_Users : `users?limit=${LIMIT.limit_value}`,
  Filter_Name_Users : `users?filter[name]=${Users.Name}&limit=${LIMIT.limit_value}`,
  Filter_Status_Users : `users?filter[status]=${Users.Status}&filter[name]=${Users.Name}&imit=${LIMIT.limit_value}`,
  Filter_Email_Users : `users?filter[email]=${Users.Email}&limit=${LIMIT.limit_value}`,
  Filter_Roles_Users : `users?filter[roles]=${Users.Roles}&limit=${LIMIT.limit_value}`,
  Filter_Updated_Users : `users?filter[email]=${Users.UpdatedEmail}&limit=${LIMIT.limit_value}`
}

const TAXPROVIDERS_URL = {
  Get_All_TaxProviders : "tax-providers"
}

const SHIPPINGPROVIDERS_URL = {
  Get_All_ShippingProviders : "shipping-providers"
}

const PAYMENTPROVIDERS_URL = {
  Get_All_PaymentProviders : "payment-gateways"
}


const WAREHOUSES_URL = {
  Filter_Name_Warehouse : `warehouses?page=1&limit=${LIMIT.limit_value}&filter[name]=${Warehouses.Name}&sort=id`,
  Get_All_Warehouses: `warehouses?page=1&limit=${LIMIT.limit_value}`,
  Filter_Primary_Warehouse : `warehouses?page=1&limit=${LIMIT.limit_value}&filter[primary]=${Warehouses.Primary}&sort=id`,
  Filter_Status_Warehouses : `warehouses?page=1&limit=${LIMIT.limit_value}&filter[status]=${Warehouses.Status}&sort=id`

}
const SYSTEMTAXES_URL = {
  Get_All_SystemTaxes: `configuration/system-taxes?page=11&limit=${LIMIT.limit_value}`,
  Filter_Name_SystemTax:`configuration/system-taxes?page=1&limit=${LIMIT.limit_value}&filter[name]=${SystemTaxes.Name}&sort=id`,
  Filter_Key_SystemTax:`configuration/system-taxes?page=1&limit=${LIMIT.limit_value}&filter[key]=${SystemTaxes.Key}&sort=id`,
  Filter_Description_SystemTax:`configuration/system-taxes?page=1&limit=${LIMIT.limit_value}&filter[description]=${SystemTaxes.Description}&sort=id`
}


export {Products, LIMIT, Customers, Discounts, GiftCards, CouponGroup, Coupons, Categories, ProductAttribute, CustomerData, productVariant, Companies, Users, TaxProviders,ShippingProviders, PaymentProviders, Warehouses,SystemTaxes }
export {API_URLS, PRODUCT_URL, CUSTOMER_URL, DISCOUNT_URL, GiftCard_URL, CouponGroup_URL, Coupon_URL, CATEGORY_URL, productAttribute_URL, TAXPROVIDERS_URL, CustomerData_URL,ProductVariant_URL, COMPANY_URL, USER_URL, SHIPPINGPROVIDERS_URL, PAYMENTPROVIDERS_URL, WAREHOUSES_URL,SYSTEMTAXES_URL}
