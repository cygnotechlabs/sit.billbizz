const mongoose = require("mongoose");
const { Schema } = mongoose;


const clientSchema = new Schema({
  organizationName: { type: String },
  organizationId: { type: String },
  contactName: { type: String },
  contactNum: { type: String },
  email: { type: String },    
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;




