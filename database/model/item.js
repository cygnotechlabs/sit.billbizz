const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
    //Basis
    organizationId: {type: String},
    itemType: { type: String },
    itemName: { type: String},
    itemImage: { type: String },
    sku: { type: String,},
    unit: { type: String },
    returnableItem: { type: Boolean },
    hsnCode: { type: String },
    sac:{type:String},
    taxPreference: { type: String },
    taxExemptReason: { type: String },        
    productUsage: { type: String },

    //Storage & Classification
    length:{type: String},
    width:{type: String},
    height:{type: String},
    dimensionUnit:{type: String},

    warranty: { type: String },
    weight:{ type: String },
    weightUnit:{ type: String },

    manufacturer: { type: String },
    brand: { type: String },
    categories: { type: String },
    rack: { type: String },

    upc:{ type: String },
    mpn:{ type: String },
    ean:{ type: String },
    isbn:{ type: String },

    //Sale Info
    sellingPrice: { type: Number },
    saleMrp: { type: Number },
    salesDescription: { type: String },
    
    //Purchase Info
    costPrice: { type: Number },
    purchaseDescription: { type: String },
    preferredVendor: { type: String },

    taxRate:{type:String},
    cgst:{type:String},
    sgst:{type:String},
    igst:{type:String},
    vat:{type:String},


    openingStock:{typr:String},
    openingStockRatePerUnit: { type: String },
    reorderPoint: { type: String },
    
    createdDate: { type: String },  
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;