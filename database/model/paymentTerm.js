const mongoose = require('mongoose');

const paymentTermSchema = new mongoose.Schema({
  organizationId: { type: String },
  name: { type: String },
  days: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('Payment Term', paymentTermSchema);

