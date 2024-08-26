const Organization = require("../database/model/organization");
const Client = require("../database/model/client");
const User = require("../database/model/user");
const Prefix = require("../database/model/prefix");
const Account = require("../database/model/account")
const Currency = require("../database/model/currency")
const Journal = require("../database/model/journal");
const TrialBalance = require("../database/model/trialBalance");
const Setting = require("../database/model/settings");
const PaymentTerms = require("../database/model/paymentTerm");
const Role = require('../database/model/role');
const Tax = require('../database/model/tax');
const bcrypt = require('bcrypt');





// Auto create Roles
const createRolesForOrganization = async (organizationId) => {
  try {
    
    // Check if the roles already exist for the organization
    const existingRoles = await Role.find({ organizationId:organizationId });
    
    if (existingRoles.length > 0) {
      console.log("Roles already exist for this organization.");
      return { success: true, message: "Roles already exist for this organization." };
    }

    // Create admin and staff roles
    const roles = [
      {
        organizationId,
        description: 'Admin',
        roleName: 'Admin',
        permissions: [
          // Customers
          { action: "CustomersView", note: "Viewed customer details" },
          { action: "CustomersCreate", note: "Created a new customer" },
          { action: "CustomersEdit", note: "Edited customer information" },
          { action: "CustomersDelete", note: "Deleted a customer" },
    
          // Vendors
          { action: "VendorsView", note: "Viewed vendor details" },
          { action: "VendorsCreate", note: "Created a new vendor" },
          { action: "VendorsEdit", note: "Edited vendor information" },
          { action: "VendorsDelete", note: "Deleted a vendor" },
    
          // Item
          { action: "ItemView", note: "Viewed item details" },
          { action: "ItemCreate", note: "Created a new item" },
          { action: "ItemEdit", note: "Edited item information" },
          { action: "ItemDelete", note: "Deleted an item" },
    
          // Inventory Adjustments
          { action: "InventoryAdjustmentsView", note: "Viewed inventory adjustments" },
          { action: "InventoryAdjustmentsCreate", note: "Created inventory adjustment" },
          { action: "InventoryAdjustmentsDelete", note: "Deleted inventory adjustment" },
    
          // Warehouses
          { action: "WarehousesView", note: "Viewed warehouse details" },
          { action: "WarehousesCreate", note: "Created a new warehouse" },
          { action: "WarehousesEdit", note: "Edited warehouse information" },
          { action: "WarehousesDelete", note: "Deleted a warehouse" },
    
          // Price List
          { action: "PriceListView", note: "Viewed price list" },
          { action: "PriceListCreate", note: "Created a new price list" },
          { action: "PriceListEdit", note: "Edited price list" },
          { action: "PriceListDelete", note: "Deleted a price list" },
    
          // Banking
          { action: "BankingView", note: "Viewed banking details" },
          { action: "BankingCreate", note: "Created a new banking entry" },
          { action: "BankingEdit", note: "Edited banking details" },
          { action: "BankingDelete", note: "Deleted banking entry" },
    
          // Invoices
          { action: "InvoicesView", note: "Viewed invoice details" },
          { action: "InvoicesCreate", note: "Created a new invoice" },
          { action: "InvoicesEdit", note: "Edited invoice details" },
          { action: "InvoicesDelete", note: "Deleted an invoice" },
    
          // Customer Payments
          { action: "CustomerPaymentsView", note: "Viewed customer payments" },
          { action: "CustomerPaymentsCreate", note: "Created a new customer payment" },
          { action: "CustomerPaymentsEdit", note: "Edited customer payment details" },
          { action: "CustomerPaymentsDelete", note: "Deleted customer payment" },
    
          // Quotes
          { action: "QuotesView", note: "Viewed quotes" },
          { action: "QuotesCreate", note: "Created a new quote" },
          { action: "QuotesEdit", note: "Edited quote details" },
          { action: "QuotesDelete", note: "Deleted a quote" },
    
          // Delivery Challan
          { action: "DeliveryChallanView", note: "Viewed delivery challan" },
          { action: "DeliveryChallanCreate", note: "Created a new delivery challan" },
          { action: "DeliveryChallanEdit", note: "Edited delivery challan details" },
          { action: "DeliveryChallanDelete", note: "Deleted a delivery challan" },
    
          // Sales Orders
          { action: "SalesOrdersView", note: "Viewed sales orders" },
          { action: "SalesOrdersCreate", note: "Created a new sales order" },
          { action: "SalesOrdersEdit", note: "Edited sales order details" },
          { action: "SalesOrdersDelete", note: "Deleted a sales order" },
    
          // Credit Notes
          { action: "CreditNotesView", note: "Viewed credit notes" },
          { action: "CreditNotesCreate", note: "Created a new credit note" },
          { action: "CreditNotesEdit", note: "Edited credit note details" },
          { action: "CreditNotesDelete", note: "Deleted a credit note" },
    
          // Bills
          { action: "BillsView", note: "Viewed bills" },
          { action: "BillsCreate", note: "Created a new bill" },
          { action: "BillsEdit", note: "Edited bill details" },
          { action: "BillsDelete", note: "Deleted a bill" },
    
          // Vendor Payments
          { action: "VendorPaymentsView", note: "Viewed vendor payments" },
          { action: "VendorPaymentsCreate", note: "Created a new vendor payment" },
          { action: "VendorPaymentsEdit", note: "Edited vendor payment details" },
          { action: "VendorPaymentsDelete", note: "Deleted a vendor payment" },
    
          // Expenses
          { action: "ExpensesView", note: "Viewed expenses" },
          { action: "ExpensesCreate", note: "Created a new expense" },
          { action: "ExpensesEdit", note: "Edited expense details" },
          { action: "ExpensesDelete", note: "Deleted an expense" },
    
          // Purchase Orders
          { action: "PurchaseOrdersView", note: "Viewed purchase orders" },
          { action: "PurchaseOrdersCreate", note: "Created a new purchase order" },
          { action: "PurchaseOrdersEdit", note: "Edited purchase order details" },
          { action: "PurchaseOrdersDelete", note: "Deleted a purchase order" },
    
          // Vendor Credits
          { action: "VendorCreditsView", note: "Viewed vendor credits" },
          { action: "VendorCreditsCreate", note: "Created a new vendor credit" },
          { action: "VendorCreditsEdit", note: "Edited vendor credit details" },
          { action: "VendorCreditsDelete", note: "Deleted a vendor credit" },
    
          // Chart of Accounts
          { action: "ChartofAccountsView", note: "Viewed chart of accounts" },
          { action: "ChartofAccountsCreate", note: "Created a new chart of accounts" },
          { action: "ChartofAccountsEdit", note: "Edited chart of accounts details" },
          { action: "ChartofAccountsDelete", note: "Deleted chart of accounts" },
    
          // Journals
          { action: "JournalsView", note: "Viewed journals" },
          { action: "JournalsCreate", note: "Created a new journal" },
          { action: "JournalsEdit", note: "Edited journal details" },
          { action: "JournalsDelete", note: "Deleted a journal" },
    
          // Budget
          { action: "BudgetView", note: "Viewed budget" },
          { action: "BudgetCreate", note: "Created a new budget" },
          { action: "BudgetEdit", note: "Edited budget details" },
          { action: "BudgetDelete", note: "Deleted a budget" },
    
          // Tasks
          { action: "TasksView", note: "Viewed tasks" },
          { action: "TasksCreate", note: "Created a new task" },
          { action: "TasksEdit", note: "Edited task details" },
          { action: "TasksDelete", note: "Deleted a task" },
    
          // Projects
          { action: "ProjectsView", note: "Viewed projects" },
          { action: "ProjectsCreate", note: "Created a new project" },
          { action: "ProjectsEdit", note: "Edited project details" },
          { action: "ProjectsDelete", note: "Deleted a project" },
    
          // GST
          { action: "GSTViewReturnDetails", note: "Viewed GST return details" },
          { action: "GSTPushTransactions", note: "Pushed GST transactions" },
          { action: "GSTReconcileTransactions", note: "Reconciled GST transactions" },
          { action: "GSTFileReturns", note: "Filed GST returns" },
    
          // Documents
          { action: "DocumentsViewDocuments", note: "Viewed documents" },
          { action: "DocumentsUploadDocuments", note: "Uploaded documents" },
          { action: "DocumentsDeleteDocuments", note: "Deleted documents" },
          { action: "DocumentsManageFolder", note: "Managed document folders" },
    
          // e-Way Bill
          { action: "GenerateEWayBill", note: "Generated an e-Way bill" },
          { action: "CancelEWayBill", note: "Cancelled an e-Way bill" },
    
          // Settings
          { action: "UpdateOrganizationProfile", note: "Updated organization profile" },
          { action: "Users", note: "Managed users" },
          { action: "ExportData", note: "Exported data" },
          { action: "GeneralPreferences", note: "Updated general preferences" },
          { action: "AccountantPreferences", note: "Updated accountant preferences" },
          { action: "Taxes", note: "Managed taxes" },
          { action: "ProvideAccessToProtectedData", note: "Provided access to protected data" },
          { action: "PaymentTerms", note: "Managed payment terms" },
          { action: "Templates", note: "Managed templates" },
          { action: "EmailTemplate", note: "Managed email templates" },
          { action: "ReportingTags", note: "Managed reporting tags" },
          { action: "ManageIntegration", note: "Managed integrations" },
          { action: "Automation", note: "Managed automation" },
          { action: "IncomingWebhook", note: "Managed incoming webhook" },
          { action: "Signal", note: "Managed signal settings" },
    
          // Dashboard
          { action: "TotalPayables", note: "Viewed total payables" },
          { action: "TotalReceivables", note: "Viewed total receivables" },
          { action: "CashFlow", note: "Viewed cash flow" },
          { action: "IncomeAndExpenses", note: "Viewed income and expenses" },
          { action: "YourTopExpense", note: "Viewed top expense" },
          { action: "Projects", note: "Viewed projects on dashboard" },
          { action: "BankAndCreditCards", note: "Viewed bank and credit cards" },
          { action: "AccountWatchlist", note: "Viewed account watchlist" },
        ],
      },
    ];
    

    await Role.insertMany(roles);
    console.log("Roles created successfully for organization:", organizationId);
    return { success: true, message: "Roles created successfully." };

  } catch (error) {
    console.error("Error creating roles:", error);
    return { success: false, message: "Failed to create roles." };
  }
};





