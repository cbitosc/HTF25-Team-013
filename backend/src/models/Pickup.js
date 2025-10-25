const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  coordinates: { lat: Number, lng: Number }
});

const updateSchema = new mongoose.Schema({
  status: String,
  timestamp: Date,
  note: String
});

const pickupSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  wasteTypes: [String],
  estimatedWeight: Number,
  actualWeight: Number,
  photos: [String],
  address: addressSchema,
  scheduledDate: Date,
  timeSlot: String,
  status: { type: String, enum: ['scheduled','assigned','in-transit','collected','at-center','processed','cancelled'], default: 'scheduled' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tracking: {
    currentLocation: { lat: Number, lng: Number },
    eta: Number,
    updates: [updateSchema]
  },
  pricing: { estimatedValue: Number, finalValue: Number },
  specialInstructions: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pickup', pickupSchema);
