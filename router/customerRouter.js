const express = require("express")

const router = new express.Router()

const customerController = require("../controller/customerController")

const importController = require("../controller/importCustomer")




//Customer

router.post('/add-customer',customerController.addCustomer)

router.put('/get-all-customer',customerController.getAllCustomer)

router.put('/get-one-customer/:customerId',customerController.getOneCustomer)

router.put('/edit-customer/:customerId', customerController.editCustomer);

router.put('/update-customer-status/:customerId', customerController.updateCustomerStatus);

router.put('/customer-additional-data', customerController.getCustomerAdditionalData);


//Import
router.post('/import-customer', importController.importCustomer);


//Customer History
router.put('/get-one-customer-history/:customerId',customerController.getOneCustomerHistory)

module.exports = router











module.exports = router