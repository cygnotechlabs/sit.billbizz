const Organization = require("../database/model/organization");
const manufacturer = require ('../database/model/manufacturer');


exports.addManufacturer = async (req, res) => {
    console.log("add manufacturer:", req.body);
    const {
        organizationId,
        name,
        description,
        createdDate,
        
    } = req.body;

    try {
        // Check if a manufacturer with the same manfId already exists within the same organization
        const existingManufacturerById = await manufacturer.findOne({  organizationId });

        if (existingManufacturerById) {
            console.log("Manufacturer with manfId already exists:", existingManufacturerById);
            return res.status(409).json({
                message: "A manufacturer with this manfId already exists in the given organization.",
            });
        }

        // Check if a manufacturer with the same name already exists within the same organization
        const existingManufacturerByName = await manufacturer.findOne({ name, organizationId });

        if (existingManufacturerByName) {
            console.log("Manufacturer with name already exists:", existingManufacturerByName);
            return res.status(409).json({
                message: "A manufacturer with this name already exists in the given organization.",
            });
        }
        const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

        // Create a new manufacturer
        const newManufacturer = new manufacturer({
            organizationId,
            name,
            description,
            createdDate:formattedDate
            
        });

        // Save the manufacturer to the database
        const savedManufacturer = await newManufacturer.save();

        // Send response
        res.status(201).json(savedManufacturer);
    } catch (error) {
        console.error("Error adding manufacturer:", error);
        res.status(400).json({ error: error.message });
    }
};


  // Get all item
exports.getAllManufacturer = async (req, res) => {
    const organizationId = req.params.id
    try {
        const allOrganizations = await manufacturer.findOne(organizationId)
        res.status(200).json(allOrganizations);
    } catch (error) {
        console.error("Error fetching Items:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


// Get a Item (particular Item)
exports.getAManufacturer = async(req,res)=>{
    const manufacturerId = req.params.id
    try {
        const aManufacturer = await manufacturer.findOne({_id: manufacturerId})
        res.status(200).json({aManufacturer})
    } catch (error) {
        console.error("Error fetching a Item:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}


exports.updateManufacturer = async (req, res) => {
    console.log("Received request to update manufacturer:", req.body);
    
    try {
        const manufacturerId = req.params.id;
        const {
            organizationId,
            name,
            description,
            updatedDate,
        } = req.body;

        // Find the current manufacturer by its ID
        const currentManufacturer = await manufacturer.findById(manufacturerId);

        if (!currentManufacturer) {
            console.log("Manufacturer not found with ID:", manufacturerId);
            return res.status(404).json({ message: "Manufacturer not found" });
        }

        // Check if the new name already exists in the same organizationId, excluding the current manufacturer being updated
        if (currentManufacturer.name !== name) {
            const existingManufacturerByName = await manufacturer.findOne({
                name,
                organizationId,
                _id: { $ne: manufacturerId } // Exclude the current manufacturer from the check
            });

            if (existingManufacturerByName) {
                console.log("Manufacturer with name already exists:", existingManufacturerByName);
                return res.status(409).json({
                    message: "A manufacturer with this name already exists in the given organization.",
                });
            }
        }

        const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

        // Update the manufacturer
        const updatedManufacturer = await manufacturer.findByIdAndUpdate(
            manufacturerId,
            {
                organizationId,
                name,
                description,
                updatedDate:formattedDate
            },
            { new: true, runValidators: true }
        );

        if (!updatedManufacturer) {
            console.log("Manufacturer not found with ID:", manufacturerId);
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
      const manufacture  = await manufacturer.findById(id);
 
      if (!manufacture) {
        return res.status(404).json({
          message: "Unit not found.",
        });
      }
 
      // Delete the unit
      await manufacturer.findByIdAndDelete(id);
 
      res.status(200).json({
        message: "manufacturer deleted successfully.",
      });
      console.log("manufacturer deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting Unit:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };