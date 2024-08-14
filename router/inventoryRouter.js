const express = require("express")

const router = new express.Router()

const itemController = require("../../BillBizz/controller/itemController");
const unitController = require("../../BillBizz/controller/unitController")
const manufacturerController = require("../../BillBizz/controller/manufacturerController");
const categoriesController = require("../../BillBizz/controller/categoriesController")
const brandController = require('../../BillBizz/controller/brandController')
const rackController = require('../../BillBizz/controller/rackController')


// Item
router.post('/add-item', itemController.addItem);
router.get('/get-all-item', itemController.getAllItem);
router.get('/get-one-item/:id', itemController.getAItem)
router.put('/edit-item',itemController.updateItem)
router.delete('/delete-item/:id',itemController.deleteItem)


// Unit
router.post('/add-unit', unitController.addUnit);
router.put('/get-all-unit', unitController.getAllUnit);
router.get('/get-one-unit/:_id', unitController.getOneUnit);
router.put('/edit-unit', unitController.updateUnit);
router.delete('/delete-unit/:id', unitController.deleteUnit);

// Unit Conversion
// router.post('/add-unitConversion', unitController.addUnitConversion);
// router.put('/get-all-unitConversion', unitController.getAllUnitConversion);
// router.get('/get-one-unitConversion/:_id', unitController.getOneUnitConversion);
// router.put('/edit-unitConversion', unitController.updateUnitConversion);
// router.delete('/delete-unitConversion/:id', unitController.deleteUnitConversion);


//manufacturer
router.post('/addManufacturer', manufacturerController.addManufacturer);
router.put('/getAllManufacturer', manufacturerController.getAllManufacturer)
router.get('/getAManufacturer/:id',manufacturerController.getAManufacturer)
router.put('/updateManufacturer', manufacturerController.updateManufacturer)
router.delete('/deleteManufacturer/:id',manufacturerController.deletedManufacturer)


//category
router.post('/addCategory', categoriesController.addCategory)
router.put('/getAllCategories' , categoriesController.getAllCategories)
router.get('/getACategory/:id' , categoriesController.getACategory)
router.put("/updateCategory/:id" , categoriesController.updateCategory)
router.delete("/deleteCategory/:id", categoriesController.deleteCategory)


//brand
router.post('/addBrand', brandController.addBrand);
router.put('/getAllBrands', brandController.getAllBrands);
router.get('/getBrand/:id', brandController.getABrand);
router.put('/updateBrand/:id', brandController.updateBrand);
router.delete('/deleteBrand/:id', brandController.deleteBrand);


//Rack
router.post('/add-rack', rackController.addRack);
router.put('/get-all-rack', rackController.getAllRack);
router.get('/get-one-rack/:id', rackController.getOneRack);
router.put('/update-rack', rackController.updateRack);
router.delete('/delete-rack/:id', rackController.deleteRack);


module.exports = router