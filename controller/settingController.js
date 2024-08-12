const Currency = require("../database/model/currency")
const Organization = require("../database/model/organization");
const Settings = require('../database/model/settings')
const PaymentTerms = require('../database/model/paymentTerm')
const Tax = require('../database/model/tax')
const Prefix = require('../database/model/prefix')
const mongoose = require('mongoose');



// Currency
// Get Currency 
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

// Add currency
exports.addCurrency = async (req, res) => {
  try {
    const { organizationId, currencyCode, currencySymbol, currencyName, decimalPlaces, format  } = req.body;

    const newCurrency = new Currency({
      organizationId,
      currencyCode,
      currencySymbol,
      currencyName,
      decimalPlaces,
      format,
      
    });

    const savedCurrency = await newCurrency.save();

    res.status(201).json("Currency added successfully");
  } catch (error) {
    console.error("Error adding Currency:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit currency
exports.editCurrency = async (req, res) => {
  try {
    const { currencyId, organizationId, currencyCode, currencySymbol, currencyName, decimalPlaces, format } = req.body;

    const updatedCurrency = await Currency.findByIdAndUpdate(
      currencyId,
      { organizationId, currencyCode, currencySymbol, currencyName, decimalPlaces, format,  },
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


// Delete currency 
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






// Invoice
// Setup Invoice settings
exports.updateInvoiceSettings = async (req, res) => {
  try {
    const { organizationId } = req.body;
    console.log(req.body);
    
    const invoiceSettings = {
      organizationAddressFormat: req.body.organizationAddressFormat,
      qrLocation: req.body.qrLocation,
      displayQrLocation: req.body.displayQrLocation,
      qrPayment: req.body.qrPayment,
      displayQrPayment: req.body.displayQrPayment,
      digitalSignature: req.body.digitalSignature,
      displayDigitalSignature: req.body.displayDigitalSignature,
      xLink: req.body.xLink,
      displayXLink: req.body.displayXLink,
      instagramLink: req.body.instagramLink,
      displayInstagramLink: req.body.displayInstagramLink,
      linkedinLink: req.body.linkedinLink,
      displayLinkedinLink: req.body.displayLinkedinLink,
      facebookLink: req.body.facebookLink,
      displayFacebookLink: req.body.displayFacebookLink,

      accountHolderName: req.body.accountHolderName,
      bankName: req.body.bankName,
      accNum: req.body.accNum,
      ifsc: req.body.ifsc,
    };

    // Find the document by organizationId
    const existingSettings = await Settings.findOne({ organizationId });

    if (!existingSettings) {
      return res.status(404).json({ message: "Settings not found" });
    }

    // Update the document with the new invoice settings
    Object.assign(existingSettings, invoiceSettings);

    // Save the updated document
    await existingSettings.save();

    res.status(200).json("Invoice settings updated successfully");
  } catch (error) {
    console.error("Error updating invoice settings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get settings
exports.getSettings = async (req, res) => {
  try {
    const { organizationId } = req.body;

    // Find documents that match the organizationId
    const settings = await Settings.find({ organizationId });

    // If no settings are found for the provided organizationId
    if (!settings || settings.length === 0) {
      return res.status(404).json({ message: "No settings found for this organization" });
    }

    // Return the retrieved settings
    res.status(200).json(settings);
  } catch (error) {
    console.error("Error retrieving settings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};






// Payment Term
// Add payment terms
exports.addPaymentTerm = async (req, res) => {
  try {
    const { organizationId, name, days } = req.body;

    // Check if a payment term with the same name and organizationId already exists
    const existingPaymentTerm = await PaymentTerms.findOne({ organizationId, name });

    if (existingPaymentTerm) {
      return res.status(400).json({ message: "Payment Term with this name already exists for the organization" });
    }

    // If no duplicate is found, create a new payment term
    const newPaymentTerm = new PaymentTerms({
      organizationId,
      name,
      days
    });

    const savedPaymentTerm = await newPaymentTerm.save();

    res.status(201).json("Payment Term added successfully");
  } catch (error) {
    console.error("Error adding Payment Term:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit payment terms
exports.editPaymentTerm = async (req, res) => {
  try {
    const { id } = req.params;
    const { organizationId, name, days } = req.body;

    const updatedPaymentTerm = await PaymentTerms.findByIdAndUpdate(
      id,
      { organizationId, name, days },
      { new: true }
    );

    if (!updatedPaymentTerm) {
      return res.status(404).json({ message: "Payment Term not found" });
    }

    res.status(200).json("Payment Term updated successfully");
  } catch (error) {
    console.error("Error updating Payment Term:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete payment terms
exports.deletePaymentTerm = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPaymentTerm = await PaymentTerms.findByIdAndDelete(id);

    if (!deletedPaymentTerm) {
      return res.status(404).json({ message: "Payment Term not found" });
    }

    res.status(200).json("Payment Term deleted successfully");
  } catch (error) {
    console.error("Error deleting Payment Term:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all payment terms
exports.getAllPaymentTerms = async (req, res) => {
  try {
    const paymentTerms = await PaymentTerms.find();

    if (!paymentTerms || paymentTerms.length === 0) {
      return res.status(404).json({ message: "No Payment Terms found" });
    }

    res.status(200).json(paymentTerms);
  } catch (error) {
    console.error("Error fetching Payment Terms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};






//Tax

// Add Tax
exports.addTax = async (req, res) => {
  try {
    const { organizationId, taxType, gstIn, gstBusinesLegalName, gstBusinessTradeName, gstRegisteredDate, gstTaxRate, compositionSchema, compositionPercentage, vatNumber, vatBusinesLegalName, vatBusinessTradeName, vatRegisteredDate, tinNumber, vatTaxRate, msmeType, msmeRegistrationNumber } = req.body;

    // Validate the taxType
    if (taxType !== 'GST' && taxType !== 'VAT') {
      return res.status(400).json({ message: "Invalid tax type. Must be 'GST' or 'VAT'." });
    }

    // Find the tax record by organizationId and taxType
    let taxRecord = await Tax.findOne({ organizationId });

    if (!taxRecord) {
      return res.status(404).json({ message: "Tax record not found for the given organization and tax type." });
    }

    // Update the relevant fields based on the taxType
    if (taxType === 'GST') {
      if (taxType) taxRecord.taxType = taxType;
      if (gstIn) taxRecord.gstIn = gstIn;
      if (gstBusinesLegalName) taxRecord.gstBusinesLegalName = gstBusinesLegalName;
      if (gstBusinessTradeName) taxRecord.gstBusinessTradeName = gstBusinessTradeName;
      if (gstRegisteredDate) taxRecord.gstRegisteredDate = gstRegisteredDate;
      if (compositionSchema) taxRecord.compositionSchema = compositionSchema;
      if (compositionPercentage) taxRecord.compositionPercentage = compositionPercentage;
      if (gstTaxRate) taxRecord.gstTaxRate.push(gstTaxRate);

    } else if (taxType === 'VAT') {
      if (taxType) taxRecord.taxType = taxType;
      if (vatNumber) taxRecord.vatNumber = vatNumber;
      if (vatBusinesLegalName) taxRecord.vatBusinesLegalName = vatBusinesLegalName;
      if (vatBusinessTradeName) taxRecord.vatBusinessTradeName = vatBusinessTradeName;
      if (vatRegisteredDate) taxRecord.vatRegisteredDate = vatRegisteredDate;
      if (tinNumber) taxRecord.tinNumber = tinNumber;
      if (vatTaxRate) taxRecord.vatTaxRate.push(vatTaxRate); 
      
    }    

    // Update MSME fields
    if (msmeType) taxRecord.msmeType = msmeType;
    if (msmeRegistrationNumber) taxRecord.msmeRegistrationNumber = msmeRegistrationNumber;

    // Save the updated tax record
    const updatedTaxRecord = await taxRecord.save();

    res.status(200).json({ message: "Tax record updated successfully", updatedTaxRecord });
  } catch (error) {
    console.error("Error updating tax record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Edit Tax
exports.editTaxRate = async (req, res) => {
  try {
    const { organizationId, taxType, taxRateId, updatedRate } = req.body;

    // Validate the taxType
    if (taxType !== 'GST' && taxType !== 'VAT') {
      return res.status(400).json({ message: "Invalid tax type. Must be 'GST' or 'VAT'." });
    }

    // Find the tax record by organizationId and taxType
    let taxRecord = await Tax.findOne({ organizationId });

    if (!taxRecord) {
      return res.status(404).json({ message: "Tax record not found for the given organization." });
    }

    let rateIndex;

    // Update the relevant tax rate within the GST or VAT array
    if (taxType === 'GST') {
      rateIndex = taxRecord.gstTaxRate.findIndex(rate => rate._id.toString() === taxRateId);

      if (rateIndex === -1) {
        return res.status(404).json({ message: "GST tax rate not found." });
      }

      // Update the GST tax rate with the provided details
      taxRecord.gstTaxRate[rateIndex] = { ...taxRecord.gstTaxRate[rateIndex], ...updatedRate };

    } else if (taxType === 'VAT') {
      rateIndex = taxRecord.vatTaxRate.findIndex(rate => rate._id.toString() === taxRateId);

      if (rateIndex === -1) {
        return res.status(404).json({ message: "VAT tax rate not found." });
      }

      // Update the VAT tax rate with the provided details
      taxRecord.vatTaxRate[rateIndex] = { ...taxRecord.vatTaxRate[rateIndex], ...updatedRate };
    }

    // Save the updated tax record
    const updatedTaxRecord = await taxRecord.save();

    res.status(200).json({ message: "Tax rate updated successfully", updatedTaxRecord });
  } catch (error) {
    console.error("Error updating tax rate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Tax 
exports.getTax = async (req, res) => {
  try {
    const { organizationId, } = req.body;

    const tax = await Tax.findOne({organizationId:organizationId});

    if (tax) {
      res.status(200).json(tax);
    } else {
      res.status(404).json({ message: "Tax not found" });
    }
  } catch (error) {
    console.error("Error fetching Tax:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




//Prefix

//Add Prefix 
exports.addPrefix = async (req, res) => {
  try {
    const { organizationId, seriesName, journal, journalNum, creditNote, creditNoteNum, customerPayment, customerPaymentNum, purchaseOrder, purchaseOrderNum, salesOrder, salesOrderNum, vendorPayment, vendorPaymentNum, retainerInvoice, retainerInvoiceNum, vendorCredits, vendorCreditsNum, billOfSupply, billOfSupplyNum, debitNote, debitNoteNum, invoice, invoiceNum, quote, quoteNum, deliveryChallan, deliveryChallanNum } = req.body;

    const newSeries = {
      seriesName,
      status: false, // Set status to false
      journal,      journalNum,
      creditNote,      creditNoteNum,
      customerPayment,      customerPaymentNum,
      purchaseOrder,      purchaseOrderNum,
      salesOrder,      salesOrderNum,
      vendorPayment,      vendorPaymentNum,
      retainerInvoice,      retainerInvoiceNum,
      vendorCredits,      vendorCreditsNum,
      billOfSupply,      billOfSupplyNum,
      debitNote,      debitNoteNum,
      invoice,      invoiceNum,
      quote,      quoteNum,
      deliveryChallan,      deliveryChallanNum,
    };

    // Find the existing prefix collection by organizationId
    const prefix = await Prefix.findOne({ organizationId });

    if (!prefix) {
      return res.status(404).json({ message: "Prefix collection not found for the given organization." });
    }

    // Add the new series to the series array
    prefix.series.push(newSeries);

    // Save the updated prefix collection
    const updatedPrefix = await prefix.save();

    res.status(201).json({ message: "Prefix added successfully", updatedPrefix });
  } catch (error) {
    console.error("Error adding prefix to existing collection:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
    
//Get Prefix 
exports.getPrefix = async (req, res) => {
  try {
    const { organizationId } = req.body;

    const prefix = await Prefix.findOne({ organizationId });

    if (!prefix) {
      return res.status(404).json({ message: "Prefix collection not found" });
    }

    res.status(200).json({ prefix });
  } catch (error) {
    console.error("Error fetching prefix:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Edit Prefix
exports.updatePrefix = async (req, res) => {
  try {
    const { organizationId, seriesId } = req.body;
    const { seriesName, journal, journalNum, creditNote, creditNoteNum, customerPayment, customerPaymentNum, purchaseOrder, purchaseOrderNum, salesOrder, salesOrderNum, vendorPayment, vendorPaymentNum, retainerInvoice, retainerInvoiceNum, vendorCredits, vendorCreditsNum, billOfSupply, billOfSupplyNum, debitNote, debitNoteNum, invoice, invoiceNum, quote, quoteNum, deliveryChallan, deliveryChallanNum, status } = req.body;

    // Find the prefix collection by organizationId and the series by seriesId
    const prefix = await Prefix.findOne({ organizationId, "series._id": seriesId });

    if (!prefix) {
      return res.status(404).json({ message: "Prefix or series not found" });
    }

    // Update the series details
    const series = prefix.series.id(seriesId);
    if (series) {
      series.seriesName = seriesName || series.seriesName;
      series.journal = journal || series.journal;
      series.journalNum = journalNum || series.journalNum;
      series.creditNote = creditNote || series.creditNote;
      series.creditNoteNum = creditNoteNum || series.creditNoteNum;
      series.customerPayment = customerPayment || series.customerPayment;
      series.customerPaymentNum = customerPaymentNum || series.customerPaymentNum;
      series.purchaseOrder = purchaseOrder || series.purchaseOrder;
      series.purchaseOrderNum = purchaseOrderNum || series.purchaseOrderNum;
      series.salesOrder = salesOrder || series.salesOrder;
      series.salesOrderNum = salesOrderNum || series.salesOrderNum;
      series.vendorPayment = vendorPayment || series.vendorPayment;
      series.vendorPaymentNum = vendorPaymentNum || series.vendorPaymentNum;
      series.retainerInvoice = retainerInvoice || series.retainerInvoice;
      series.retainerInvoiceNum = retainerInvoiceNum || series.retainerInvoiceNum;
      series.vendorCredits = vendorCredits || series.vendorCredits;
      series.vendorCreditsNum = vendorCreditsNum || series.vendorCreditsNum;
      series.billOfSupply = billOfSupply || series.billOfSupply;
      series.billOfSupplyNum = billOfSupplyNum || series.billOfSupplyNum;
      series.debitNote = debitNote || series.debitNote;
      series.debitNoteNum = debitNoteNum || series.debitNoteNum;
      series.invoice = invoice || series.invoice;
      series.invoiceNum = invoiceNum || series.invoiceNum;
      series.quote = quote || series.quote;
      series.quoteNum = quoteNum || series.quoteNum;
      series.deliveryChallan = deliveryChallan || series.deliveryChallan;
      series.deliveryChallanNum = deliveryChallanNum || series.deliveryChallanNum;
      series.status = status !== undefined ? status : series.status;
    }

    // Save the updated prefix collection
    const updatedPrefix = await prefix.save();

    res.status(200).json({ message: "Series updated successfully", updatedPrefix });
  } catch (error) {
    console.error("Error updating series by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete One prefix
exports.deletePrefix = async (req, res) => {
  try {
    const { organizationId, seriesId } = req.body;

    // Find the prefix collection by organizationId
    const prefix = await Prefix.findOne({ organizationId: organizationId });

    if (!prefix) {
      return res.status(404).json({ message: "Prefix collection not found" });
    }

    
    // Remove the series by its ID
    prefix.series = prefix.series.filter(series => series._id.toString() !== seriesId);

    // Save the updated prefix collection
    const updatedPrefix = await prefix.save();

    res.status(200).json({ message: "Series deleted successfully", updatedPrefix });
  } catch (error) {
    console.error("Error deleting series by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//Status True 
exports.setPrfixSeriesStatusTrue = async (req, res) => {
  try {
    const { organizationId, seriesId } = req.body;

    // Find the prefix collection by organizationId
    const prefix = await Prefix.findOne({ organizationId });

    if (!prefix) {
      return res.status(404).json({ message: "Prefix collection not found for the given organization." });
    }

    // Update all series to have status false
    prefix.series.forEach(series => {
      series.status = false;
    });

    // Find the specific series by seriesId and set its status to true
    const series = prefix.series.id(seriesId);
    if (series) {
      series.status = true;
    } else {
      return res.status(404).json({ message: "Series not found" });
    }

    // Save the updated prefix collection
    const updatedPrefix = await prefix.save();

    res.status(200).json({ message: "Series status updated successfully", updatedPrefix });
  } catch (error) {
    console.error("Error updating series status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
