const mongoose = require("mongoose");
const { Schema } = mongoose;


const settingSchema = new Schema({
  organizationId: {type:String},

  //Invoice
  organizationAddressFormat: { type: String },

  qrLocation: { type: String },
  displayQrLocation: { type: String },

  qrPayment: { type: String },
  displayQrPayment: { type: String },

  digitalSignature,
  displayDigitalSignature,

  xLink,
  displayXLink,

  instagramLink,
  displayInstagramLink,

  linkedinLink,
  displayLinkedinLink,

  facebookLink,
  displayFacebookLink,

  //Sales Order
  salesOrderAddress,
  salesOrderCustomerNote,
  salesOrderTermsCondition,

  salesOrderClose,
  restrictSalesOrderClose,

  termCondition,
  customerNote,



});

const Settings = mongoose.model("Settings", settingSchema);

module.exports = Settings;