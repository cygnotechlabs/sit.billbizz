const Organization = require("../database/model/organization");
const Supplier = require("../database/model/supplier");
const Account = require("../database/model/account");
const Tax = require("../database/model/tax");

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
    gstTreatment,
    gstin_uin,
    sourceOfSupply,
    msmeType,
    msmeNumber,
    msmeRegistered,

    // Billing Address
    billingAttention,
    billingCountry,
    billingAddress,
    billingCity,
    billingState,
    billingPinCode,
    billingPhone,
    billingFaxNum,

    // Shipping Address
    shippingAttention,
    shippingCountry,
    shippingAddress,
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

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

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
      createdDate: formattedDate,
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
      gstTreatment,
      gstin_uin,
      sourceOfSupply,
      msmeType,
      msmeNumber,
      msmeRegistered,

      // Billing Address
      billingAttention,
      billingCountry,
      billingAddress,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNum,

      // Shipping Address
      shippingAttention,
      shippingCountry,
      shippingAddress,
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
      openingBalanceDate: formattedDate,
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

      // Other Details
      pan,
      currency,
      openingBalance,
      paymentTerms,
      tds,
      documents,
      websiteURL,
      department,
      designation,

      // Tax
      gstTreatment,
      gstin_uin,
      sourceOfSupply,
      msmeType,
      msmeNumber,

      // Billing Address
      billingAttention,
      billingCountry,
      billingAddress,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNum,

      // Shipping Address
      shippingAttention,
      shippingCountry,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNum,

      // Contact Person
      contactPersons,

      // Bank Details
      bankDetails,

      // Remark
      remarks,

      status,
    } = req.body;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    // Validate organizationId
    const organizationExists = await Organization.findOne({ organizationId });
    if (!organizationExists) {
      return res.status(404).json({ message: "Organization not found" });
    }

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
      gstTreatment,
      gstin_uin,
      sourceOfSupply,
      msmeType,
      msmeNumber,
      billingAttention,
      billingCountry,
      billingAddress,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNum,
      shippingAttention,
      shippingCountry,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNum,
      contactPersons,
      bankDetails,
      remarks,
      status,
      lastModifiedDate: formattedDate,
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
    };

    // Return the combined response data
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching supplier additional data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
