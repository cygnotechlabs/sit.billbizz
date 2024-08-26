const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  username: { type: String},
  activity: { type: String },
  timestamp: { type: String },
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
