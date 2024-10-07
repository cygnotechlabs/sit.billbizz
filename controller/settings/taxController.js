
const Organization = require("../../database/model/organization")
const Tax = require('../../database/model/tax')
const Account = require("../../database/model/account")
const TrialBalance = require("../../database/model/trialBalance")
const moment = require("moment-timezone");


// Add Tax
exports.addTax = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const { taxType, gstIn, gstBusinesLegalName, gstBusinessTradeName, gstRegisteredDate, gstTaxRate, compositionSchema, reverseCharge, importExport, digitalServices, compositionPercentage, vatNumber, vatBusinesLegalName, vatBusinessTradeName, vatRegisteredDate, tinNumber, vatTaxRate, msmeType, msmeRegistrationNumber } = req.body;
    console.log("Add Tax :",req.body);

    const existingOrganization = await Organization.findOne({ organizationId });

    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }
    
    // Find the tax record by organizationId and taxType
    let taxRecord = await Tax.findOne({ organizationId });
    const acctype = taxRecord.taxType;

    if (!taxRecord) {
      return res.status(404).json({ message: "Tax record not found for the given organization and tax type." });
    }

    const generatedDateTime = generateTimeAndDateForDB(
      existingOrganization.timeZoneExp,
      existingOrganization.dateFormatExp,
      existingOrganization.dateSplit
    );

    const createdDateAndTime = generatedDateTime.dateTime;

    // Update the relevant fields based on the taxType
    if (taxType === 'GST') {
      if (taxType) taxRecord.taxType = taxType;
      if (gstIn) taxRecord.gstIn = gstIn;
      if (gstBusinesLegalName) taxRecord.gstBusinesLegalName = gstBusinesLegalName;
      if (gstBusinessTradeName) taxRecord.gstBusinessTradeName = gstBusinessTradeName;
      if (gstRegisteredDate) taxRecord.gstRegisteredDate = gstRegisteredDate;
      if (compositionSchema) taxRecord.compositionSchema = compositionSchema;
      if (reverseCharge) taxRecord.reverseCharge = reverseCharge;
      if (importExport) taxRecord.importExport = importExport;
      if (digitalServices) taxRecord.digitalServices = digitalServices;
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

    if (acctype === '') {
      if (taxType === 'GST') {
        insertAccounts(gstAccounts, organizationId, createdDateAndTime);
      }else if (taxType === 'VAT') {
        insertAccounts(vatAccounts, organizationId, createdDateAndTime);
      }
      
    }


    res.status(200).json({ message: "Tax record updated successfully", updatedTaxRecord });
  } catch (error) {
    console.error("Error updating tax record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//Edit Tax
exports.editTaxRate = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const { taxType, taxRateId, updatedRate } = req.body;

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
    const organizationId = req.user.organizationId;

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













const gstAccounts = [
  {
    accountName: "Input SGST",
    accountSubhead: "Current Asset",
    accountHead: "Asset",
    accountGroup: "Asset",
    accountCode: "TX-01",
    description: "Input SGST",
  },
  {
    accountName: "Input CGST",
    accountSubhead: "Current Asset",
    accountHead: "Asset",
    accountGroup: "Asset",
    accountCode: "TX-02",
    description: "Input CGST",
  },
  {
    accountName: "Input IGST",
    accountSubhead: "Current Asset",
    accountHead: "Asset",
    accountGroup: "Asset",
    accountCode: "TX-03",
    description: "Input IGST",
  },{
    accountName: "Output SGST",
    accountSubhead: "Current Liability",
    accountHead: "Liabilities",
    accountGroup: "Liability",
    accountCode: "TX-04",
    description: "Output SGST",
  },
  {
    accountName: "Output CGST",
    accountSubhead: "Current Liability",
    accountHead: "Liabilities",
    accountGroup: "Liability",
    accountCode: "TX-05",
    description: "Output CGST",
  },
  {
    accountName: "Output IGST",
    accountSubhead: "Current Liability",
    accountHead: "Liabilities",
    accountGroup: "Liability",
    accountCode: "TX-06",
    description: "Output IGST",
  },];

const vatAccounts = [
    {
      accountName: "Input VAT",
      accountSubhead: "Current Asset",
      accountHead: "Asset",
      accountGroup: "Asset",
      accountCode: "TX-01",
      description: "Input VAT",
    },    
    {
      accountName: "Output VAT",
      accountSubhead: "Current Liability",
      accountHead: "Liabilities",
      accountGroup: "Liability",
      accountCode: "TX-02",
      description: "Output VAT",
    },];

async function insertAccounts(accounts,organizationId,createdDateAndTime) {

  const accountDocuments = accounts.map(account => {
      return {
          organizationId: organizationId, 
          accountName: account.accountName,
          accountCode: account.accountCode, 

          accountSubhead: account.accountSubhead,
          accountHead: account.accountHead,
          accountGroup: account.accountGroup,

          openingDate: createdDateAndTime, 
          description: account.description
      };});

    try {
        const autoAccountCreation = await Account.insertMany(accountDocuments);
        console.log('Accounts created successfully');

         // Loop through the created accounts and add a trial balance entry for each one
  for (const savedAccount of autoAccountCreation) {
    const debitOpeningBalance = 0;  
    const creditOpeningBalance = 0; 


    const newTrialEntry = new TrialBalance({
        organizationId,
        operationId: savedAccount._id,
        date: savedAccount.openingDate,
        accountId: savedAccount._id,
        accountName: savedAccount.accountName,
        action: "Opening Balance",
        debitAmount: debitOpeningBalance,
        creditAmount: creditOpeningBalance,
        remark: 'Opening Balance'
    });

    await newTrialEntry.save();
}

console.log('Trial balance entries created successfully');
        
        
        
    } catch (error) {
        console.error('Error inserting accounts:', error);
    }
  }











// Function to generate time and date for storing in the database
function generateTimeAndDateForDB(
  timeZone,
  dateFormat,
  dateSplit,
  baseTime = new Date(),
  timeFormat = "HH:mm:ss",
  timeSplit = ":"
) {
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
  const timeZoneName = localDate.format("z"); // Get time zone abbreviation

  // Combine the formatted date and time with the split characters and time zone
  const dateTime = `${formattedDate} ${formattedTime
    .split(":")
    .join(timeSplit)} (${timeZoneName})`;

  return {
    date: formattedDate,
    time: `${formattedTime} (${timeZoneName})`,
    dateTime: dateTime,
  };
}
