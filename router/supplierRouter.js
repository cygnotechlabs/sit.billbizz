const express = require("express")

const router = new express.Router()

//supplier
const supplierController = require('../controller/supplierController');
const supplierCont = require('../controller/suppliercont');
const supplierSettings = require('../controller/suplierSettings')

const importController = require('../controller/importSupplier')
const dashboardController = require("../controller/dashboardController")


const checkPermission = require('../controller/permission')
const { verifyToken } = require('../controller/middleware');

// supplier

router.get('/get-Supplier-Trandactions/:supplierId',verifyToken,supplierCont.getSupplierTransactions);


router.get('/get-Supplier-Dashboard/:date',verifyToken,dashboardController.getSupplierStats);


router.post('/add-suppliers',verifyToken,checkPermission('Created a New Supplier'), supplierCont.addSupplier);

router.get('/get-all-supplier',verifyToken,checkPermission('Viewed Supplier Details'), supplierCont.getAllSuppliers);

router.get('/get-supplier/:supplierId',verifyToken,checkPermission('Viewed Supplier Details'), supplierCont.getOneSupplier);

router.put('/update-supplier/:supplierId',verifyToken,checkPermission('Edited Supplier Information'), supplierCont.updateSupplier);

router.put('/update-supplier-status/:supplierId' ,verifyToken,checkPermission('Modified Supplier Status'),supplierCont.updateSupplierStatus)

router.get('/supplier-additional-data',verifyToken, supplierCont.getSupplierAdditionalData);

router.post('/import-supplier',verifyToken,checkPermission('Import New Suppliers'),importController.importSupplier);

router.get('/get-one-supplier-history/:supplierId',verifyToken,checkPermission('Viewed Supplier Details'),supplierCont.getOneSupplierHistory)

router.put('/update-supplier-customer-settings',verifyToken,checkPermission('Created a New Supplier'),supplierSettings.updateSupplierCustomerSettings)

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