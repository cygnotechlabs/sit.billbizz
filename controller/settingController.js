const Currency = require("../database/model/currency")
const mongoose = require('mongoose');



// get Currency 
exports.getCurrency = async (req, res) => {
  try {
    const { organizationId } = req.body;

    // Log the ID being fetched
    console.log("Fetching organization with ID:", organizationId);

    const currencies = await Currency.find({organizationId:organizationId});

    if (currencies) {
      res.status(200).json(currencies);
    } else {
      res.status(404).json({ message: "Currencies not found" });
    }
  } catch (error) {
    console.error("Error fetching Currencies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};