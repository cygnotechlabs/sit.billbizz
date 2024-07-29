const express = require("express")

const router = new express.Router()

const itemController = require("../controller/itemController");
const unitController = require("../controller/unitController")
const manufacturerController = require("../controller/manufacturerController");
const categoriesController = require("../controller/categoriesController")
const brandController = require('../controller/brandController')


// Item
router.post('/add-item', itemController.addItem);
router.get('/get-all-item', itemController.getAllItem);
router.get('/get-one-item/:id', itemController.getAItem)
router.put('/edit-item',itemController.updateItem)
router.delete('/delete-item/:id',itemController.deleteItem)


// Unit
router.post('/add-unit', unitController.addUnit);
router.get('/get-all-unit', unitController.getAllUnit);
router.get('/get-one-unit/:_id', unitController.getOneUnit);
router.put('/edit-unit', unitController.updateUnit);
router.delete('/delete-unit/:id', unitController.deleteUnit);
// Unit Conversion
router.post('/add-unitConversion', unitController.addUnitConversion);
router.get('/get-all-unitConversion', unitController.getAllUnitConversion);
router.get('/get-one-unitConversion/:_id', unitController.getOneUnitConversion);
router.put('/edit-unitConversion', unitController.updateUnitConversion);
router.delete('/delete-unitConversion/:id', unitController.deleteUnitConversion);


//manufacturer
router.post('/addManufacturer', manufacturerController.addManufacturer);
router.get('/getAllManufacturer', manufacturerController.getAllManufacturer)
router.get('/getAManufacturer/:id',manufacturerController.getAManufacturer)
router.put('/updateManufacturer/:id', manufacturerController.updateManufacturer)
router.delete('/deleteManufacturer/:id',manufacturerController.deletedManufacturer)


//category
router.post('/addCategory', categoriesController.addCategory)
router.get('/getAllCategories' , categoriesController.getAllCategories)
router.get('/getACategory/:id' , categoriesController.getACategory)
router.put("/updateCategory/:id" , categoriesController.updateCategory)
router.delete("/deleteCategory/:id", categoriesController.deleteCategory)


//brand
router.post('/addBrand', brandController.addBrand);
router.get('/getAllBrands', brandController.getAllBrands);
router.get('/getBrand/:id', brandController.getABrand);
router.put('/updateBrand/:id', brandController.updateBrand);
router.delete('/deleteBrand/:id', brandController.deleteBrand);


module.exports = router