const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  coordinates: { lat: Number, lng: Number }
});

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  review: String,
  date: Date
});

const recyclingCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: addressSchema,
  acceptedWasteTypes: [String],
  operatingHours: Object,
  currentCapacity: { type: Number, default: 0 },
  maxCapacity: { type: Number, default: 100 },
  ratings: [ratingSchema],
  verified: { type: Boolean, default: false },
  photos: [String],
  coordinates: { lat: Number, lng: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RecyclingCenter', recyclingCenterSchema);
