const mongoose = require("mongoose");
const { Schema } = mongoose;


const prefixSchema = new Schema({
  organizationId: { type: String },

  journal: { type: String },
  journalNum: { type: Number },

  creditNote: { type: String },
  creditNoteNum: { type: Number },

  customerPayment: { type: String },
  customerPaymentNum: { type: Number },

  
  purchaseOrder: { type: String },
  purchaseOrderNum: { type: Number },

  salesOrder: { type: String },
  salesOrderNum: { type: Number },

  vendorPayment: { type: String },
  vendorPaymentNum: { type: Number },

  retainerInvoice: { type: String },
  retainerInvoiceNum: { type: Number },

  vendorCredits: { type: String },
  vendorCreditsNum: { type: Number },
  
  billOfSupply: { type: String },
  billOfSupplyNum: { type: Number },

  debitNote: { type: String },
  debitNoteNum: { type: Number },

  invoice: { type: String },
  invoiceNum: { type: Number },

  quote: { type: String },
  quoteNum: { type: Number },

  deliveryChallan: { type: String },
  deliveryChallanNum: { type: Number },


}, { versionKey: false });

const Prefix = mongoose.model("Prefix", prefixSchema);

module.exports = Prefix;

