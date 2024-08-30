const express = require("express")

const router = new express.Router()

//supplier
const supplierController = require('../controller/supplierController');


// supplier
router.post('/add-suppliers', supplierController.addSupplier);
router.put('/get-all-supplier', supplierController.getAllSuppliers);
router.get('/get-supplier/:id', supplierController.getASupplier);
router.put('/update-supplier/:id', supplierController.updateSupplier);
router.put('/update-supplier-status/:supplierId' ,supplierController.updateSupplierStatus)
router.put('/customer-additional-data', supplierController.getSupplierAdditionalData);



// router.delete('/delete-supplier/:id', supplierController.deleteSupplier);
//Contact Persons
// router.post('/add-contactPersons', supplierController.addContactPerson);
// router.get('/get-all-contactPersons', supplierController.getAllContactPerson);
// router.get('/get-one-contactPersons', supplierController.getAContactPerson);
// router.put('/update-contactPersons', supplierController.updateContactPerson);
// router.delete('/delete-contactPersons', supplierController.deleteContactPerson);


module.exports = router