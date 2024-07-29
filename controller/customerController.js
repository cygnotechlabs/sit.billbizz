const Organization = require("../database/model/organization");
const Account = require("../database/model/account");
const Customer = require("../database/model/customer");



exports.addCustomer = async (req, res) => {
  console.log("Add Customer:", req.body);
  try {
    const {
      organizationId,
      customerType,
      salutation,
      firstName,
      lastName,
      companyName,
      customerEmail,
      workPhone,
      mobile,
      dob,
      cardNumber,
      pan,
      currency,
      openingBalance,
      paymentTerms,
      documents,
      websiteURL,
      department,
      twitter,
      skypeNameNumber,
      facebook,
      billingAttention,
      billingCountry,
      billingAddress,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNumber,
      shippingAttention,
      shippingCountry,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNumber,
      contactPerson,
      remark,
    } = req.body;

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    // Validate organizationId
    const organizationExists = await Organization.findOne({
      organizationId: organizationId,
    });
    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // Check if customer with the same email already exists in the organization
    // const existingCustomer = await Customer.findOne({
    //   customerEmail: customerEmail,
    //   organizationId: organizationId,
    // });
    // if (existingCustomer) {
    //   return res.status(409).json({
    //     message: "Customer with the provided email already exists.",
    //   });
    // }

    // Create a new customer
    const newCustomer = new Customer({
      organizationId,
      customerType,
      salutation,
      firstName,
      lastName,
      companyName,
      customerEmail,
      workPhone,
      mobile,
      status: "Active",
      dob,
      cardNumber,
      pan,
      currency,
      openingBalance,
      paymentTerms,
      documents,
      websiteURL,
      department,
      twitter,
      skypeNameNumber,
      facebook,
      billingAttention,
      billingCountry,
      billingAddress,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNumber,
      shippingAttention,
      shippingCountry,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNumber,
      contactPerson,
      remark,
    });

    
    const savedCustomer = await newCustomer.save();

    // Create a new Customer Account
    const newAccount = new Account({
      organizationId,
      accountName: firstName + " " + lastName,
      accountCode: savedCustomer._id,

      accountSubhead: "Sundry Debtors",
      accountHead: "Asset",
      accountGroup: "Asset",

      openingBalance: openingBalance,
      openingBalanceDate: formattedDate,
      description:"Customer"
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

// Get all Customer for a given organizationId
exports.getAllCustomer = async (req, res) => {
  try {
    const { organizationId } = req.body;

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
      organizationId,
      customerType,
      salutation,
      firstName,
      lastName,
      companyName,
      customerEmail,
      workPhone,
      mobile,
      dob,
      cardNumber,
      pan,
      currency,
      openingBalance,
      paymentTerms,
      documents,
      websiteURL,
      department,
      twitter,
      skypeNameNumber,
      facebook,
      billingAttention,
      billingCountry,
      billingAddress,
      billingCity,
      billingState,
      billingPinCode,
      billingPhone,
      billingFaxNumber,
      shippingAttention,
      shippingCountry,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPinCode,
      shippingPhone,
      shippingFaxNumber,
      contactPerson,
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

    // Update customer details
    customer.customerType = customerType || customer.customerType;
    customer.salutation = salutation || customer.salutation;
    customer.firstName = firstName || customer.firstName;
    customer.lastName = lastName || customer.lastName;
    customer.companyName = companyName || customer.companyName;
    customer.customerEmail = customerEmail || customer.customerEmail;
    customer.workPhone = workPhone || customer.workPhone;
    customer.mobile = mobile || customer.mobile;
    customer.dob = dob || customer.dob;
    customer.cardNumber = cardNumber || customer.cardNumber;
    customer.pan = pan || customer.pan;
    customer.currency = currency || customer.currency;
    customer.openingBalance = openingBalance || customer.openingBalance;
    customer.paymentTerms = paymentTerms || customer.paymentTerms;
    customer.documents = documents || customer.documents;
    customer.websiteURL = websiteURL || customer.websiteURL;
    customer.department = department || customer.department;
    customer.twitter = twitter || customer.twitter;
    customer.skypeNameNumber = skypeNameNumber || customer.skypeNameNumber;
    customer.facebook = facebook || customer.facebook;
    customer.billingAttention = billingAttention || customer.billingAttention;
    customer.billingCountry = billingCountry || customer.billingCountry;
    customer.billingAddress = billingAddress || customer.billingAddress;
    customer.billingCity = billingCity || customer.billingCity;
    customer.billingState = billingState || customer.billingState;
    customer.billingPinCode = billingPinCode || customer.billingPinCode;
    customer.billingPhone = billingPhone || customer.billingPhone;
    customer.billingFaxNumber = billingFaxNumber || customer.billingFaxNumber;
    customer.shippingAttention = shippingAttention || customer.shippingAttention;
    customer.shippingCountry = shippingCountry || customer.shippingCountry;
    customer.shippingAddress = shippingAddress || customer.shippingAddress;
    customer.shippingCity = shippingCity || customer.shippingCity;
    customer.shippingState = shippingState || customer.shippingState;
    customer.shippingPinCode = shippingPinCode || customer.shippingPinCode;
    customer.shippingPhone = shippingPhone || customer.shippingPhone;
    customer.shippingFaxNumber = shippingFaxNumber || customer.shippingFaxNumber;
    customer.contactPerson = contactPerson || customer.contactPerson;
    customer.remark = remark || customer.remark;

    await customer.save();

    res.status(200).json({
      message: "Customer updated successfully.",
    });
    console.log("Customer updated successfully:");
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Delete Customer
exports.deleteCustomer = async (req, res) => {
  console.log("Delete Customer:", req.body);
  try {
    const { customerId } = req.params;
    const { organizationId } = req.body;

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

    // Delete the customer
    await Customer.deleteOne({
      _id: customerId,
      organizationId: organizationId,
    });

    res.status(200).json({
      message: "Customer deleted successfully.",
    });
    console.log("Customer deleted successfully:");
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
