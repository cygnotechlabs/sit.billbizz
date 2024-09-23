const Organization = require("../database/model/organization");
const Supplier = require("../database/model/supplier");
const Account = require("../database/model/account");
const Tax = require("../database/model/tax");
const moment = require('moment-timezone');
const Currency = require("../database/model/currency");
const SupplierHistory = require("../database/model/supplierHistory")
const TrialBalance = require("../database/model/trialBalance")




const dataExist = async (organizationId) => {
  const [organizationExists, taxExists, currencyExists, allSupplier] = await Promise.all([
    Organization.findOne({ organizationId }),
    Tax.findOne({ organizationId }),
    Currency.find({ organizationId }, { currencyCode: 1, _id: 0 }),
    Supplier.find({ organizationId })
  ]);
  return { organizationExists, taxExists, currencyExists ,allSupplier};
};

exports.addSupplier = async (req, res) => {
  console.log("Add supplier:", req.body);
  try {
  let {
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

    //Other Details
    pan,
    currency,
    creditOpeningBalance,
    debitOpeningBalance,
    paymentTerms,
    tds,
    creditDays,
    creditLimit,
    interestPercentage,
    documents,
    websiteURL,
    department,
    designation,

    //Tax
    taxType,
    gstTreatment,
    gstin_uin,
    sourceOfSupply,
    businessLegalName,
    businessTradeName,
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

  const userId = "6434bd73222";
  const userName = "Test User";

    organizationId= cleanData(organizationId);
    salutation= cleanData(salutation);
    firstName= cleanData(firstName);
    lastName= cleanData(lastName);

    companyName= cleanData(companyName);
    supplierDisplayName= cleanData(supplierDisplayName);
    supplierEmail= cleanData(supplierEmail);
    workPhone= cleanData(workPhone);
    mobile= cleanData(mobile);

    //Other Details
    pan= cleanData(pan);
    currency= cleanData(currency);
    creditOpeningBalance= cleanData(creditOpeningBalance);
    debitOpeningBalance= cleanData(debitOpeningBalance);
    paymentTerms= cleanData(paymentTerms);
    tds= cleanData(tds);
    creditDays= cleanData(creditDays);
    creditLimit= cleanData(creditLimit);
    interestPercentage= cleanData(interestPercentage);
    documents= cleanData(documents);
    websiteURL= cleanData(websiteURL);
    department= cleanData(department);
    designation= cleanData(designation);

    //Tax
    taxType= cleanData(taxType);
    gstTreatment= cleanData(gstTreatment);
    gstin_uin= cleanData(gstin_uin);
    sourceOfSupply= cleanData(sourceOfSupply);
    businessLegalName= cleanData(businessLegalName);
    businessTradeName= cleanData(businessTradeName);
    msmeType= cleanData(msmeType);
    msmeNumber= cleanData(msmeNumber);
    msmeRegistered= cleanData(msmeRegistered);
    vatNumber= cleanData(vatNumber);


    // Billing Address
    billingAttention= cleanData(billingAttention);
    billingCountry= cleanData(billingCountry);
    billingAddressStreet1= cleanData(billingAddressStreet1);
    billingAddressStreet2= cleanData(billingAddressStreet2);
    billingCity= cleanData(billingCity);
    billingState= cleanData(billingState);
    billingPinCode= cleanData(billingPinCode);
    billingPhone= cleanData(billingPhone);
    billingFaxNum= cleanData(billingFaxNum);

    // Shipping Address
    shippingAttention= cleanData(shippingAttention);
    shippingCountry= cleanData(shippingCountry);
    shippingAddressStreet1= cleanData(shippingAddressStreet1);
    shippingAddressStreet2= cleanData(shippingAddressStreet2);
    shippingCity= cleanData(shippingCity);
    shippingState= cleanData(shippingState);
    shippingPinCode= cleanData(shippingPinCode);
    shippingPhone= cleanData(shippingPhone);
    shippingFaxNum= cleanData(shippingFaxNum);

    // Contact Person
    contactPersons= cleanData(contactPersons);

    //Bank Details
    bankDetails= cleanData(bankDetails);

    //Remark
    remarks= cleanData(remarks);


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
    const validTaxTypes = [taxExists.taxType];
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
    }

    if (sourceOfSupply !== undefined && 
      !validCountries[organizationExists.organizationCountry].includes(
        sourceOfSupply
      )
    ) {
      return res
        .status(400)
        .json({ message: `Invalid Source of Supply: ${sourceOfSupply}` });
    }

    const validationErrors = validateCustomerData({
      salutation,      
      firstName,
      lastName,
      supplierEmail,
      workPhone,
      mobile,
      cardNumber,
      pan,
      debitOpeningBalance,
      creditOpeningBalance,
      department,
      designation,
      taxType,
      msmeType,
      msmeNumber,
      billingCountry,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNum,
      shippingCountry,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNum,
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(", ") });
    }

// const existingSupplier = await Supplier.findOne({
//   supplierEmail,
//    organizationId,
// });
// if (existingSupplier) {
//   return res.status(409).json({
//     message: "Supplier with the provided email already exists.",
//   });
// }

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

  //Other Details
  pan,
  currency,
  //creditOpeningBalance,
  //debitOpeningBalance,
  paymentTerms,
  tds,
  creditDays,
  creditLimit,
  interestPercentage,
  documents,
  websiteURL,
  department,
  designation,

  //Tax
  taxType,
  gstTreatment,
  gstin_uin,
  sourceOfSupply,
  businessLegalName,
  businessTradeName,
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

  createdDate: openingDate,

  //Status
  status: "Active",
});

