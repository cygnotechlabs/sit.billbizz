const Organization = require("../database/model/organization");
const Item = require("../database/model/item");
const ItemTrack = require("../database/model/itemTrack");
const Settings = require("../database/model/settings");
const BMCR = require("../database/model/bmcr");
const Tax = require("../database/model/tax");
const moment = require('moment-timezone');



// Fetch existing data
const dataExist = async (organizationId) => {
  const [organizationExists, taxExists, allItem, settingsExist] = await Promise.all([
    Organization.findOne({ organizationId }),
    Tax.findOne({ organizationId }),
    Item.find({ organizationId }),
    Settings.findOne({ organizationId })
  ]);
  return { organizationExists, taxExists, allItem, settingsExist };
};

// BMCR existing data
const bmcrDataExist = async (organizationId) => {
  const [brandExist, manufacturerExist, categoriesExist, rackExist] = await Promise.all([
    BMCR.find({ type: 'brand', organizationId }, { brandName: 1, _id: 0 }),
    BMCR.find({ type: 'manufacturer', organizationId }, { manufacturerName: 1, _id: 0 }),
    BMCR.find({ type: 'category', organizationId }, { categoriesName: 1, _id: 0 }),
    BMCR.find({ type: 'rack', organizationId }, { rackName: 1, _id: 0 })
  ]);
  return { brandExist, manufacturerExist, categoriesExist, rackExist };
};

// Add item
exports.addItem = async (req, res) => {
    console.log("Add Item:", req.body);
    try {
     const organizationId = req.user.organizationId;

      const cleanedData = cleanCustomerData(req.body);

      //Data Exist Validation
      const { organizationExists, taxExists, settingsExist } = await dataExist(organizationId);
      const { brandExist, manufacturerExist, categoriesExist, rackExist } = await bmcrDataExist(organizationId);
      const bmcr = { brandExist, manufacturerExist, categoriesExist, rackExist };


      if (!validateOrganizationTaxCurrency(organizationExists, taxExists, settingsExist, res)) return;     

      const { itemName, sku, openingStock, taxRate } = cleanedData;

       // Check for duplicate item name
       if (!settingsExist.itemDuplicateName && await isDuplicateItemName(itemName, organizationId, res)) return;

       // Check for duplicate SKU
       if (cleanedData.sku !== undefined && await isDuplicateSKU(sku, organizationId, res)) return;


      //Validate Inputs  
      if (!validateInputs(cleanedData, taxExists, organizationId, bmcr, res)) return;

      const generatedDateTime = generateTimeAndDateForDB(organizationExists.timeZoneExp, organizationExists.dateFormatExp, organizationExists.dateSplit);
      const createdDate = generatedDateTime.dateTime

      let igst, cgst, sgst, vat; 

    if (taxExists.taxType === 'GST') {
      taxExists.gstTaxRate.forEach((tax) => {
        if (tax.taxName === taxRate) {
          igst = tax.igst;
          cgst = tax.cgst; 
          sgst = tax.sgst;           
        }
      });
    }
  
    // Check if taxType is VAT
    if (taxExists.taxType === 'VAT') {
      taxExists.vatTaxRate.forEach((tax) => {
        if (tax.taxName === taxRate) {
          vat = tax.vat; 
        }
      });
    }
  
     
      const newItem = new Item({ ...cleanedData, organizationId, igst:igst, cgst, sgst, vat, createdDate });

      const savedItem = await newItem.save();

      if (openingStock){
        const trackEntry = new ItemTrack({
          organizationId,
          operationId: savedItem._id,
          action: "Opening Stock", 
          date: createdDate,
          itemId: savedItem._id,
          itemName,
          creditQuantity: openingStock,
          currentStock: openingStock,
      });  
      await trackEntry.save();
      console.log( "Item Track Added", trackEntry );      
      }
  
      res.status(201).json({ message: "New Item created successfully." });
      console.log( "New Item created successfully:", savedItem );
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
    const cleanedData = cleanCustomerData(req.body);

    const existingItem = await Item.findById(itemId);
      if (!existingItem) {
        console.log("Item not found with ID:", itemId);
        return res.status(404).json({ message: "Item not found" });
      }


    //Data Exist Validation
    const { organizationExists, taxExists, settingsExist } = await dataExist(organizationId);
    const { brandExist, manufacturerExist, categoriesExist, rackExist } = await bmcrDataExist(organizationId);
    const bmcr = { brandExist, manufacturerExist, categoriesExist, rackExist };
    
    if (!validateOrganizationTaxCurrency(organizationExists, taxExists, settingsExist, itemId, res)) return;     
    
    const { itemName, sku, taxRate } = cleanedData;

    // Check for duplicate item name
    if (!settingsExist.itemDuplicateName && await isDuplicateItemNameExist( itemName, organizationId, itemId, res )) return;

    // Check for duplicate SKU
    if (cleanedData.sku !== undefined && await isDuplicateSKUExist( sku, organizationId, itemId, res )) return;


   //Validate Inputs  
   if (!validateInputs(cleanedData, taxExists, organizationId, bmcr, res)) return;

   const generatedDateTime = generateTimeAndDateForDB(organizationExists.timeZoneExp, organizationExists.dateFormatExp, organizationExists.dateSplit);
   cleanedData.lastModifiedDate = generatedDateTime.dateTime;

    if (taxExists.taxType === 'GST') {
      taxExists.gstTaxRate.forEach((tax) => {
        if (tax.taxName === taxRate) {
          cleanedData.igst = tax.igst;
          cleanedData.cgst = tax.cgst; 
          cleanedData.sgst = tax.sgst;           
        }
      });
    }
  
    // Check if taxType is VAT
    if (taxExists.taxType === 'VAT') {
      taxExists.vatTaxRate.forEach((tax) => {
        if (tax.taxName === taxRate) {
          cleanedData.vat = tax.vat; 
        }
      });
    }


     // Update customer fields
     Object.assign( existingItem, cleanedData );
     const savedItem = await existingItem.save();
 
     if (!savedItem) {
       console.error("Item could not be saved.");
       return res.status(500).json({ message: "Failed to Update Item" });
     }      

      res.status(200).json({ message: "Item updated successfully", savedItem });
      console.log("Item updated successfully:", savedItem);
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







// Check for duplicate item name - ADD
const isDuplicateItemName = async (itemName, organizationId, res) => {
  const existingItemName = await Item.findOne({ itemName, organizationId });
  if (existingItemName) {
      console.error("Item with this name already exists.");
      res.status(400).json({ message: "Item with this name already exists" });
      return true;
  }
  return false;
};

// Check for duplicate SKU - ADD
const isDuplicateSKU = async (sku, organizationId, res) => {
  const existingItem = await Item.findOne({ sku, organizationId });
  if (existingItem) {
      console.error("Item with this SKU already exists.");
      res.status(400).json({ message: "Item with this SKU already exists." });
      return true;
  }
  return false;
};

// Check for duplicate item name - EDIT
const isDuplicateItemNameExist = async (itemName, organizationId, itemId, res) => { 
  const existingItemName = await Item.findOne({
    itemName,
    organizationId,
    _id: { $ne: itemId }
  });
  
  if (existingItemName) {
      console.error("Item with this name already exists.");
      res.status(400).json({ message: "Item with this name already exists" });
      return true;
  }
  
  return false;
};

// Check for duplicate SKU - EDIT
const isDuplicateSKUExist = async (sku, organizationId, itemId, res) => {
  const existingItem = await Item.findOne({ sku, organizationId,  _id: { $ne: itemId }  });
  if (existingItem) {
      console.error("Item with this SKU already exists.");
      res.status(400).json({ message: "Item with this SKU already exists." });
      return true;
  }
  return false;
};


//Clean Data 
function cleanCustomerData(data) {
    const cleanData = (value) => (value === null || value === undefined || value === "" || value === 0 ? undefined : value);
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = cleanData(data[key]);
      return acc;
    }, {});
  }

