const Organization = require("../database/model/organization");
const Rack = require("../database/model/rack");

//1. Add rack
exports.addRack = async (req, res) => {
    console.log("Add Rack:", req.body);
    try {
      const {  
        organizationId,  
        rackName,
        description,
        rackStatus,
        createdDate,
      } = req.body;
  
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

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
  
      // Create a new rack
      const newRack = new Rack({
        organizationId,
        rackName,
        description,
        rackStatus,
        createdDate: formattedDate
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
    const { _id } = req.params;

    // Log the ID being fetched
    console.log("Fetching rack with ID:", _id);

    const rack = await Rack.findById(_id);

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
  

//4. edit rack
exports.updateRack = async (req, res) => {
  console.log("Received request to update rack:", req.body);

  try {
    const {
      _id,
      organizationId,  
      rackName,
      description,
      rackStatus,
      updatedDate,
    } = req.body;

    // Log the ID being updated
    console.log("Updating rack with ID:", _id);

    // // Find the rack by its ID to get the current rackName
    // const currentRack = await Unit.findById(_id);

    // if (!currentRack) {
    //   console.log("Rack not found with ID:", _id);
    //   return res.status(404).json({ message: "Rack not found" });
    // }

    // // Check if the new rack already exists in the same organizationId, excluding the current rack being updated
    // if (currentRack.rackName !== rackName) {
    //   const existingRack = await Rack.findOne({
    //     rackName,
    //     organizationId,
    //     _id: { $ne: _id } // Exclude the current rack from the check
    //   });

    //   if (existingRack) {
    //     return res.status(409).json({
    //       message: "This rack name already exists in the given organization.",
    //     });
    //   }
    // }

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    // Update the rack
    const updatedRack = await Rack.findByIdAndUpdate(
      _id,
      {
        organizationId,
        rackName,
        description,
        rackStatus,
        updatedDate: formattedDate
      },
      { new: true, runValidators: true }
    );

    if (!updatedRack) {
      console.log("Rack not found with ID:", _id);
      return res.status(404).json({ message: "Rack not found" });
    }

    res.status(200).json({ message: "Rack updated successfully" });
    console.log("Rack updated successfully:", updatedRack);
  } catch (error) {
    console.error("Error updating rack:", error);
    res.status(500).json({ message: "Internal server error" });
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