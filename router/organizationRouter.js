const express = require("express")
const router = new express.Router()

const organizationController = require("../controller/organizationController")
const clientController = require("../controller/clientController")
const userController = require("../controller/userController")
const settingController = require("../controller/settingController")

const checkPermission = require('../controller/permission');
const { verifyToken } = require('../controller/middleware');








//Production

//Basic
router.get('/get-countries-data',verifyToken,checkPermission('Basic'),organizationController.getCountriesData)

router.get('/get-additional-data',verifyToken,checkPermission('Basic'),organizationController.getAdditionalData)



//Organization
router.post('/setup-organization',verifyToken,checkPermission('OrganizationSetup'),organizationController.setupOrganization)

router.get('/get-one-organization',verifyToken,checkPermission('OrganizationViews'),organizationController.getOneOrganization)







// Setting

router.get('/get-settings',verifyToken,checkPermission('SettingView'),settingController.getSettings)

// Currency

router.get('/get-currency',verifyToken,checkPermission('CurrencyView'),settingController.getCurrency)

router.get('/view-currency/:id',verifyToken,checkPermission('CurrencyView'),settingController.viewCurrency)

router.post('/add-currency',verifyToken,checkPermission('CurrencyAdd'),settingController.addCurrency)

router.put('/edit-currency',verifyToken,checkPermission('CurrencyEdit'),settingController.editCurrency)

router.delete('/delete-currency/:currencyId',verifyToken,checkPermission('CurrencyDelete'),settingController.deleteCurrency)

// Invoice 

router.put('/add-invoice-settings',verifyToken,checkPermission('InvoiceAdd'),settingController.updateInvoiceSettings)

// Payment Terms

router.post('/add-payment-terms',verifyToken,checkPermission('PaymentTermAdd'),settingController.addPaymentTerm)

router.put('/edit-payment-terms/:id',verifyToken,checkPermission('PaymentTermEdit'),settingController.editPaymentTerm)

router.delete('/delete-payment-terms',verifyToken,checkPermission('PaymentTermDelete'),settingController.deletePaymentTerm)

router.get('/get-all-payment-terms',verifyToken,checkPermission('PaymentTermView'),settingController.getAllPaymentTerms)

//Tax

router.post('/add-tax',verifyToken,checkPermission('TaxAdd'),settingController.addTax)

router.put('/edit-tax',verifyToken,checkPermission('TaxEdit'),settingController.editTaxRate)

router.get('/get-tax',verifyToken,checkPermission('TaxView'),settingController.getTax)

//Prefix

router.post('/add-prefix',verifyToken,checkPermission('PrefixAdd'),settingController.addPrefix)

router.get('/get-prefix',verifyToken,checkPermission('PrefixView'),settingController.getPrefix)

router.put('/edit-prefix',verifyToken,checkPermission('PrefixEdit'),settingController.updatePrefix)

router.delete('/delete-prefix',verifyToken,checkPermission('PrefixDelete'),settingController.deletePrefix)

router.put('/status-prefix',verifyToken,checkPermission('PrefixStatus'),settingController.setPrefixSeriesStatusTrue)












//Internal

router.get('/get-all-organization',organizationController.getAllOrganization)

router.post('/create-client',clientController.createOrganizationAndClient)

router.get('/get-all-client',clientController.getAllClient)

router.delete('/delete-organization/:organizationId',organizationController.deleteOrganization)

router.get('/delete-all',clientController.deleteAll)





//Login
router.post('/login',userController.login)

router.post('/verify-otp',userController.verifyOtp)


























// //Production
// router.post('/setup-organization',organizationController.setupOrganization)

// router.get('/get-additional-data',organizationController.getAdditionalData)

// // router.put('/get-one-organization',organizationController.getOneOrganization)

// router.delete('/delete-organization/:organizationId',organizationController.deleteOrganization)

// router.get('/get-countries-data',organizationController.getCountriesData)





// // Setting

// // Currency
// router.put('/get-currency',settingController.getCurrency)

// router.get('/view-currency/:id',settingController.viewCurrency)

// router.post('/add-currency',settingController.addCurrency)

// router.put('/edit-currency',settingController.editCurrency)

// router.delete('/delete-currency/:currencyId',settingController.deleteCurrency)


// // Invoice settings
// router.put('/add-invoice-settings',settingController.updateInvoiceSettings)

// router.put('/get-settings',settingController.getSettings)


// // Payment terms
// router.post('/add-payment-terms',settingController.addPaymentTerm)

// router.put('/edit-payment-terms/:id',settingController.editPaymentTerm)

// router.delete('/delete-payment-terms',settingController.deletePaymentTerm)

// router.get('/get-all-payment-terms',settingController.getAllPaymentTerms)


// //Tax
// router.post('/add-tax',settingController.addTax)

// router.put('/edit-tax',settingController.editTaxRate)

// router.put('/get-tax',settingController.getTax)


// //Prefix
// router.post('/add-prefix',settingController.addPrefix)

// router.put('/get-prefix',settingController.getPrefix)

// router.put('/edit-prefix',settingController.updatePrefix)

// router.delete('/delete-prefix',settingController.deletePrefix)

// router.put('/status-prefix',settingController.setPrefixSeriesStatusTrue)












// //Internal

// router.get('/get-all-organization',organizationController.getAllOrganization)

// router.post('/create-client',clientController.createOrganizationAndClient)

// router.get('/get-all-client',clientController.getAllClient)


// router.get('/delete-all',clientController.deleteAll)



// //dev phase only
// router.get('/get-org-id',clientController.getOrganizationId)





// //Login
// router.post('/login',userController.login)

// router.post('/verify-otp',userController.verifyOtp)



module.exports = router
















