const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// Register
router.post('/register',
	body('name').notEmpty(),
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		const { name, email, password, role } = req.body;
		try{
			let user = await User.findOne({ email });
			if (user) return res.status(400).json({ error: 'User already exists' });
			const hash = await bcrypt.hash(password, 10);
			user = new User({ name, email, password: hash, role: role || 'citizen' });
			await user.save();
			const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
			res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
		}catch(err){
			console.error(err);
			res.status(500).json({ error: 'Server error' });
		}
	}
);

// Login
router.post('/login',
	body('email').isEmail(),
	body('password').notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		const { email, password } = req.body;
		try{
			const user = await User.findOne({ email });
			if (!user) return res.status(400).json({ error: 'Invalid credentials' });
			const match = await bcrypt.compare(password, user.password);
			if (!match) return res.status(400).json({ error: 'Invalid credentials' });
			const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
			res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
		}catch(err){
			console.error(err);
			res.status(500).json({ error: 'Server error' });
		}
	}
);

// Profile - returns user info when a valid Bearer token is provided
router.get('/profile', async (req, res) => {
	const auth = req.headers.authorization;
	if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
	const token = auth.split(' ')[1];
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(decoded.id).select('-password');
		if (!user) return res.status(401).json({ error: 'Unauthorized' });
		return res.json({ user });
	} catch (err) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
});

module.exports = router;