// Auto create Currency
const createCurrencyForOrganization = async (organizationId) => {
  try {
    
    // Check if the Currency already exist for the organization
    const existingRoles = await Currency.find({ organizationId:organizationId });
    
    if (existingRoles.length > 0) {
      console.log("Currency already exist for this organization.");
      return { success: true, message: "Currency already exist for this organization." };
    }

    // Create Currency 
    const currencies = [
      { organizationId, currencyCode: 'AED',currencySymbol: 'AED',currencyName: 'UAE Dirham',decimalPlaces: '2',format: '1,234,567.89',baseCurrency:false},
      { organizationId, currencyCode: 'AUD',currencySymbol: '$',currencyName: 'Australian Dollar',decimalPlaces: '2',format: '1,234,567.89',baseCurrency:false},
      { organizationId, currencyCode: 'CAD',currencySymbol: '$',currencyName: 'Canadian Dollar',decimalPlaces: '2',format: '1,234,567.89',baseCurrency:false},
      { organizationId, currencyCode: 'CNY',currencySymbol: 'CNY',currencyName: 'Yuan Renminbi',decimalPlaces: '2',format: '1,234,567.89',baseCurrency:false},
      { organizationId, currencyCode: 'EUR',currencySymbol: '€',currencyName: 'Euro',decimalPlaces: '2',format: '1,234,567.89',baseCurrency:false},
      { organizationId, currencyCode: 'GBP',currencySymbol: '£',currencyName: 'Pound Sterling',decimalPlaces: '2',format: '1,234,567.89',baseCurrency:false},
      { organizationId, currencyCode: 'INR',currencySymbol: '₹',currencyName: 'Indian Rupee',decimalPlaces: '2',format: '1,234,567.89',baseCurrency:false},
      { organizationId, currencyCode: 'JPY',currencySymbol: '¥',currencyName: 'Japanese Yen',decimalPlaces: '2',format: '1,234,567.89',baseCurrency:false},
      { organizationId, currencyCode: 'SAR',currencySymbol: 'SAR',currencyName: 'Saudi Riyal',decimalPlaces: '2',format: '1,234,567.89',baseCurrency:false},
      { organizationId, currencyCode: 'USD',currencySymbol: '$',currencyName: 'United States Dollar',decimalPlaces: '2',format: '1,234,567.89',baseCurrency:false},
      { organizationId, currencyCode: 'ZAR',currencySymbol: 'R',currencyName: 'South African Rand',decimalPlaces: '2',format: '1,234,567.89',baseCurrency:false}
            
    ];

    await Currency.insertMany(currencies);
    console.log("Currency created successfully for organization:", organizationId);
    return { success: true, message: "Currency created successfully." };

  } catch (error) {
    console.error("Error creating roles:", error);
    return { success: false, message: "Failed to create roles." };
  }
};





