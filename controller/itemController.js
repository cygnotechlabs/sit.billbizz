const Organization = require("../database/model/organization");
const Item = require("../database/model/item");


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
        manufacturer,
        brand,
        sellingPrice,
        salesAccount,
        salesDescription,
        categories,
        rack,
        costPrice,
        purchaseAccount,
        purchaseDescription,
        preferredVendor,
        mrp,
        taxPreference,
        hsnCode,
        cess,
        intraStateTaxRate,
        interStateTaxRate,
        alterUnit,
        quantityAlertLevel,
        productUsage,
        createdDate,
        // updatedDate,
        barcodePrefix,
        warranty,
        itemImage,
        status
      } = req.body;
  
    //   // Check if an item with the same organizationId already exists
    //   const existingItem = await Item.findOne({ _id });
  
    //   if (existingItem) {
    //     return res.status(409).json({
    //       message: "This item already exists.",
    //     });
    //   }

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
        manufacturer,
        brand,
        sellingPrice,
        salesAccount,
        salesDescription,
        categories,
        rack,
        costPrice,
        purchaseAccount,
        purchaseDescription,
        preferredVendor,
        mrp,
        taxPreference,
        hsnCode,
        cess,
        intraStateTaxRate,
        interStateTaxRate,
        alterUnit,
        quantityAlertLevel,
        productUsage,
        createdDate: formattedDate,
        // updatedDate,
        barcodePrefix,
        warranty,
        itemImage,
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



// Get all item
exports.getAllItem = async (req, res) => {
    try {
        const allItem = await Item.find()
        if (allItem.length > 0) {
          res.status(200).json(allItem);
        } else {
          res.status(404).json("No Items found");
        }
    } catch (error) {
        console.error("Error fetching Items:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


// Get a Item (particular Item)
exports.getAItem = async(req,res)=>{
    const itemId = req.params.id
    try {
        const item = await Item.findById({_id: itemId})
        if (item) {
          res.status(200).json(item)
        } else {
          res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        console.error("Error fetching a Item:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}


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
          manufacturer,
          brand,
          sellingPrice,
          salesAccount,
          salesDescription,
          categories,
          rack,
          costPrice,
          purchaseAccount,
          purchaseDescription,
          preferredVendor,
          mrp,
          taxPreference,
          hsnCode,
          cess,
          intraStateTaxRate,
          interStateTaxRate,
          alterUnit,
          quantityAlertLevel,
          productUsage,
          // createdDate,
          updatedDate,
          barcodePrefix,
          warranty,
          itemImage,
          status
      } = req.body;

      // Log the ID being updated
      console.log("Updating organization with ID:", _id);

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
              manufacturer,
              brand,
              sellingPrice,
              salesAccount,
              salesDescription,
              categories,
              rack,
              costPrice,
              purchaseAccount,
              purchaseDescription,
              preferredVendor,
              mrp,
              taxPreference,
              hsnCode,
              cess,
              intraStateTaxRate,
              interStateTaxRate,
              alterUnit,
              quantityAlertLevel,
              productUsage,
              // createdDate,
              updatedDate: formattedDate,
              barcodePrefix,
              warranty,
              itemImage,
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




