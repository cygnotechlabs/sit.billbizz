const express = require("express")

const router = new express.Router()

// const customerController = require("../controller/customerController")
const importController = require("../controller/importCustomer")
const customerController = require("../controller/customerCont")

const checkPermission = require('../controller/permission');
const { verifyToken } = require('../controller/middleware');


//Basic

router.put('/customer-additional-data', verifyToken,checkPermission('Basic'),customerController.getCustomerAdditionalData);



//Customer

// router.post('/add-customer',customerController.addCustomer)

router.post('/add-customer',verifyToken,checkPermission('CustomerAdd'),customerController.addCustomer)

router.get('/get-all-customer',verifyToken,checkPermission('CustomerView'),customerController.getAllCustomer)

router.get('/get-one-customer/:customerId',verifyToken,checkPermission('CustomerView'),customerController.getOneCustomer)

router.put('/edit-customer/:customerId', verifyToken,checkPermission('CustomerEdit'),customerController.editCustomer);

router.put('/update-customer-status/:customerId', verifyToken,checkPermission('CustomerEdit'),customerController.updateCustomerStatus);




//Import
router.post('/import-customer',verifyToken,checkPermission('CustomerImport'), importController.importCustomer);


//Customer History
router.get('/get-one-customer-history/:customerId',verifyToken,checkPermission('CustomerView'),customerController.getOneCustomerHistory)

module.exports = router











module.exports = router