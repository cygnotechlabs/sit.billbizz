const express = require("express")

const router = new express.Router()

// const customerController = require("../controller/customerController")
const importController = require("../controller/importCustomer")
const customerController = require("../controller/customerCont")

const checkPermission = require('../controller/permission');
const { verifyToken } = require('../controller/middleware');


//Basic

router.put('/customer-additional-data', verifyToken,customerController.getCustomerAdditionalData);



//Customer

// router.post('/add-customer',customerController.addCustomer)

router.post('/add-customer',verifyToken,checkPermission('Created a New Customer'),customerController.addCustomer)

router.get('/get-all-customer',verifyToken,checkPermission('Viewed Customer details'),customerController.getAllCustomer)

router.get('/get-one-customer/:customerId',verifyToken,checkPermission('Viewed Customer details'),customerController.getOneCustomer)

router.put('/edit-customer/:customerId', verifyToken,checkPermission('Edited Customer information'),customerController.editCustomer);

router.put('/update-customer-status/:customerId', verifyToken,checkPermission('Modified Customer Status'),customerController.updateCustomerStatus);




//Import
router.post('/import-customer',verifyToken,checkPermission('Imported New Customers'), importController.importCustomer);


//Customer History
router.get('/get-one-customer-history/:customerId',verifyToken,checkPermission('Viewed Customer details'),customerController.getOneCustomerHistory)

module.exports = router











module.exports = router