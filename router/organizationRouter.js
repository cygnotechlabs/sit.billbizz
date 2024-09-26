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
router.get('/get-countries-data',verifyToken,organizationController.getCountriesData)

router.get('/get-additional-data',verifyToken,organizationController.getAdditionalData)



//Organization
router.post('/setup-organization',verifyToken,checkPermission('Setup/Modified Organization Details'),organizationController.setupOrganization)

router.get('/get-one-organization',verifyToken,checkPermission('Viewed Organization Details'),organizationController.getOneOrganization)







// Setting

router.get('/get-settings',verifyToken,checkPermission('Viewed Setting details'),settingController.getSettings)

// Currency

router.get('/get-currency',verifyToken,checkPermission('Viewed Currency Details'),settingController.getCurrency)

router.get('/view-currency/:id',verifyToken,checkPermission('Viewed Currency Details'),settingController.viewCurrency)

router.post('/add-currency',verifyToken,checkPermission('Added a new Currency'),settingController.addCurrency)

router.put('/edit-currency',verifyToken,checkPermission('Edited Currency Information'),settingController.editCurrency)

router.delete('/delete-currency/:currencyId',verifyToken,checkPermission('Deleted a Currency'),settingController.deleteCurrency)

// Invoice 

router.put('/add-invoice-settings',verifyToken,checkPermission('Setup/Modified Invoice Setting'),settingController.updateInvoiceSettings)

// Payment Terms

router.post('/add-payment-terms',verifyToken,checkPermission('Added Payment Term'),settingController.addPaymentTerm)

router.put('/edit-payment-terms/:id',verifyToken,checkPermission('Edited Payment Term'),settingController.editPaymentTerm)

router.delete('/delete-payment-terms',verifyToken,checkPermission('Deleted Payment Term'),settingController.deletePaymentTerm)

router.get('/get-all-payment-terms',verifyToken,checkPermission('Viewed Payment Term'),settingController.getAllPaymentTerms)

//Tax

router.post('/add-tax',verifyToken,checkPermission('Added Tax Information'),settingController.addTax)

router.put('/edit-tax',verifyToken,checkPermission('Edited Tax Information'),settingController.editTaxRate)

router.get('/get-tax',verifyToken,checkPermission('Viewed Tax Information'),settingController.getTax)

//Prefix

router.post('/add-prefix',verifyToken,checkPermission('Added Prefix'),settingController.addPrefix)

router.get('/get-prefix',verifyToken,checkPermission('Viewed Prefix'),settingController.getPrefix)

router.put('/edit-prefix',verifyToken,checkPermission('Edited Prefix'),settingController.updatePrefix)

router.delete('/delete-prefix',verifyToken,checkPermission('Deleted Prefix'),settingController.deletePrefix)

router.put('/status-prefix',verifyToken,checkPermission('Modified Prefix Status'),settingController.setPrefixSeriesStatusTrue)












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
