//Auto create Payment terms
const createPaymentTermForOrganization = async (organizationId) => {
  try {
    
    // Check if the Payment terms already exist for the organization
    const existingPaymentTerm = await PaymentTerms.find({ organizationId:organizationId });
    
    if (existingPaymentTerm.length > 0) {
      console.log("Payment Terms already exist for this organization.");
      return { success: true, message: "Payment Terms already exist for this organization." };
    }

    // Create Payment terms
    const paymentTerm = [
      { organizationId, name: 'Due on Receipt',description:"Payment is required immediately after receiving the invoice"},
      { organizationId, name: 'Due end of the month',description:"Payment is due by the last day of the month in which the invoice is issued"},
      { organizationId, name: 'Due end of next month',description:"Payment is due by the last day of the next month in which the invoice is issued"},
      { organizationId, name: 'Net 15',days: '15',description:"Payment is due within 15 days from the invoice "},
      { organizationId, name: 'Net 30',days: '30',description:"Payment is due within 30 days from the invoice "},
      { organizationId, name: 'Net 45',days: '45',description:"Payment is due within 45 days from the invoice "},
      { organizationId, name: 'Net 60',days: '60',description:"Payment is due within 60 days from the invoice "},
                  
    ];

    await PaymentTerms.insertMany(paymentTerm);
    console.log("Payment Terms created successfully for organization:", organizationId);
    return { success: true, message: "Payment Terms created successfully." };

  } catch (error) {
    console.error("Error creating roles:", error);
    return { success: false, message: "Failed to create roles." };
  }
};





//Auto create Prefix 
const createPrefixForOrganization = async (organizationId) => {
  try {
    
    // Check if the Prefix already exist for the organization
    const existingPrefix = await Prefix.find({ organizationId:organizationId });
    
    if (existingPrefix.length > 0) {
      console.log("Prefix already exist for this organization.");
      return { success: true, message: "Prefix already exist for this organization." };
    }

    // Create Prefix
    const prefix = [
      { organizationId, series: [{
        seriesName: 'Default Series',
        status:true,
        journal:"JN-",journalNum:1,        
        creditNote: "CN-",creditNoteNum: 1,        
        customerPayment: 'CP-',customerPaymentNum: 1,
        purchaseOrder: "PO-",purchaseOrderNum: 1,        
        salesOrder: "SO-",salesOrderNum: 1,
        vendorPayment: "VP-",vendorPaymentNum: 1,
        retainerInvoice: "RET-",retainerInvoiceNum: 1,
        vendorCredits: "DN-",vendorCreditsNum: 1,
        billOfSupply: "BOS-",billOfSupplyNum: 1,
        debitNote: "CDN-",debitNoteNum: 1,
        invoice:"INV-",invoiceNum: 1,
        quote: "QT-",quoteNum: 1,        
        deliveryChallan: "DC-",deliveryChallanNum: 1,  }]},            
    ];

    await Prefix.insertMany(prefix);
    console.log("Prefix created successfully for organization:", organizationId);
    return { success: true, message: "Prefix created successfully." };

  } catch (error) {
    console.error("Error creating roles:", error);
    return { success: false, message: "Failed to create roles." };
  }
};





