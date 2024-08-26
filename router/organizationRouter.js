const express = require("express")
const router = new express.Router()

const organizationController = require("../controller/organizationController")
const clientController = require("../controller/clientController")
const userController = require("../controller/userController")
const settingController = require("../controller/settingController")

const checkPermission = require('../controller/permission');
const { verifyToken } = require('../controller/middleware');




// router.put('/get-one-organization',verifyToken,checkPermission('OrganizationView'),organizationController.getOneOrganization)



//Production
router.post('/setup-organization',organizationController.setupOrganization)

router.get('/get-additional-data',organizationController.getAdditionalData)

router.get('/get-countries-data',organizationController.getCountriesData)

router.put('/get-one-organization',organizationController.getOneOrganization)

router.delete('/delete-organization/:organizationId',organizationController.deleteOrganization)





// Setting

// Currency
router.put('/get-currency',settingController.getCurrency)

router.get('/view-currency/:id',settingController.viewCurrency)

router.post('/add-currency',settingController.addCurrency)

router.put('/edit-currency',settingController.editCurrency)

router.delete('/delete-currency/:currencyId',settingController.deleteCurrency)


// Invoice settings
router.put('/add-invoice-settings',settingController.updateInvoiceSettings)

router.put('/get-settings',settingController.getSettings)


// Payment terms
router.post('/add-payment-terms',settingController.addPaymentTerm)

router.put('/edit-payment-terms/:id',settingController.editPaymentTerm)

router.delete('/delete-payment-terms',settingController.deletePaymentTerm)

router.get('/get-all-payment-terms',settingController.getAllPaymentTerms)


//Tax
router.post('/add-tax',settingController.addTax)

router.put('/edit-tax',settingController.editTaxRate)

router.put('/get-tax',settingController.getTax)


//Prefix
router.post('/add-prefix',settingController.addPrefix)

router.put('/get-prefix',settingController.getPrefix)

router.put('/edit-prefix',settingController.updatePrefix)

router.delete('/delete-prefix',settingController.deletePrefix)

router.put('/status-prefix',settingController.setPrefixSeriesStatusTrue)












//Internal

router.get('/get-all-organization',organizationController.getAllOrganization)

router.post('/create-client',clientController.createOrganizationAndClient)

router.get('/get-all-client',clientController.getAllClient)


router.get('/delete-all',clientController.deleteAll)



//dev phase only
router.get('/get-org-id',clientController.getOrganizationId)





//Login
router.post('/login',userController.login)

router.post('/verify-otp',userController.verifyOtp)




module.exports = router
















// const checkPermission = require('./middleware/checkPermission');

// router.post('/item', checkPermission('ItemCreate'), (req, res) => {
//   // Logic for creating an item
//   res.status(200).json({ message: 'Item created successfully' });
// });