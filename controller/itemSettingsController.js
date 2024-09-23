const Organization = require("../database/model/organization")
const Settings = require("../database/model/settings")



exports.addItemSettings = async (req, res) => {
    try {
      const { organizationId } = req.body;
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

