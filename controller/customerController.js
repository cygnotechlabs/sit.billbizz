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
  return { organizationExists, taxExists, currencyExists ,allCustomer};
};




// Add Customer
exports.addCustomer = async (req, res) => {
  console.log("Add Customer:", req.body);
  try {
    let {
      //Basic Info
      organizationId,
      customerType,
      salutation,
      firstName,
      lastName,
      companyName,
      customerDisplayName,

      customerEmail,
      workPhone,
      mobile,

      dob,
      cardNumber,

      //Other details
      pan,
      currency,
      creditDays,
      creditLimits,
      interestPercentage,
      debitOpeningBalance,
      creditOpeningBalance,
      paymentTerms,
      enablePortal,
      documents,
      department,
      designation,
      websiteURL,

      //Taxes
      taxReason,
      taxType,
      gstTreatment,
      gstin_uin,
      placeOfSupply,
      businessLegalName,
      businessTradeName,
      vatNumber,

      // Billing Address
      billingAttention,
      billingCountry,
      billingAddressLine1,
      billingAddressLine2,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNumber,

      // Shipping Address
      shippingAttention,
      shippingCountry,
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNumber,

      //Contact Person
      contactPerson,

      //Remark
      remark,
    } = req.body;

    const userId = "6434bd73222";
    const userName = "Test User";


      //Data Cleaning   
      organizationId = cleanData(organizationId);
      customerType = cleanData(customerType);
      salutation = cleanData(salutation);
      firstName = cleanData(firstName);
      lastName = cleanData(lastName);
      companyName = cleanData(companyName);
      customerDisplayName = cleanData(customerDisplayName);

      customerEmail = cleanData(customerEmail);
      workPhone = cleanData(workPhone);
      mobile = cleanData(mobile);

      dob = cleanData(dob);
      cardNumber = cleanData(cardNumber);

      //Other Details
      pan = cleanData(pan);
      currency = cleanData(currency);
      creditDays = cleanData(creditDays);
      creditLimits = cleanData(creditLimits);
      interestPercentage = cleanData(interestPercentage);
      debitOpeningBalance = cleanData(debitOpeningBalance);
      creditOpeningBalance = cleanData(creditOpeningBalance);
      paymentTerms = cleanData(paymentTerms);
      enablePortal = cleanData(enablePortal);
      documents = cleanData(documents);
      department = cleanData(department);
      designation = cleanData(designation);
      websiteURL = cleanData(websiteURL);

      //Tax
      taxReason = cleanData(taxReason);
      taxType = cleanData(taxType);
      gstTreatment = cleanData(gstTreatment);
      gstin_uin = cleanData(gstin_uin);
      placeOfSupply = cleanData(placeOfSupply);
      businessLegalName = cleanData(businessLegalName);
      businessTradeName = cleanData(businessTradeName);
      vatNumber = cleanData(vatNumber);

      // Billing Address
      billingAttention = cleanData(billingAttention);
      billingCountry = cleanData(billingCountry);
      billingAddressLine1 = cleanData(billingAddressLine1);
      billingAddressLine2 = cleanData(billingAddressLine2);
      billingCity = cleanData(billingCity);
      billingState = cleanData(billingState);
      billingPinCode = cleanData(billingPinCode);
      billingPhone = cleanData(billingPhone);
      billingFaxNumber = cleanData(billingFaxNumber);

      // Shipping Address
      shippingAttention = cleanData(shippingAttention);
      shippingCountry = cleanData(shippingCountry);
      shippingAddress1 = cleanData(shippingAddress1);
      shippingAddress2 = cleanData(shippingAddress2);
      shippingCity = cleanData(shippingCity);
      shippingState = cleanData(shippingState);
      shippingPinCode = cleanData(shippingPinCode);
      shippingPhone = cleanData(shippingPhone);
      shippingFaxNumber = cleanData(shippingFaxNumber);

      // Contact Person
      contactPerson = cleanData(contactPerson);

      //Remark
      remark = cleanData(remark);
    

    
    const { organizationExists, taxExists, currencyExists } = await dataExist(organizationId);

    
    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }
  if (!taxExists) {
    return res.status(404).json({
      message: "Tax not found",
    });
  }
  if (!currencyExists.length) {
    return res.status(404).json({
      message: "Currency not found",
    });
  }

    const generatedDateTime = generateTimeAndDateForDB(
      organizationExists.timeZoneExp,
      organizationExists.dateFormatExp,
      organizationExists.dateSplit
    );
    const openingDate = generatedDateTime.dateTime;

    // Validations
    const validCurrencies = currencyExists.map(
      (currency) => currency.currencyCode
    );
    const validTaxTypes = ["None", taxExists.taxType];
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
    

    if (currency !== undefined && !validCurrencies.includes(currency)) {
      return res.status(400).json({ message: `Invalid Currency: ${currency}` });
    }

    if (taxType !== undefined && !validTaxTypes.includes(taxType)) {
      return res.status(400).json({ message: `Invalid Tax Type: ${taxType}` });
    }
    if (taxType === "GST") {
      if (gstTreatment !== undefined && !validGSTTreatments.includes(gstTreatment)) {
        taxReason = undefined;
        return res
          .status(400)
          .json({ message: `Invalid GST treatment: ${gstTreatment}` });
      }

      if (gstin_uin !== undefined && !isAlphanumeric(gstin_uin)) {
        taxReason = undefined;
        return res
          .status(400)
          .json({ message: `Invalid GSTIN/UIN: ${gstin_uin}` });
      }
    } else if (taxType === "VAT") {
      if (vatNumber !== undefined && !isAlphanumeric(vatNumber)) {
        taxReason = undefined;
        return res
          .status(400)
          .json({ message: `Invalid VAT number: ${vatNumber}` });
      }
    } else if (taxType === "None") {
      gstTreatment = undefined;
      gstin_uin = undefined;
      vatNumber = undefined;
      placeOfSupply = undefined;
    }

    if (placeOfSupply !== undefined && 
      !validCountries[organizationExists.organizationCountry].includes(
        placeOfSupply
      )
    ) {
      return res
        .status(400)
        .json({ message: `Invalid Place of Supply: ${placeOfSupply}` });
    }

    const validationErrors = validateCustomerData({
      salutation,
      customerType,
      firstName,
      lastName,
      customerEmail,
      //dob,
      workPhone,
      mobile,
      cardNumber,
      pan,
      debitOpeningBalance,
      creditOpeningBalance,
      department,
      designation,
      taxType,
      billingCountry,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNumber,
      shippingCountry,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNumber,
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(", ") });
    }

    //Check if customer with the same email already exists in the organization
    //if(taxsetting.emailValidation== true)
    const existingCustomer = await Customer.findOne({
      customerEmail: customerEmail,
      organizationId: organizationId,
    });
    if (existingCustomer) {
      return res.status(409).json({
        message: "Customer with the provided email already exists.",
      });
    }

    // Create a new customer
    const newCustomer = new Customer({
      //Basic Info
      organizationId,
      customerType,

      salutation,
      firstName,
      lastName,
      companyName,
      customerDisplayName,

      customerEmail,
      workPhone,
      mobile,

      dob,
      cardNumber,

      //Other details
      pan,
      currency,
      creditDays,
      creditLimits,
      interestPercentage,
      //openingBalance,
      paymentTerms,
      enablePortal,
      documents,
      department,
      designation,
      websiteURL,

      //Taxes
      taxReason,
      taxType,
      gstTreatment,
      gstin_uin,
      placeOfSupply,
      businessLegalName,
      businessTradeName,
      vatNumber,

      // Billing Address
      billingAttention,
      billingCountry,
      billingAddressLine1,
      billingAddressLine2,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNumber,

      // Shipping Address
      shippingAttention,
      shippingCountry,
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNumber,

      //Contact Person
      contactPerson,

      //Remark
      remark,

      //Status
      status: "Active",

      createdDate: openingDate,

      lastModifiedDate: openingDate,
    });

    const savedCustomer = await newCustomer.save();

    // Create a new Customer Account
    const newAccount = new Account({
      organizationId,
      accountName: customerDisplayName,
      accountCode: savedCustomer._id,

      accountSubhead: "Sundry Debtors",
      accountHead: "Asset",
      accountGroup: "Asset",
      
      openingDate: openingDate,
      description: "Customer",
    });

    const savedAccount = await newAccount.save();

    res.status(201).json({
      message: "Customer created successfully.",
    });

    //Trial Balance entry
    const newTrialEntry = new TrialBalance({
      organizationId,
      operationId: savedCustomer._id,
      date: openingDate,
      accountId: savedAccount._id,
      accountName: savedAccount.accountName,
      action: "Opening Balance",
      debitAmount: debitOpeningBalance,
      creditAmount: creditOpeningBalance,
      remark: remark
  });

  await newTrialEntry.save();
  
  let description;
  if(taxType="GST" && gstTreatment && gstin_uin && placeOfSupply){
    description=` ${customerDisplayName} Contact created with GST Treatment '${gstTreatment}' & GSTIN '${gstin_uin}'.
State updated to ${placeOfSupply}.
Created by ${userName}`;
  }
  else if(taxType="GST" && gstTreatment && placeOfSupply){
    description=` ${customerDisplayName} Contact created with GST Treatment '${gstTreatment}'. 
State updated to ${placeOfSupply}.
Created by ${userName}`;
  }
  else if(taxType="VAT" && vatNumber && placeOfSupply){
    description=` ${customerDisplayName} Contact created with VAT Number '${vatNumber}'.
State updated to ${placeOfSupply}.
Created by ${userName}`;
  }
  else if(taxType="None"){
    description=` ${customerDisplayName} Contact created with Tax Exemption.
Created by ${userName}`;
  }

  // Customer History entry
  const customerHistoryEntry = new CustomerHistory({
    organizationId,
    operationId:newCustomer._id,
    customerId:newCustomer._id,
    customerDisplayName,
    date: openingDate,
    title: "Customer Added",
    description: description,
    userId: userId,
    userName: userName,
});

