const Organization = require("../database/model/organization");
const Account = require("../database/model/account");
const Customer = require("../database/model/customer");
const Tax = require("../database/model/tax");
const Currency = require("../database/model/currency");
const moment = require("moment-timezone");
const TrialBalance = require("../database/model/trialBalance");
const CustomerHistory = require("../database/model/customerHistory");

// Fetch existing data
const dataExist = async (organizationId) => {
    const [organizationExists, taxExists, currencyExists, allCustomer] = await Promise.all([
      Organization.findOne({ organizationId }),
      Tax.findOne({ organizationId }),
      Currency.find({ organizationId }, { currencyCode: 1, _id: 0 }),
      Customer.find({ organizationId })
    ]);
    return { organizationExists, taxExists, currencyExists, allCustomer };
  };
  




  // Add Customer
  exports.addCustomer = async (req, res) => {
    console.log("Add Customer:", req.body);
    try {
      const { organizationId, id: userId, userName } = req.user;

      const sanitizedData = sanitizeCustomerData(req.body);

      const { customerEmail, debitOpeningBalance, creditOpeningBalance, customerDisplayName } = sanitizedData;
  
      const { organizationExists, taxExists, currencyExists } = await dataExist(organizationId);
  
      if (!validateOrganizationAndTax(organizationExists, taxExists, currencyExists, res)) return;
  
      const openingDate = generateOpeningDate(organizationExists);
  
      if (!validateInputs(sanitizedData, currencyExists, taxExists, organizationExists, res)) return;
  
      if (customerEmail) {const existingCustomer = await Customer.findOne({ customerEmail, organizationId });
      if (existingCustomer) return res.status(409).json({ message: "Customer with the provided email already exists.",existingCustomer });}
  
      const savedCustomer = await createNewCustomer(sanitizedData, openingDate);
      
      const savedAccount = await createNewAccount(customerDisplayName, openingDate, organizationId, savedCustomer._id);
  
      await saveTrialBalanceAndHistory(savedCustomer, savedAccount, debitOpeningBalance, creditOpeningBalance, sanitizedData, openingDate ,userId,userName );
  
      console.log("Customer & Account created successfully");
      res.status(201).json({ message: "Customer created successfully." });
    } catch (error) {
      console.error("Error creating customer:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

  // Edit Customer
exports.editCustomer = async (req, res) => {
    console.log("Edit Customer:", req.body);
    try {
      const { organizationId, id: userId, userName } = req.user;

      const sanitizedData = sanitizeCustomerData(req.body);

      const { customerId } = req.params;
  
      const { customerDisplayName } = sanitizedData;
  
      const { organizationExists, taxExists, currencyExists } = await dataExist(organizationId);
  
      if (!validateOrganizationAndTax(organizationExists, taxExists, currencyExists, res)) return;
      
      const openingDate = generateOpeningDate(organizationExists);
  
      const existingCustomer = await Customer.findById(customerId);
      if (!existingCustomer) {
        console.log("Customer not found with ID:", customerId);
        return res.status(404).json({ message: "Customer not found" });
      }
  
      const oldCustomerDisplayName = existingCustomer.customerDisplayName;

      if (!validateInputs(sanitizedData, currencyExists, taxExists, organizationExists, res)) return;

  
      // Update customer fields
      Object.assign(existingCustomer, sanitizedData);
      const savedCustomer = await existingCustomer.save();
  
      if (!savedCustomer) {
        console.error("Customer could not be saved.");
        return res.status(500).json({ message: "Failed to Update Customer." });
      }
  
      // Update customerDisplayName in associated Account documents
      if (customerDisplayName && customerDisplayName !== oldCustomerDisplayName) {
        const updatedAccount = await Account.updateMany(
          {
            accountName: oldCustomerDisplayName,
            organizationId: organizationId,
          },
          { $set: { accountName: customerDisplayName } }
        );
        console.log(
          `${updatedAccount.modifiedCount} account(s) associated with the accountName have been updated with the new customerDisplayName.`
        );
      }
  
      // Add entry to Customer History
      const accountCustomerHistoryEntry = new CustomerHistory({
        organizationId,
        operationId: savedCustomer._id,
        customerId,
        customerDisplayName: savedCustomer.customerDisplayName,
        date: openingDate,
        title: "Customer Data Modified",
        description: `${savedCustomer.customerDisplayName} Account Modified by ${req.userName}`,
        userId: userId,
        userName: userName,
      });
  
      await accountCustomerHistoryEntry.save();
  
      res.status(200).json({
        message: "Customer updated successfully.",
      });
      console.log("Customer updated successfully:", savedCustomer);
    } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

  // Get All Customer for a given organizationId
exports.getAllCustomer = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const { organizationExists, allCustomer } = await dataExist(organizationId);

    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    if (!allCustomer.length) {
      return res.status(404).json({
        message: "No Customer found",
      });
    }

    res.status(200).json(allCustomer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Get one Customer for a given organizationId
exports.getOneCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const organizationId = req.user.organizationId;

    const {organizationExists} = await dataExist(organizationId);

    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // Find the Customer by CustomerId and organizationId
    const customers = await Customer.findOne({
      _id: customerId,
      organizationId: organizationId,
    });

    if (!customers) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update the status of a Customer based on the provided status value
exports.updateCustomerStatus = async (req, res) => {
  console.log("Update Customer Status:", req.body);
  try {
    const { customerId } = req.params;
    const organizationId = req.user.organizationId;
    const { status } = req.body; // Status is now taken from the request body

    // Validate organizationId
    const organizationExists = await Organization.findOne({
      organizationId: organizationId,
    });
    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // Check if the customer exists
    const customer = await Customer.findOne({
      _id: customerId,
      organizationId: organizationId,
    });
    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Update the customer status with the value provided by the frontend
    customer.status = status;

    // Save the updated customer
    await customer.save();

    res.status(200).json({
      message: "Customer status updated successfully.",
      status: customer.status,
    });
    console.log("Customer status updated successfully.");
  } catch (error) {
    console.error("Error updating customer status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Customer Additional data
exports.getCustomerAdditionalData = async (req, res) => {
  const organizationId = req.user.organizationId;
  try {
    // Check if an Organization already exists
    const organization = await Organization.findOne({ organizationId });
    if (!organization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }

    // Fetch tax data to check tax type
    const taxData = await Tax.findOne({ organizationId });
    if (!taxData) {
      return res.status(404).json({
        message: "No tax data found for the organization.",
      });
    }

    // Prepare the response object
    const response = {
      taxType: taxData.taxType,
      gstTreatment: [
        "Registered Business - Regular",
        "Registered Business - Composition",
        "Unregistered Business",
        "Consumer",
        "Overseas",
        "Special Economic Zone",
        "Deemed Export",
        "Tax Deductor",
        "SEZ Developer",
      ],
    };

    // Return the combined response data
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching customer additional data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Get One Customer History for a given organizationId
exports.getOneCustomerHistory = async (req, res) => {
  try {
    const { customerId } = req.params;
    const organizationId = req.user.organizationId;
    const {organizationExists} = await dataExist(organizationId);

    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // Find the Customer History by CustomerId and organizationId
    const customersHistory = await CustomerHistory.find({
      customerId,
      organizationId,
    });

    if (!customersHistory) {
      return res.status(404).json({
        message: "Customer History not found",
      });
    }

    res.status(200).json(customersHistory);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};









  // Utility Functions
  const validSalutations = ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."];
  const validCustomerTypes = ["Individual", "Business"];
  const validCountries = {
    "United Arab Emirates": [
      "Abu Dhabi",
      "Dubai",
      "Sharjah",
      "Ajman",
      "Umm Al-Quwain",
      "Fujairah",
      "Ras Al Khaimah",
    ],
    "India": [
      "Andaman and Nicobar Island",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Ladakh",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
    "Saudi Arabia": [
      "Asir",
      "Al Bahah",
      "Al Jawf",
      "Al Madinah",
      "Al-Qassim",
      "Eastern Province",
      "Hail",
      "Jazan",
      "Makkah",
      "Medina",
      "Najran",
      "Northern Borders",
      "Riyadh",
      "Tabuk",
    ],
  };
  const validGSTTreatments = [
    "Registered Business - Regular",
    "Registered Business - Composition",
    "Unregistered Business",
    "Consumer",
    "Overseas",
    "Special Economic Zone",
    "Deemed Export",
    "Tax Deductor",
    "SEZ Developer",
  ];
  
  
  function sanitizeCustomerData(data) {
    const cleanData = (value) => (value === null || value === undefined || value === "" || value === 0 ? undefined : value);
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = cleanData(data[key]);
      return acc;
    }, {});
  }
  
  function validateOrganizationAndTax(organizationExists, taxExists, currencyExists, res) {
    if (!organizationExists) {
      res.status(404).json({ message: "Organization not found" });
      return false;
    }
    if (!taxExists) {
      res.status(404).json({ message: "Tax not found" });
      return false;
    }
    if (!currencyExists.length) {
      res.status(404).json({ message: "Currency not found" });
      return false;
    }
    return true;
  }
  
  function generateOpeningDate(organizationExists) {
    const date = generateTimeAndDateForDB(
        organizationExists.timeZoneExp,
        organizationExists.dateFormatExp,
        organizationExists.dateSplit
      )
    return date.dateTime;
  }
  
  function validateInputs(data, currencyExists, taxExists, organizationExists, res) {
    const validCurrencies = currencyExists.map((currency) => currency.currencyCode);
    const validTaxTypes = ["None", taxExists.taxType];
    const validationErrors = validateCustomerData(data, validCurrencies, validTaxTypes, organizationExists);
  
    if (validationErrors.length > 0) {
      res.status(400).json({ message: validationErrors.join(", ") });
      return false;
    }
    return true;
  }
  
  function createNewCustomer(data, openingDate) {
    const newCustomer = new Customer({ ...data, status: "Active", createdDate: openingDate, lastModifiedDate: openingDate });
    return newCustomer.save();
  }
  
  function createNewAccount(customerDisplayName, openingDate, organizationId, customerId) {
    const newAccount = new Account({
      organizationId,
      accountName: customerDisplayName,
      accountCode: customerId,
      accountSubhead: "Sundry Debtors",
      accountHead: "Asset",
      accountGroup: "Asset",
      openingDate,
      description: "Customer",
    });
    return newAccount.save();
  }
  
  async function saveTrialBalanceAndHistory(savedCustomer, savedAccount, debitOpeningBalance, creditOpeningBalance, data, openingDate,userId,userName) {
    const trialEntry = new TrialBalance({
      organizationId: savedCustomer.organizationId,
      operationId: savedCustomer._id,
      date: openingDate,
      accountId: savedAccount._id,
      accountName: savedAccount.accountName,
      action: "Opening Balance",
      debitAmount: debitOpeningBalance,
      creditAmount: creditOpeningBalance,
      remark: data.remark,
    });
    await trialEntry.save();
  
    const customerHistory = createCustomerHistory(savedCustomer, savedAccount, data, openingDate,userId,userName);
    await CustomerHistory.insertMany(customerHistory);
  }
  
  function createCustomerHistory(savedCustomer, savedAccount, data, openingDate,userId,userName) {
    const description = getTaxDescription(data);
    const description1 = getOpeningBalanceDescription(data, savedAccount);
  
    return [
      {
        organizationId: savedCustomer.organizationId,
        operationId: savedCustomer._id,
        customerId: savedCustomer._id,
        customerDisplayName: data.customerDisplayName,
        date: openingDate,
        title: "Customer Added",
        description,
        userId: userId,
        userName: userName,
      },
      {
        organizationId: savedCustomer.organizationId,
        operationId: savedAccount._id,
        customerId: savedCustomer._id,
        customerDisplayName: data.customerDisplayName,
        date: openingDate,
        title: "Customer Account Created",
        description: description1,
        userId: userId,
        userName: userName,
      },
    ];
  }
  
  function getTaxDescription(data) {
    let description = `${data.customerDisplayName} Contact created with `;
  
    if (data.taxType === "GST" && data.gstTreatment && data.gstin_uin && data.placeOfSupply) {
      description += "GST Treatment '" + data.gstTreatment + "' & GSTIN '" + data.gstin_uin + "'. ";
      description += "State updated to " + data.placeOfSupply + ". ";
    } else if (data.taxType === "VAT" && data.vatNumber && data.placeOfSupply) {
      description += "VAT Number '" + data.vatNumber + "'. ";
      description += "State updated to " + data.placeOfSupply + ". ";
    } else if (data.taxType === "None") {
      description += "Tax Exemption. ";
    } else {
      return "";
    }
  
    return description + "Created by Test User";
  }
  
  function getOpeningBalanceDescription(data, savedAccount) {
    let description = `${data.customerDisplayName} Account created with `;
  
    if (data.debitOpeningBalance) {
      description += "Opening Balance (Debit): '" + data.debitOpeningBalance + "'. ";
    } else if (data.creditOpeningBalance) {
      description += "Opening Balance (Credit): '" + data.creditOpeningBalance + "'. ";
    } else {
      return "";
    }
  
    return description + "Created by Test User";
  }
  
  function validateCustomerData(data, validCurrencies, validTaxTypes, organization) {
    const errors = [];
  
    validateBasicInfo(data, errors);
    validateOtherDetails(data, errors);
    validateTaxDetails(data, validTaxTypes, organization, errors);
    validateCurrency(data.currency, validCurrencies, errors);
    validateAddresses(data, organization, errors);
  
    return errors;
  }

  function validateField(condition, errorMsg, errors) {
    if (condition) errors.push(errorMsg);
  }


  function validateBasicInfo(data, errors) {
    validateField(
      data.customerType && !validCustomerTypes.includes(data.customerType),
      "Invalid customer type: " + data.customerType,
      errors
    );
    validateField(
      data.salutation && !validSalutations.includes(data.salutation),
      "Invalid salutation: " + data.salutation,
      errors
    );
    ['firstName', 'lastName'].forEach((name) => {
      validateField(
        data[name] && !isAlphabets(data[name]),
        name.charAt(0).toUpperCase() + name.slice(1) + " should contain only alphabets.",
        errors
      );
    });
    validateField(
      data.customerEmail && !isValidEmail(data.customerEmail),
      "Invalid email: " + data.customerEmail,
      errors
    );
    ['workPhone', 'mobile', 'cardNumber'].forEach((phone) => {
      validateField(
        data[phone] && !isInteger(data[phone]),
        phone.charAt(0).toUpperCase() + phone.slice(1) + " should contain only digits: " + data[phone],
        errors
      );
    });
  }
  
  function validateOtherDetails(data, errors) {
    ['pan', 'creditDays', 'creditLimits', 'interestPercentage'].forEach((field) => {
      validateField(
        data[field] && !isAlphanumeric(data[field]),
        "Invalid " + field + ": " + data[field],
        errors
      );
    });
    ['debitOpeningBalance', 'creditOpeningBalance'].forEach((balance) => {
      validateField(
        data[balance] && !isFloat(data[balance]),
        "Invalid " + balance.replace(/([A-Z])/g, " $1") + ": " + data[balance],
        errors
      );
    });
    ['department', 'designation'].forEach((field) => {
      if (data[field] !== undefined) {
        validateField(
          !isAlphabets(data[field]),
          field.charAt(0).toUpperCase() + field.slice(1) + " should contain only alphabets.",
          errors
        );
      }
    });
  }
  
  function validateTaxDetails(data, validTaxTypes, organization, errors) {
    validateField(
      data.taxType && !validTaxTypes.includes(data.taxType),
      "Invalid Tax Type: " + data.taxType,
      errors
    );
  
    if (data.placeOfSupply && !validCountries[organization.organizationCountry]?.includes(data.placeOfSupply)) {
      errors.push("Invalid Place of Supply: " + data.placeOfSupply);
    }
  
    if (data.taxType === "GST") {
      validateField(
        data.gstTreatment && !validGSTTreatments.includes(data.gstTreatment),
        "Invalid GST treatment: " + data.gstTreatment,
        errors
      );
      validateField(
        data.gstin_uin && !isAlphanumeric(data.gstin_uin),
        "Invalid GSTIN/UIN: " + data.gstin_uin,
        errors
      );
    } else if (data.taxType === "VAT") {
      validateField(
        data.vatNumber && !isAlphanumeric(data.vatNumber),
        "Invalid VAT number: " + data.vatNumber,
        errors
      );
    } else if (data.taxType === "None") {
      ['gstTreatment', 'gstin_uin', 'vatNumber', 'placeOfSupply'].forEach((field) => (data[field] = undefined));
    }
  }
  
  function validateCurrency(currency, validCurrencies, errors) {
    validateField(currency && !validCurrencies.includes(currency), "Invalid Currency: " + currency, errors);
  }
  
  function validateAddresses(data, organization, errors) {
    const fields = ['billing', 'shipping'];
    
    fields.forEach((type) => {
      const country = data[`${type}Country`];
      const state = data[`${type}State`];
      
      if (country && state && !validCountries[country]?.includes(state)) {
        const errorMessage = "Invalid " + capitalize(type) + " Country or State: " + country + ", " + state;
        errors.push(errorMessage);
      }
  
      ['PinCode', 'Phone', 'FaxNumber'].forEach((field) => {
        const fieldValue = data[`${type}${field}`];
        if (fieldValue && !isInteger(fieldValue)) {
          const errorFieldMessage = "Invalid " + capitalize(type) + " " + formatCamelCase(field);
          errors.push(errorFieldMessage + ": " + fieldValue);
        }
      });
    });
  }
  
  // Helper functions to handle formatting
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  function formatCamelCase(word) {
    return word.replace(/([A-Z])/g, " $1");
  }






  function isAlphabets(value) {
    return /^[A-Za-z\s]+$/.test(value);
  }
  
  function isFloat(value) {
    return /^-?\d+(\.\d+)?$/.test(value);
  }
  
  function isInteger(value) {
    return /^\d+$/.test(value);
  }
  
  function isAlphanumeric(value) {
    return /^[A-Za-z0-9]+$/.test(value);
  }
  
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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



  