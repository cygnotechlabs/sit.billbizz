const mongoose = require("mongoose");
const { Schema } = mongoose;


const itemTrackSchema = new Schema({
    organizationId: {type:String},
    transactionId: {type:String}, //Sale, Sale return, Purchase, Purchase Return,Opening Stock, Inventory Adjustment
    action: {type:String},
 
    date: {type:String},

    itemId: {type:String},
    itemName: {type:String},

    creditQuantity: {type:String},
    debitQuantity: {type:String},

    currentStock: {type:Number},
    
    remark: {type:String},
});

const ItemTrack = mongoose.model("ItemTrack", itemTrackSchema);

module.exports = ItemTrack;