// Save the supplier to the database
const savedSupplier = await newSupplier.save();

// const existingAccount = await Account.findOne({
//   accountName: companyName,
//   organizationId: organizationId,
// });

// if (existingAccount) {
//   return res.status(409).json({
//     message: "Account with the provided Account Name already exists.",
//   });
// }
 
// Create a new Customer Account
const newAccount = new Account({
  organizationId,
  accountName: supplierDisplayName,
  accountCode: savedSupplier._id,

  accountSubhead: "Sundry Creditors",
  accountHead: "Liabilities",
  accountGroup: "Liability",

  openingBalanceDate: openingDate,
  description: "Suppliers",
});

const savedAccount = await newAccount.save();
res.status(201).json({
  message: "Supplier Added successfully.",
});

//Trial Balance entry
const newTrialEntry = new TrialBalance({
  organizationId,
  operationId: savedSupplier._id,
  date: openingDate,
  accountId: savedAccount._id,
  accountName: savedAccount.accountName,
  action: "Opening Balance",
  debitAmount: debitOpeningBalance,
  creditAmount: creditOpeningBalance,
  remarks: remarks
});

await newTrialEntry.save();


let description;
if(taxType="GST" && gstTreatment && gstin_uin && sourceOfSupply){
description=` ${supplierDisplayName} Contact created with GST Treatment '${gstTreatment}' & GSTIN '${gstin_uin}'. 
State updated to ${sourceOfSupply}.
Created by ${userName}`;
}
else if(taxType="GST" && gstTreatment && sourceOfSupply){
description=` ${supplierDisplayName} Contact created with GST Treatment '${gstTreatment}'. 
State updated to ${sourceOfSupply}.
Created by ${userName}`;
}
else if(taxType="VAT" && vatNumber && sourceOfSupply){
description=` ${supplierDisplayName} Contact created with VAT Number '${vatNumber}'.
State updated to ${sourceOfSupply}.
Created by ${userName}`;
}
else if(taxType="None"){
description=` ${supplierDisplayName} Contact created with Tax Exemption.
Created by ${userName}`;
}

// supplier History entry
const supplierHistoryEntry = new SupplierHistory({
organizationId,
operationId:newSupplier._id,
supplierId:newSupplier._id,
supplierDisplayName,
date: openingDate,
title: "Supplier Added",
description: description,
userId: userId,
userName: userName,
});

await supplierHistoryEntry.save();

let description1; 

if(debitOpeningBalance !==undefined && debitOpeningBalance){
description1=` ${supplierDisplayName} Account created with Opening Balance (Debit):'${debitOpeningBalance}'.
Created by ${userName}`;
}
else if(creditOpeningBalance !==undefined && creditOpeningBalance){
description1=` ${supplierDisplayName} Account created with Opening Balance (Credit):'${creditOpeningBalance}'.
Created by ${userName}`;
}

// supplier History entry
const accountsupplierHistoryEntry = new SupplierHistory({
organizationId,
operationId:newAccount._id,
supplierId:newSupplier._id,
supplierDisplayName,
date: openingDate,
title: "Supplier Account Created",
description: description1,
userId: userId,
userName: userName,
});

