const express = require("express")

const router = new express.Router()

//supplier
const supplierController = require('../controller/supplierController');

const importController = require('../controller/importSupplier')

const checkPermission = require('../controller/permission')
const { verifyToken } = require('../controller/middleware');

// supplier
router.post('/add-suppliers',verifyToken,checkPermission('Created a new Supplier'), supplierController.addSupplier);

router.get('/get-all-supplier',verifyToken,checkPermission('Viewed Supplier details'), supplierController.getAllSuppliers);

router.get('/get-supplier/:id',verifyToken,checkPermission('Viewed Supplier details'), supplierController.getASupplier);

router.put('/update-supplier/:id',verifyToken,checkPermission('Edited Supplier Information'), supplierController.updateSupplier);

router.put('/update-supplier-status/:supplierId' ,verifyToken,checkPermission('modified Supplier Status'),supplierController.updateSupplierStatus)

router.get('/supplier-additional-data',verifyToken, supplierController.getSupplierAdditionalData);

router.post('/import-supplier',verifyToken,checkPermission('Import new Suppliers'),importController.importSupplier);

router.get('/get-one-supplier-history/:supplierId',verifyToken,checkPermission('Viewed Supplier details'),supplierController.getOneSupplierHistory)


        //   { action: "SupplierCreate", note: "Created a new Supplier" },
        //   { action: "SupplierView", note: "Viewed Supplier details" },
        //   { action: "SupplierEdit", note: "Edited Supplier Information" },
        //   { action: "SupplierStatus", note: "modified Supplier Status" },
        //   { action: "SupplierImport", note: "Import new Suppliers" }





// router.post('/add-suppliers', supplierController.addSupplier);
// router.get('/get-all-supplier', supplierController.getAllSuppliers);
// router.get('/get-supplier/:id', supplierController.getASupplier);
// router.put('/update-supplier/:id', supplierController.updateSupplier);
// router.put('/update-supplier-status/:supplierId' ,supplierController.updateSupplierStatus)
// router.put('/supplier-additional-data', supplierController.getSupplierAdditionalData);
// router.post('/import-supplier',importController.importSupplier);
// router.put('/get-one-supplier-history/:supplierId',supplierController.getOneSupplierHistory)

// router.delete('/delete-supplier/:id', supplierController.deleteSupplier);
//Contact Persons
// router.post('/add-contactPersons', supplierController.addContactPerson);
// router.get('/get-all-contactPersons', supplierController.getAllContactPerson);
// router.get('/get-one-contactPersons', supplierController.getAContactPerson);
// router.put('/update-contactPersons', supplierController.updateContactPerson);
// router.delete('/delete-contactPersons', supplierController.deleteContactPerson);


module.exports = router