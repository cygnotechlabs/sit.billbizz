const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactPersonSchema = new Schema({
    salutation: {type:String},
    firstName: {type:String},
    lastName: {type:String},
    companyName: {type:String},
    customerEmail: {type:String},
    workPhone: {type:String},
    mobile: {type:String},
  }, { _id: false });



const customerSchema = new Schema({
    //Basic Info
    organizationId: {type:String},
    customerType: {type:String},

    salutation: {type:String},
    firstName: {type:String},
    lastName: {type:String},
    companyName: {type:String},

    customerEmail: {type:String},
    workPhone: {type:String},
    mobile: {type:String},
    

    dob : {type:String},
    cardNumber: {type:String},
    
    //Other Details
    pan: {type:String},
    currency: {type:String},
    openingBalance: {type:String},
    paymentTerms: {type:String},
    documents: {type:String},
    department: {type:String},
    designation: {type:String},
    websiteURL: {type:String},


    //Taxes
    taxType: {type:String},
    gstTreatment: {type:String},
    gstin_uin: {type:String},
    msmeType: {type:String},
    msmeNumber: {type:String},
    placeOfSupply: {type:String},
    businessLegalName: {type:String},
    businessTradeName: {type:String},
    vatNumber: {type:String},
    

    //Billing Address
    billingAttention: {type:String},
    billingCountry: {type:String},
    billingAddress: {type:String},
    billingCity: {type:String},
    billingState: {type:String},
    billingPinCode: {type:String},
    billingPhone: {type:String},
    billingFaxNumber: {type:String},

    //Shipping Address
    shippingAttention: {type:String},
    shippingCountry: {type:String},
    shippingAddress: {type:String},
    shippingCity: {type:String},
    shippingState: {type:String},
    shippingPinCode: {type:String},
    shippingPhone: {type:String},
    shippingFaxNumber: {type:String},

    contactPerson: [contactPersonSchema],

    remark: {type:String},

    //Status
    status : {type:String},

});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;