//Auto create Tax 
const createTaxForOrganization = async (organizationId) => {
  try {
    
    // Check if the tax already exist for the organization
    const existingTax = await Tax.find({ organizationId:organizationId });
    
    if (existingTax.length > 0) {
      console.log("Tax already exist for this organization.");
      return { success: true, message: "Tax already exist for this organization." };
    }

    // Create Tax
    const tax = [
      { organizationId,taxType:"",gstTaxRate:[
        {taxName: " GST0",taxRate:0,cgst:0,sgst:0,igst:0},
        {taxName: " GST5",taxRate:5,cgst:2.5,sgst:2.5,igst:5},
        {taxName: " GST12",taxRate:12,cgst:6,sgst:6,igst:12},
        {taxName: " GST18",taxRate:18,cgst:9,sgst:9,igst:18},
        {taxName: " GST28",taxRate:28,cgst:14,sgst:14,igst:28},],
        vatTaxRate:[
          {taxName: "VAT0",taxRate:0,},
          {taxName: "VAT5",taxRate:5,},
          {taxName: "VAT10",taxRate:10,},
          {taxName: "VAT15",taxRate:15,},
          {taxName: "VAT20",taxRate:20,},
        ]    
    }];

    await Tax.insertMany(tax);
    console.log("Tax created successfully for organization:", organizationId);
    return { success: true, message: "Tax created successfully." };

  } catch (error) {
    console.error("Error creating roles:", error);
    return { success: false, message: "Failed to create tax." };
  }
};






// Auto create Settings
const createSettingsOrganization = async (organizationId) => {
  try {
    
    // Check if the Settings already exist for the organization
    const existingSettings = await Setting.find({ organizationId:organizationId });
    
    if (existingSettings.length > 0) {
      console.log("Settings already exist for this organization.");
      return { success: true, message: "Settings already exist for this organization." };
    }

    // Create settings
    const settings = [
      {organizationId,
      //item  
      itemDuplicateName:false, hsnSac:false, priceList:false, priceListAtLineLevel:false, compositeItem:false,
      stockBelowZero:false, OutOfStockBelowZero :false, notifyReorderPoint:false, trackCostOnItems:false,}
         
    ];

    await Setting.insertMany(settings);
    console.log("Settings created successfully for organization:", organizationId);
    return { success: true, message: "Settings created successfully." };

  } catch (error) {
    console.error("Error creating roles:", error);
    return { success: false, message: "Failed to create tax." };
  }
};




