await accountsupplierHistoryEntry.save();
 


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
    // console.log(suppliers);

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
          message: "Supplier not found",
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
    let {
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

      pan,
      currency,
      openingBalance,
      paymentTerms,
      tds,
      creditDays,
      creditLimit,
      interestPercentage,
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

    const userId = "6434bd73222";
    const userName = "Test User";

    organizationId= cleanData(organizationId);
    salutation= cleanData(salutation);
    firstName= cleanData(firstName);
    lastName= cleanData(lastName);

    companyName= cleanData(companyName);
    supplierDisplayName= cleanData(supplierDisplayName);
    supplierEmail= cleanData(supplierEmail);
    workPhone= cleanData(workPhone);
    mobile= cleanData(mobile);

    //Other Details
    pan= cleanData(pan);
    currency= cleanData(currency);
    creditOpeningBalance= cleanData(creditOpeningBalance);
    debitOpeningBalance= cleanData(debitOpeningBalance);
    paymentTerms= cleanData(paymentTerms);
    tds= cleanData(tds);
    creditDays= cleanData(creditDays);
    creditLimit= cleanData(creditLimit);
    interestPercentage= cleanData(interestPercentage);
    documents= cleanData(documents);
    websiteURL= cleanData(websiteURL);
    department= cleanData(department);
    designation= cleanData(designation);

    //Tax
    taxType= cleanData(taxType);
    gstTreatment= cleanData(gstTreatment);
    gstin_uin= cleanData(gstin_uin);
    sourceOfSupply= cleanData(sourceOfSupply);
    businessLegalName= cleanData(businessLegalName);
    businessTradeName= cleanData(businessTradeName);
    msmeType= cleanData(msmeType);
    msmeNumber= cleanData(msmeNumber);
    msmeRegistered= cleanData(msmeRegistered);
    vatNumber= cleanData(vatNumber);


    // Billing Address
    billingAttention= cleanData(billingAttention);
    billingCountry= cleanData(billingCountry);
    billingAddressStreet1= cleanData(billingAddressStreet1);
    billingAddressStreet2= cleanData(billingAddressStreet2);
    billingCity= cleanData(billingCity);
    billingState= cleanData(billingState);
    billingPinCode= cleanData(billingPinCode);
    billingPhone= cleanData(billingPhone);
    billingFaxNum= cleanData(billingFaxNum);

    // Shipping Address
    shippingAttention= cleanData(shippingAttention);
    shippingCountry= cleanData(shippingCountry);
    shippingAddressStreet1= cleanData(shippingAddressStreet1);
    shippingAddressStreet2= cleanData(shippingAddressStreet2);
    shippingCity= cleanData(shippingCity);
    shippingState= cleanData(shippingState);
    shippingPinCode= cleanData(shippingPinCode);
    shippingPhone= cleanData(shippingPhone);
    shippingFaxNum= cleanData(shippingFaxNum);

    // Contact Person
    contactPersons= cleanData(contactPersons);

    //Bank Details
    bankDetails= cleanData(bankDetails);

    //Remark
    remarks= cleanData(remarks);



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
    
    
        

    // // Find the existing supplier to check for duplicates or to reject if not found
    const existingSupplier = await Supplier.findById(supplierId);
    if (!existingSupplier) {
      console.log("Supplier not found with ID:", supplierId);
      return res.status(404).json({ message: "Supplier not found." });
    }

    const oldSupplierDisplayName = existingSupplier.supplierDisplayName;

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

    const validCurrencies = currencyExists.map(
      (currency) => currency.currencyCode
    );
    const validTaxTypes = [taxExists.taxType];
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
    }

    if (sourceOfSupply !== undefined && 
      !validCountries[organizationExists.organizationCountry].includes(
        sourceOfSupply
      )
    ) {
      return res
        .status(400)
        .json({ message: `Invalid Source of Supply: ${sourceOfSupply}` });
    }

    const validationErrors = validateCustomerData({
      salutation,      
      firstName,
      lastName,
      supplierEmail,
      workPhone,
      mobile,
      cardNumber,
      pan,
      debitOpeningBalance,
      creditOpeningBalance,
      department,
      designation,
      taxType,
      msmeType,
      msmeNumber,
      billingCountry,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNum,
      shippingCountry,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNum,
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(", ") });
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

      pan,
      currency,
      openingBalance,
      paymentTerms,
      tds,
      creditDays,
      creditLimit,
      interestPercentage,
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

    // Update the supplierDisplayName in associated Account documents
    if (supplierDisplayName && supplierDisplayName !== oldSupplierDisplayName) {
      const updatedAccount = await Account.updateMany(
        {
          accountName: oldSupplierDisplayName, // Match the old supplierDisplayName
          organizationId: organizationId, // Match the organizationId from the request
        },
        { $set: { accountName: supplierDisplayName } } // Update with the new supplierDisplayName
      );
      console.log(
        `${updatedAccount.modifiedCount} account associated with the accountName have been updated with the new supplierDisplayName.`
      );
    }

    // // Update the supplierDisplayName in associated Account documents if it has changed
    // if (
    //   supplierDisplayName &&
    //   supplierDisplayName !== existingSupplier.supplierDisplayName
    // ) {
    //   // Check if the new supplierDisplayName already exists in Account
    //   const existingAccount = await Account.findOne({
    //     accountName: supplierDisplayName,
    //     organizationId: organizationId,
    //   });

    //   if (existingAccount) {
    //     // If found, return an error indicating a conflict
    //     return res
    //       .status(400)
    //       .json({
    //         message:
    //           "The new supplier display name already exists in Account records",
    //       });
    //   } else {
    //     // If not found, proceed with renaming the account
    //     const updatedAccount = await Account.updateMany(
    //       {
    //         accountName: existingSupplier.supplierDisplayName,
    //         organizationId: organizationId,
    //       },
    //       { $set: { accountName: supplierDisplayName } }
    //     );
    //     console.log(
    //       `${updatedAccount.modifiedCount} account(s) associated with the old supplierDisplayName have been updated with the new supplierDisplayName.`
    //     );
    //   }
    // }

    // Supplier History entry
