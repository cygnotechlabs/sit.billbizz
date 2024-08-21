const Organization = require("../database/model/organization");
const Manufacturer = require ('../database/model/manufacturer');
const Item = require("../database/model/item"); 


exports.addManufacturer = async (req, res) => {
    console.log("add manufacturer:", req.body);
    const {
        organizationId,
        name,
        description,
    } = req.body;

    try {
        // Check if an Organization already exists
        const existingOrganization = await Organization.findOne({ organizationId });
 
        if (!existingOrganization) {
            return res.status(404).json({
                message: "No Organization Found.",
            });
        }
        // Check if a manufacturer with the same name already exists within the same organization
        const existingManufacturerByName = await Manufacturer.findOne({ name, organizationId });

        if (existingManufacturerByName) {
            console.log("Manufacturer with name already exists:", existingManufacturerByName);
            return res.status(409).json({
                message: "A manufacturer with this name already exists in the given organization.",
            });
        }

        // Create a new manufacturer
        const newManufacturer = new Manufacturer({
            organizationId,
            name,
            description,
        });

        // Save the manufacturer to the database
        await newManufacturer.save();

        // Send response
        res.status(201).json("manufacturer added successfully");
    } catch (error) {
        console.error("Error adding manufacturer:", error);
        res.status(400).json({ error: error.message });
    }
};


// Get all Manufacturer
exports.getAllManufacturer = async (req, res) => {
    const { organizationId } = req.body;
    try {
        // Check if an Organization already exists
        const existingOrganization = await Organization.findOne({ organizationId });
    
        if (!existingOrganization) {
        return res.status(404).json({
            message: "No Organization Found.",
        });
        }
        const allOrganizations = await Manufacturer.find({ organizationId })
        res.status(200).json(allOrganizations);
        
    } catch (error) {
        console.error("Error fetching Items:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


// Get a manufacturer (particular Item)
exports.getAManufacturer = async(req,res)=>{
    const manufacturerId = req.params.id
    const { organizationId } = req.body;
    try {
        // Check if an Organization already exists
        const existingOrganization = await Organization.findOne({ organizationId });
    
        if (!existingOrganization) {
        return res.status(404).json({
            message: "No Organization Found.",
        });
        }
        const aManufacturer = await Manufacturer.findById(manufacturerId);
        if (!aManufacturer) {
            return res.status(404).json({ message: "Manufacturer not found" });
        }
        res.status(200).json(aManufacturer);
    } catch (error) {
        console.error("Error fetching brand:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};



exports.updateManufacturer = async (req, res) => {
    console.log("Received request to update manufacturer:", req.body);
    
    try {
        const {
            _id,
            organizationId,
            name,
            description,
        } = req.body;

        // Log the ID being updated
        console.log("Updating manufacturer with ID:", _id);

        // Update the manufacturer
        const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
            _id,
            {
                organizationId,
                name,
                description,
            },
            { new: true, runValidators: true }
        );

        // Check if an Organization already exists
        const existingOrganization = await Organization.findOne({ organizationId });
    
        if (!existingOrganization) {
         return res.status(404).json({
             message: "No Organization Found.",
         });
        }

        if (!updatedManufacturer) {
            console.log("Manufacturer not found with ID:", _id);
            return res.status(404).json({ message: "Manufacturer not found" });
        }

        res.status(200).json({ message: "Manufacturer updated successfully", manufacturer: updatedManufacturer });
        console.log("Manufacturer updated successfully:", updatedManufacturer);
    } catch (error) {
        console.error("Error updating manufacturer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//5. delete Unit
exports.deletedManufacturer = async (req, res) => {
    try {
      const { id } = req.params;
       
      // Check if the unit exists
      const manufacture  = await Manufacturer.findById(id);
 
      if (!manufacture) {
        return res.status(404).json({
          message: "manufacturer not found.",
        });
      }

      // Check if there are any items inside the manufacturer
        const itemsInManufacturer = await Item.find({ 
        manufacturer: manufacturer.name, 
        organizationId: manufacturer.organizationId 
        });

        if (itemsInManufacturer.length > 0) {
        return res.status(400).json({
            message: "Manufacturer cannot be deleted as it contains items.",
        });
        }
 
      // Delete the unit
      await Manufacturer.findByIdAndDelete(id);
 
      res.status(200).json({
        message: "manufacturer deleted successfully.",
      });
      console.log("manufacturer deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting manufacturer:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };