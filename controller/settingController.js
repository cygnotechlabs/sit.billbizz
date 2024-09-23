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
    // console.log("Fetching organization with ID:", organizationId);

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

//get single currency
exports.viewCurrency = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the _id as a route parameter

    // Log the ID being fetched
    console.log("Fetching currency with ID:", id);

    const currency = await Currency.findById(id);

    if (currency) {
      res.status(200).json(currency);
    } else {
      res.status(404).json({ message: "Currency not found" });
    }
  } catch (error) {
    console.error("Error fetching currency:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add currency
exports.addCurrency = async (req, res) => {
  try {
    const { organizationId, currencyCode, currencySymbol, currencyName, decimalPlaces, format  } = req.body;

    const organization = await Organization.findOne({ organizationId });
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const existingCurrency = await Currency.findOne({ organizationId, currencyCode });
    if (existingCurrency) {
      return res.status(400).json({ message: "Currency code already exists for this organization" });
    }

    const newCurrency = new Currency({
      organizationId,
      currencyCode,
      currencySymbol,
      currencyName,
      decimalPlaces,
      format,
      baseCurrency:false
    });

    await newCurrency.save();

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
      { organizationId, currencyCode, currencySymbol, currencyName, decimalPlaces, format},
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
    const { currencyId } = req.params;

    // Fetch the currency by ID and organizationId
    const currency = await Currency.findOne({
      _id: currencyId
    });

    if (!currency) {
      return res.status(404).json({ message: "Currency not found" });
    }

    // Check if the baseCurrency is false
    if (currency.baseCurrency === false) {
      // Delete the currency
      await Currency.findOneAndDelete({
        _id: currencyId
      });

      res.status(200).json({ message: "Currency deleted successfully" });
    } else {
      // Reject the deletion if baseCurrency is true
      res.status(400).json({ message: "Cannot delete a base currency" });
    }
  } catch (error) {
    console.error("Error deleting Currency:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};







// More details
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
      displayAccountHolderName: req.body.displayAccountHolderName,
      bankName: req.body.bankName,
      displayBankName: req.body.displayBankName,
      accNum: req.body.accNum,
      displayAccNum: req.body.displayAccNum,
      ifsc: req.body.ifsc,
      displayIfsc: req.body.displayIfsc,
      defaultTermsAndCondition: req.body.defaultTermsAndCondition
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

    // Find the settings document that matches the organizationId
    const settings = await Settings.findOne({ organizationId });

    // If no settings are found for the provided organizationId
    if (!settings) {
      return res.status(404).json({ message: "No settings found for this organization" });
    }

    // Organize the settings into categories
    const organizedSettings = {
      invoice: {
        organizationAddressFormat: settings.organizationAddressFormat,
        qrLocation: settings.qrLocation,
        displayQrLocation: settings.displayQrLocation,
        qrPayment: settings.qrPayment,
        displayQrPayment: settings.displayQrPayment,
        digitalSignature: settings.digitalSignature,
        displayDigitalSignature: settings.displayDigitalSignature,
        xLink: settings.xLink,
        displayXLink: settings.displayXLink,
        instagramLink: settings.instagramLink,
        displayInstagramLink: settings.displayInstagramLink,
        linkedinLink: settings.linkedinLink,
        displayLinkedinLink: settings.displayLinkedinLink,
        facebookLink: settings.facebookLink,
        displayFacebookLink: settings.displayFacebookLink,
        accountHolderName: settings.accountHolderName,
        displayAccountHolderName: settings.displayAccountHolderName,
        bankName: settings.bankName,
        displayBankName: settings.displayBankName,
        accNum: settings.accNum,
        displayAccNum: settings.displayAccNum,
        ifsc: settings.ifsc,
        displayIfsc: settings.displayIfsc,
        defaultTermsAndCondition: settings.defaultTermsAndCondition
      },
      itemSettings: {
        itemDecimal: settings.itemDecimal,
        itemDimensions: settings.itemDimensions,
        itemWeights: settings.itemWeights,
        barcodeScan: settings.barcodeScan,
        itemDuplicateName: settings.itemDuplicateName,
        hsnSac: settings.hsnSac,
        hsnDigits: settings.hsnDigits,
        priceList: settings.priceList,
        priceListAtLineLevel: settings.priceListAtLineLevel,
        compositeItem: settings.compositeItem,
        stockBelowZero: settings.stockBelowZero,
        outOfStockBelowZero: settings.outOfStockBelowZero,
        notifyReorderPoint: settings.notifyReorderPoint,
        trackCostOnItems: settings.trackCostOnItems
      },
      salesOrderSettings: {
        salesOrderAddress: settings.salesOrderAddress,
        salesOrderCustomerNote: settings.salesOrderCustomerNote,
        salesOrderTermsCondition: settings.salesOrderTermsCondition,
        salesOrderClose: settings.salesOrderClose,
        restrictSalesOrderClose: settings.restrictSalesOrderClose,
        termCondition: settings.termCondition,
        customerNote: settings.customerNote
      },
      shipmentSettings: {
        carrierNotification: settings.carrierNotification,
        manualNotification: settings.manualNotification,
        shippingAddress: settings.shippingAddress
      },
      salesInvoiceSettings: {
        invoiceEdit: settings.invoiceEdit,
        displayExpenseReceipt: settings.displayExpenseReceipt,
        salesOrderNumber: settings.salesOrderNumber,
        paymentReceipt: settings.paymentReceipt,
        invoiceQrCode: settings.invoiceQrCode,
        invoiceQrType: settings.invoiceQrType,
        invoiceQrDescription: settings.invoiceQrDescription,
        zeroValue: settings.zeroValue,
        salesInvoiceTC: settings.salesInvoiceTC,
        salesInvoiceCN: settings.salesInvoiceCN
      },
      deliveryChellans: {
        deliveryChellanTC: settings.deliveryChellanTC,
        deliveryChellanCN: settings.deliveryChellanCN
      },
      creditNoteSettings: {
        overideCostPrice: settings.overideCostPrice,
        creditNoteQr: settings.creditNoteQr,
        creditNoteQrType: settings.creditNoteQrType,
        creditNoteQrDespriction: settings.creditNoteQrDespriction,
        recordLocking: settings.recordLocking,
        creditNoteTC: settings.creditNoteTC,
        creditNoteCN: settings.creditNoteCN
      },
      purchaseOrderSettings: {
        purchaseOrderClose: settings.purchaseOrderClose,
        purchaseTC: settings.purchaseTC,
        purchaseNote: settings.purchaseNote
      }
    };

    // Return the organized settings
    res.status(200).json(organizedSettings);
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

    await newPaymentTerm.save();

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
    console.log("Add Tax :",req.body);
    
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

    const fieldsToCheck = [
      { key: 'seriesName', value: seriesName, message: "Series name already exists in the collection." },
      { key: 'journal', value: journal, message: "Journal Prefix already exists in the collection." },
      { key: 'creditNote', value: creditNote, message: "Credit Note already exists in the collection." },
      { key: 'customerPayment', value: customerPayment, message: "Customer Payment Prefix already exists in the collection." },
      { key: 'purchaseOrder', value: purchaseOrder, message: "Purchase Order Prefix already exists in the collection." },
      { key: 'salesOrder', value: salesOrder, message: "Sales Order Prefix already exists in the collection." },
      { key: 'vendorPayment', value: vendorPayment, message: "Vendor Payment Prefix already exists in the collection." },
      { key: 'retainerInvoice', value: retainerInvoice, message: "Retainer Invoice Prefix already exists in the collection." },
      { key: 'vendorCredits', value: vendorCredits, message: "Vendor Credits Prefix already exists in the collection." },
      { key: 'billOfSupply', value: billOfSupply, message: "Bill Of Supply Prefix already exists in the collection." },
      { key: 'debitNote', value: debitNote, message: "Debit Note Prefix already exists in the collection." },
      { key: 'invoice', value: invoice, message: "Invoice Prefix already exists in the collection." },
      { key: 'quote', value: quote, message: "Quote Prefix already exists in the collection." },
      { key: 'deliveryChallan', value: deliveryChallan, message: "Delivery Challan Prefix already exists in the collection." }
    ];
    
    // Function to check if a value already exists in the series array
    const valueExists = (array, key, value) => array.some(item => item[key] === value);
    
    // Loop through each field and check if it exists
    for (const field of fieldsToCheck) {
      if (valueExists(prefix.series, field.key, field.value)) {
        return res.status(400).json({ message: field.message });
      }
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
    const {
      seriesName, journal, journalNum, creditNote, creditNoteNum,
      customerPayment, customerPaymentNum, purchaseOrder, purchaseOrderNum,
      salesOrder, salesOrderNum, vendorPayment, vendorPaymentNum,
      retainerInvoice, retainerInvoiceNum, vendorCredits, vendorCreditsNum,
      billOfSupply, billOfSupplyNum, debitNote, debitNoteNum,
      invoice, invoiceNum, quote, quoteNum,
      deliveryChallan, deliveryChallanNum, status
    } = req.body;

    // Find the prefix collection by organizationId and the series by seriesId
    const prefix = await Prefix.findOne({ organizationId });

    if (!prefix) {
      return res.status(404).json({ message: "Prefix not found" });
    }

    // Find the series being edited
    const series = prefix.series.id(seriesId);

    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }

    // Remove the series being edited from the collection and store the rest in a variable
    const otherSeries = prefix.series.filter(ser => ser._id.toString() !== seriesId);

    // List of fields to check for conflicts
    const fieldsToCheck = [
      { key: 'seriesName', value: seriesName, message: "Series name already exists in another series." },
      { key: 'journal', value: journal, message: "Journal Prefix already exists in another series." },
      { key: 'creditNote', value: creditNote, message: "Credit Note Prefix already exists in another series." },
      { key: 'customerPayment', value: customerPayment, message: "Customer Payment Prefix already exists in another series." },
      { key: 'purchaseOrder', value: purchaseOrder, message: "Purchase Order Prefix already exists in another series." },
      { key: 'salesOrder', value: salesOrder, message: "Sales Order Prefix already exists in another series." },
      { key: 'vendorPayment', value: vendorPayment, message: "Vendor Payment Prefix already exists in another series." },
      { key: 'retainerInvoice', value: retainerInvoice, message: "Retainer Invoice Prefix already exists in another series." },
      { key: 'vendorCredits', value: vendorCredits, message: "Vendor Credits Prefix already exists in another series." },
      { key: 'billOfSupply', value: billOfSupply, message: "Bill Of Supply Prefix already exists in another series." },
      { key: 'debitNote', value: debitNote, message: "Debit Note Prefix already exists in another series." },
      { key: 'invoice', value: invoice, message: "Invoice Prefix already exists in another series." },
      { key: 'quote', value: quote, message: "Quote Prefix already exists in another series." },
      { key: 'deliveryChallan', value: deliveryChallan, message: "Delivery Challan Prefix already exists in another series." }
    ];

    // Function to check if a value exists in other series
    const valueExists = (array, key, value) => array.some(item => item[key] === value);

    // Check for conflicts across all relevant fields
    for (const field of fieldsToCheck) {
      if (field.value && valueExists(otherSeries, field.key, field.value)) {
        return res.status(400).json({ message: field.message });
      }
    }

    // Update the series details
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
exports.setPrefixSeriesStatusTrue = async (req, res) => {
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
