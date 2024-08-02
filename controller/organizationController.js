const Organization = require("../database/model/organization");
const Account = require("../database/model/account")
const mongoose = require('mongoose');


const accounts = [
  { accountName: "Advance Tax", accountSubhead: "Current Asset", accountHead: "Asset", accountGroup: "Asset",accountCode:"AC-01",description: "Advance Tax" },
  { accountName: "Employee Advance", accountSubhead: "Current Asset", accountHead: "Asset", accountGroup: "Asset",accountCode:"AC-02",description: "Employee Advance" },
  { accountName: "Prepaid Expense", accountSubhead: "Current Asset", accountHead: "Asset", accountGroup: "Asset",accountCode:"AC-03",description: "Prepaid Expense" },
  { accountName: "TDS Receivable", accountSubhead: "Current Asset", accountHead: "Asset", accountGroup: "Asset",accountCode:"AC-04" ,description: "TDS Receivable"},
  { accountName: "Petty Cash", accountSubhead: "Cash", accountHead: "Asset", accountGroup: "Asset",accountCode:"AC-05",description: "Petty Cash" },
  { accountName: "Undeposited Funds", accountSubhead: "Cash", accountHead: "Asset", accountGroup: "Asset",accountCode:"AC-06" ,description: "Undeposited Funds"},
  { accountName: "Furniture and Equipment", accountSubhead: "Fixed Asset", accountHead: "Asset", accountGroup: "Asset",accountCode:"AC-07",description: "Furniture and Equipment" },
  
  
  { accountName: "Capital Stock", accountSubhead: "Equity", accountHead: "Equity", accountGroup: "Asset",accountCode:"AC-08" ,description: "Capital Stock"},
  { accountName: "Distribution", accountSubhead: "Equity", accountHead: "Equity", accountGroup: "Asset",accountCode:"AC-09",description: "Distribution" },
  { accountName: "Dividends Paid", accountSubhead: "Equity", accountHead: "Equity", accountGroup: "Asset",accountCode:"AC-10",description: "Dividends Paid" },
  { accountName: "Drawings", accountSubhead: "Equity", accountHead: "Equity", accountGroup: "Asset",accountCode:"AC-11",description: "Drawings" },
  { accountName: "Investments", accountSubhead: "Equity", accountHead: "Equity", accountGroup: "Asset",accountCode:"AC-12" ,description: "Investments"},
  { accountName: "Opening Balance Offset", accountSubhead: "Equity", accountHead: "Equity", accountGroup: "Asset",accountCode:"AC-13",description: "Opening Balance Offset" },
  { accountName: "Owner's Equity", accountSubhead: "Equity", accountHead: "Equity", accountGroup: "Asset",accountCode:"AC-14",description: "Owner's Equity" },

  { accountName: "General Income", accountSubhead: "Income", accountHead: "Income", accountGroup: "Asset",accountCode:"AC-15",description: "General Income" },
  { accountName: "Interest Income", accountSubhead: "Income", accountHead: "Income", accountGroup: "Asset",accountCode:"AC-16",description: "Interest Income" },
  { accountName: "Sales", accountSubhead: "Income", accountHead: "Income", accountGroup: "Asset",accountCode:"AC-17",description: "Sales"},
  
  
  { accountName: "Employee Reimbursements", accountSubhead: "Current Liability", accountHead: "Liabilities", accountGroup: "Liability",accountCode:"AC-18",description: "Employee Reimbursements" },
  { accountName: "TDS Payable", accountSubhead: "Current Liability", accountHead: "Liabilities", accountGroup: "Liability",accountCode:"AC-19",description: "TDS Payable" },
  { accountName: "Construction Loan", accountSubhead: "Long Term Liability", accountHead: "Liabilities", accountGroup: "Liability",accountCode:"AC-20",description: "Construction Loan" },
  { accountName: "Mortgages", accountSubhead: "Long Term Liability", accountHead: "Liabilities", accountGroup: "Liability",accountCode:"AC-21" ,description: "Mortgages"},
  
  { accountName: "Advertising and Marketing", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-22",description: "Advertising and Marketing" },
  { accountName: "Automobile Expense", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-23" ,description: "Automobile Expense"},
  { accountName: "Consultant Expense", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-24" ,description: "Consultant Expense"},
  { accountName: "Contract Assets", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-25" ,description: "Contract Assets"},
  { accountName: "Credit Card Charges", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-26" ,description: "Credit Card Charges"},
  { accountName: "Depreciation and Amortisation", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-27",description: "Depreciation and Amortisation" },
  { accountName: "Depreciation Expense", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-28",description: "Depreciation Expense" },
  { accountName: "IT and Internet Expense", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-29",description: "IT and Internet Expense" },
  { accountName: "Janitorial Expense", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-30" ,description: "Janitorial Expense"},
  { accountName: "Lodging", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-31" ,description: "Lodging"},
  { accountName: "Meals and Entertainment", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-32",description: "Meals and Entertainment" },
  { accountName: "Merchandise", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-33" ,description: "Merchandise"},
  { accountName: "Office Supplies", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-34",description: "Office Supplies" },
  { accountName: "Postage", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability" ,accountCode:"AC-35",description: "Postage"},
  { accountName: "Printing and Stationary", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-36",description: "Printing and Stationary" },
  { accountName: "Raw Material and Consumables", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-37" ,description: "Raw Material and Consumables"},
  { accountName: "Rent Expense", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-38",description: "Rent Expense" },
  { accountName: "Repairs and Maintenance", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-39",description: "Repairs and Maintenance" },
  { accountName: "Telephone Expense", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-40",description: "Telephone Expense" },
  { accountName: "Transportation Expense", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-41" ,description: "Transportation Expense"},
  { accountName: "Travel Expense", accountSubhead: "Expense", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-42",description: "Travel Expense" },
  
  { accountName: "Cost of Goods Sold", accountSubhead: "Cost of Goods Sold", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-43" ,description: "Cost of Goods Sold"},
  { accountName: "Job Costing", accountSubhead: "Cost of Goods Sold", accountHead: "Expenses", accountGroup: "Liability" ,accountCode:"AC-44",description: "Job Costing"},
  { accountName: "Labor", accountSubhead: "Cost of Goods Sold", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-45",description: "Labor" },
  { accountName: "Materials", accountSubhead: "Cost of Goods Sold", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-46",description: "Materials" },
  { accountName: "Subcontractor", accountSubhead: "Cost of Goods Sold", accountHead: "Expenses", accountGroup: "Liability",accountCode:"AC-47",description: "Subcontractor" }
];

async function insertAccounts(accounts,organizationId) {

const accountDocuments = accounts.map(account => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return {
        organizationId: organizationId, 
        accountName: account.accountName,
        accountCode: account.accountCode, 

        accountSubhead: account.accountSubhead,
        accountHead: account.accountHead,
        accountGroup: account.accountGroup,

        balance: 0, 
        openingDate: formattedDate, 
        description: account.description
    };});

  try {
      await Account.insertMany(accountDocuments);
      console.log('Accounts created successfully');
  } catch (error) {
      console.error('Error inserting accounts:', error);
  }
}


// Get all organizations - Internal
exports.getAllOrganization = async (req, res) => {
  try {
    const allOrganizations = await Organization.find();

    if (allOrganizations.length > 0) {
      res.status(200).json(allOrganizations);
    } else {
      res.status(404).json("No organizations found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};



// get One organization
exports.getOneOrganization = async (req, res) => {
  try {
    const { organizationId } = req.body;

    // Log the ID being fetched
    console.log("Fetching organization with ID:", organizationId);

    const organization = await Organization.findOne({organizationId});

    if (organization) {
      res.status(200).json(organization);
    } else {
      res.status(404).json({ message: "Organization not found" });
    }
  } catch (error) {
    console.error("Error fetching organization:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Edit organizations
exports.updateOrganization = async (req, res) => {
  console.log("Received request to update organization:", req.body);  
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
      
      // Log the ID being updated
      console.log("Updating organization with ID:", organizationId);

      const updatedOrganization = await Organization.findByIdAndUpdate(
          organizationId,
          {
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
              ifsc
          },
          { new: true, runValidators: true }
      );

      if (!updatedOrganization) {
          console.log("Organization not found with ID:", _id);
          return res.status(404).json({ message: "Organization not found" });
      }

      res.status(200).json({ message: "Organization updated successfully" });
      console.log("Organization updated successfully:", updatedOrganization);
  } catch (error) {
      console.error("Error updating organization:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};




// Delete Organization
exports.deleteOrganization = async (req, res) => {
    try {
      const { organizationId } = req.body;
  
      // Check if the organization exists
      const organization = await Organization.findOne({organizationId});
  
      if (!organization) {
        return res.status(404).json({
          message: "Organization not found.",
        });
      }
  
      // Delete the organization
      await Organization.findByIdAndDelete({organizationId});
  
      res.status(200).json({
        message: "Organization deleted successfully.",
      });
      console.log("Organization deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting Organization:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };




// Additional data
exports.getAdditionalData = (req, res) => {
  try {
    const additionalData = [
      {
        industry: [
          "Agency or sales house",
          "Agriculture",
          "Art & Design",
          "Automotive",
          "Construction",
          "Consulting",
          "Consumer Packaged Goods",
          "Education",
          "Engineering",
          "Entertainment",
          "Financial Services",
          "Food Services (Restaurants/Fast Food)",
          "Gaming",
          "Government",
          "Health Care",
          "Interior Design",
          "Internal",
          "Legal",
          "Manufacturing",
          "Marketing",
          "Mining and Logistics",
          "Non-Profit",
          "Publishing and Web Media",
          "Real Estate",
          'Retail (E-Commerce and Offline)',
          "Services",
          "Technology",
          "Telecommunications",
          "Travel/Hospitality",
          "Web Designing",
          "Web Development",
          "Writers"
          ],
        financialYear: [
          "January - December",
          "February - January ",
          "March - February ",
          "April - March" ,
          "May - April ",
          "June - May ",
          "July - June ",
          "August - July ",
          "September - August ",
          "October - September ",
          "November -October ",
          "December - November "
        ],
        dateFormat: {
          "short": [
            "mm/dd/yy (08/19/24)",
            "dd/mm/yy (19/08/24)",
            "yy/mm/dd (24/08/19)"
          ],
          "medium": [
            "mm/dd/yyyy (08/19/2024)",
            "dd/mm/yyyy (19/08/2024)",
            "yyyy/mm/dd (24/08/19)"
          ],
          "long": [
            "dd/mmm/yyyy (19 June 2024)",
            "mmm/dd/yyyy (June 19 2024)",
            "yyyy/mmm/dd (2024 June 19)"
          ]
        },
        dateSplit: ["-", "/", "."],
      }
    ];

    if (additionalData.length > 0) {
      res.status(200).json(additionalData);
    } else {
      res.status(404).json("No Additional Data found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};





// Setup organization
exports.setupOrganization = async (req, res) => {
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