// Validate Organization Tax Currency
function validateOrganizationTaxCurrency(organizationExists, taxExists, allItem, settingsExist, res) {
  if (!organizationExists) {
    res.status(404).json({ message: "Organization not found" });
    return false;
  }
  if (!taxExists) {
    res.status(404).json({ message: "Tax not found" });
    return false;
  }
  if (!allItem) {
    res.status(404).json({ message: "Currency not found" });
    return false;
  }if (!settingsExist) {
    res.status(404).json({ message: "Settings not found" });
    return false;
  }
  return true;
}








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




const validItemTypes = [ "goods", "service" ];
const validTaxPreference = [ "Non-taxable", "Taxable" ]; 

//Validate inputs
function validateInputs(data, taxExists, organizationId, bmcr, res) {
   const validationErrors = validateItemData( data, taxExists, organizationId, bmcr );

  if (validationErrors.length > 0) {
    res.status(400).json({ message: validationErrors.join(", ") });
    return false;
  }
  return true;
}



//Validate Data
function validateItemData( data, taxExists, organizationId, bmcr ) {  
  
  const errors = [];

  //Basic Info

  //OtherDetails
  validateItemType(data.itemType, errors);
  validateTaxPreference(data.taxPreference, errors);
  validateReqFields( data.itemName, data.sellingPrice, data.taxPreference, data.taxRate , errors);
  validateBMCRFields( data.brand, data.manufacturer, data.categories, data.rack, bmcr, errors);


  //validateAlphanumericFields([''], data, errors);
  //validateIntegerFields([''], data, errors);
  validateFloatFields(['length', 'width', 'height', 'weight', 'sellingPrice', 'saleMrp', 'costPrice', 'openingStock', 'openingStockRatePerUnit', 'reorderPoint'], data, errors);
  //validateAlphabetsFields([''], data, errors);

  //Tax Details
  validateTaxType(data.taxRate, data.taxPreference, taxExists, errors);

  return errors;
}




