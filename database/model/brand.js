const mongoose = require('mongoose')
const brandSchema = new mongoose.Schema({

    organizationId:{type:String},
    name:{type:String},
    description:{type:String},
    createdDate:{type:String},
    updatedDate:{type:String}
})

const Brand = mongoose.model('brand',brandSchema)
module.exports = Brand