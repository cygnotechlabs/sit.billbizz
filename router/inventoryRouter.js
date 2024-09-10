const express = require("express")

const router = new express.Router()

const itemController = require("../controller/itemController");
const unitController = require("../controller/unitController")
const bmcrController = require('../controller/bmcrController');
const itemDropdownController = require("../controller/itemDropdownController")
const itemSettingsController = require("../controller/itemSettingsController")



// Item
router.post('/add-item', itemController.addItem);
router.put('/get-all-item', itemController.getAllItem);
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



//BMCR - Brand Manufacturer Category Rack
router.post('/add-bmcr', bmcrController.addBmcr);
router.put('/get-all-bmcr', bmcrController.getAllBmcr);
router.put('/get-a-bmcr/:id', bmcrController.getABmcr);
router.put('/update-bmcr', bmcrController.updateBmcr);
router.delete('/delete-bmcr/:id',bmcrController.deleteBmcr)

//item dropdowm
router.put('/get-itemDropdown', itemDropdownController.getItemDropdowm);

 
//items settings
router.put('/add-item-settings',itemSettingsController.addItemSettings);
// router.post('/get-item-settings',itemSettings.getItemSettings);


module.exports = router