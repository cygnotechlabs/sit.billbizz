const Organization = require("../database/model/organization");
const Supplier = require("../database/model/supplier");
const Account = require("../database/model/account");
const Tax = require("../database/model/tax");
const moment = require('moment-timezone');
const Currency = require("../database/model/currency");


exports.addSupplier = async (req, res) => {
  console.log("Add supplier:", req.body);
  const {
    // Basic
    organizationId,
    salutation,
    firstName,
    lastName,

    companyName,
    supplierDisplayName,
    supplierEmail,
    workPhone,
    mobile,

    //Unverified
    creditDays,
    creditLimit,
    interestPercentage,

    //Other Details
    pan,
    currency,
    openingBalance,
    paymentTerms,
    tds,
    documents,
    websiteURL,
    department,
    designation,

    //Tax
    taxType,
    gstTreatment,
    gstin_uin,
    sourceOfSupply,
    msmeType,
    msmeNumber,
    msmeRegistered,
    vatNumber,


    // Billing Address
    billingAttention,
    billingCountry,
    billingAddressStreet1,
    billingAddressStreet2,
    billingCity,
    billingState,
    billingPinCode,
    billingPhone,
    billingFaxNum,

    // Shipping Address
    shippingAttention,
    shippingCountry,
    shippingAddressStreet1,
    shippingAddressStreet2,
    shippingCity,
    shippingState,
    shippingPinCode,
    shippingPhone,
    shippingFaxNum,

    // Contact Person
    contactPersons,

    //Bank Details
    bankDetails,

    //Remark
    remarks,
  } = req.body;

  try {
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
    const generatedDateTime = generateTimeAndDateForDB(timeZoneExp, dateFormatExp, dateSplit);
    const openingDate = generatedDateTime.dateTime;  
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
// // Utility validation functions
// function isAlphabets(value) {
//   return /^[A-Za-z\s]+$/.test(value);
// }

// function isFloat(value) {
//   return /^-?\d+(\.\d+)?$/.test(value);
//   }

// function isInteger(value) {
//   return /^[0-9]+$/.test(value);
// }


// function isAlphanumeric(value) {
//   return /^[A-Za-z0-9]+$/.test(value);
// }

// function isValidUrl(value) {
//   try {
//     new URL(value);
//     return true;
//   } catch {
//     return false;
//   }
// }

// function isValidEmail(value) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
// }

// // Constants for validation
// const validSalutations = ['Mr.', 'Mrs.', 'Ms.', 'Miss.', 'Dr.'];

//  // Perform validations
//  if (salutation && !validSalutations.includes(salutation)) {
//   return { isValid: false, message: `Invalid salutation: ${salutation}` };
// }

// if (firstName && !isAlphabets(firstName)) {
//   return { isValid: false, message: "First name should contain only alphabets." };
// }

// if (lastName && !isAlphabets(lastName)) {
//   return { isValid: false, message: "Last name should contain only alphabets." };
// }

// if (supplierDisplayName && !isAlphabets(supplierDisplayName)) {
//   return { isValid: false, message: "Supplier display name should contain only alphabets." };
// }

// if (supplierEmail && !isValidEmail(supplierEmail)) {
//   return { isValid: false, message: `Invalid email: ${supplierEmail}` };
// }

// if (workPhone && !isInteger(workPhone)) {
//   return { isValid: false, message: "Work phone should contain only digits." };
// }

// if (mobile && !isInteger(mobile)) {
//   return { isValid: false, message: "Mobile number should contain only digits." };
// }

// if (pan && !isAlphanumeric(pan)) {
//   return { isValid: false, message: `Invalid PAN: ${pan}` };
// }

// if (!isFloat(openingBalance)) {
//   return res.status(400).json({ message: `Invalid Opening Balance: ${openingBalance}` });
// }

// if (!validCurrencies.includes(currency)) {
//   return res.status(400).json({ message: `Invalid Currency: ${currency}` });
// }

// if (department && !isAlphabets(department)) {
//   return { isValid: false, message: "Department should contain only alphabets." };
// }

// if (designation && !isAlphabets(designation)) {
//   return { isValid: false, message: "Designation should contain only alphabets." };
// }

// if (websiteURL && !isValidUrl(websiteURL)) {
//   return { isValid: false, message: `Invalid website URL: ${websiteURL}` };
// }

// if (gstin_uin && !isAlphanumeric(gstin_uin)) {
//   return { isValid: false, message: `Invalid GSTIN/UIN: ${gstin_uin}` };
// }

// if (!validCountries[billingCountry] || !validCountries[billingCountry].includes(billingState)) {
//   return res
//     .status(400)
//     .json({ message: `Invalid Billing Country or State: ${billingCountry}, ${billingState}` });
// }
// if (!validCountries[shippingCountry] || !validCountries[shippingCountry].includes(shippingState)) {
//   return res
//     .status(400)
//     .json({ message: `Invalid Billing Country or State: ${shippingCountry}, ${shippingState}` });
// }
// if (!isInteger(billingPinCode)) {
//   return res
//     .status(400)
//     .json({ message: `Invalid Billing Pin Code Number fields :${billingPhone}` });
// }
// if (!isInteger(billingPhone)) {
//   return res
//     .status(400)
//     .json({ message: `Invalid Billing Phone Number fields :${billingPhone}` });
// }    
// if (!isInteger(billingFaxNum)) {
//   return res
//     .status(400)
//     .json({ message: `Invalid Billing Fax Number fields:${billingFaxNum}` });
// }

// if (!isInteger(shippingPinCode)) {
//   return res
//     .status(400)
//     .json({ message: `Invalid Shipping Pin Code Number fields :${shippingPinCode}` });
// }
// if (!isInteger(shippingPhone)) {
//   return res
//     .status(400)
//     .json({ message: `Invalid Shipping Phone Number fields :${shippingPhone}` });
// }    
// if (!isInteger(shippingFaxNum)) {
//   return res
//     .status(400)
//     .json({ message: `Invalid Shipping Fax Number fields:${shippingFaxNum}` });
// }

// if (!validTaxTypes.includes(taxType)) {
//   return res
//     .status(400)
//     .json({ message: `Invalid Tax Type: ${taxType}` });
// }

// if (taxType === "GST") {                  
//   if (!validGSTTreatments.includes(gstTreatment)) {
//     return res
//     .status(400)
//     .json({ message: `Invalid GST treatment: ${gstTreatment}` });        
//   }

//   if (!isAlphanumeric(gstin_uin)) {
//     return res
//     .status(400)
//     .json({ message: `Invalid GSTIN/UIN: ${gstin_uin}` });          
//   }
// } else if (taxType === "VAT") {
//   if (!isAlphanumeric(vatNumber)) {
//     return res
//     .status(400)
//     .json({ message: `Invalid VAT number: ${vatNumber}` });          
//   }
// } else if (taxType === "None") {
// gstTreatment = undefined;
// gstin_uin = undefined;
// vatNumber = undefined;                    
// }




    // Check if a supplier with the same organizationId already exists
    const existingSupplier = await Supplier.findOne({
      supplierEmail: supplierEmail,
      organizationId: organizationId,
    });
    if (existingSupplier) {
      return res.status(409).json({
        message: "Supplier with the provided email already exists.",
      });
    }


    // Create a new supplier
    const newSupplier = new Supplier({
      // Basic
      organizationId,
      salutation,
      firstName,
      lastName,

      companyName,
      supplierDisplayName,
      supplierEmail,
      workPhone,
      mobile,
      createdDate: openingDate,
      creditDays,
      creditLimit,
      interestPercentage,

      //Other Details
      pan,
      currency,
      openingBalance,
      paymentTerms,
      tds,
      documents,
      websiteURL,
      department,
      designation,

      //Tax
      taxType,
      gstTreatment,
      gstin_uin,
      sourceOfSupply,
      msmeType,
      msmeNumber,
      msmeRegistered,
      vatNumber,

      // Billing Address
      billingAttention,
      billingCountry,
      billingAddressStreet1,
      billingAddressStreet2,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNum,

      // Shipping Address
      shippingAttention,
      shippingCountry,
      shippingAddressStreet1,
      shippingAddressStreet2,
      shippingCity,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNum,

      // Contact Person
      contactPersons,

      //Bank Details
      bankDetails,

      //Remark
      remarks,

      //Status
      status: "Active",
    });

    // Save the supplier to the database
    const savedSupplier = await newSupplier.save();

    const existingAccount = await Account.findOne({
      accountName: companyName,
      organizationId: organizationId,
    });

    if (existingAccount) {
      return res.status(409).json({
        message: "Account with the provided Account Name already exists.",
      });
    }

    // Create a new Customer Account
    const newAccount = new Account({
      organizationId,
      accountName: supplierDisplayName,
      accountCode: savedSupplier._id,

      accountSubhead: "Sundry Creditors",
      accountHead: "Liabilities",
      accountGroup: "Liability",

      openingBalance: openingBalance,
      openingBalanceDate: openingDate,
      description: "Suppliers",
    });

    await newAccount.save();
    res.status(201).json({
      message: "Supplier Added successfully.",
    });
    console.log("Supplier Added successfully");
  } catch (error) {
    console.error("Error adding supplier:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSuppliers = async (req, res) => {
  try {
    const { organizationId } = req.body;
    console.log(organizationId);

    const suppliers = await Supplier.find({ organizationId: organizationId });
    console.log(suppliers);

    if (!suppliers) {
      return res.status(404).json({
        message: "No suppliers found for the provided organization ID.",
      });
    }

    res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getASupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const { organizationId } = req.body;

    // Find the supplier by supplierId and organizationId
    const supplier = await Supplier.findById({
      _id: supplierId,
      organizationId: organizationId,
    });

    if (!supplier) {
      return res
        .status(404)
        .json({
          message: "Supplier not found for the provided Organization ID.",
        });
    }

    res.status(200).json(supplier);
  } catch (error) {
    console.error("Error fetching supplier:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


exports.updateSupplier = async (req, res) => {
  console.log("Update supplier:", req.body);

  try {
    const supplierId = req.params.id;
    const {
      // Basic
      organizationId,
      salutation,
      firstName,
      lastName,
      companyName,
      supplierDisplayName,
      supplierEmail,
      workPhone,
      mobile,
      creditDays,
      creditLimit,
      interestPercentage,
      pan,
      currency,
      openingBalance,
      paymentTerms,
      tds,
      documents,
      websiteURL,
      department,
      designation,
      taxType,
      gstTreatment,
      gstin_uin,
      sourceOfSupply,
      msmeType,
      msmeNumber,
      vatNumber,
      billingAttention,
      billingCountry,
      billingAddressStreet1,
      billingAddressStreet2,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNum,
      shippingAttention,
      shippingCountry,
      shippingAddressStreet1,
      shippingAddressStreet2,
      shippingCity,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNum,
      contactPersons,
      bankDetails,
      remarks
    } = req.body;



    // Validate organizationId
    const organizationExists = await Organization.findOne({ organizationId });
    if (!organizationExists) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const timeZoneExp = organizationExists.timeZoneExp;
    const dateFormatExp = organizationExists.dateFormatExp;
    const dateSplit = organizationExists.dateSplit;
    const generatedDateTime = generateTimeAndDateForDB(timeZoneExp, dateFormatExp, dateSplit);
    const openingDate = generatedDateTime.dateTime; 

    // Utility validation functions
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
    
    // Constants for validation
    const validSalutations = ['Mr.', 'Mrs.', 'Ms.', 'Miss.', 'Dr.'];
    
     // Perform validations
     if (salutation && !validSalutations.includes(salutation)) {
      return { isValid: false, message: `Invalid salutation: ${salutation}` };
    }
    
    if (firstName && !isAlphabets(firstName)) {
      return { isValid: false, message: "First name should contain only alphabets." };
    }
    
    if (lastName && !isAlphabets(lastName)) {
      return { isValid: false, message: "Last name should contain only alphabets." };
    }
    
    if (supplierDisplayName && !isAlphabets(supplierDisplayName)) {
      return { isValid: false, message: "Supplier display name should contain only alphabets." };
    }
    
    if (supplierEmail && !isValidEmail(supplierEmail)) {
      return { isValid: false, message: `Invalid email: ${supplierEmail}` };
    }
    
    if (workPhone && !isInteger(workPhone)) {
      return { isValid: false, message: "Work phone should contain only digits." };
    }
    
    if (mobile && !isInteger(mobile)) {
      return { isValid: false, message: "Mobile number should contain only digits." };
    }
    
    if (pan && !isAlphanumeric(pan)) {
      return { isValid: false, message: `Invalid PAN: ${pan}` };
    }
    
    if (department && !isAlphabets(department)) {
      return { isValid: false, message: "Department should contain only alphabets." };
    }
    
    if (designation && !isAlphabets(designation)) {
      return { isValid: false, message: "Designation should contain only alphabets." };
    }
    
    if (websiteURL && !isValidUrl(websiteURL)) {
      return { isValid: false, message: `Invalid website URL: ${websiteURL}` };
    }
    
    // if (gstin_uin && !isAlphanumeric(gstin_uin)) {
    //   return { isValid: false, message: `Invalid GSTIN/UIN: ${gstin_uin}` };
    // }
        

    // Find the existing supplier to check for duplicates or to reject if not found
    const existingSupplier = await Supplier.findById(supplierId);
    if (!existingSupplier) {
      console.log("Supplier not found with ID:", supplierId);
      return res.status(404).json({ message: "Supplier not found." });
    }

    // Check if supplierEmail already exists for another supplier
    if (supplierEmail && supplierEmail !== existingSupplier.supplierEmail) {
      const emailExists = await Supplier.findOne({
        supplierEmail,
        organizationId,
      });
      if (emailExists && emailExists._id.toString() !== supplierId) {
        return res
          .status(400)
          .json({ message: "Email already exists for another supplier" });
      }
    }

    // Check if phone number already exists for another supplier
    if (mobile && mobile !== existingSupplier.mobile) {
      const phoneExists = await Supplier.findOne({ mobile, organizationId });
      if (phoneExists && phoneExists._id.toString() !== supplierId) {
        return res
          .status(400)
          .json({
            message: "Phone number already exists for another supplier",
          });
      }
    }

    // Prepare the updated supplier data
    const updatedData = {
      organizationId,
      salutation,
      firstName,
      lastName,
      companyName,
      supplierDisplayName,
      supplierEmail,
      workPhone,
      mobile,
      creditDays,
      creditLimit,
      interestPercentage,
      pan,
      currency,
      openingBalance,
      paymentTerms,
      tds,
      documents,
      websiteURL,
      department,
      designation,
      taxType,
      gstTreatment,
      gstin_uin,
      sourceOfSupply,
      msmeType,
      msmeNumber,
      vatNumber,
      billingAttention,
      billingCountry,
      billingAddressStreet1,
      billingAddressStreet2,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNum,
      shippingAttention,
      shippingCountry,
      shippingAddressStreet1,
      shippingAddressStreet2,
      shippingCity,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNum,
      contactPersons,
      bankDetails,
      remarks,
      lastModifiedDate: openingDate

    };

    // Update the supplier
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSupplier) {
      console.log("Supplier not found with ID:", supplierId);
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Update the supplierDisplayName in associated Account documents if it has changed
    if (
      supplierDisplayName &&
      supplierDisplayName !== existingSupplier.supplierDisplayName
    ) {
      // Check if the new supplierDisplayName already exists in Account
      const existingAccount = await Account.findOne({
        accountName: supplierDisplayName,
        organizationId: organizationId,
      });

      if (existingAccount) {
        // If found, return an error indicating a conflict
        return res
          .status(400)
          .json({
            message:
              "The new supplier display name already exists in Account records",
          });
      } else {
        // If not found, proceed with renaming the account
        const updatedAccount = await Account.updateMany(
          {
            accountName: existingSupplier.supplierDisplayName,
            organizationId: organizationId,
          },
          { $set: { accountName: supplierDisplayName } }
        );
        console.log(
          `${updatedAccount.modifiedCount} account(s) associated with the old supplierDisplayName have been updated with the new supplierDisplayName.`
        );
      }
    }

    res
      .status(200)
      .json({
        message: "Supplier updated successfully",
        supplier: updatedSupplier,
      });
    console.log("Supplier updated successfully:", updatedSupplier);
  } catch (error) {
    console.error("Error updating supplier:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.deleteSupplier = async (req, res) => {
//     console.log("Delete supplier:", req.body);
//     try {
//         const { id } = req.params;
//         const { organizationId } = req.body;

//         // Validate organizationId
//         const organizationExists = await Organization.findOne({
//             organizationId: organizationId,
//         });
//         if (!organizationExists) {
//             return res.status(404).json({
//             message: "Organization not found",
//             });
//         }

//         const supplier = await Supplier.findById(id);

//         if (!supplier) {
//             return res.status(404).json({ message: "Supplier not found." });
//         }

//         await Supplier.findByIdAndDelete(id);

//         res.status(200).json({ message: "Supplier deleted successfully." });
//         console.log("Supplier deleted successfully:", id);
//     } catch (error) {
//         console.error("Error deleting supplier:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// };

// Update the status of a Supplier based on the provided status value
exports.updateSupplierStatus = async (req, res) => {
  console.log("Update Supplier Status:", req.body);
  try {
    const { supplierId } = req.params;
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

    // Check if the supplier exists
    const supplier = await Supplier.findOne({
      _id: supplierId,
      organizationId: organizationId,
    });
    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    // Update the supplier status with the value provided by the frontend
    supplier.status = status;

    // Save the updated supplier
    await supplier.save();

    res.status(200).json({
      message: "Supplier status updated successfully.",
    });
    console.log("Supplier status updated successfully:");
  } catch (error) {
    console.error("Error updating supplier status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// // Supplier Additional Data
// exports.getSupplierAdditionalData = async (req, res) => {
//   const { organizationId } = req.body;

//   try {
//     // Check if an Organization already exists
//     const organization = await Organization.findOne({ organizationId });
//     if (!organization) {
//       return res.status(404).json({
//         message: "No Organization Found.",
//       });
//     }

//     // Fetch tax data to check tax type
//     const taxData = await Tax.findOne({ organizationId });
//     if (!taxData) {
//       return res.status(404).json({
//         message: "No tax data found for the organization.",
//       });
//     }

//     // Prepare the response object
//     const response = {
//       taxType: taxData.taxType,
//       gstTreatment: [
//         "Registered Business - Regular",
//         "Registered Business - Composition",
//         "Unregistered Business",
//         "Consumer",
//         "Overseas",
//         "Special Economic Zone",
//         "Deemed Export",
//         "Tax Deductor",
//         "SEZ Developer",
//       ],
//       msmeType:[
//         "Micro",
//         "Small",
//         "Medium"
//       ],

//     };

//     // Return the combined response data
//     return res.status(200).json(response);
//   } catch (error) {
//     console.error("Error fetching supplier additional data:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

// Supplier Additional Data
exports.getSupplierAdditionalData = async (req, res) => {
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
      msmeType: [
        "Micro",
        "Small",
        "Medium"
      ],
        // Define the data for percentages
   tds :
  [
    { "name": "Commission or Brokerage", "value": "5" },
    { "name": "Commission or Brokerage (Reduced)", "value": "3.75" },
    { "name": "Dividend", "value": "10" },
    { "name": "Dividend (Reduced)", "value": "7.5" },
    { "name": "Other Interest than securities", "value": "10" },
    { "name": "Other Interest than securities (Reduced)", "value": "7.5" },
    { "name": "Payment of contractors for Others", "value": "2" },
    { "name": "Payment of contractors for Others (Reduced)", "value": "1.5" },
    { "name": "Payment of contractors HUF/Indiv", "value": "1" },
    { "name": "Payment of contractors HUF/Indiv (Reduced)", "value": "0.75" },
    { "name": "Professional Fees", "value": "10" },
    { "name": "Professional Fees (Reduced)", "value": "7.5" },
    { "name": "Rent on land or furniture etc", "value": "10" },
    { "name": "Rent on land or furniture etc (Reduced)", "value": "7.5" },
    { "name": "Technical Fees (2%)", "value": "2" }
  ]
    };

    // Return the combined response data
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching supplier additional data:", error);
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
