
const loginData = {
//selectors
loginBtn: '[type=button]',
email_inputField: '#email',
password_inputField: '#password',
login_btn: '.btn',
warningMessage: '.alert',
authorizeBtn: 'button[type="submit"]',
profileBtn: '.user-photo',
softLogout: '.dropdown-menu > :nth-child(4)',
hardLogout: '.dropdown-menu > :nth-child(5)',

//variables
validEmail: 'super.admin@iwcommerce.com',
validPassword:'admin',
invalidEmail: 'xxxx@yyy.com',
invalidPassword: 'xxxxxx',
authEndpoint: '/oauth/authorize'
}

export default loginData;