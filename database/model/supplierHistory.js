const mongoose = require("mongoose");
const { Schema } = mongoose;


const supplierHistorySchema = new Schema({
  organizationId: {type:String},
  operationId: { type: String },
  supplierId: { type: String },
  supplierDisplayName: { type: String },
  date: { type: String },
  title: { type: String },
  description: { type: String },
  userId: { type: String },
  userName: { type: String },
});

const supplierHistory = mongoose.model("Supplier History", supplierHistorySchema);

module.exports = supplierHistory;










     