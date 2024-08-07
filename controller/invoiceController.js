const Organization = require("../database/model/organization");
const Account = require("../database/model/account")


exports.setupInvoice = async (req, res) => {
    console.log("Setup Organization:", req.body);
    try {
      const {
        organizationId,
        organizationLogo,
        // organizationName,
        organizationCountry,
        organizationIndustry,
        addline1,
        addline2,
        city,
        pincode,
        state,
        organizationPhNum,
        website,
        baseCurrency,
        fiscalYear,
        reportBasis,
        timeZone,
        dateFormat,
        dateSplit,
        accountHolderName,
        bankName,
        accNum,
        ifsc,
      } = req.body;
  
      // Check if an Organization already exists
      const existingOrganization = await Organization.findOne({ organizationId });
  
      if (!existingOrganization) {
        return res.status(404).json({
          message: "No Organization Found.",
        });
      }
      
  
      // Check if an organization with the same organizationName already exists (excluding the current organization)
      // const existingOrganizationName = await Organization.findOne({
      //   organizationName,
      //   _id: { $ne: existingOrganization._id }
      // });
  
      // if (existingOrganizationName) {
      //   return res.status(409).json({
      //     message: "Organization with the provided name already exists.",
      //   });
      // }
  
  
  
      // Update the existing organization's fields
      existingOrganization.organizationLogo = organizationLogo;
      // existingOrganization.organizationName = organizationName;
      existingOrganization.organizationCountry = organizationCountry;
      existingOrganization.organizationIndustry = organizationIndustry;
      existingOrganization.addline1 = addline1;
      existingOrganization.addline2 = addline2;
      existingOrganization.city = city;
      existingOrganization.pincode = pincode;
      existingOrganization.state = state;
      existingOrganization.organizationPhNum = organizationPhNum;
      existingOrganization.website = website;
      existingOrganization.baseCurrency = baseCurrency;
      existingOrganization.fiscalYear = fiscalYear;
      existingOrganization.reportBasis = reportBasis;
      existingOrganization.timeZone = timeZone;
      existingOrganization.dateFormat = dateFormat;
      existingOrganization.dateSplit = dateSplit;
      existingOrganization.accountHolderName = accountHolderName;
      existingOrganization.bankName = bankName;
      existingOrganization.accNum = accNum;
      existingOrganization.ifsc = ifsc;
      // existingOrganization.addfield = Array.isArray(addfield) ? addfield.map((field) => ({
      //   label: field.label,
      //   value: field.value,
      // })) : [];
  
      const savedOrganization = await existingOrganization.save();
  
      if (!savedOrganization) {
        console.error("Organization could not be saved.");
        return res.status(500).json({ message: "Failed to update organization." });
      }
  
      res.status(200).json({
        message: "Organization updated successfully."
      });
      console.log("Organization updated successfully");
  
      
      
      const account = await Account.findOne({ organizationId:organizationId });
      if (!account) {
        insertAccounts(accounts, organizationId);
          };
  
  
    } catch (error) {
      console.error("Error updating Organization:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };