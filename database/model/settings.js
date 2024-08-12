const mongoose = require("mongoose");
const { Schema } = mongoose;


const settingSchema = new Schema({
  organizationId: {type:String},

  //Invoice
  organizationAddressFormat: { type: String },

  qrLocation: { type: String },
  displayQrLocation: { type: Boolean },

  qrPayment: { type: String },
  displayQrPayment: { type: Boolean },

  digitalSignature: { type: String },
  displayDigitalSignature: { type: Boolean },

  xLink: { type: String },
  displayXLink: { type: Boolean },

  instagramLink: { type: String },
  displayInstagramLink: { type: Boolean },

  linkedinLink: { type: String },
  displayLinkedinLink: { type: Boolean },

  facebookLink: { type: String },
  displayFacebookLink: { type: Boolean },
  
  //bankfield
  accountHolderName: { type: String },
  bankName: { type: String },
  accNum: { type: String },
  ifsc: { type: String },

  //Sales Order
  salesOrderAddress: { type: String },
  salesOrderCustomerNote: { type: String },
  salesOrderTermsCondition: { type: String },

  salesOrderClose: { type: String },
  restrictSalesOrderClose: { type: String },

  termCondition: { type: String },
  customerNote: { type: String },



});

const Settings = mongoose.model("Settings", settingSchema);

module.exports = Settings;