const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
	street: String,
	city: String,
	state: String,
	postalCode: String,
	coordinates: { lat: Number, lng: Number }
});

const statsSchema = new mongoose.Schema({
	totalPickups: { type: Number, default: 0 },
	totalWeight: { type: Number, default: 0 },
	co2Saved: { type: Number, default: 0 },
	moneyEarned: { type: Number, default: 0 },
	streak: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['citizen','center','ngo','admin'], default: 'citizen' },
	phone: String,
	address: addressSchema,
	avatar: String,
	stats: statsSchema,
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