const accountsupplierHistoryEntry = new SupplierHistory({
  organizationId,
  operationId:updatedSupplier._id,
  supplierId:supplierId,
  supplierDisplayName:savedCustomer.supplierDisplayName,
  date: openingDate,
  title: "Supplier Data Modified",
  description: ` ${updatedSupplier.supplierDisplayName} Account Modified by ${userName}`,
  userId: userId,
  userName: userName,
});

await accountcustomerHistoryEntry.save();

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


exports.getOneSupplierHistory = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const { organizationId } = req.body;

    const {organizationExists} = await dataExist(organizationId);

    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // Find the Customer History by CustomerId and organizationId
    const supplierHistory = await SupplierHistory.find({
      supplierId,
      organizationId,
    });

    if (!supplierHistory) {
      return res.status(404).json({
        message: "Supplier History not found",
      });
    }

    res.status(200).json(supplierHistory);
  } catch (error) {
    console.error("Error fetching Supplier:", error);
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




// Validation functions
const validSalutations = ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."];
const validmsmeType = [
  "Micro",
  "Small",
  "Medium"
];
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

  if (data.firstName !== undefined &&  !isAlphabets(data.firstName))
    errors.push("First Name should contain only alphabets.");
  if (data.lastName !== undefined && !isAlphabets(data.lastName))
    errors.push("Last Name should contain only alphabets.");

  if (data.supplierEmail !== undefined && !isValidEmail(data.supplierEmail))
    errors.push(`Invalid email: ${data.supplierEmail}`);
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

  if (data.msmeType !== undefined && !validmsmeType.includes(data.msmeType))
    errors.push(`Invalid MSME Type: ${data.msmeType}`);
  if (data.msmeNumber !== undefined && !isAlphanumeric(data.msmeNumber))
    errors.push(`Invalid MSME Number: ${data.msmeNumber}`);

  if (data.billingCountry !== undefined && data.billingState !== undefined && !validCountries[data.billingCountry]?.includes(data.billingState))
    errors.push(
      `Invalid Billing Country or State: ${data.billingCountry}, ${data.billingState}`
    );
  if (data.billingPinCode !== undefined && !isInteger(data.billingPinCode))
    errors.push(`Invalid Billing Pin Code: ${data.billingPinCode}`);
  if (data.billingPhone !== undefined && !isInteger(data.billingPhone))
    errors.push(`Invalid Billing Phone: ${data.billingPhone}`);
  if (data.billingFaxNum !== undefined && !isInteger(data.billingFaxNum))
    errors.push(`Invalid Billing Fax Number: ${data.billingFaxNum}`);

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


  return errors;
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

function isValidDate(value) {
  return !isNaN(Date.parse(value));
}



function cleanData(value) {
  return value === null || value === undefined || value === "" || value === 0
    ? undefined
    : value;
}