// Field validation utility
function validateField(condition, errorMsg, errors) {
    if (condition) {
      console.log(errorMsg);      
      errors.push(errorMsg)};
}

//Valid Item Type
function validateItemType(itemType, errors) {
  validateField(itemType && !validItemTypes.includes(itemType),
    "Invalid Item type: " + itemType, errors);
}

//Valid Item Type
function validateTaxPreference(taxPreference, errors) {
  validateField(taxPreference && !validTaxPreference.includes(taxPreference),
    "Invalid Tax Preference: " + taxPreference, errors);
}

//Valid Req Fields
function validateReqFields( itemName, sellingPrice, taxPreference, taxRate , errors ) {
  if (typeof itemName === 'undefined' ) {
    errors.push("Item Name required");
  }
  if (typeof sellingPrice === 'undefined' ) {
  errors.push(" Selling Price required");
  }
  if (typeof taxPreference === 'undefined' ) {
  errors.push("Tax Preference required");
  }
  if (taxPreference =='Taxable' && typeof taxRate === 'undefined' ) {
  errors.push("Tax Rate required");
  }
  if (taxPreference =='Non-Taxable' && typeof taxExemptReason === 'undefined' ) {
    errors.push("Tax Exemption Reason required");
  }
  if (taxPreference =='Non-Taxable' && typeof taxRate !== 'undefined' ) {
    errors.push("Invalid Tax Preference");
  }
}

//Valid BMCR field
function validateBMCRFields(brand, manufacturer, categories, rack, bmcr, errors) {
    const validBrandNames = bmcr.brandExist.map(item => item.brandName);
    validateField(brand && !validBrandNames.includes(brand), "Invalid Brand: " + brand, errors);

    const validManufacturerNames = bmcr.manufacturerExist.map(item => item.manufacturerName);
    validateField(manufacturer && !validManufacturerNames.includes(manufacturer), "Invalid Manufacturer: " + manufacturer, errors);

    const validCategoryNames = bmcr.categoriesExist.map(item => item.categoriesName);
    validateField(categories && !validCategoryNames.includes(categories), "Invalid Category: " + categories, errors);

    const validRackNames = bmcr.rackExist.map(item => item.rackName);
    validateField(rack && !validRackNames.includes(rack), "Invalid Rack: " + rack, errors);  
}






  

//Valid Alphanumeric Fields
function validateAlphanumericFields(fields, data, errors) {
  fields.forEach((field) => {
    validateField(data[field] && !isAlphanumeric(data[field]), "Invalid " + field + ": " + data[field], errors);
  });
}

// Validate Integer Fields
function validateIntegerFields(fields, data, errors) {
fields.forEach(field => {
  validateField(data[field] && !isInteger(data[field]), `Invalid ${field}: ${data[field]}`, errors);
});
}

//Valid Float Fields  
function validateFloatFields(fields, data, errors) {
  fields.forEach((balance) => {
    validateField(data[balance] && !isFloat(data[balance]),
      "Invalid " + balance.replace(/([A-Z])/g, " $1") + ": " + data[balance], errors);
  });
}

//Valid Alphabets Fields 
function validateAlphabetsFields(fields, data, errors) {
  fields.forEach((field) => {
    if (data[field] !== undefined) {
      validateField(!isAlphabets(data[field]),
        field.charAt(0).toUpperCase() + field.slice(1) + " should contain only alphabets.", errors);
    }
  });
}

//Validate Tax Type
function validateTaxType( taxRate, taxPreference, taxExists, errors ) {
  const taxType = taxExists.taxType;
  
  let taxFound = false;

  // Check if taxType is GST
  if (taxType === 'GST' && taxPreference =='Taxable' ) {
    taxExists.gstTaxRate.forEach((tax) => {
      if (tax.taxName === taxRate) {
        taxFound = true;
        console.log(`Matching GST tax found: ${tax.taxName} with rate: ${tax.taxRate}`);
      }
    });
  }

  // Check if taxType is VAT
  if (taxType === 'VAT' && taxPreference =='Taxable') {
    taxExists.vatTaxRate.forEach((tax) => {
      if (tax.taxName === taxRate) {
        taxFound = true;
        console.log(`Matching VAT tax found: ${tax.taxName} with rate: ${tax.taxRate}`);
      }
    });
  }

  // If no matching tax rate found, add an error
  if (!taxFound  && taxPreference =='Taxable' ) {
    errors.push(`No matching ${taxType} Tax group found `);
  }  
  
}





// Validation helpers
function isAlphabets(value) {
  return /^[A-Za-z\s]+$/.test(value);
}

function isFloat(value) {
  return /^-?\d+(\.\d+)?$/.test(value);
}

function isInteger(value) {
  return /^\d+$/.test(value);
}

function isAlphanumeric(value) {
  return /^[A-Za-z0-9]+$/.test(value);
}