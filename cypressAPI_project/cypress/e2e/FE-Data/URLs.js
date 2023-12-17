
const baseUrl= {
    tenant: 'https://iwcuat-admin.iwcommerce.com/'
}

const url = {
    homePage: `${baseUrl.tenant}`,
    loginPage: 'https://iwjwt.iwcommerce.com/login',
    dashboardPage: `${baseUrl.tenant}dashboard`,
    productsPage: `${baseUrl.tenant}products`,
    createProductPage: `${baseUrl.tenant}products/create`,
    categoriesPage: `${baseUrl.tenant}categories`,
    createCategoryPage: `${baseUrl.tenant}categories/create`,
    // ordersPage: `${baseUrl.tenant}orders`,
    // createOrderPage: `${ordersPage}/create`,
    companiesPage: `${baseUrl.tenant}companies`,
    createCompanyPage: `https://iwcuat-admin.iwcommerce.com/companies/create`,
    customersPage: `${baseUrl.tenant}customers`,
    createCustomerPage: `${baseUrl.tenant}customers/create`,
    // discountsPage: `${baseUrl.tenant}promotions/discounts`,
    // createDiscountPage: `${discountsPage}/create`,
    // couponGroupsPage: `${baseUrl.tenant}promotions/coupon-groups`,
    // createDiscountPage: `${couponGroupsPage}/create`,
    // couponsPage: `${baseUrl.tenant}promotions/coupons`,
    // createDiscountPage: `${couponsPage}/create`,
    // discountsPage: `${baseUrl.tenant}promotions/discounts`,
    // createDiscountPage: `${discountsPage}/create`,
    // configurationPage: `${baseUrl.tenant}configuration`,
    // usersPage: `${configurationPage}/users`,
    // createUserPage: `${usersPage}/create`,
}

export default {baseUrl,url};