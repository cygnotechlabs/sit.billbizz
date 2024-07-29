const mongoose = require("mongoose");
const { Schema } = mongoose;
 
 
const contactPersonsSchema = new Schema({
    salutation: {type:String},
    firstName: {type:String},
    lastName: {type:String},
    emailAddress: {type:String},
    workPhone: {type:String},
    mobile: {type:String},
    // skypeName: {type:String},
    // designation: {type:String},
    // department: {type:String},
}, { _id: false });


const bankDetailsSchema = new Schema({
    accountHolderName: {type:String},
    bankName: {type:String},
    accountNum: {type:String},
    // reEnterAccountNum: {type:String},
    ifscCode: {type:String},
}, { _id: false });
 
 
const supplierSchema = new Schema({
    organizationId: {type:String},
    createdDate: {type:String},
    lastModifiedDate: {type:String},
    salutation: {type:String},
    firstName: {type:String},
    lastName: {type:String},
    companyName: {type:String},
    supplierEmail: {type:String},
    workPhone: {type:String},
    mobile: {type:String},


    gstTreatment: {type:String},
    gstin_uin: {type:String},
    sourceOfSupply: {type:String},
    msmeType: {type:String},
    msmeNumber: {type:String},

    // gstNo: {type:String},
    // creditDays: {type:String},
    // creditLimit: {type:String},
    // interestPercentage: {type:String},
 
    //Other Details:-
    pan: {type:String},
    currency: {type:String},
    openingBalance:{type:String},
    paymentTerms:{type:String},
    tds: {type:String},
    uploadFiles: [],
    wedsiteUrl: {type:String},
    department: {type:String},
    designation: {type:String},
    twitter: {type:String},
    skypeName: {type:String},
    facebook: {type:String},
   
    //Billing Address:-
    billingAttention: {type:String},
    billingCountry: {type:String},
    billingAddress: {type:String},
    billingCity: {type:String},
    billingState: {type:String},
    billingPinCode: {type:String},
    billingPhone: {type:String},
    billingFaxNum: {type:String},
   
    //Shipping Address:-
    shippingAttention: {type:String},
    shippingCountry: {type:String},
    shippingAddress: {type:String},
    shippingCity: {type:String},
    shippingState: {type:String},
    shippingPinCode: {type:String},
    shippingPhone: {type:String},
    shippingFaxNum: {type:String},
 
    //Contact Persons:-
    contactPersons: [contactPersonsSchema],

    //Bank Details:-
    bankDetails: [bankDetailsSchema],
 
    //customerFields: {type:String},
    remarks: {type:String},

    status : {type:String},
});
 
const Supplier = mongoose.model("Supplier", supplierSchema);
 
module.exports = Supplier;