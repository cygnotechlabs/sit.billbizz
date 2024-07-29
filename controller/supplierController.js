const Organization = require("../database/model/organization");
const Supplier = require("../database/model/supplier");
const Account = require("../database/model/account");

exports.addSupplier = async (req, res) => {
    console.log("add supplier:", req.body);
    const {
        organizationId,
        salutation,
        firstName,
        lastName,
        companyName,
        supplierEmail,
        workPhone,
        mobile,
        
        gstTreatment,
        gstin_uin,
        sourceOfSupply,
        msmeType,
        msmeNumber,

        // gstNo,
        // creditDays,
        // creditLimit,
        // interestPercentage,

        pan,
        currency,
        openingBalance,
        paymentTerms,
        tds,
        uploadFiles,
        websiteUrl,
        department,
        designation,
        twitter,
        skypeName,
        facebook,
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
        remarks
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
            organizationId,
            createdDate: formattedDate,
            salutation,
            firstName,
            lastName,
            companyName,
            supplierEmail,
            workPhone,
            mobile,

            gstTreatment,
            gstin_uin,
            sourceOfSupply,
            msmeType,
            msmeNumber,

            // gstNo,
            // creditDays,
            // creditLimit,
            // interestPercentage,

            pan,
            currency,
            openingBalance,
            paymentTerms,
            tds,
            uploadFiles,
            websiteUrl,
            department,
            designation,
            twitter,
            skypeName,
            facebook,
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
            status: "Active"
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
            accountName: companyName,
            accountCode: savedSupplier._id,
      
            accountSubhead: "Sundry Creditors",
            accountHead: "Liabilities",
            accountGroup: "Liability",
      
            openingBalance: openingBalance,
            openingBalanceDate: formattedDate,
            description:"Suppliers"
          });
      
          await newAccount.save();
          res.status(201).json({
            message: "Supplier Account created successfully.",
          });
          console.log("Supplier Account created successfully");

    } catch (error) {
        console.error("Error adding supplier:", error);
        res.status(400).json({ error: error.message });
    }
};


exports.getAllSuppliers = async (req, res) => {
    try {
        const { organizationId } = req.body;
        console.log(organizationId);

        const suppliers = await Supplier.findOne({organizationId: organizationId});
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
            return res.status(404).json({ message: "Supplier not found for the provided Organization ID." });
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
            organizationId,
            salutation,
            firstName,
            lastName,
            companyName,
            supplierEmail,
            workPhone,
            mobile,
            gstNo,
            creditDays,
            creditLimit,
            interestPercentage,
            pan,
            currency,
            openingBalance,
            paymentTerms,
            tds,
            uploadFiles,
            websiteUrl,
            department,
            designation,
            twitter,
            skypeName,
            facebook,
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

        // Check if supplierEmail already exists for another supplier
        const existingSupplier = await Supplier.findOne({ supplierEmail });
        if (existingSupplier && existingSupplier._id.toString() !== supplierId) {
            return res.status(400).json({ message: "Email already exists for another supplier" });
        }

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            supplierId,
            {
                organizationId,
                lastModifiedDate: formattedDate,
                salutation,
                firstName,
                lastName,
                companyName,
                supplierEmail,
                workPhone,
                mobile,
                gstNo,
                creditDays,
                creditLimit,
                interestPercentage,
                pan,
                currency,
                openingBalance,
                paymentTerms,
                tds,
                uploadFiles,
                websiteUrl,
                department,
                designation,
                twitter,
                skypeName,
                facebook,
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
            },
            { new: true, runValidators: true }
        );

        if (!updatedSupplier) {
            console.log("Supplier not found with ID:", supplierId);
            return res.status(404).json({ message: "Supplier not found" });
        }

        res.status(200).json({ message: "Supplier updated successfully", supplier: updatedSupplier });
        console.log("Supplier updated successfully:", updatedSupplier);
    } catch (error) {
        console.error("Error updating supplier:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.deleteSupplier = async (req, res) => {
    console.log("Delete supplier:", req.body);
    try {
        const { id } = req.params;
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

        const supplier = await Supplier.findById(id);

        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found." });
        }

        await Supplier.findByIdAndDelete(id);

        res.status(200).json({ message: "Supplier deleted successfully." });
        console.log("Supplier deleted successfully:", id);
    } catch (error) {
        console.error("Error deleting supplier:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};





    
















