const express = require("express")
const router = new express.Router()

const organizationController = require("../controller/organizationController")
const clientController = require("../controller/clientController")
const userController = require("../controller/userController")
const settingController = require("../controller/settingController")

const checkPermission = require('../controller/permission');
const { verifyToken } = require('../controller/middleware');


//Production
router.post('/setup-organization',organizationController.setupOrganization)

router.get('/get-additional-data',organizationController.getAdditionalData)

router.get('/get-countries-data',organizationController.getCountriesData)

router.put('/get-one-organization',organizationController.getOneOrganization)

router.delete('/delete-organization/:organizationId',organizationController.deleteOrganization)





// Setting

router.put('/get-currency',settingController.getCurrency)

router.post('/add-currency',settingController.addCurrency)

router.put('/edit-currency',settingController.editCurrency)

router.delete('/delete-currency',settingController.deleteCurrency)



//Internal

router.get('/get-all-organization',organizationController.getAllOrganization)

router.post('/create-client',clientController.createOrganizationAndClient)

router.get('/get-all-client',clientController.getAllClient)

router.get('/delete-all',clientController.deleteAll)




//Register
// router.post('/register',userController.register)



//Login
router.post('/login',userController.login)

router.post('/verify-otp',userController.verifyOtp)




module.exports = router
















// const checkPermission = require('./middleware/checkPermission');

// router.post('/item', checkPermission('ItemCreate'), (req, res) => {
//   // Logic for creating an item
//   res.status(200).json({ message: 'Item created successfully' });
// });