const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/inorganic-waste';

async function connectDB(){
	try{
		await mongoose.connect(MONGODB_URI);
		console.log('MongoDB connected');
	}catch(err){
		console.error('MongoDB connection error:', err.message);
		// don't exit here to allow frontend dev to run even if DB is not available
	}
}

module.exports = connectDB;

