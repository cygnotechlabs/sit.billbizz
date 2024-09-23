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
      const sanitizedData = sanitizeCustomerData(req.body);

      const { organizationId, customerEmail, debitOpeningBalance, creditOpeningBalance, customerDisplayName } = sanitizedData;
  
      const { organizationExists, taxExists, currencyExists } = await dataExist(organizationId);
  
      if (!validateOrganizationAndTax(organizationExists, taxExists, currencyExists, res)) return;
  
      const openingDate = generateOpeningDate(organizationExists);
  
      if (!validateInputs(sanitizedData, currencyExists, taxExists, organizationExists, res)) return;
  
      const existingCustomer = await Customer.findOne({ customerEmail, organizationId });
      if (existingCustomer) return res.status(409).json({ message: "Customer with the provided email already exists." });
  
      const savedCustomer = await createNewCustomer(sanitizedData, openingDate);
      
      const savedAccount = await createNewAccount(customerDisplayName, openingDate, organizationId, savedCustomer._id);
  
      await saveTrialBalanceAndHistory(savedCustomer, savedAccount, debitOpeningBalance, creditOpeningBalance, sanitizedData, openingDate);
  
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
      const sanitizedData = sanitizeCustomerData(req.body);

      const { customerId } = req.params;
  
      const { organizationId, customerDisplayName } = sanitizedData;
  
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
        userId: req.userId,
        userName: req.userName,
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
  
  async function saveTrialBalanceAndHistory(savedCustomer, savedAccount, debitOpeningBalance, creditOpeningBalance, data, openingDate) {
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
  
    const customerHistory = createCustomerHistory(savedCustomer, savedAccount, data, openingDate);
    await CustomerHistory.insertMany(customerHistory);
  }
  
  function createCustomerHistory(savedCustomer, savedAccount, data, openingDate) {
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
        userId: "6434bd73222",
        userName: "Test User",
      },
      {
        organizationId: savedCustomer.organizationId,
        operationId: savedAccount._id,
        customerId: savedCustomer._id,
        customerDisplayName: data.customerDisplayName,
        date: openingDate,
        title: "Customer Account Created",
        description: description1,
        userId: "6434bd73222",
        userName: "Test User",
      },
    ];
  }
  
  function getTaxDescription(data) {
    if (data.taxType === "GST" && data.gstTreatment && data.gstin_uin && data.placeOfSupply) {
      return `${data.customerDisplayName} Contact created with GST Treatment '${data.gstTreatment}' & GSTIN '${data.gstin_uin}'. State updated to ${data.placeOfSupply}. Created by Test User`;
    } else if (data.taxType === "VAT" && data.vatNumber && data.placeOfSupply) {
      return `${data.customerDisplayName} Contact created with VAT Number '${data.vatNumber}'. State updated to ${data.placeOfSupply}. Created by Test User`;
    } else if (data.taxType === "None") {
      return `${data.customerDisplayName} Contact created with Tax Exemption. Created by Test User`;
    }
    return "";
  }
  
  function getOpeningBalanceDescription(data, savedAccount) {
    if (data.debitOpeningBalance) {
      return `${data.customerDisplayName} Account created with Opening Balance (Debit): '${data.debitOpeningBalance}'. Created by Test User`;
    } else if (data.creditOpeningBalance) {
      return `${data.customerDisplayName} Account created with Opening Balance (Credit): '${data.creditOpeningBalance}'. Created by Test User`;
    }
    return "";
  }
  
  function validateCustomerData(data, validCurrencies, validTaxTypes, organization) {
    const errors = [];
    // Extract individual validations to separate functions for clarity
    validateBasicInfo(data, errors);
    validateOtherDetails(data, errors);
    validateTaxDetails(data, validTaxTypes, organization, errors);
    validateCurrency(data.currency, validCurrencies, errors);
    validateAddresses(data, organization, errors);
    return errors;
  }


  function validateBasicInfo(data, errors) {
    if (data.customerType && !validCustomerTypes.includes(data.customerType)) errors.push(`Invalid customer type: ${data.customerType}`);
    if (data.salutation && !validSalutations.includes(data.salutation)) errors.push(`Invalid salutation: ${data.salutation}`);
    if (data.firstName && !isAlphabets(data.firstName)) errors.push("First Name should contain only alphabets.");
    if (data.lastName && !isAlphabets(data.lastName)) errors.push("Last Name should contain only alphabets.");
    if (data.customerEmail && !isValidEmail(data.customerEmail)) errors.push(`Invalid email: ${data.customerEmail}`);
    if (data.workPhone && !isInteger(data.workPhone)) errors.push(`Work Phone should contain only digits: ${data.workPhone}`);
    if (data.mobile && !isInteger(data.mobile)) errors.push(`Mobile should contain only digits: ${data.mobile}`);
    if (data.cardNumber && !isInteger(data.cardNumber)) errors.push(`Invalid card number: ${data.cardNumber}`);

}
  
  function validateOtherDetails(data, errors) {    
    if (data.pan && !isAlphanumeric(data.pan)) errors.push(`Invalid PAN: ${data.pan}`);
    if (data.creditDays && !isInteger(data.creditDays)) errors.push(`Invalid Credit Days: ${data.creditDays}`);
    if (data.creditLimits && !isInteger(data.creditLimits)) errors.push(`Invalid Credit Limits: ${data.creditLimits}`);
    if (data.interestPercentage && !isInteger(data.interestPercentage)) errors.push(`Invalid Interest Percentage: ${data.interestPercentage}`);
    if (data.debitOpeningBalance && !isFloat(data.debitOpeningBalance)) errors.push(`Invalid Debit Opening Balance: ${data.debitOpeningBalance}`);
    if (data.creditOpeningBalance && !isFloat(data.creditOpeningBalance)) errors.push(`Invalid Credit Opening Balance: ${data.creditOpeningBalance}`);
    if (data.department !== undefined && !isAlphabets(data.department)) errors.push("Department should contain only alphabets.");
    if (data.designation !== undefined && !isAlphabets(data.designation)) errors.push("Designation should contain only alphabets.");
}
  
  function validateTaxDetails(data, validTaxTypes, organization, errors) {
    if (data.taxType && !validTaxTypes.includes(data.taxType)) errors.push(`Invalid Tax Type: ${data.taxType}`);
    if (data.placeOfSupply && !validCountries[organization.organizationCountry].includes(data.placeOfSupply)) {
      errors.push(`Invalid Place of Supply: ${data.placeOfSupply}`);
    }
    if (data.taxType === "GST") {
        if (data.gstTreatment  && !validGSTTreatments.includes(data.gstTreatment)) {
            errors.push( `Invalid GST treatment: ${data.gstTreatment}` );
        }
  
        if (data.gstin_uin  && !isAlphanumeric(data.gstin_uin)) {
          errors.push( `Invalid GSTIN/UIN: ${data.gstin_uin}` );
        }
      } else if (data.taxType === "VAT") {
        if (data.vatNumber  && !isAlphanumeric(data.vatNumber)) {
          errors.push( `Invalid VAT number: ${data.vatNumber}` );
        }
      } else if (data.taxType === "None") {
        data.gstTreatment = undefined;
        data.gstin_uin = undefined;
        data.vatNumber = undefined;
        data.placeOfSupply = undefined;
      }
  }
  
  function validateCurrency(currency, validCurrencies, errors) {
    if (currency && !validCurrencies.includes(currency)) errors.push(`Invalid Currency: ${currency}`);
  }
  
  function validateAddresses(data, organization, errors) {
    if (data.billingCountry && data.billingState && !validCountries[data.billingCountry]?.includes(data.billingState)) {
      errors.push(`Invalid Billing Country or State: ${data.billingCountry}, ${data.billingState}`);
    }
    if (data.billingPinCode  && !isInteger(data.billingPinCode))
        errors.push(`Invalid Billing Pin Code: ${data.billingPinCode}`);
      if (data.billingPhone  && !isInteger(data.billingPhone))
        errors.push(`Invalid Billing Phone: ${data.billingPhone}`);
      if (data.billingFaxNumber  && !isInteger(data.billingFaxNumber))
        errors.push(`Invalid Billing Fax Number: ${data.billingFaxNumber}`);
    
      if (data.shippingCountry  && data.shippingState  && !validCountries[data.shippingCountry]?.includes(data.shippingState))
        errors.push( `Invalid Shipping Country or State: ${data.shippingCountry}, ${data.shippingState}`
        );
      if (data.shippingPinCode  && !isInteger(data.shippingPinCode))
        errors.push(`Invalid Shipping Pin Code: ${data.shippingPinCode}`);
      if (data.shippingPhone  && !isInteger(data.shippingPhone))
        errors.push(`Invalid Shipping Phone: ${data.shippingPhone}`);
      if (data.shippingFaxNumber  && !isInteger(data.shippingFaxNumber))
        errors.push(`Invalid Shipping Fax Number: ${data.shippingFaxNumber}`);
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



  function isAlphabets(value) {
    return /^[A-Za-z\s]+$/.test(value);
  }
  
  function isFloat(value) {
    return /^-?\d+(\.\d+)?$/.test(value);
  }
  
  function isInteger(value) {
    return /^[0-9]+$/.test(value);
  }
  
  function isAlphanumeric(value) {
    return /^[A-Za-z0-9]+$/.test(value);
  }
  
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }