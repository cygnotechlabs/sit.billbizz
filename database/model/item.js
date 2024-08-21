const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
    organizationId: {type: String},
    itemType: { type: String, enum: ['Goods', 'Service'] },
    itemName: { type: String},
    sku: { type: String,},
    unit: { type: String },
    returnableItem: { type: Boolean },
    length:{type: String},
    width:{type: String},
    height:{type: String},
    dimensionUnit:{type: String},
    weight:{ type: String },
    weightUnit:{ type: String },
    manufacturer: { type: String },
    brand: { type: String },
    sellingPrice: { type: Number },
    salesAccount: { type: String },
    salesDescription: { type: String },
    categories: { type: String },
    rack: { type: String },
    upc:{ type: String },
    mpn:{ type: String },
    ean:{ type: String },
    isbn:{ type: String },
    costPrice: { type: Number },
    purchaseAccount: { type: String },
    purchaseDescription: { type: String },
    preferredVendor: { type: String },
    mrp: { type: Number },
    taxPreference: { type: String },
    hsnCode: { type: String },
    sac:{type:String},
    taxRate:{tye:String},
    inventoryAccount:{type:String},
    openingStock:{typr:String},
    openingStockRatePerUnit: { type: String },
    reorderPoint: { type: String },
    productUsage: { type: String },
    createdDate: { type: String },
    updatedDate: { type: String },
    warranty: { type: String },
    trackInventory:{type:Boolean},
    itemImage: { type: String },
    currentStock:{type:String},


    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;