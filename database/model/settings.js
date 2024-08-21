const mongoose = require("mongoose");
const { Schema } = mongoose;


const settingSchema = new Schema({
  organizationId: {type:String},

  //Invoice
  organizationAddressFormat: { type: String },

  qrLocation: { type: String },  displayQrLocation: { type: Boolean },
  qrPayment: { type: String },  displayQrPayment: { type: Boolean },
  digitalSignature: { type: String },  displayDigitalSignature: { type: Boolean },
  xLink: { type: String },  displayXLink: { type: Boolean },
  instagramLink: { type: String },  displayInstagramLink: { type: Boolean },
  linkedinLink: { type: String },  displayLinkedinLink: { type: Boolean },
  facebookLink: { type: String },  displayFacebookLink: { type: Boolean },
  
  //bankfield
  accountHolderName: { type: String },  bankName: { type: String },  accNum: { type: String },  ifsc: { type: String },

  //Item
  itemDecimal: { type: String },
  itemDimensions: { type: String },
  itemWeights: { type: String },
  barcodeScan: { type: String },

  itemDuplicateName: { type: Boolean }, //default:false
  hsnSac: { type: Boolean }, //default:false
  fourDigitHsn: { type: Boolean }, //default:true  true=4 false=6

  priceList: { type: Boolean }, //default:false
  priceListAtLineLevel: { type: Boolean }, //default:false

  compositeItem: { type: Boolean }, //default:false

  stockBelowZero: { type: Boolean }, //default:false
  OutOfStockBelowZero : { type: Boolean }, //default:false
  notifyReorderPoint: { type: Boolean }, //default:false
  trackCostOnItems: { type: Boolean }, //default:false







  //Sales Order
  salesOrderAddress: { type: Boolean },  salesOrderCustomerNote: { type: Boolean },  salesOrderTermsCondition: { type: Boolean },
  salesOrderClose: { type: String }, //When invoice is created,  When shipment is fulfilled,  When shipment is fulfilled and invoice is created  
  restrictSalesOrderClose: { type: Boolean },
  termCondition: { type: String },
  customerNote: { type: String },

  //Shipment
  carrierNotification: { type: Boolean },  manualNotification: { type: Boolean },





});

const Settings = mongoose.model("Settings", settingSchema);

module.exports = Settings;