await customerHistoryEntry.save();

let description1; 

if(debitOpeningBalance !==undefined && debitOpeningBalance){
  description1=` ${customerDisplayName} Account created with Opening Balance (Debit):'${debitOpeningBalance}'.
Created by ${userName}`;
}
else if(creditOpeningBalance !==undefined && creditOpeningBalance){
  description1=` ${customerDisplayName} Account created with Opening Balance (Credit):'${creditOpeningBalance}'.
Created by ${userName}`;
}

// Customer History entry
const accountcustomerHistoryEntry = new CustomerHistory({
  organizationId,
  operationId:newAccount._id,
  customerId:newCustomer._id,
  customerDisplayName,
  date: openingDate,
  title: "Customer Account Created",
  description: description1,
  userId: userId,
    userName: userName,
});

await accountcustomerHistoryEntry.save();

    console.log("Customer & Account created successfully");
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get All Customer for a given organizationId
exports.getAllCustomer = async (req, res) => {
  try {
    const { organizationId } = req.body;

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
    const { organizationId } = req.body;

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

//Edit a Customer for a given organizationId
exports.editCustomer = async (req, res) => {
  console.log("Edit Customer:", req.body);
  try {
    const { customerId } = req.params;
    let {
      //Basic Info
      organizationId,
      customerType,

      salutation,
      firstName,
      lastName,
      companyName,
      customerDisplayName,

      customerEmail,
      workPhone,
      mobile,

      dob,
      cardNumber,

      //Other details
      pan,
      currency,
      creditDays,
      creditLimits,
      interestPercentage,
      debitOpeningBalance,
      creditOpeningBalance,
      paymentTerms,
      enablePortal,
      documents,
      department,
      designation,
      websiteURL,

      //Taxes
      taxReason,
      taxType,
      gstTreatment,
      gstin_uin,
      placeOfSupply,
      businessLegalName,
      businessTradeName,
      vatNumber,

      // Billing Address
      billingAttention,
      billingCountry,
      billingAddressLine1,
      billingAddressLine2,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNumber,

      // Shipping Address
      shippingAttention,
      shippingCountry,
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNumber,

      //Contact Person
      contactPerson,

      //Remark
      remark,

      //status
    } = req.body;

    const userId = "6434bd73222";
    const userName = "Test User";

    //Data Cleaning   
    organizationId = cleanData(organizationId);
    customerType = cleanData(customerType);
    salutation = cleanData(salutation);
    firstName = cleanData(firstName);
    lastName = cleanData(lastName);
    companyName = cleanData(companyName);
    customerDisplayName = cleanData(customerDisplayName);

    customerEmail = cleanData(customerEmail);
    workPhone = cleanData(workPhone);
    mobile = cleanData(mobile);

    dob = cleanData(dob);
    cardNumber = cleanData(cardNumber);

    //Other Details
    pan = cleanData(pan);
    currency = cleanData(currency);
    creditDays = cleanData(creditDays);
    creditLimits = cleanData(creditLimits);
    interestPercentage = cleanData(interestPercentage);
    debitOpeningBalance = cleanData(debitOpeningBalance);
    creditOpeningBalance = cleanData(creditOpeningBalance);
    paymentTerms = cleanData(paymentTerms);
    enablePortal = cleanData(enablePortal);
    documents = cleanData(documents);
    department = cleanData(department);
    designation = cleanData(designation);
    websiteURL = cleanData(websiteURL);

    //Tax
    taxReason = cleanData(taxReason);
    taxType = cleanData(taxType);
    gstTreatment = cleanData(gstTreatment);
    gstin_uin = cleanData(gstin_uin);
    placeOfSupply = cleanData(placeOfSupply);
    businessLegalName = cleanData(businessLegalName);
    businessTradeName = cleanData(businessTradeName);
    vatNumber = cleanData(vatNumber);

    // Billing Address
    billingAttention = cleanData(billingAttention);
    billingCountry = cleanData(billingCountry);
    billingAddressLine1 = cleanData(billingAddressLine1);
    billingAddressLine2 = cleanData(billingAddressLine2);
    billingCity = cleanData(billingCity);
    billingState = cleanData(billingState);
    billingPinCode = cleanData(billingPinCode);
    billingPhone = cleanData(billingPhone);
    billingFaxNumber = cleanData(billingFaxNumber);

    // Shipping Address
    shippingAttention = cleanData(shippingAttention);
    shippingCountry = cleanData(shippingCountry);
    shippingAddress1 = cleanData(shippingAddress1);
    shippingAddress2 = cleanData(shippingAddress2);
    shippingCity = cleanData(shippingCity);
    shippingState = cleanData(shippingState);
    shippingPinCode = cleanData(shippingPinCode);
    shippingPhone = cleanData(shippingPhone);
    shippingFaxNumber = cleanData(shippingFaxNumber);

    // Contact Person
    contactPerson = cleanData(contactPerson);

    //Remark
    remark = cleanData(remark);

    const { organizationExists, taxExists, currencyExists } = await dataExist(organizationId);
    
    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }
  if (!taxExists) {
    return res.status(404).json({
      message: "Tax not found",
    });
  }
  if (!currencyExists.length) {
    return res.status(404).json({
      message: "Currency not found",
    });
  }

    const generatedDateTime = generateTimeAndDateForDB(
      organizationExists.timeZoneExp,
      organizationExists.dateFormatExp,
      organizationExists.dateSplit
    );
    const openingDate = generatedDateTime.dateTime;

    // Validations    

    // Find the existing customer to get the old customerDisplayName
    const existingCustomer = await Customer.findById(customerId);
    if (!existingCustomer) {
      console.log("Customer not found with ID:", customerId);
      return res.status(404).json({ message: "Customer not found" });
    }

    const oldCustomerDisplayName = existingCustomer.customerDisplayName;

    // Check if customerEmail already exists for another supplier
    if (customerEmail && customerEmail !== existingCustomer.customerEmail) {
      const emailExists = await Customer.findOne({
        customerEmail,
        organizationId,
      });
      if (emailExists && emailExists._id.toString() !== customerId) {
        return res
          .status(400)
          .json({ message: "Email already exists for another customer" });
      }
    }

    // Check if phone number already exists for another customer
    if (mobile && mobile !== existingCustomer.mobile) {
      const phoneExists = await Customer.findOne({ mobile, organizationId });
      if (phoneExists && phoneExists._id.toString() !== customerId) {
        return res.status(400).json({
          message: "Phone number already exists for another customer",
        });
      }
    }


    // Validations
    const validCurrencies = currencyExists.map(
      (currency) => currency.currencyCode
    );
    const validTaxTypes = ["None", taxExists.taxType];
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

    if (currency !== undefined && !validCurrencies.includes(currency)) {
      return res.status(400).json({ message: `Invalid Currency: ${currency}` });
    }

    if (taxType !== undefined && !validTaxTypes.includes(taxType)) {
      return res.status(400).json({ message: `Invalid Tax Type: ${taxType}` });
    }
    if (taxType === "GST") {
      if (gstTreatment !== undefined && !validGSTTreatments.includes(gstTreatment)) {
        taxReason = undefined;
        return res
          .status(400)
          .json({ message: `Invalid GST treatment: ${gstTreatment}` });
      }

      if (gstin_uin !== undefined && !isAlphanumeric(gstin_uin)) {
        taxReason = undefined;
        return res
          .status(400)
          .json({ message: `Invalid GSTIN/UIN: ${gstin_uin}` });
      }
    } else if (taxType === "VAT") {
      if (vatNumber !== undefined && !isAlphanumeric(vatNumber)) {
        taxReason = undefined;
        return res
          .status(400)
          .json({ message: `Invalid VAT number: ${vatNumber}` });
      }
    } else if (taxType === "None") {
      gstTreatment = undefined;
      gstin_uin = undefined;
      vatNumber = undefined;
    }

    if (placeOfSupply !== undefined && 
      !validCountries[organizationExists.organizationCountry].includes(
        placeOfSupply
      )
    ) {
      return res
        .status(400)
        .json({ message: `Invalid Place of Supply: ${placeOfSupply}` });
    }

    const validationErrors = validateCustomerData({
      salutation,
      customerType,
      firstName,
      lastName,
      customerEmail,
      //dob,
      workPhone,
      mobile,
      cardNumber,
      pan,
      debitOpeningBalance,
      creditOpeningBalance,
      department,
      designation,
      taxType,
      billingCountry,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNumber,
      shippingCountry,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNumber,
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(", ") });
    }

    
    //Update Fields
      existingCustomer.customerType= customerType;

      existingCustomer.salutation= salutation;
      existingCustomer.firstName= firstName;
      existingCustomer.lastName= lastName;
      existingCustomer.companyName= companyName;
      existingCustomer.customerDisplayName= customerDisplayName;

      existingCustomer.customerEmail= customerEmail;
      existingCustomer.workPhone= workPhone;
      existingCustomer.mobile= mobile;

      existingCustomer.dob= dob;
      existingCustomer.cardNumber= cardNumber;

      //Other details
      existingCustomer.pan= pan;
      existingCustomer.currency= currency;
      existingCustomer.creditDays= creditDays;
      existingCustomer.creditLimits= creditLimits;
      existingCustomer.interestPercentage= interestPercentage;
      existingCustomer.paymentTerms= paymentTerms;
      existingCustomer.enablePortal= enablePortal;
      existingCustomer.documents= documents;
      existingCustomer.department= department;
      existingCustomer.designation= designation;
      existingCustomer.websiteURL= websiteURL;

      //Taxes
      existingCustomer.taxReason= taxReason;
      existingCustomer.taxType= taxType;
      existingCustomer.gstTreatment= gstTreatment;
      existingCustomer.gstin_uin= gstin_uin;
      existingCustomer.placeOfSupply= placeOfSupply;
      existingCustomer.businessLegalName= businessLegalName;
      existingCustomer.businessTradeName= businessTradeName;
      existingCustomer.vatNumber= vatNumber;

      // Billing Address
      existingCustomer.billingAttention= billingAttention;
      existingCustomer.billingCountry= billingCountry;
      existingCustomer.billingAddressLine1= billingAddressLine1;
      existingCustomer.billingAddressLine2= billingAddressLine2;
      existingCustomer.billingCity= billingCity;
      existingCustomer.billingState= billingState;
      existingCustomer.billingPinCode= billingPinCode;
      existingCustomer.billingPhone= billingPhone;
      existingCustomer.billingFaxNumber= billingFaxNumber;

      // Shipping Address
      existingCustomer.shippingAttention= shippingAttention;
      existingCustomer.shippingCountry= shippingCountry;
      existingCustomer.shippingAddress1= shippingAddress1;
      existingCustomer.shippingAddress2= shippingAddress2;
      existingCustomer.shippingCity= shippingCity;
      existingCustomer.shippingState= shippingState;
      existingCustomer.shippingPinCode= shippingPinCode;
      existingCustomer.shippingPhone= shippingPhone;
      existingCustomer.shippingFaxNumber= shippingFaxNumber;

      //Contact Person
      existingCustomer.contactPerson= contactPerson;

      //Remark
      existingCustomer.remark= remark;

      existingCustomer.lastModifiedDate= openingDate;



    const savedCustomer = await existingCustomer.save();

    if (!savedCustomer) {
      console.error("Customer could not be saved.");
      return res.status(500).json({ message: "Failed to Update Customer." });
    }




    // Update the customerDisplayName in associated Account documents
    if (customerDisplayName && customerDisplayName !== oldCustomerDisplayName) {
      const updatedAccount = await Account.updateMany(
        {
          accountName: oldCustomerDisplayName, // Match the old customerDisplayName
          organizationId: organizationId, // Match the organizationId from the request
        },
        { $set: { accountName: customerDisplayName } } // Update with the new customerDisplayName
      );
      console.log(
        `${updatedAccount.modifiedCount} account associated with the accountName have been updated with the new customerDisplayName.`
      );
    }

    // Customer History entry
const accountcustomerHistoryEntry = new CustomerHistory({
  organizationId,
  operationId:savedCustomer._id,
  customerId:customerId,
  customerDisplayName:savedCustomer.customerDisplayName,
  date: openingDate,
  title: "Customer Data Modified",
  description: ` ${savedCustomer.customerDisplayName} Account Modified by ${userName}`,
  userId: userId,
  userName: userName,
});

await accountcustomerHistoryEntry.save();

    res.status(200).json({
      message: "Customer updated successfully.",
    });
    console.log("Customer updated successfully:");
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update the status of a Customer based on the provided status value
exports.updateCustomerStatus = async (req, res) => {
  console.log("Update Customer Status:", req.body);
  try {
    const { customerId } = req.params;
    const { organizationId, status } = req.body; // Status is now taken from the request body

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
  const { organizationId } = req.body;

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
    const { organizationId } = req.body;

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

// Validation functions
const validSalutations = ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."];
const validCustomerTypes = ["Individual", "Business"];
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

function validateCustomerData(data) {
  const errors = [];

  if (data.salutation !== undefined && !validSalutations.includes(data.salutation))
    errors.push(`Invalid salutation: ${data.salutation}`);
  if (data.customerType !== undefined && !validCustomerTypes.includes(data.customerType))
    errors.push(`Invalid customer type: ${data.customerType}`);

  if (data.firstName !== undefined &&  !isAlphabets(data.firstName))
    errors.push("First Name should contain only alphabets.");
  if (data.lastName !== undefined && !isAlphabets(data.lastName))
    errors.push("Last Name should contain only alphabets.");

  if (data.customerEmail !== undefined && !isValidEmail(data.customerEmail))
    errors.push(`Invalid email: ${data.customerEmail}`);
  //if (data.dob !== undefined && !isValidDate(data.dob)) errors.push(`Invalid Date of Birth: ${data.dob}`);

  if (data.workPhone !== undefined && !isInteger(data.workPhone))
    errors.push(`Work Phone should contain only digits: ${data.workPhone}`);
  if (data.mobile !== undefined && !isInteger(data.mobile))
    errors.push(`Mobile should contain only digits: ${data.mobile}`);
  if (data.cardNumber !== undefined && !isInteger(data.cardNumber))
    errors.push(`Invalid card number: ${data.cardNumber}`);

  if (data.pan !== undefined && !isAlphanumeric(data.pan)) 
     errors.push(`Invalid PAN: ${data.pan}`);
  if (data.debitOpeningBalance !== undefined && !isFloat(data.debitOpeningBalance))
    errors.push(`Invalid Debit Opening Balance: ${data.debitOpeningBalance}`);
  if (data.creditOpeningBalance !== undefined && !isFloat(data.creditOpeningBalance))
    errors.push(`Invalid Credit Opening Balance: ${data.creditOpeningBalance}`);
  if (data.department !== undefined && !isAlphabets(data.department))
    errors.push("Department should contain only alphabets.");
  if (data.designation !== undefined && !isAlphabets(data.designation))
    errors.push("Designation should contain only alphabets.");

  if (data.billingCountry !== undefined && data.billingState !== undefined && !validCountries[data.billingCountry]?.includes(data.billingState))
    errors.push(
      `Invalid Billing Country or State: ${data.billingCountry}, ${data.billingState}`
    );
  if (data.billingPinCode !== undefined && !isInteger(data.billingPinCode))
    errors.push(`Invalid Billing Pin Code: ${data.billingPinCode}`);
  if (data.billingPhone !== undefined && !isInteger(data.billingPhone))
    errors.push(`Invalid Billing Phone: ${data.billingPhone}`);
  if (data.billingFaxNumber !== undefined && !isInteger(data.billingFaxNumber))
    errors.push(`Invalid Billing Fax Number: ${data.billingFaxNumber}`);

  if (data.shippingCountry !== undefined && data.shippingState !== undefined && !validCountries[data.shippingCountry]?.includes(data.shippingState))
    errors.push(
      `Invalid Shipping Country or State: ${data.shippingCountry}, ${data.shippingState}`
    );
  if (data.shippingPinCode !== undefined && !isInteger(data.shippingPinCode))
    errors.push(`Invalid Shipping Pin Code: ${data.shippingPinCode}`);
  if (data.shippingPhone !== undefined && !isInteger(data.shippingPhone))
    errors.push(`Invalid Shipping Phone: ${data.shippingPhone}`);
  if (data.shippingFaxNumber !== undefined && !isInteger(data.shippingFaxNumber))
    errors.push(`Invalid Shipping Fax Number: ${data.shippingFaxNumber}`);

  //if (data.gstTreatment !== undefined && data.taxType === "GST" && !validGSTTreatments.includes(data.gstTreatment)) errors.push(`Invalid GST treatment: ${data.gstTreatment}`);
  //if (data.gstin_uin !== undefined && data.taxType === "GST" && !isAlphanumeric(data.gstin_uin)) errors.push(`Invalid GSTIN/UIN: ${data.gstin_uin}`);
  //if (data.vatNumber !== undefined && data.taxType === "VAT" && !isAlphanumeric(data.vatNumber)) errors.push(`Invalid VAT number: ${data.vatNumber}`);

  return errors;
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

function isValidDate(value) {
  return !isNaN(Date.parse(value));
}

function cleanData(value) {
  return value === null || value === undefined || value === "" || value === 0
    ? undefined
    : value;
}