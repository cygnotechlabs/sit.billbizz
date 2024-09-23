const Organization = require("../database/model/organization");
const Account = require("../database/model/account")
const TrialBalance = require("../database/model/trialBalance")
const crypto = require('crypto');
const moment = require('moment-timezone');


const key = Buffer.from(process.env.ENCRYPTION_KEY, 'utf8'); 
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'utf8'); 

function encrypt(text) {
  try {
      const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      const authTag = cipher.getAuthTag().toString('hex'); // Get authentication tag

      return `${iv.toString('hex')}:${encrypted}:${authTag}`; // Return IV, encrypted text, and tag
  } catch (error) {
      console.error("Encryption error:", error);
      throw error;
  }
}

function decrypt(encryptedText) {
  try {
      // Split the encrypted text to get the IV, encrypted data, and authentication tag
      const [ivHex, encryptedData, authTagHex] = encryptedText.split(':');
      const iv = Buffer.from(ivHex, 'hex');
      const authTag = Buffer.from(authTagHex, 'hex');

      // Create the decipher with the algorithm, key, and IV
      const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
      decipher.setAuthTag(authTag); // Set the authentication tag

      let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
  } catch (error) {
      console.error("Decryption error:", error);
      throw error;
  }
}



//Add Account
exports.addAccount = async (req, res) => {
    console.log("Add Account:", req.body);

    try {
      const {       
        organizationId,
        accountName,
        accountCode,

        accountSubhead,
        accountHead,
        accountGroup,

        description,
        bankAccNum,
        bankIfsc,
        bankCurrency,
      } = req.body;

    // Define valid groups, heads, and subheads
    const validStructure = {
      Asset: {
        Asset: [
          "Asset",
          "Current asset",
          "Cash",
          "Bank",
          "Fixed asset",
          "Stock",
          "Payment Clearing",
          "Sundry Debtors",
        ],
        Equity: ["Equity"],
        Income: ["Income", "Other Income"],
      },
      Liability: {
        Liabilities: [
          "Current Liability",
          "Credit Card",
          "Long Term Liability",
          "Other Liability",
          "Overseas Tax Payable",
          "Sundry Creditors",
        ],
        Expenses: ["Expense", "Cost of Goods Sold", "Other Expense"],
      },
    };

    // Validate accountGroup, accountHead, and accountSubhead
    // if (!validStructure[accountGroup] || !validStructure[accountGroup][accountHead] || !validStructure[accountGroup][accountHead].includes(accountSubhead)) {
    //   console.log("Invalid account group, head, or subhead.");
    //   return res.status(400).json({
    //     message: "Invalid account group, head, or subhead.",
    //   });

    // }

if (!validStructure[accountGroup]?.[accountHead]?.includes(accountSubhead)) {
  console.log("Invalid account group, head, or subhead.");
  return res.status(400).json({
    message: "Invalid account group, head, or subhead.",
  });
}

    // Validate bank details if accountSubhead is "Bank"
    if (
      accountSubhead === "Bank" &&
      (!bankAccNum || !bankIfsc || !bankCurrency)
    ) {
      return res.status(400).json({
        message: "Bank Details (Account Number, IFSC, Currency) are required",
      });
    }

    // Check if an Organization already exists
    const existingOrganization = await Organization.findOne({ organizationId });
 
    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }


    const generatedDateTime = generateTimeAndDateForDB(existingOrganization.timeZoneExp, existingOrganization.dateFormatExp, existingOrganization.dateSplit);
    const openingDate = generatedDateTime.dateTime;
    
    
  
      // Check if an accounts with the same name already exists
      const existingAccount = await Account.findOne({
        accountName: accountName,
        organizationId: organizationId,
    });
  
      if (existingAccount) {
        return res.status(409).json({
          message: "Account with the provided Account Name already exists.",
        });
      }

      // Encrypt bankAccNum before storing it
      let encryptedBankAccNum = null;
      if(bankAccNum){
        encryptedBankAccNum = encrypt(bankAccNum);        
      }
      
  
      // Create a new Account
      const newAccount = new Account({
        organizationId,
        accountName,
        accountCode,

        accountSubhead,
        accountHead,
        accountGroup,

        openingDate,
        description,
        bankAccNum: encryptedBankAccNum,
        bankIfsc,
        bankCurrency,        
      });
  
      
      await newAccount.save();
  
      
      res.status(201).json({
        message: "Account created successfully."
      });
      console.log("Account created successfully",newAccount);
    } catch (error) {
      console.error("Error creating Account:", error);
      res.status(500).json({ message: "Internal server error." });
    }  
};

