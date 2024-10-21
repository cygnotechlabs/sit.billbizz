const mongoose = require("mongoose");
const { Schema } = mongoose;


// const unitConversionSchema = new Schema({
//     targetUnit: { type: String },
//     unitConversionRate: { type: String },
//   }
// //   , { _id: false }
// );


const unitSchema = new Schema({
    organizationId: {type: String},
    unitName: {type: String},
    symbol: {type: String},
    quantityCode: {type: String},
    precision: {type: String},

    // unitConversion: [unitConversionSchema],
});



const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;