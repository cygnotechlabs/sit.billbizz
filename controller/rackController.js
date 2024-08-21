const Organization = require("../database/model/organization");
const Rack = require("../database/model/rack");
const Item = require("../database/model/item"); 

//1. Add rack
exports.addRack = async (req, res) => {
    console.log("Add Rack:", req.body);
    try {
      const {  
        organizationId,  
        rackName,
        description,
      } = req.body;
  
      // Check if an Organization already exists
      const existingOrganization = await Organization.findOne({ organizationId });
 
      if (!existingOrganization) {
          return res.status(404).json({
              message: "No Organization Found.",
          });
      }

      // // Check if a rack with the same organizationId already exists
      const existingRack = await Rack.findOne({
        rackName,
        organizationId,
      });

      if (existingRack) {
          return res.status(409).json({
              message: "This rack name already exists in the given organization.",
          });
      }
  
      // Create a new rack
      const newRack = new Rack({
        organizationId,
        rackName,
        description,
      });
      await newRack.save();
  
      res.status(201).json({
        message: "New rack created successfully."
      });
      console.log("New rack created successfully:");
    } catch (error) {
      console.error("Error creating rack:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };


//2. Get all rack
exports.getAllRack = async (req, res) => {
    try {
        const { organizationId } = req.body;
        console.log(organizationId);

        // Check if an Organization already exists
        const existingOrganization = await Organization.findOne({ organizationId });
    
        if (!existingOrganization) {
        return res.status(404).json({
            message: "No Organization Found.",
        });
        }

        // Find all rack where organizationId matches
        const allRack = await Rack.find({ organizationId })
        if (allRack.length > 0) {
          res.status(200).json(allRack);
        } else {
          return res.status(404).json({ message: "No rack found for the provided organizationId" });
        }
    } catch (error) {
        console.error("Error fetching rack:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


//3. get one rack
exports.getOneRack = async (req, res) => {
  try {
    const rackId = req.params.id;
    const { organizationId } = req.body;

    // Check if an Organization already exists
    const existingOrganization = await Organization.findOne({ organizationId });
 
    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }

    const rack = await Rack.findById({_id: rackId});

    if (rack) {
      res.status(200).json(rack);
    } else {
      res.status(404).json({ message: "Rack not found" });
    }
  } catch (error) {
    console.error("Error fetching a rack:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
  
exports.updateRacks = async (req, res) => {
  console.log("Received request to update rack:", req.body);
  try {
    const { 
      _id, 
      organizationId, 
      rackName, 
      description 
    } = req.body;

    // Find the existing rack to get the old rackName
    const existingRack = await Rack.findById(_id);
    if (!existingRack) {
      console.log("Rack not found with ID:", _id);
      return res.status(404).json({ message: "Rack not found." });
    }

    const oldRackName = existingRack.rackName;

    // Update the rack
    const updatedRack = await Rack.findByIdAndUpdate(
      _id,
      { 
        organizationId, 
        rackName, 
        description 
      },
      { new: true, runValidators: true }
    );

    // Update the rackName in associated Item documents
    if (rackName && rackName !== oldRackName) {
      const updatedItems = await Item.updateMany(
        { 
          rack: oldRackName,  // Match the old rackName
          organizationId: organizationId  // Match the organizationId from the request
        },
        { $set: { rack: rackName } }  // Update with the new rackName
      );
      console.log(`${updatedItems.modifiedCount} items associated with the rack have been updated with the new rackName.`);
    }

    res.status(200).json({ message: "Rack and associated items updated successfully." });
    console.log("Rack updated successfully:", updatedRack);
  } catch (error) {
    console.error("Error updating rack:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



//5. delete Rack
exports.deleteRack = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the rack exists
    const rack = await Rack.findById(id);

    if (!rack) {
      return res.status(404).json({
        message: "Rack not found.",
      });
    }

    // Check if there are any items inside the rack
    const itemsInRack = await Item.find({ 
      rack: rack.rackName, 
      organizationId: rack.organizationId 
    });

    if (itemsInRack.length > 0) {
      return res.status(400).json({
        message: "Rack cannot be deleted as it contains items.",
      });
    }

    // Delete the rack
    await Rack.findByIdAndDelete(id);

    res.status(200).json({
      message: "Rack deleted successfully.",
    });
    console.log("Rack deleted successfully:", id);
  } catch (error) {
    console.error("Error deleting rack:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

  













