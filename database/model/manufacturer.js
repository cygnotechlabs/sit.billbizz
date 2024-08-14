const mongoose = require('mongoose')

const manufacturerSchema = new mongoose.Schema ({

organizationId : {type:String},
name : {type:String},
description : {type:String},
// createdDate: {type:String},
// updatedDate:{type:String},

})

const manufacturer = mongoose.model("manufacturer" , manufacturerSchema)

module.exports = manufacturer