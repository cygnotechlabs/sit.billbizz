const express = require("express")

const router = new express.Router()

const customerController = require("../controller/customerController")




//Customer

router.post('/add-customer',customerController.addCustomer)

router.put('/get-all-customer',customerController.getAllCustomer)

router.put('/get-one-customer/:customerId',customerController.getOneCustomer)

router.put('/edit-customer/:customerId', customerController.editCustomer);

router.delete('/delete-customer/:customerId', customerController.deleteCustomer);

router.get('/customer-additional-data', customerController.getCustomerAdditionalData);


module.exports = router











module.exports = router