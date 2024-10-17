const Organization = require("../database/model/organization");
const Settings = require("../database/model/settings");
const ItemTrack = require("../database/model/itemTrack");



exports.addItemSettings = async (req, res) => {
    try {
      const organizationId = req.user.organizationId;
      console.log("Item setting:",req.body);
  
      const itemSettings = {
        itemDecimal: req.body.itemDecimal,
        itemDimensions: req.body.itemDimensions,
        itemWeights: req.body.itemWeights,
        barcodeScan: req.body.barcodeScan,
        itemDuplicateName: req.body.itemDuplicateName,
        hsnSac: req.body.hsnSac,
        hsnDigits: req.body.hsnDigits,
        priceList: req.body.priceList,
        priceListAtLineLevel: req.body.priceListAtLineLevel,
        compositeItem: req.body.compositeItem,
        stockBelowZero: req.body.stockBelowZero,
        outOfStockBelowZero: req.body.outOfStockBelowZero,
        notifyReorderPoint: req.body.notifyReorderPoint,
        trackCostOnItems: req.body.trackCostOnItems,
      };
  
      // Find the document by organizationId
      const existingSettings = await Settings.findOne({ organizationId });
  
      if (!existingSettings) {
        return res.status(404).json({ message: "Settings not found" });
      }
  
      // Update the document with the new item settings
      Object.assign(existingSettings, itemSettings);
  
      // Save the updated document
      await existingSettings.save();
  
      res.status(200).json("Item settings updated successfully");
    } catch (error) {
      console.error("Error updating item settings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };







  // Get all items
exports.getAllItemTrack = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;


    // Check if an Organization already exists
    const existingOrganization = await Organization.findOne({ organizationId });
    
    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }

    const allItem = await ItemTrack.find({ organizationId });
    if (allItem.length > 0) {
      const AllItem = allItem.map((history) => {
        const { organizationId, ...rest } = history.toObject(); // Convert to plain object and omit organizationId
        return rest;
      });
      res.status(200).json(AllItem);
    } else {
      return res.status(404).json("No Items Track found.");
    }
  } catch (error) {
    console.error("Error fetching Items:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



// Get a particular item
exports.getAItemTrack = async (req, res) => {
    const itemId = req.params;
    const organizationId = req.user.organizationId;

    // Check if an Organization already exists
    const existingOrganization = await Organization.findOne({ organizationId });
 
    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }

  try {
    const singleItem = await ItemTrack.findById(itemId);
    if (singleItem) {
      res.status(200).json(singleItem);
    } else {
      res.status(404).json({ message: "Item Track not found." });
    }
  } catch (error) {
    console.error("Error fetching Item:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};