const Organization = require('../database/model/organization');
const Tax = require('../database/model/tax');
const Manufacturer = require('../database/model/manufacturer');
const Brand = require('../database/model/brand');
const Rack = require('../database/model/rack');
const Unit = require('../database/model/unit');
const Categories = require('../database/model/categories');
const Settings = require('../database/model/settings');


//Get ItemDropdowm and get item settings field
exports.getItemDropdowm = async (req, res) => {
    const { organizationId } = req.body;
    try {
        // Check if an Organization already exists
        const organization = await Organization.findOne({ organizationId });
    
        if (!organization) {
        return res.status(404).json({
            message: "No Organization Found.",
        });
        }

        // Fetch settings data
        const settings = await Settings.findOne({ organizationId });
        if (!settings) {
        return res.status(500).json({
            message: "Settings not found for the organization.",
        });
        }

        // Fetch manufacturer data
        const manufacturer = await Manufacturer.find({ organizationId });
        if (!manufacturer) {
            return res.status(404).json({
                message: "No manufacturer found for the organization.",
            });
        }

        // Fetch brand data
        const brand = await Brand.find({ organizationId });
        if (!brand) {
            return res.status(404).json({
                message: "No brand found for the organization.",
            });
        }

        // Fetch rack data
        const rack = await Rack.find({ organizationId });
        if (!rack) {
            return res.status(404).json({
                message: "No rack found for the organization.",
            });
        }

        // Fetch categories data
        const categories = await Categories.find({ organizationId });
        if (!categories) {
            return res.status(404).json({
                message: "No categories found for the organization.",
            });
        }

        // Fetch unit data
        const unit = await Unit.find({ organizationId });
        if (!unit) {
            return res.status(404).json({
                message: "No unit found for the organization.",
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
            manufacturerName: manufacturer.map(m => m.name),
            brandName: brand.map(b => b.name),
            rackName: rack.map(r => r.rackName),
            categoriesName: categories.map(c => c.name),
            unitName: unit.map(u => u.unitName),
            itemSettings: {
                itemDecimal: settings.itemDecimal,
                itemDuplicateName: settings.itemDuplicateName,
                hsnSac: settings.hsnSac,
                fourDigitHsn: settings.fourDigitHsn,
            },
            taxType: taxData.taxType,
            organization: {
                baseCurrency: organization.baseCurrency,
                timeZoneExp: organization.timeZoneExp,
                dateFormatExp: organization.dateFormatExp,
            }
        };

        // Check taxType and add the appropriate tax rate to the response
        if (taxData.taxType === 'GST') {
            response.taxRate = taxData.gstTaxRate;
        } else if (taxData.taxType === 'VAT') {
            response.taxRate = taxData.vatTaxRate;
        } else {
            response.message = "No tax type selected.";
        }

        // Return the combined response data
        return res.status(200).json(response);

    } catch (error) {
        console.error("Error fetching brands:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};







