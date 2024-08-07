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

// add currency
exports.addCurrency = async (req, res) => {
  try {
    const { organizationId, currencyCode, currencySymbol, currencyName, decimalPlaces, format } = req.body;

    const newCurrency = new Currency({
      organizationId,
      currencyCode,
      currencySymbol,
      currencyName,
      decimalPlaces,
      format
    });

    const savedCurrency = await newCurrency.save();

    res.status(201).json("Currency added successfully");
  } catch (error) {
    console.error("Error adding Currency:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// edit currency
exports.editCurrency = async (req, res) => {
  try {
    const { currencyId, organizationId, currencyCode, currencySymbol, currencyName, decimalPlaces, format } = req.body;

    const updatedCurrency = await Currency.findByIdAndUpdate(
      currencyId,
      { organizationId, currencyCode, currencySymbol, currencyName, decimalPlaces, format },
      { new: true }
    );

    if (updatedCurrency) {
      res.status(200).json("Currency updated successfully");
    } else {
      res.status(404).json({ message: "Currency not found" });
    }
  } catch (error) {
    console.error("Error editing Currency:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete currency 
exports.deleteCurrency = async (req, res) => {
  try {
    const { currencyId } = req.body;

    const deletedCurrency = await Currency.findByIdAndDelete(currencyId);

    if (deletedCurrency) {
      res.status(200).json({ message: "Currency deleted successfully" });
    } else {
      res.status(404).json({ message: "Currency not found" });
    }
  } catch (error) {
    console.error("Error deleting Currency:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




exports.getAllTimeZones = async (req, res) => {
  try {
    const timeZones = [
      {"value": "UTC", "label": "Coordinated Universal Time (UTC)"},
      {"value": "GMT", "label": "Greenwich Mean Time (GMT)"},
      {"value": "PST", "label": "Pacific Standard Time (PST)"},
      {"value": "MST", "label": "Mountain Standard Time (MST)"},
      {"value": "CST", "label": "Central Standard Time (CST)"},
      {"value": "EST", "label": "Eastern Standard Time (EST)"},
      {"value": "IST", "label": "India Standard Time (IST)"},
      {"value": "CET", "label": "Central European Time (CET)"},
      {"value": "EET", "label": "Eastern European Time (EET)"},
      {"value": "JST", "label": "Japan Standard Time (JST)"},
      {"value": "AEST", "label": "Australian Eastern Standard Time (AEST)"},
      {"value": "ACST", "label": "Australian Central Standard Time (ACST)"},
      {"value": "AWST", "label": "Australian Western Standard Time (AWST)"},
      {"value": "NZST", "label": "New Zealand Standard Time (NZST)"},
      {"value": "HST", "label": "Hawaii-Aleutian Standard Time (HST)"},
      {"value": "AKST", "label": "Alaska Standard Time (AKST)"},
      {"value": "WET", "label": "Western European Time (WET)"},
      {"value": "WEST", "label": "Western European Summer Time (WEST)"},
      {"value": "CEST", "label": "Central European Summer Time (CEST)"},
      {"value": "EEST", "label": "Eastern European Summer Time (EEST)"},
      {"value": "BST", "label": "British Summer Time (BST)"}
    ];

    res.status(200).json(timeZones);
  } catch (error) {
    console.error("Error fetching time zones:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
