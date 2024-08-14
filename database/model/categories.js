const mongoose = require('mongoose')
const categoriesSchema = new mongoose.Schema({

    organizationId : {type : String},
    name : {type : String},
    description : {type : String},
    // createdDate:{type : String},
    // updatedDate:{type : String},

})
const Categories = mongoose.model("categories",categoriesSchema)
module.exports = Categories