const Organization = require("../database/model/organization");
const Item = require("../database/model/item");
const Settings = require("../database/model/settings");
const Tax = require("../database/model/tax");


// Add item
exports.addItem = async (req, res) => {
    console.log("Add Item:", req.body);
    try {
      const {    
        organizationId,   
        itemType,
        itemName,
        sku,
        unit,
        returnableItem,
        length,
        width,
        height,
        dimensionUnit,
        weight,
        weightUnit,
        manufacturer,
        brand,
        sellingPrice,
        salesAccount,
        salesDescription,
        categories,
        rack,
        upc,
        mpn,
        ean,
        isbn,
        costPrice,
        purchaseAccount,
        purchaseDescription,
        preferredVendor,
        mrp,
        taxPreference,
        hsnCode,
        sac,
        taxRate,
        inventoryAccount,
        openingStock,
        openingStockRatePerUnit,
        reorderPOint,
        productUsage,
        createdDate,
        barcodePrefix,
        warranty,
        trackInventory,
        itemImage,
        currentStock,
        status
      } = req.body;

    // Check if an Organization already exists
    const existingOrganization = await Organization.findOne({ organizationId });
 
    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }

    // Fetch settings to check itemDuplicateName configuration
    const settings = await Settings.findOne({ organizationId });

    if (!settings) {
      return res.status(500).json({
        message: "Settings not found for the organization.",
      });
    }

    // If itemDuplicateName is false, check for duplicate itemName
    if (!settings.itemDuplicateName) {
      const existingItemName = await Item.findOne({ itemName, organizationId });
      if (existingItemName) {
        console.error("Item with this name already exists.");
        return res.status(400).json({ message: "Item with this name already exists." });
      }
    }

    const existingItem = await Item.findOne({ sku });     
    if (existingItem) {       
      console.error("Item with this SKU already exists.");       
      return res.status(400).json({ message: "Item with this SKU already exists." }); 
    }

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
  
      // Create a new item
      const newItem = new Item({
        organizationId,   
        itemType,
        itemName,
        sku,
        unit,
        returnableItem,
        length,
        width,
        height,
        dimensionUnit,
        weight,
        weightUnit,
        manufacturer,
        brand,
        sellingPrice,
        salesAccount,
        salesDescription,
        categories,
        rack,
        upc,
        mpn,
        ean,
        isbn,
        costPrice,
        purchaseAccount,
        purchaseDescription,
        preferredVendor,
        mrp,
        taxPreference,
        hsnCode,
        sac,
        taxRate,
        inventoryAccount,
        openingStock,
        openingStockRatePerUnit,
        reorderPOint,
        productUsage,
        createdDate:formattedDate,
        barcodePrefix,
        warranty,
        trackInventory,
        itemImage,
        currentStock,
        status: status || 'Active' // Default to 'Active' if not provided
      });
      await newItem.save();


  
      res.status(201).json({
        message: "New Item created successfully."
      });
      console.log("New Item created successfully:");
    } catch (error) {
      console.error("Error creating Item:", error);
      res.status(500).json({ message: "Internal server error." });
    }
};



// Get all items
exports.getAllItem = async (req, res) => {
  try {
    const { organizationId } = req.body;

    // Check if an Organization already exists
    const existingOrganization = await Organization.findOne({ organizationId });
    
    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }

    const allItem = await Item.find({ organizationId });
    if (allItem.length > 0) {
      res.status(200).json(allItem);
    } else {
      return res.status(404).json("No Items found.");
    }
  } catch (error) {
    console.error("Error fetching Items:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get a particular item
exports.getAItem = async (req, res) => {
  const itemId = req.params.id;
  const { organizationId } = req.body;

    // Check if an Organization already exists
    const existingOrganization = await Organization.findOne({ organizationId });
 
    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }

  try {
    const singleItem = await Item.findById(itemId);
    if (singleItem) {
      res.status(200).json(singleItem);
    } else {
      res.status(404).json({ message: "Item not found." });
    }
  } catch (error) {
    console.error("Error fetching Item:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



// Update Item
exports.updateItem = async (req, res) => {
  console.log("Received request to update item:", req.body);
 
  try {
      const {
          _id,
          organizationId,   
          itemType,
          itemName,
          sku,
          unit,
          returnableItem,
          length,
          width,
          height,
          dimensionUnit,
          weight,
          weightUnit,
          manufacturer,
          brand,
          sellingPrice,
          salesAccount,
          salesDescription,
          categories,
          rack,
          upc,
          mpn,
          ean,
          isbn,
          costPrice,
          purchaseAccount,
          purchaseDescription,
          preferredVendor,
          mrp,
          taxPreference,
          hsnCode,
          sac,
          taxRate,
          inventoryAccount,
          openingStock,
          openingStockRatePerUnit,
          reorderPOint,
          productUsage,
          updatedDate,
          barcodePrefix,
          warranty,
          trackInventory,
          itemImage,
          currentStock,
          status
      } = req.body;

      // Log the ID being updated
      console.log("Updating organization with ID:", _id);

      // Check if an Organization already exists
      const existingOrganization = await Organization.findOne({ organizationId });
  
      if (!existingOrganization) {
        return res.status(404).json({
          message: "No Organization Found.",
        });
      }

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      const updatedItem = await Item.findByIdAndUpdate(
        _id,
          {
            organizationId,   
            itemType,
            itemName,
            sku,
            unit,
            returnableItem,
            length,
            width,
            height,
            dimensionUnit,
            weight,
            weightUnit,
            manufacturer,
            brand,
            sellingPrice,
            salesAccount,
            salesDescription,
            categories,
            rack,
            upc,
            mpn,
            ean,
            isbn,
            costPrice,
            purchaseAccount,
            purchaseDescription,
            preferredVendor,
            mrp,
            taxPreference,
            hsnCode,
            sac,
            taxRate,
            inventoryAccount,
            openingStock,
            openingStockRatePerUnit,
            reorderPOint,
            productUsage,
          
            updatedDate: formattedDate ,
            barcodePrefix,
            warranty,
            trackInventory,
            itemImage,
            currentStock,
            status
          },
          { new: true, runValidators: true }
      );

      if (!updatedItem) {
          console.log("Item not found with ID:", _id);
          return res.status(404).json({ message: "Item not found" });
      }

      res.status(200).json({ message: "Item updated successfully", item: updatedItem });
      console.log("Item updated successfully:", updatedItem);
  } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};



// Delete an item
exports.deleteItem = async (req, res) => {
  try {
      const itemId = req.params.id;
      const deletedItem = await Item.findByIdAndDelete(itemId);

      if (!deletedItem) {
          return res.status(404).json({ message: 'Item not found' });
      }

      res.json({ message: 'Item deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};





