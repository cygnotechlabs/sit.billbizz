const Organization = require("../database/model/organization");
const Account = require("../database/model/account");
const Customer = require("../database/model/customer");
const Tax = require("../database/model/tax");
const Currency = require("../database/model/currency");
const moment = require("moment-timezone");

// Add Customer
exports.addCustomer = async (req, res) => {
  console.log("Add Customer:", req.body);
  try {
    const {
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
      openingBalance,
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
      msmeType,
      msmeNumber,
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

    // Validate organizationId
    const organizationExists = await Organization.findOne({
      organizationId: organizationId,
    });
    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }
    const taxExists = await Tax.findOne({
      organizationId: organizationId,
    });
    if (!taxExists) {
      return res.status(404).json({
        message: "Tax not found",
      });
    }

    const currencyExists = await Currency.find(
      { organizationId: organizationId },
      { currencyCode: 1, _id: 0 }
    );
    if (!currencyExists) {
      return res.status(404).json({
        message: "Currency not found",
      });
    }

    const timeZoneExp = organizationExists.timeZoneExp;
    const dateFormatExp = organizationExists.dateFormatExp;
    const dateSplit = organizationExists.dateSplit;
    const generatedDateTime = generateTimeAndDateForDB(
      timeZoneExp,
      dateFormatExp,
      dateSplit
    );
    const openingDate = generatedDateTime.dateTime;

    // Validations
    const validSalutations = ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."];
    const validCustomerTypes = ["Individual", "Business"];
    const validCurrencies = currencyExists.map(
      (currency) => currency.currencyCode
    );
    const validTaxTypes = ["None", taxExists.taxType];
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
      India: [
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

    function isAlphabets(value) {
      return /^[A-Za-z\s]+$/.test(value);
    }
    function isFloat(value) {
      return /^-?\d+(\.\d+)?$/.test(value);
      }

    function isInteger(value) {
      return /^[0-9]+$/.test(value);
    }

    function isValidDate(value) {
      return !isNaN(Date.parse(value));
    }

    function isAlphanumeric(value) {
      return /^[A-Za-z0-9]+$/.test(value);
    }

    function isValidUrl(value) {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    // Perform validations
    if (!validSalutations.includes(salutation)) {
      return res
        .status(400)
        .json({ message: `Invalid salutation: ${salutation}` });
    }

    if (!validCustomerTypes.includes(customerType)) {
      return res
        .status(400)
        .json({ message: `Invalid customer type: ${customerType}` });
    }

    if (
      !isAlphabets(firstName)
    ) {
      return res
        .status(400)
        .json({ message: "First Name fields should contain only alphabets." });
    }
    if (
      !isAlphabets(lastName)
    ) {
      return res
        .status(400)
        .json({ message: "Last Name fields should contain only alphabets." });
    }

    if (!isValidEmail(customerEmail)) {
      return res
        .status(400)
        .json({ message: `Invalid email: ${customerEmail}` });
    }

    if (!isInteger(workPhone)) {
      return res
        .status(400)
        .json({ message: `Work Phone numbers should contain only digits: ${workPhone}` });
    }
    if (!isInteger(mobile)) {
      return res
        .status(400)
        .json({ message: `Mobile numbers should contain only digits: ${mobile}` });
    }

    // if (dob && !isValidDate(dob)) {
    //   return res.status(400).json({ message: `Invalid date of birth: ${dob}` });
    // }

    if (!isInteger(cardNumber)) {
      return res
        .status(400)
        .json({ message: `Invalid card number: ${cardNumber}` });
    }

    if (!isAlphanumeric(pan)) {
      return res.status(400).json({ message: `Invalid PAN: ${pan}` });
    }
    if (!isFloat(openingBalance)) {
      return res.status(400).json({ message: `Invalid Opening Balance: ${openingBalance}` });
    }
    if (!validCurrencies.includes(currency)) {
      return res.status(400).json({ message: `Invalid Currency: ${currency}` });
    }

    if (!isAlphabets(department)) {
      return res
        .status(400)
        .json({ message: "Department should contain only alphabets." });
    }

    if (!isAlphabets(designation)) {
      return res
        .status(400)
        .json({ message: "Designation should contain only alphabets." });
    }
    if (!validCountries[billingCountry] || !validCountries[billingCountry].includes(billingState)) {
      return res
        .status(400)
        .json({ message: `Invalid Billing Country or State: ${billingCountry}, ${billingState}` });
    }
    if (!validCountries[shippingCountry] || !validCountries[shippingCountry].includes(shippingState)) {
      return res
        .status(400)
        .json({ message: `Invalid Billing Country or State: ${shippingCountry}, ${shippingState}` });
    }
    if (!isInteger(billingPinCode)) {
      return res
        .status(400)
        .json({ message: `Invalid Billing Pin Code Number fields :${billingPhone}` });
    }
    if (!isInteger(billingPhone)) {
      return res
        .status(400)
        .json({ message: `Invalid Billing Phone Number fields :${billingPhone}` });
    }    
    if (!isInteger(billingFaxNumber)) {
      return res
        .status(400)
        .json({ message: `Invalid Billing Fax Number fields:${billingFaxNumber}` });
    }

    if (!isInteger(shippingPinCode)) {
      return res
        .status(400)
        .json({ message: `Invalid Shipping Pin Code Number fields :${shippingPinCode}` });
    }
    if (!isInteger(shippingPhone)) {
      return res
        .status(400)
        .json({ message: `Invalid Shipping Phone Number fields :${shippingPhone}` });
    }    
    if (!isInteger(shippingFaxNumber)) {
      return res
        .status(400)
        .json({ message: `Invalid Shipping Fax Number fields:${shippingFaxNumber}` });
    }
    
    if (!validTaxTypes.includes(taxType)) {
      return res
        .status(400)
        .json({ message: `Invalid Tax Type: ${taxType}` });
    }



    if (taxType === "GST") {                  
      if (!validGSTTreatments.includes(gstTreatment)) {
        return res
        .status(400)
        .json({ message: `Invalid GST treatment: ${gstTreatment}` });        
      }

      if (!isAlphanumeric(gstin_uin)) {
        return res
        .status(400)
        .json({ message: `Invalid GSTIN/UIN: ${gstin_uin}` });          
      }
  } else if (taxType === "VAT") {
      if (!isAlphanumeric(vatNumber)) {
        return res
        .status(400)
        .json({ message: `Invalid VAT number: ${vatNumber}` });          
      }
  } else if (taxType === "None") {
    gstTreatment = undefined;
    gstInUin = undefined;
    vatNumber = undefined;                    
}


if (!validCountries[billingCountry].includes(placeOfSupply)) {
  return res
        .status(400)
        .json({ message: `Invalid Place of Supply: ${placeOfSupply}` });  
}



    

    //Check if customer with the same email already exists in the organization
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
      openingBalance,
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
      msmeType,
      msmeNumber,
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

      openingBalance: openingBalance,
      openingBalanceDate: openingDate,
      description: "Customer",
    });

    await newAccount.save();

    res.status(201).json({
      message: "Customer created successfully.",
    });
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

    // Check if the Organization exists
    const existingOrganization = await Organization.findOne({ organizationId });

    if (!existingOrganization) {
        return res.status(404).json({
            message: "No Organization Found.",
        });
    }

    // Find all Customer where organizationId matches
    const customers = await Customer.find({ organizationId: organizationId });

    if (!customers.length) {
      return res.status(404).json({
        message: "No Customer found for the provided organization ID.",
      });
    }

    res.status(200).json(customers);
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

    // Check if the Organization exists
    const existingOrganization = await Organization.findOne({ organizationId });

    if (!existingOrganization) {
        return res.status(404).json({
            message: "No Organization Found.",
        });
    }

    // Find the Customer by CustomerId and organizationId
    const customers = await Customer.findOne({
      _id: customerId,
      organizationId: organizationId,
    });

    if (!customers) {
      return res.status(404).json({
        message: "Customer not found for the provided Organization ID.",
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
    const {
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
      openingBalance,
      paymentTerms,
      enablePortal,
      documents,
      department,
      designation,
      websiteURL,

      //Taxes
      taxPreference,
      taxReason,
      taxType,
      gstTreatment,
      gstin_uin,
      msmeType,
      msmeNumber,
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

    // Validate organizationId
    const organizationExists = await Organization.findOne({
      organizationId: organizationId,
    });
    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    const timeZoneExp = organizationExists.timeZoneExp;
    const dateFormatExp = organizationExists.dateFormatExp;
    const dateSplit = organizationExists.dateSplit;
    const generatedDateTime = generateTimeAndDateForDB(
      timeZoneExp,
      dateFormatExp,
      dateSplit
    );
    const openingDate = generatedDateTime.dateTime;

    // Validations
    const validSalutations = ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."];
    const validCustomerTypes = ["Individual", "Business"];

    function isAlphabets(value) {
      return /^[A-Za-z\s]+$/.test(value);
    }

    function isInteger(value) {
      return /^[0-9]+$/.test(value);
    }

    function isValidDate(value) {
      return !isNaN(Date.parse(value));
    }

    function isAlphanumeric(value) {
      return /^[A-Za-z0-9]+$/.test(value);
    }

    function isValidUrl(value) {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    // Perform validations
    if (!validSalutations.includes(salutation)) {
      return res
        .status(400)
        .json({ message: `Invalid salutation: ${salutation}` });
    }

    if (!validCustomerTypes.includes(customerType)) {
      return res
        .status(400)
        .json({ message: `Invalid customer type: ${customerType}` });
    }

    if (
      !isAlphabets(firstName) ||
      !isAlphabets(lastName) ||
      !isAlphabets(customerDisplayName)
    ) {
      return res
        .status(400)
        .json({ message: "Name fields should contain only alphabets." });
    }

    if (!isValidEmail(customerEmail)) {
      return res
        .status(400)
        .json({ message: `Invalid email: ${customerEmail}` });
    }

    if (!isInteger(workPhone) || !isInteger(mobile)) {
      return res
        .status(400)
        .json({ message: "Phone numbers should contain only digits." });
    }

    // if (dob && !isValidDate(dob)) {
    //   return res.status(400).json({ message: `Invalid date of birth: ${dob}` });
    // }

    if (!isInteger(cardNumber)) {
      return res
        .status(400)
        .json({ message: `Invalid card number: ${cardNumber}` });
    }

    if (pan && !isAlphanumeric(pan)) {
      return res.status(400).json({ message: `Invalid PAN: ${pan}` });
    }

    if (department && !isAlphabets(department)) {
      return res
        .status(400)
        .json({ message: "Department should contain only alphabets." });
    }

    if (designation && !isAlphabets(designation)) {
      return res
        .status(400)
        .json({ message: "Designation should contain only alphabets." });
    }

    if (websiteURL && !isValidUrl(websiteURL)) {
      return res
        .status(400)
        .json({ message: `Invalid website URL: ${websiteURL}` });
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

    // Find the existing customer to get the old customerDisplayName
    const existingCustomer = await Customer.findById(customerId);
    if (!existingCustomer) {
      console.log("Customer not found with ID:", customerId);
      return res.status(404).json({ message: "Customer not found." });
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

    // Update customer details
    customer.customerType = customerType || customer.customerType;
    customer.salutation = salutation || customer.salutation;
    customer.firstName = firstName || customer.firstName;
    customer.lastName = lastName || customer.lastName;
    customer.companyName = companyName || customer.companyName;
    customer.customerDisplayName =
      customerDisplayName || customer.customerDisplayName;
    customer.customerEmail = customerEmail || customer.customerEmail;
    customer.workPhone = workPhone || customer.workPhone;
    customer.mobile = mobile || customer.mobile;
    customer.dob = dob || customer.dob;
    customer.cardNumber = cardNumber || customer.cardNumber;
    customer.pan = pan || customer.pan;
    customer.currency = currency || customer.currency;
    customer.openingBalance = openingBalance || customer.openingBalance;
    customer.paymentTerms = paymentTerms || customer.paymentTerms;
    customer.enablePortal = enablePortal || customer.enablePortal;
    customer.documents = documents || customer.documents;
    customer.department = department || customer.department;
    customer.designation = designation || customer.designation;
    customer.websiteURL = websiteURL || customer.websiteURL;
    customer.taxPreference = taxPreference || customer.taxPreference;
    customer.taxReason = taxReason || customer.taxReason;
    customer.taxType = taxType || customer.taxType;
    customer.gstTreatment = gstTreatment || customer.gstTreatment;
    customer.gstin_uin = gstin_uin || customer.gstin_uin;
    customer.msmeType = msmeType || customer.msmeType;
    customer.msmeNumber = msmeNumber || customer.msmeNumber;
    customer.placeOfSupply = placeOfSupply || customer.placeOfSupply;
    customer.businessLegalName =
      businessLegalName || customer.businessLegalName;
    customer.businessTradeName =
      businessTradeName || customer.businessTradeName;
    customer.vatNumber = vatNumber || customer.vatNumber;
    // Update Billing Address
    customer.billingAttention = billingAttention || customer.billingAttention;
    customer.billingCountry = billingCountry || customer.billingCountry;
    customer.billingAddressLine1 =
      billingAddressLine1 || customer.billingAddressLine1;
    customer.billingAddressLine2 =
      billingAddressLine2 || customer.billingAddressLine2;
    customer.billingCity = billingCity || customer.billingCity;
    customer.billingState = billingState || customer.billingState;
    customer.billingPinCode = billingPinCode || customer.billingPinCode;
    customer.billingPhone = billingPhone || customer.billingPhone;
    customer.billingFaxNumber = billingFaxNumber || customer.billingFaxNumber;
    // Update Shipping Address
    customer.shippingAttention =
      shippingAttention || customer.shippingAttention;
    customer.shippingCountry = shippingCountry || customer.shippingCountry;
    customer.shippingAddress1 = shippingAddress1 || customer.shippingAddress1;
    customer.shippingAddress2 = shippingAddress2 || customer.shippingAddress2;
    customer.shippingCity = shippingCity || customer.shippingCity;
    customer.shippingState = shippingState || customer.shippingState;
    customer.shippingPinCode = shippingPinCode || customer.shippingPinCode;
    customer.shippingPhone = shippingPhone || customer.shippingPhone;
    customer.shippingFaxNumber =
      shippingFaxNumber || customer.shippingFaxNumber;
    // Update Contact Person
    customer.contactPerson = contactPerson || customer.contactPerson;
    // Update Remark
    customer.remark = remark || customer.remark;
    // Optional: Update Status if needed
    // customer.status = status || customer.status;
    customer.lastModifiedDate = openingDate;

    await customer.save();

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
      message: "Customer status updated successfully.", status: customer.status
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
