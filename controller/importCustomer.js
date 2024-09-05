const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const ExcelJS = require('exceljs');
const Papa = require('papaparse')
const moment = require('moment-timezone');

const Organization = require("../database/model/organization");
const Account = require("../database/model/account");
const Customer = require("../database/model/customer");
const Tax = require('../database/model/tax');


exports.importustomer = async (req, res) => {
  try {

    // Multer storage configuration
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './public/upload');
      },
      filename: (req, file, cb) => {
        cb(null, 'customer.xlsx');
      }
    });

    const fileFilter = (req, file, cb) => {
      if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || path.extname(file.originalname).toLowerCase() === '.xlsx') {
        cb(null, true);
      } else {
        cb(new Error('Only XLSX files are allowed!'), false);
      }
    };

    const upload = multer({ 
      storage: storage,
      fileFilter: fileFilter 
    });

    // Use Multer to handle file upload
    upload.single('file')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer Error:', err.message);
        return res.status(500).json({ message: err.message });
      } else if (err) {
        console.error('Error:', err.message);
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Log file info
      // console.log('Uploaded file:', req.file);

      try {
        // Path to the uploaded XLSX file
        const xlsxFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'customer.xlsx');
        const csvFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'customer.csv');

        // Log file paths
        console.log('XLSX file path:', xlsxFilePath);
        console.log('CSV file path:', csvFilePath);

        // Check if the file exists
        try {
          await fs.access(xlsxFilePath);
        } catch (error) {
          console.error('XLSX file not found:', xlsxFilePath);
          return res.status(404).json({ message: "XLSX file not found" });
        }

        // Read the XLSX file using exceljs
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(xlsxFilePath);
        const worksheet = workbook.worksheets[0];

        // Convert the sheet to CSV format
        const csvData = [];
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          if (rowNumber === 1) {
            // Add header row
            csvData.push(row.values.slice(1).join(','));
          } else {
            // Add data rows
            csvData.push(row.values.slice(1).join(','));
          }
        });

        // Write the CSV data to a file
        await fs.writeFile(csvFilePath, csvData.join('\n'), 'utf8');
        console.log('CSV file saved:', csvFilePath);

        // Optionally delete the original XLSX file
        // await fs.unlink(xlsxFilePath);  // Uncomment this line if you want to delete the XLSX file after conversion

        // Log CSV file path
        console.log('Converted CSV file path:', csvFilePath);

        const response = await csv({
          delimiter: ',', 
          noheader: false,
          headers: [
            'Customer Type',
            'Salutation',
            'First Name',
            'Last Name',
            'Company Name',
            'Customer Display Name',
            'Customer Email',
            'Work Phone',
            'Mobile',
            'DOB',
            'Card Number',
            'PAN',
            'Currency',
            'Opening Balance',
            'Department',
            'Designation', 
            'Website URL',
            'Tax Type',
            'GST Treatment',
            'GSTIN/UIN',
            'Place Of Supply',
            'Business Legal Name',
            'Business Trade Name',
            'VAT Number',
            'Billing Attention',
            'Billing Country',
            'Billing AddressLine1',
            'Billing AddressLine2',
            'Billing City',
            'Billing State',
            'Billing PinCode',
            'Billing Phone',
            'Billing FaxNumber',
            'Shipping Attention',
            'Shipping Country',
            'Shipping AddressLine1',
            'Shipping AddressLine2',
            'Shipping City',
            'Shipping State',
            'Shipping PinCode',
            'Shipping Phone',
            'Shipping FaxNumber',
            'Remark'          

          ]
        }).fromFile(req.file.path);

    // Validate organizationId
    
    const organizationId = "INDORG0001";
    // const organizationId = req.user.organizationId;

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
      const generatedDateTime = generateTimeAndDateForDB(timeZoneExp, dateFormatExp, dateSplit);
      const openingDate = generatedDateTime.dateTime;

      const validSalutations = ['Mr.', 'Mrs.', 'Ms.', 'Miss.', 'Dr.'];
      const validCustomerTypes = ['Individual', 'Business'];
      const validGSTTreatments = ["Registered Business -Regular","Registered Business -Composition","Unregistered Business","Consumer","Overseas","Special Economic Zone","Deemed Export","Tax Deductor","SEZ Developer"];
      
      const validCurrencies = ["USD", "EUR", "INR"]; 
      const validTaxTypes = ["GST", "VAT"]; 
      

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
      
      
      
    let userData = [];

    for (let x = 0; x < response.length; x++) {
        const salutation = response[x]['Salutation'];
        const customerType = response[x]['Customer Type'];
        const firstName = response[x]['First Name'];
        const lastName = response[x]['Last Name'];
        const companyName = response[x]['Company Name'];
        const customerDisplayName = response[x]['Customer Display Name'];
        const customerEmail = response[x]['Customer Email'];
        const workPhone = response[x]['Work Phone'];
        const mobile = response[x]['Mobile'];
        const dob = response[x]['DOB'];
        const cardNumber = response[x]['Card Number'];
        const pan = response[x]['PAN'];
        const currency = response[x]['Currency'];
        const openingBalance = response[x]['Opening Balance'];
        const department = response[x]['Department'];
        const designation = response[x]['Designation'];
        const websiteUrl = response[x]['Website URL'];
        const taxType = response[x]['Tax Type'];
        const gstTreatment = response[x]['GST Treatment'];
        const gstinUin = response[x]['GSTIN/UIN'];
        const vatNumber = response[x]['VAT Number'];
        const placeOfSupply = response[x]['Place Of Supply'];
        const businessLegalName = response[x]['Business Legal Name'];
        const businessTradeName = response[x]['Business Trade Name'];

       

    
        // // Validation checks
        // if (!validSalutations.includes(salutation)) {
        //     console.error(`Invalid salutation at row ${x + 1}: ${salutation}`);
        //     continue;
        // }
    
        // if (!validCustomerTypes.includes(customerType)) {
        //     console.error(`Invalid customer type at row ${x + 1}: ${customerType}`);
        //     continue;
        // }
    
        // if (!isAlphabets(firstName) || !isAlphabets(lastName) || !isAlphabets(companyName) || !isAlphabets(customerDisplayName)) {
        //     console.error(`Invalid name fields at row ${x + 1}`);
        //     continue;
        // }
    
        // if (!isValidEmail(customerEmail)) {
        //     console.error(`Invalid email at row ${x + 1}: ${customerEmail}`);
        //     continue;
        // }
    
        // if (!isInteger(workPhone) || !isInteger(mobile)) {
        //     console.error(`Invalid phone numbers at row ${x + 1}`);
        //     continue;
        // }
    
        // if (!isValidDate(dob)) {
        //     console.error(`Invalid date of birth at row ${x + 1}`);
        //     continue;
        // }
    
        // if (!isInteger(cardNumber) || !isInteger(pan) || !isInteger(openingBalance)) {
        //     console.error(`Invalid integer fields at row ${x + 1}`);
        //     continue;
        // }
    
        // if (!currencyCollection.includes(currency)) {
        //     console.error(`Invalid currency at row ${x + 1}`);
        //     continue;
        // }
    
        // if (!isAlphabets(department) || !isAlphabets(designation)) {
        //     console.error(`Invalid department or designation at row ${x + 1}`);
        //     continue;
        // }
    
        // if (!isValidUrl(websiteUrl)) {
        //     console.error(`Invalid website URL at row ${x + 1}`);
        //     continue;
        // }
    
        // if (!taxCollection.includes(taxType)) {
        //     console.error(`Invalid tax type at row ${x + 1}`);
        //     continue;
        // }
    
        // if (taxType === 'GST') {
        //     if (!validGstTreatments.includes(gstTreatment)) {
        //         console.error(`Invalid GST treatment at row ${x + 1}`);
        //         continue;
        //     }
    
        //     if (!isAlphanumeric(gstinUin)) {
        //         console.error(`Invalid GSTIN/UIN at row ${x + 1}`);
        //         continue;
        //     }
        // } else if (taxType === 'VAT') {
        //     if (!isAlphanumeric(vatNumber)) {
        //         console.error(`Invalid VAT number at row ${x + 1}`);
        //         continue;
        //     }
        // }
    
        // if (!isAlphabets(placeOfSupply) || !isAlphabets(businessLegalName) || !isAlphabets(businessTradeName)) {
        //     console.error(`Invalid Place of Supply, Business Legal Name, or Business Trade Name at row ${x + 1}`);
        //     continue;
        // }
    
        // Push valid data to userData arrayN
        userData.push({
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
            pan,
            currency,
            openingBalance: openingBalance,
            department,
            designation,
            websiteUrl,
            taxType,
            gstTreatment,
            gstinUin,
            placeOfSupply,
            businessLegalName,
            businessTradeName,
            vatNumber,
            billingAttention: response[x]['Billing Attention'],
            billingCountry: response[x]['Billing Country'],
            billingAddressLine1: response[x]['Billing AddressLine1'],
            billingAddressLine2: response[x]['Billing AddressLine2'],
            billingCity: response[x]['Billing City'],
            billingState: response[x]['Billing State'],
            billingPinCode: response[x]['Billing PinCode'],
            billingPhone: response[x]['Billing Phone'],
            billingFaxNumber: response[x]['Billing FaxNumber'],
            shippingAttention: response[x]['Shipping Attention'],
            shippingCountry: response[x]['Shipping Country'],
            shippingAddressLine1: response[x]['Shipping AddressLine1'],
            shippingAddressLine2: response[x]['Shipping AddressLine2'],
            shippingCity: response[x]['Shipping City'],
            shippingState: response[x]['Shipping State'],
            shippingPinCode: response[x]['Shipping PinCode'],
            shippingPhone: response[x]['Shipping Phone'],
            shippingFaxNumber: response[x]['Shipping FaxNumber'],
            remark: response[x]['Remark'],
            createdDate: openingDate,
        });
    }
    
    if (userData.length > 0) {
        await Customer.insertMany(userData);
    }
    
    res.status(200).send({ success: true, msg: 'Customer XLSX Extracted Successfully' });
    
    } catch (error) {
        console.error("Error during Importing Customer process:", error);
        res.status(500).json({ message: "Internal server error." });
    }
      
    });

  } catch (error) {
    console.error("Error processing request:", error);
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
  
















exports.importCustomer = async (req, res) => {
  try {
    // Multer storage configuration
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './public/upload');
      },
      filename: (req, file, cb) => {
        cb(null, 'customer.xlsx');
      }
    });

    const fileFilter = (req, file, cb) => {
      if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || path.extname(file.originalname).toLowerCase() === '.xlsx') {
        cb(null, true);
      } else {
        cb(new Error('Only XLSX files are allowed!'), false);
      }
    };

    const upload = multer({ 
      storage: storage,
      fileFilter: fileFilter 
    });

    // Use Multer to handle file upload
    upload.single('file')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer Error:', err.message);
        return res.status(500).json({ message: err.message });
      } else if (err) {
        console.error('Error:', err.message);
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ message: "No file uploaded" });
      }

      try {
        // Path to the uploaded XLSX file
        const xlsxFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'customer.xlsx');
        const csvFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'customer.csv');

        // Log file paths
        console.log('XLSX file path:', xlsxFilePath);
        console.log('CSV file path:', csvFilePath);

        // Check if the file exists
        try {
          await fs.access(xlsxFilePath);
        } catch (error) {
          console.error('XLSX file not found:', xlsxFilePath);
          return res.status(404).json({ message: "XLSX file not found" });
        }

        // Read the XLSX file using exceljs
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(xlsxFilePath);
        const worksheet = workbook.worksheets[0];

        // Convert the sheet to CSV format
        const csvData = [];
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          if (rowNumber === 1) {
            // Add header row
            csvData.push(row.values.slice(1).join(','));
          } else {
            // Add data rows
            csvData.push(row.values.slice(1).join(','));
          }
        });

        // Write the CSV data to a file
        await fs.writeFile(csvFilePath, csvData.join('\n'), 'utf8');
        console.log('CSV file saved:', csvFilePath);

        // Log CSV file path
        console.log('Converted CSV file path:', csvFilePath);

        // Parse the CSV file using PapaParse
        const csvFileContent = await fs.readFile(csvFilePath, 'utf8');
        Papa.parse(csvFileContent, {
          header: true,
          skipEmptyLines: true,
          complete: async (result) => {
            const response = result.data;

            // Validate organizationId
            const organizationId = "INDORG0001";
            // const organizationId = req.user.organizationId;

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
        
            const timeZoneExp = organizationExists.timeZoneExp;
            const dateFormatExp = organizationExists.dateFormatExp;
            const dateSplit = organizationExists.dateSplit;
            const generatedDateTime = generateTimeAndDateForDB(timeZoneExp, dateFormatExp, dateSplit);
            const openingDate = generatedDateTime.dateTime;

            const validSalutations = ['Mr.', 'Mrs.', 'Ms.', 'Miss.', 'Dr.'];
            const validCustomerTypes = ['Individual', 'Business'];
            const validGSTTreatments = ["Registered Business - Regular","Registered Business - Composition","Unregistered Business","Consumer","Overseas","Special Economic Zone","Deemed Export","Tax Deductor","SEZ Developer"];
             
            const validCurrencies = ["AED","INR"]; //
            // const validTaxTypes = ["GST", "VAT"]; 
            const validTaxTypes = taxExists.taxType;

            const validCountries = {
                  "United Arab Emirates": ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al-Quwain", "Fujairah", "Ras Al Khaimah"],
                  "India": ["Andaman and Nicobar Island", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]
                };            

            function isAlphabets(value) {
              return /^[A-Za-z\s]+$/.test(value);
              }
        
            function isInteger(value) {
              return /^[0-9]+$/.test(value);
              }
            function isFloat(value) {
              return /^-?\d+(\.\d+)?$/.test(value);
              }        
            function isValidDate(value) {
              return !isNaN(Date.parse(value));
              }
        
            function isAlphanumeric(value) {
              return /^[A-Za-z0-9]+$/.test(value);
              }
        
            // function isValidUrl(value) {
            //   try {
            //       new URL(value);
            //       return true;
            //   } catch {
            //       return false;
            //   }
            //   }
            function isValidEmail(value) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
              }
            
            let userData = [];
            

            for (let x = 0; x < response.length; x++) {
                const salutation = response[x]['Salutation'];
                const customerType = response[x]['Customer Type'];
                const firstName = response[x]['First Name'];
                const lastName = response[x]['Last Name'];
                const companyName = response[x]['Company Name'];
                const customerDisplayName = response[x]['Customer Display Name'];
                const customerEmail = response[x]['Customer Email'];
                const workPhone = response[x]['Work Phone'];
                const mobile = response[x]['Mobile'];
                const dob = response[x]['DOB'];
                const cardNumber = response[x]['Card Number'];
                const pan = response[x]['PAN'];
                const currency = response[x]['Currency'];
                const openingBalance = response[x]['Opening Balance'];         
                const department = response[x]['Department'];
                const designation = response[x]['Designation'];
                const websiteUrl = response[x]['Website URL'];
                const taxType = response[x]['Tax Type'];
                const gstTreatment = response[x]['GST Treatment'];
                const gstinUin = response[x]['GSTIN/UIN'];
                const vatNumber = response[x]['VAT Number'];
                const placeOfSupply = response[x]['Place Of Supply'];
                const businessLegalName = response[x]['Business Legal Name'];
                const businessTradeName = response[x]['Business Trade Name'];


                              


                // Validation checks
                  if (!validSalutations.includes(salutation)) {
                      console.error(`Invalid Salutation at row ${x + 1}: ${salutation}`);
                      continue;
                  }              
                  if (!validCustomerTypes.includes(customerType)) {
                      console.error(`Invalid Customer type at row ${x + 1}: ${customerType}`);
                      continue;
                  }              
                  if (!isAlphabets(firstName)) {
                      console.error(`Invalid First Name fields at row ${x + 1},${firstName}`);
                      continue;
                  }
                  if (!isAlphabets(lastName)) {
                    console.error(`Invalid Last Name fields at row ${x + 1},${lastName}`);
                    continue;
                  }
                  // if (!isAlphanumeric(companyName)) {
                  //   console.error(`Invalid Company Name fields at row ${x + 1},${companyName}`);
                  //   continue;
                  // }
                  // if (!isAlphanumeric(customerDisplayName)) {
                  //   console.error(`Invalid Customer Display Name fields at row ${x + 1},${customerDisplayName}`);
                  //   continue;
                  // }              
                  if (!isValidEmail(customerEmail)) {
                      console.error(`Invalid email at row ${x + 1}: ${customerEmail}`);
                      continue;
                  }              
                  if (!isInteger(workPhone)) {
                      console.error(`Invalid Work Phone numbers at row ${x + 1},${workPhone}`);
                      continue;
                  }
                  if (!isInteger(mobile)) {
                    console.error(`Invalid Mobile numbers at row ${x + 1},${mobile}`);
                    continue;
                  }              
                  if (!isValidDate(dob)) {
                      console.error(`Invalid Date of birth at row ${x + 1},${dob}`);
                      continue;
                  }              
                  if (!isInteger(cardNumber)) {
                      console.error(`Invalid Card Number fields at row ${x + 1},${cardNumber}`);
                      continue;
                  }
                  if (!isAlphanumeric(pan)) {
                    console.error(`Invalid Pan Card fields at row ${x + 1},${pan}`);
                    continue;
                  }
                  if (!isFloat(openingBalance)) {
                    console.error(`Invalid Opening Balance fields at row ${x + 1},${openingBalance}`);
                    continue;
                  }              
                  // if (!currencyCollection.includes(currency)) {
                  //     console.error(`Invalid currency at row ${x + 1},${currency}`);
                  //     continue;
                  // }              
                  if (!isAlphabets(department)) {
                      console.error(`Invalid Department at row ${x + 1},${department}`);
                      continue;
                  }
                  if (!isAlphabets(designation)) {
                    console.error(`Invalid Designation at row ${x + 1},${designation}`);
                    continue;
                  }              
                  // if (!isValidUrl(websiteUrl)) {
                  //     console.error(`Invalid Website URL at row ${x + 1},${websiteUrl}`);
                  //     continue;
                  // }              
                  if (!taxCollection.includes(taxType)) {
                      console.error(`Invalid tax type at row ${x + 1},${taxType}`);
                      continue;
                  }
                  if (!validCountries[country] || !validCountries[country].includes(state)) {
                      console.error(`Invalid Country or State at row ${x + 1}: ${country}, ${state}`);
                      continue;
                  }
                  
                                
                  // if (taxType === validTaxTypes) {                  
                  //     if (!validGSTTreatments.includes(gstTreatment)) {
                  //         console.error(`Invalid GST treatment at row ${x + 1},${gstTreatment}`);
                  //         continue;
                  //     }
              
                  //     if (!isAlphanumeric(gstinUin)) {
                  //         console.error(`Invalid GSTIN/UIN at row ${x + 1},${gstinUin}`);
                  //         continue;
                  //     }
                  // } else if (taxType === 'VAT') {
                  //     if (!isAlphanumeric(vatNumber)) {
                  //         console.error(`Invalid VAT number at row ${x + 1},${vatNumber}`);
                  //         continue;
                  //     }
                  // }
                  
                  
                  if (!isAlphabets(placeOfSupply) ) {
                      console.error(`Invalid Place of Supply at row ${x + 1},${placeOfSupply}`);
                      continue;
                  }
                  if (!isAlphabets(businessLegalName)) {
                    console.error(`Invalid Business Legal Name at row ${x + 1},${businessLegalName}`);
                    continue;
                  }
                  if (!isAlphabets(businessTradeName)) {
                    console.error(`Invalid  Business Trade Name at row ${x + 1},${businessTradeName}`);
                    continue;
                  }




                // Push valid data to userData array
                userData.push({
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
                    pan,
                    currency,
                    openingBalance: openingBalance,
                    department,
                    designation,
                    websiteUrl,
                    taxType,
                    gstTreatment,
                    gstinUin,
                    placeOfSupply,
                    businessLegalName,
                    businessTradeName,
                    vatNumber,
                    billingAttention: response[x]['Billing Attention'],
                    billingCountry: response[x]['Billing Country'],
                    billingAddressLine1: response[x]['Billing AddressLine1'],
                    billingAddressLine2: response[x]['Billing AddressLine2'],
                    billingCity: response[x]['Billing City'],
                    billingState: response[x]['Billing State'],
                    billingPinCode: response[x]['Billing PinCode'],
                    billingPhone: response[x]['Billing Phone'],
                    billingFaxNumber: response[x]['Billing FaxNumber'],
                    shippingAttention: response[x]['Shipping Attention'],
                    shippingCountry: response[x]['Shipping Country'],
                    shippingAddressLine1: response[x]['Shipping AddressLine1'],
                    shippingAddressLine2: response[x]['Shipping AddressLine2'],
                    shippingCity: response[x]['Shipping City'],
                    shippingState: response[x]['Shipping State'],
                    shippingPinCode: response[x]['Shipping PinCode'],
                    shippingPhone: response[x]['Shipping Phone'],
                    shippingFaxNumber: response[x]['Shipping FaxNumber'],
                    remark: response[x]['Remark'],
                    createdDate: openingDate,
                });
            }
            
            if (userData.length > 0) {
                await Customer.insertMany(userData);
            }
            
            res.status(200).send({ success: true, msg: 'Customer XLSX Extracted Successfully' });
          }
        });
      } catch (error) {
        console.error("Error during Importing Customer process:", error);
        res.status(500).json({ message: "Internal server error." });
      }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