// Get all accounts for a given organizationId
exports.getAllAccount = async (req, res) => {
    try {
        const { organizationId } = req.body;

        // Find all accounts where organizationId matches
        const accounts = await Account.find(
          { organizationId: organizationId },{ bankAccNum: 0 } 
      );

    if (!accounts.length) {
      return res.status(404).json({
        message: "No accounts found for the provided organization ID.",
      });
    }

    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Get one Account for a given organizationId
exports.getOneAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { organizationId } = req.body;

    // Find the account by accountId and organizationId
    const account = await Account.findOne({
      _id: accountId,
      organizationId: organizationId,
    });

    if (!account) {
      return res.status(404).json({
        message:
          "Account not found for the provided Organization ID and Account ID.",
      });
    }

    res.status(200).json(account);
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


// Get only bankAccNum for a given organizationId and accountId
exports.getBankAccNum = async (req, res) => {
  try {
      const { accountId } = req.params;
      const { organizationId } = req.body;

      const account = await Account.findOne({
          _id: accountId,
          organizationId: organizationId,
      }, 'bankAccNum'); 

      if (!account) {
          return res.status(404).json({
              message: "Account not found for the provided Organization ID and Account ID.",
          });
      }

      // Decrypt the bankAccNum
      let decryptedBankAccNum = null;
      if (account.bankAccNum) {
          decryptedBankAccNum = decrypt(account.bankAccNum);
      }

      res.status(200).json({ bankAccNum: decryptedBankAccNum });
  } catch (error) {
      console.error("Error fetching bank account number:", error);
      res.status(500).json({ message: "Internal server error." });
  }
};



//Edit account
exports.editAccount = async (req, res) => {
  console.log("Edit Account:", req.body);
  try {
    const { accountId } = req.params;

    const {
      organizationId,
      accountName,
      accountCode,

      accountSubhead,
      accountHead,
      accountGroup,    
      
      description,
      bankAccNum,
      bankIfsc,
      bankCurrency,
    } = req.body;

    // Define valid groups, heads, and subheads
    const validStructure = {
      Asset: {
        Asset: [
          "Asset",
          "Current asset",
          "Cash",
          "Bank",
          "Fixed asset",
          "Stock",
          "Payment Clearing",
          "Sundry Debtors",
        ],
        Equity: ["Equity"],
        Income: ["Income", "Other Income"],
      },
      Liability: {
        Liabilities: [
          "Current Liability",
          "Credit Card",
          "Long Term Liability",
          "Other Liability",
          "Overseas Tax Payable",
          "Sundry Creditors",
        ],
        Expenses: ["Expense", "Cost of Goods Sold", "Other Expense"],
      },
    };

    // Validate accountGroup, accountHead, and accountSubhead
    // if (!validStructure[accountGroup] || !validStructure[accountGroup][accountHead] || !validStructure[accountGroup][accountHead].includes(accountSubhead)) {
    //   console.log("Invalid account group, head, or subhead.");
    //   return res.status(400).json({
    //     message: "Invalid account group, head, or subhead.",
    //   });

    // }
if (!validStructure[accountGroup]?.[accountHead]?.includes(accountSubhead)) {
  console.log("Invalid account group, head, or subhead.");
  return res.status(400).json({
    message: "Invalid account group, head, or subhead.",
  });
}

    // Validate bank details if accountSubhead is "Bank"
    if (
      accountSubhead === "Bank" &&
      (!bankAccNum || !bankIfsc || !bankCurrency)
    ) {
      return res.status(400).json({
        message: "Bank Details (Account Number, IFSC, Currency) are required",
      });
    }


    // Check if an account with the given organizationId and accountId exists
    const account = await Account.findOne({
      _id: accountId,
      organizationId: organizationId,
    });

    if (!account) {
      return res.status(404).json({
        message:
          "Account not found for the provided Account ID.",
      });
    }
    // Encrypt bankAccNum before storing it
    let encryptedBankAccNum = null;
    if(bankAccNum){
      encryptedBankAccNum = encrypt(bankAccNum);        
    }

    // Update account fields
    account.accountName = accountName;
    account.accountCode = accountCode;

    account.accountSubhead = accountSubhead;
    account.accountHead = accountHead;
    account.accountGroup = accountGroup;



      account.description = description;
      account.bankAccNum = encryptedBankAccNum;
      account.bankIfsc = bankIfsc;
      account.bankCurrency = bankCurrency;

    // Save updated account
    await account.save();

    res.status(200).json({
      message: "Account updated successfully.",
    });
    console.log("Account updated successfully:");
  } catch (error) {
    console.error("Error updating Account:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { organizationId } = req.body;

    // Check if an account with the given organizationId and accountId exists
    const account = await Account.findOne({
      _id: accountId,
      organizationId: organizationId,
    });

    if (!account) {
      return res.status(404).json({
        message:
          "Account not found for the provided Organization ID and Account ID.",
      });
    }

    // Delete the account
    await account.delete();

    res.status(200).json({
      message: "Account deleted successfully.",
      deletedAccount: account,
    });
    console.log("Account deleted successfully:", account);
  } catch (error) {
    console.error("Error deleting Account:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


//Get one Account for a given organizationId
exports.getOneTrailBalance = async (req, res) => {
  try {
      const { accountId } = req.params;
      const { organizationId } = req.body;

      // Find the TrialBalance by accountId and organizationId
      const trialBalance = await TrialBalance.find({
          accountId: accountId,
          organizationId: organizationId,
      });

      if (!trialBalance) {
          return res.status(404).json({
              message: "Trial Balance not found.",
          });
      }

      res.status(200).json(trialBalance);
  } catch (error) {
      console.error("Error fetching account:", error);
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