// Create New Client, Organization, Prefix, Role
exports.createOrganizationAndClient = async (req, res) => {
  console.log("Create Organization and Client:", req.body);
  try {
    const {
      organizationName,
      contactName,
      contactNum,
      email,
      password,
      // Add other fields as needed
    } = req.body;

    // Check if an organization with the same organizationName already exists
    const existingOrganization = await Organization.findOne({ organizationName });

    if (existingOrganization) {
      return res.status(409).json({
        message: "Organization with the provided name already exists.",
      });
    }

    const clientExists = await Client.findOne({
      email:email,
    });
    if (clientExists) {
      return res.status(404).json({
        message: "Client Exists",
      });
    }
    

    // Count existing organizations to generate the next organizationId
    const organizationCount = await Organization.countDocuments({});
    const nextIdNumber = organizationCount + 1;
    const organizationId = `INDORG${nextIdNumber.toString().padStart(4, '0')}`;

    // Create a new organization
    const newOrganization = new Organization({
      organizationId,
      organizationName,
      primaryContactName: contactName,
      primaryContactNum: contactNum,
    });

    let savedOrganization = await newOrganization.save();

    if (!savedOrganization) {
      console.error("Organization could not be saved.");
      return res.status(500).json({ message: "Failed to create organization." });
    }

    // Create roles for the organization
    const roleCreationResult = await createRolesForOrganization(organizationId);
    if (!roleCreationResult.success) {
      return res.status(500).json({ message: roleCreationResult.message });
    }

    // Create Currency for the organization
    const currencyCreationResult = await createCurrencyForOrganization(organizationId);
    if (!currencyCreationResult.success) {
      return res.status(500).json({ message: currencyCreationResult.message });
    }

    // Create Payment Term for the organization
    const paymentTermCreationResult = await createPaymentTermForOrganization(organizationId);
    if (!paymentTermCreationResult.success) {
      return res.status(500).json({ message: paymentTermCreationResult.message });
    }
    
    
    // Create Settings for the organization
    const settingsCreationResult = await createSettingsOrganization(organizationId);
    if (!settingsCreationResult.success) {
      return res.status(500).json({ message: settingsCreationResult.message });
    }
    

    // Create Tax for the organization
    const taxCreationResult = await createTaxForOrganization(organizationId);
    if (!taxCreationResult.success) {
      return res.status(500).json({ message: taxCreationResult.message });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new client
    const newClient = new Client({
      organizationName,
      organizationId,
      contactName,
      contactNum,
      email,
      // Add other fields as needed
    });

    const savedClient = await newClient.save();

    if (!savedClient) {
      console.error("Client could not be saved.");
      return res.status(500).json({ message: "Failed to create client." });
    }

    // Create a new user
    const newUser = new User({
      organizationName,
      organizationId,
      userName: contactName,
      userNum: contactNum,
      useremail: email,
      password: hashedPassword,
      role: 'Admin',
      // Add other fields as needed
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      console.error("User could not be saved.");
      return res.status(500).json({ message: "Failed to create user." });
    }


    // Create Prefix for the organization
    const prefixCreationResult = await createPrefixForOrganization(organizationId);
    if (!prefixCreationResult.success) {
      return res.status(500).json({ message: prefixCreationResult.message });
    }    

    res.status(201).json({
      message: "Client created successfully.",
      organizationId: organizationId,
    });
    console.log("Organization, Client, User, Prefix, Currency, Role created successfully:", { organizationId });
  } catch (error) {
    console.error("Error creating Organization, Client, and User:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



// Get all Client
exports.getAllClient = async (req, res) => {
  try {
    const allClient = await Client.find();

    if (allClient.length > 0) {
      res.status(200).json(allClient);
    } else {
      res.status(404).json("No Client found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};



// Dev phase only - Get  OrganizationId
exports.getOrganizationId = (req, res) => {
  try {
    const organizationId = "INDORG0001";
    res.status(200).json({ organizationId });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};


// Flush DB
exports.deleteAll = async (req, res) => {
  try {
    await Organization.deleteMany({});
    console.log("Organization data deleted.");

    await Client.deleteMany({});
    console.log("Client data deleted.");

    await User.deleteMany({});
    console.log("User data deleted.");

    await Prefix.deleteMany({});
    console.log("Prefix data deleted.");

    await Account.deleteMany({});
    console.log("Account data deleted.");

    await Journal.deleteMany({});
    console.log("Journal data deleted.");

    await TrialBalance.deleteMany({});
    console.log("Trial Balance data deleted.");

    await Role.deleteMany({});
    console.log("Role data deleted.");

    await Currency.deleteMany({});
    console.log("Currency data deleted.");

    await PaymentTerms.deleteMany({});
    console.log("Payment Terms data deleted.");

    await Setting.deleteMany({});
    console.log("Payment Terms data deleted.");

    await Tax.deleteMany({});
    console.log("Tax data deleted.");


    res.status(200).json("Database Flushed Successfully");

  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};



