const mongoose = require("mongoose");
const { Schema } = mongoose;


const rackSchema = new Schema({
    organizationId: {type: String},
    rackName: {type: String},
    description: {type: String},
    rackStatus: {type: String},
    createdDate: {type: String},
    updatedDate: {type: String}
});



const Rack = mongoose.model("Rack", rackSchema);

module.exports = Rack