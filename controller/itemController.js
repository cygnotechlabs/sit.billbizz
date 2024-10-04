const Organization = require("../database/model/organization");
const Item = require("../database/model/item");
const ItemTrack = require("../database/model/itemTrack");
const Settings = require("../database/model/settings");
const Tax = require("../database/model/tax");
const moment = require('moment-timezone');


// Add item
exports.addItem = async (req, res) => {
    console.log("Add Item:", req.body);
    try {
     const organizationId = req.user.organizationId;

      const {    
        //Basics           
        itemType,
        itemName,
        itemImage,
        sku,
        unit,
        returnableItem,
        hsnCode,
        sac,
        taxPreference,
        taxExemptReason,
        productUsage,

        //Storage & Classification
        length,
        width,
        height,
        dimensionUnit,

        warranty,
        weight,
        weightUnit,

        manufacturer,
        brand,
        categories,
        rack,

        upc,
        mpn,
        ean,
        isbn,

        //Sale Info
        baseCurrency,
        sellingPrice,
        saleMrp,
        salesAccount,
        salesDescription,
        
        //Purchase Info
        costPrice,
        purchaseAccount,
        purchaseDescription,
        preferredVendor,
        taxRate,

        trackInventory,
        inventoryAccount,
        openingStock,
        openingStockRatePerUnit,
        reorderPOint,
        
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

    const timeZoneExp = existingOrganization.timeZoneExp;
    const dateFormatExp = existingOrganization.dateFormatExp;
    const dateSplit = existingOrganization.dateSplit;
    const generatedDateTime = generateTimeAndDateForDB(timeZoneExp, dateFormatExp, dateSplit);
    const createdDate = generatedDateTime.dateTime;
  
      // Create a new item
      const newItem = new Item({
        //Basics
        organizationId,   
        itemType,
        itemName,
        itemImage,
        sku,
        unit,
        returnableItem,
        hsnCode,
        sac,
        taxPreference,
        taxExemptReason,
        productUsage,

        //Storage & Classification
        length,
        width,
        height,
        dimensionUnit,

        warranty,
        weight,
        weightUnit,

        manufacturer,
        brand,
        categories,
        rack,

        upc,
        mpn,
        ean,
        isbn,

        //Sale Info
        baseCurrency,
        sellingPrice,
        saleMrp,
        salesAccount,
        salesDescription,
        
        //Purchase Info
        costPrice,
        purchaseAccount,
        purchaseDescription,
        preferredVendor,
        taxRate,

        trackInventory,
        inventoryAccount,
        openingStock,
        openingStockRatePerUnit,
        reorderPOint,
        
        currentStock,
        createdDate,
        status
      });
      await newItem.save();


      const trackEntry = new ItemTrack({
        organizationId,
        operationId: newItem._id,
        action: "Opening Stock", //Opening Stock
        date: createdDate,
        itemId: newItem._id,
        itemName ,
        creditQuantity: openingStock,
        currentStock: openingStock,
    });

    await trackEntry.save();


  
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
    const organizationId = req.user.organizationId;


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
        const organizationId = req.user.organizationId;

    const { itemId } = req.params;
      const {
        //Basics           
        itemType,
        itemName,
        itemImage,
        sku,
        unit,
        returnableItem,
        hsnCode,
        sac,
        taxPreference,
        taxExemptReason,
        productUsage,

        //Storage & Classification
        length,
        width,
        height,
        dimensionUnit,

        warranty,
        weight,
        weightUnit,

        manufacturer,
        brand,
        categories,
        rack,

        upc,
        mpn,
        ean,
        isbn,

        //Sale Info
        baseCurrency,
        sellingPrice,
        saleMrp,
        salesAccount,
        salesDescription,
        
        //Purchase Info
        costPrice,
        purchaseAccount,
        purchaseDescription,
        preferredVendor,
        taxRate,

        trackInventory,
        inventoryAccount,
        openingStock,
        openingStockRatePerUnit,
        reorderPOint,
        
        currentStock,
        status
      } = req.body;

      // Log the ID being updated
      console.log("Updating organization with ID:", itemId);

      // Check if an Organization already exists
      const existingOrganization = await Organization.findOne({ organizationId });
  
      if (!existingOrganization) {
        return res.status(404).json({
          message: "No Organization Found.",
        });
      }

      

      const updatedItem = await Item.findByIdAndUpdate(
        itemId,
          {
            //Basics
        organizationId,   
        itemType,
        itemName,
        itemImage,
        sku,
        unit,
        returnableItem,
        hsnCode,
        sac,
        taxPreference,
        taxExemptReason,
        productUsage,

        //Storage & Classification
        length,
        width,
        height,
        dimensionUnit,

        warranty,
        weight,
        weightUnit,

        manufacturer,
        brand,
        categories,
        rack,

        upc,
        mpn,
        ean,
        isbn,

        //Sale Info
        baseCurrency,
        sellingPrice,
        saleMrp,
        salesAccount,
        salesDescription,
        
        //Purchase Info
        costPrice,
        purchaseAccount,
        purchaseDescription,
        preferredVendor,
        taxRate,

        trackInventory,
        inventoryAccount,
        openingStock,
        openingStockRatePerUnit,
        reorderPOint,
        
        currentStock,
        status
          },
          { new: true, runValidators: true }
      );

      if (!updatedItem) {
          console.log("Item not found with ID:", itemId);
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
      const itemId = req.params;
          const organizationId = req.user.organizationId;


    // Check if an Organization already exists
    const existingOrganization = await Organization.findOne({ organizationId });
    
    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }

      const deletedItem = await Item.findByIdAndDelete(itemId);

      if (!deletedItem) {
          return res.status(404).json({ message: 'Item not found' });
      }

      res.json({ message: 'Item deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};





// Function to generate time and date for storing in the database
function generateTimeAndDateForDB(timeZone, dateFormat, dateSplit, baseTime = new Date(), timeFormat = 'HH:mm:ss', timeSplit = ':') {
  // Convert the base time to the desired time zone
  const localDate = moment.tz(baseTime, timeZone);

  // Format date and time according to the specified formats
  let formattedDate = localDate.format(dateFormat);
  
  // Handle date split if specified
  if (dateSplit) {
    // Replace default split characters with specified split characters
    formattedDate = formattedDate.replace(/[-/]/g, dateSplit); // Adjust regex based on your date format separators
  }

  const formattedTime = localDate.format(timeFormat);
  const timeZoneName = localDate.format('z'); // Get time zone abbreviation

  // Combine the formatted date and time with the split characters and time zone
  const dateTime = `${formattedDate} ${formattedTime.split(':').join(timeSplit)} (${timeZoneName})`;

  return {
    date: formattedDate,
    time: `${formattedTime} (${timeZoneName})`,
    dateTime: dateTime
  };
}

