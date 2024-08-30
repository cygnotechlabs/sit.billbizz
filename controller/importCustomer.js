// const express = require("express");
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs').promises;
// const xlsx = require('xlsx');
// const csv = require('csvtojson');
// const moment = require('moment-timezone');

// const Organization = require("../database/model/organization");
// const Account = require("../database/model/account");
// const Customer = require("../database/model/customer");
// const Tax = require('../database/model/tax');



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

    const fileFilter = async (req, file, cb) => {
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
        return res.status(500).json({ message: err.message });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      try {
        // Process the uploaded file
        const xlsxFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'music1.xlsx');
        const csvFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'music1.csv');

        const workbook = xlsx.readFile(xlsxFilePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const csvData = xlsx.utils.sheet_to_csv(sheet);

        await fs.writeFile(csvFilePath, csvData);
        await fs.unlink(xlsxFilePath);

        req.file.filename = 'customer.csv';
        req.file.path = csvFilePath;

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

        let userData = [];

        for (let x = 0; x < response.length; x++) {
            userData.push({
                customerType: response[x]['Customer Type'],
                salutation: response[x]['Salutation'],
                firstName: response[x]['First Name'],
                lastName: response[x]['Last Name'],
                companyName: response[x]['Company Name'],
                customerDisplayName: response[x]['Customer Display Name'],
                customerEmail: response[x]['Customer Email'],
                workPhone: response[x]['Work Phone'],
                mobile: response[x]['Mobile'],
                dob: response[x]['DOB'],
                cardNumber: response[x]['Card Number'],
                pan: response[x]['PAN'],
                currency: response[x]['Currency'],
                openingBalance: parseFloat(response[x]['Opening Balance']),
                department: response[x]['Department'],
                designation: response[x]['Designation'],
                websiteUrl: response[x]['Website URL'],
                taxType: response[x]['Tax Type'],
                gstTreatment: response[x]['GST Treatment'],
                gstinUin: response[x]['GSTIN/UIN'],
                placeOfSupply: response[x]['Place Of Supply'],
                businessLegalName: response[x]['Business Legal Name'],
                businessTradeName: response[x]['Business Trade Name'],
                vatNumber: response[x]['VAT Number'],
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
                createdDate: generatedDateTime,
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
  