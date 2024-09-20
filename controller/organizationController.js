const Organization = require("../database/model/organization");
const Account = require("../database/model/account")
const Currency = require("../database/model/currency")
const TrialBalance = require("../database/model/trialBalance")
const moment = require('moment-timezone');


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
          const debitOpeningBalance = 400;  
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
    // const organization = req.user.organizationId;

    // Log the ID being fetched
    // console.log("Fetching organization with ID:", organizationId);

    const organization = await Organization.findOne({organizationId});

    if (organization) {
      // Remove sensitive data
      // organization.organizationId = undefined;
      res.status(200).json(organization);
    } else {
      res.status(404).json({ message: "Organization not found" });
    }
  } catch (error) {
    console.error("Error fetching organization:", error);
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
        "dateFormats": {
                  "short": [
                    { "format": "mm/dd/yy", "example": "08/19/24", "dateFormat": "MM/DD/YY" },
                    { "format": "dd/mm/yy", "example": "19/08/24", "dateFormat": "DD/MM/YY" },
                    { "format": "yy/mm/dd", "example": "24/08/19", "dateFormat": "YY/MM/DD" }
                  ],
                  "medium": [
                    { "format": "mm/dd/yyyy", "example": "08/19/2024", "dateFormat": "MM/DD/YYYY" },
                    { "format": "dd/mm/yyyy", "example": "19/08/2024", "dateFormat": "DD/MM/YYYY" },
                    { "format": "yyyy/mm/dd", "example": "2024/08/19", "dateFormat": "YYYY/MM/DD" }
                  ],
                  "long": [
                    { "format": "dd/mmm/yyyy", "example": "19 December 2024", "dateFormat": "DD/MMMM/YYYY" },
                    { "format": "mmm/dd/yyyy", "example": "December 19 2024", "dateFormat": "MMMM/DD/YYYY" },
                    { "format": "yyyy/mmm/dd", "example": "2024 December 19", "dateFormat": "YYYY/MMMM/DD" }
                  ]
                },
        dateSplit: ["-", "/", "."],
        "timezones": [
              // { "zone": "GMT-12:00", "description": "Baker Island (no permanent population)", "timeZone": "Etc/GMT+12" },
              // { "zone": "GMT-11:00", "description": "Niue, Samoa", "timeZone": "Pacific/Pago_Pago" },
              // { "zone": "GMT-10:00", "description": "Hawaii-Aleutian Standard Time (Hawaii)", "timeZone": "Pacific/Honolulu" },
              // { "zone": "GMT-09:30", "description": "Marquesas Islands (French Polynesia)", "timeZone": "Pacific/Marquesas" },
              // { "zone": "GMT-09:00", "description": "Alaska Time (Alaska)", "timeZone": "America/Anchorage" },
              // { "zone": "GMT-08:00", "description": "Pacific Time (Los Angeles, Vancouver)", "timeZone": "America/Los_Angeles" },
              // { "zone": "GMT-07:00", "description": "Mountain Time (Denver, Calgary)", "timeZone": "America/Denver" },
              // { "zone": "GMT-06:00", "description": "Central Time (Chicago, Mexico City)", "timeZone": "America/Chicago" },
              // { "zone": "GMT-05:00", "description": "Eastern Time (New York, Toronto)", "timeZone": "America/New_York" },
              // { "zone": "GMT-04:00", "description": "Atlantic Time (Halifax, Caracas)", "timeZone": "America/Halifax" },
              // { "zone": "GMT-03:30", "description": "Newfoundland Time (Newfoundland)", "timeZone": "America/St_Johns" },
              // { "zone": "GMT-03:00", "description": "Argentina Time, Brasília Time", "timeZone": "America/Argentina/Buenos_Aires" },
              // { "zone": "GMT-02:00", "description": "South Georgia and the South Sandwich Islands", "timeZone": "Atlantic/South_Georgia" },
              // { "zone": "GMT-01:00", "description": "Azores, Cape Verde", "timeZone": "Atlantic/Azores" },
              // { "zone": "GMT+00:00", "description": "Greenwich Mean Time (GMT), Western European Time (WET)", "timeZone": "Etc/GMT" },
              // { "zone": "GMT+01:00", "description": "Central European Time (CET), West Africa Time (WAT)", "timeZone": "Europe/Paris" },
              { "zone": "GMT+02:00", "description": "Eastern European Time (EET), Central Africa Time (CAT)", "timeZone": "Europe/Kiev" },
              { "zone": "GMT+03:00", "description": "Arabia Standard Time (AST)", "timeZone": "Europe/Moscow" },
              { "zone": "GMT+03:30", "description": "Iran Standard Time (IRST)", "timeZone": "Asia/Tehran" },
              { "zone": "GMT+04:00", "description": "Gulf Standard Time (GST), Azerbaijan Time (AZT)", "timeZone": "Asia/Dubai" },
              // { "zone": "GMT+04:30", "description": "Afghanistan Time (AFT)", "timeZone": "Asia/Kabul" },
              // { "zone": "GMT+05:00", "description": "Pakistan Standard Time (PKT), Yekaterinburg Time (YEKT)", "timeZone": "Asia/Karachi" },
              { "zone": "GMT+05:30", "description": "Indian Standard Time (IST), Sri Lanka Time (SLT)", "timeZone": "Asia/Kolkata" },
              // { "zone": "GMT+06:00", "description": "Bangladesh Standard Time (BST), Novosibirsk Time (NOVT)", "timeZone": "Asia/Dhaka" },
              // { "zone": "GMT+06:30", "description": "Cocos Islands Time (CCT)", "timeZone": "Indian/Cocos" },
              // { "zone": "GMT+07:00", "description": "Indochina Time (ICT), Krasnoyarsk Time (KRAT)", "timeZone": "Asia/Bangkok" },
              // { "zone": "GMT+08:00", "description": "China Standard Time (CST), Singapore Time (SGT)", "timeZone": "Asia/Shanghai" },
              // { "zone": "GMT+08:45", "description": "Australian Central Western Standard Time (ACWST)", "timeZone": "Australia/Eucla" },
              // { "zone": "GMT+09:00", "description": "Japan Standard Time (JST), Korea Standard Time (KST)", "timeZone": "Asia/Tokyo" },
              // { "zone": "GMT+09:30", "description": "Australian Central Standard Time (ACST)", "timeZone": "Australia/Darwin" },
              // { "zone": "GMT+10:00", "description": "Australian Eastern Standard Time (AEST), Papua New Guinea Time (PGT)", "timeZone": "Australia/Sydney" },
              // { "zone": "GMT+10:30", "description": "Lord Howe Island Time (LHST)", "timeZone": "Australia/Lord_Howe" },
              // { "zone": "GMT+11:00", "description": "Solomon Islands Time (SBT), Vanuatu Time (VUT)", "timeZone": "Pacific/Guadalcanal" },
              // { "zone": "GMT+12:00", "description": "Fiji Time (FJT), New Zealand Standard Time (NZST)", "timeZone": "Pacific/Auckland" }
                      ]   
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



// Countries data
exports.getCountriesData = (req, res) => {
  try {
    const countriesData = [
      {
        countries: [
          // {
          //   name: "United States",
          //   states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
          //   phoneNumberCode: "+1",
          //   taxType:"GST"
          // },
          // {
          //   name: "Canada",
          //   states: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"],
          //   phoneNumberCode: "+1"
          // },
          {
            name: "India",
            states: ["Andaman and Nicobar Island", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
            phoneNumberCode: "+91",
            taxType:"GST"
          },
          {
            name: "Saudi Arabia",
            states: ["Asir","Al Bahah", "Al Jawf", "Al Madinah", "Al-Qassim", "Eastern Province", "Hail", "Jazan", "Makkah","Medina", "Najran", "Northern Borders", "Riyadh", "Tabuk"],
            phoneNumberCode: "+966",
            taxType:"VAT"
          },
          {
            name: "United Arab Emirates",
            states: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al-Quwain", "Fujairah", "Ras Al Khaimah"],
            phoneNumberCode: "+971",
            taxType:"VAT"
          },
        ]
      }
    ];
    if (countriesData.length > 0) {
      res.status(200).json(countriesData);
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
      organizationId, organizationLogo, organizationCountry, organizationIndustry, addline1, addline2, city, pincode, state, phoneNumberCode, organizationPhNum, 
      website, 
      baseCurrency, fiscalYear,
      timeZone, timeZoneExp, dateFormat, dateFormatExp, dateSplit, 
    } = req.body;

    // Check if an Organization already exists
    const existingOrganization = await Organization.findOne({ organizationId });

    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }

    const generatedDateTime = generateTimeAndDateForDB(timeZoneExp, dateFormatExp, dateSplit);

          console.log('Generated Date:', generatedDateTime.date);
          console.log('Generated Time:', generatedDateTime.time);
          console.log('Generated Combined DateTime:', generatedDateTime.dateTime);

    const createdDateAndTime = generatedDateTime.dateTime;
    
    // Update the existing organization's fields
    existingOrganization.organizationLogo = organizationLogo;
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
    existingOrganization.timeZone = timeZone;
    existingOrganization.timeZoneExp = timeZoneExp;    
    existingOrganization.dateFormat = dateFormat;
    existingOrganization.dateFormatExp = dateFormatExp;    
    existingOrganization.dateSplit = dateSplit; 
    existingOrganization.phoneNumberCode=phoneNumberCode;
    existingOrganization.createdDateAndTime=createdDateAndTime;
    
    const savedOrganization = await existingOrganization.save();

    if (!savedOrganization) {
      console.error("Organization could not be saved.");
      return res.status(500).json({ message: "Failed to update organization." });
    }

    // Check and update baseCurrency in the currencies collection
    if (baseCurrency) {
      // Set all other currencies' baseCurrency to false for the same organizationId
      await Currency.updateMany({ organizationId, baseCurrency: true }, { baseCurrency: false });

      // Set the specific currency's baseCurrency to true
      await Currency.updateOne({ organizationId, currencyCode: baseCurrency }, { baseCurrency: true });
    }


    res.status(200).json({
      message: "Organization updated successfully."
    });
    console.log("Organization updated successfully");

    const account = await Account.findOne({ organizationId });
    if (!account) {
      insertAccounts(accounts, organizationId,createdDateAndTime);
    }

  } catch (error) {
    console.error("Error updating Organization:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};






// Function to generate time and date for storing in the database
function generateTimeAndDateForDB(timeZone, dateFormat, dateSplit, baseTime = new Date(), timeFormat = 'HH:mm:ss', timeSplit = ':') {
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
  const timeZoneName = localDate.format('z'); // Get time zone abbreviation

  // Combine the formatted date and time with the split characters and time zone
  const dateTime = `${formattedDate} ${formattedTime.split(':').join(timeSplit)} (${timeZoneName})`;

  return {
    date: formattedDate,
    time: `${formattedTime} (${timeZoneName})`,
    dateTime: dateTime
  };
}


