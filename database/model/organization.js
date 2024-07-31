const mongoose = require("mongoose");
const { Schema } = mongoose;


const organizationSchema = new Schema({

  organizationId: { type: String },
  organizationName: { type: String },
  organizationLogo: { type: String },

  primaryContactName: { type: String },
  primaryContactNum: { type: String },
  
  organizationCountry: { type: String },
  organizationIndustry: { type: String },

  //address
  addline1: { type: String },
  addline2: { type: String },
  city: { type: String },
  pincode: { type: String },
  state: { type: String },
  
  organizationPhNum: { type: String },
  website: { type: String },

  baseCurrency: { type: String },
  fiscalYear: { type: String },
  reportBasis: { type: String },

  timeZone: { type: String },
  dateFormat: { type: String },
  dateSplit: { type: String },

  //bankfield
  accountHolderName: { type: String },
  bankName: { type: String },
  accNum: { type: String },
  ifsc: { type: String },

}, { versionKey: false }); 

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;




