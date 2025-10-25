const mongoose = require('mongoose');

const wasteCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: String,
  color: String,
  ratePerKg: { type: Number, default: 0 },
  recyclabilityScore: { type: Number, default: 0 },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WasteCategory', wasteCategorySchema);
