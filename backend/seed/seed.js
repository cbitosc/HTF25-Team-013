require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('../src/config/db');
const User = require('../src/models/User');
const WasteCategory = require('../src/models/WasteCategory');
const RecyclingCenter = require('../src/models/RecyclingCenter');
const Pickup = require('../src/models/Pickup');

async function seed(){
	await connectDB();
	try{
		await User.deleteMany({});
		const users = [
			{ name: 'Admin User', email: 'admin@example.com', password: await bcrypt.hash('password123',10), role: 'admin' },
			{ name: 'Citizen One', email: 'citizen1@example.com', password: await bcrypt.hash('password123',10), role: 'citizen' },
			{ name: 'Citizen Two', email: 'citizen2@example.com', password: await bcrypt.hash('password123',10), role: 'citizen' },
			{ name: 'Center One', email: 'center1@example.com', password: await bcrypt.hash('password123',10), role: 'center' },
			{ name: 'NGO One', email: 'ngo1@example.com', password: await bcrypt.hash('password123',10), role: 'ngo' }
		];
			await User.insertMany(users.map(u => ({ ...u, createdAt: new Date() })));
			console.log('Seeded users');

			// Seed waste categories
			await WasteCategory.deleteMany({});
			const categories = [
				{ name: 'Metals', description: 'Ferrous and non-ferrous metals', examples: ['Aluminum cans','Copper wire'] },
				{ name: 'Plastics', description: 'Plastic bottles and containers', examples: ['PET bottles','Plastic bags'] },
				{ name: 'Glass', description: 'Glass bottles and jars', examples: ['Wine bottles','Jars'] },
				{ name: 'E-Waste', description: 'Electronic waste', examples: ['Phones','Batteries'] },
				{ name: 'Paper', description: 'Paper and cardboard', examples: ['Newspapers','Cardboard boxes'] }
			];
			await WasteCategory.insertMany(categories);
			console.log('Seeded waste categories');

			// Seed recycling centers
			await RecyclingCenter.deleteMany({});
			const centers = [
				{ name: 'GreenCity Recycling', address: { street: '123 Green St', city: 'Greenville', state: 'State', postalCode: '12345' }, phone: '555-0101', capacity: 120 },
				{ name: 'Urban Scrap Depot', address: { street: '45 Industrial Rd', city: 'Metropolis', state: 'State', postalCode: '54321' }, phone: '555-0202', capacity: 80 }
			];
			const insertedCenters = await RecyclingCenter.insertMany(centers);
			console.log('Seeded recycling centers');

			// Seed pickups (associate with citizen users if available)
			await Pickup.deleteMany({});
			const citizens = await User.find({ role: 'citizen' }).limit(2);
			const pickups = [];
			for (let i = 0; i < citizens.length; i++){
				pickups.push({
					user: citizens[i]._id,
					wasteTypes: ['Plastics'],
					estimatedWeight: 4 + i,
					address: { street: `${10+i} Maple Ave`, city: 'Greenville', state: 'State', postalCode: '12345' },
					scheduledDate: new Date(),
					status: i % 2 === 0 ? 'scheduled' : 'collected',
					createdAt: new Date(Date.now() - i * 3600 * 1000)
				});
			}
			if (pickups.length) await Pickup.insertMany(pickups);
			console.log('Seeded pickups');
	}catch(err){
		console.error('Seeding error', err);
	}finally{
		mongoose.connection.close();
	}
}

if (require.main === module) seed().catch(err => { console.error(err); process.exit(1); });
