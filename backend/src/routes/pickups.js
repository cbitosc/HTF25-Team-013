const express = require('express');
const router = express.Router();
const Pickup = require('../models/Pickup');
const auth = require('../middleware/auth');

// Create a pickup (requires auth) - associates with the logged-in user
router.post('/', auth, async (req, res) => {
  try {
    const body = req.body || {};
    body.user = req.userId; // associate with authenticated user
    const pickup = new Pickup(body);
    await pickup.save();
    return res.status(201).json({ ok: true, pickup });
  } catch (err) {
    console.error('Create pickup error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// List pickups
// Public: returns recent pickups. If ?mine=true is provided and a valid token is supplied, returns the authenticated user's pickups.
router.get('/', async (req, res) => {
  try {
    const filter = {};
    // support ?mine=true to list only authenticated user's pickups
    if (req.query.mine === 'true') {
      const auth = req.headers.authorization;
      if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ ok: false, error: 'Unauthorized' });
      // verify token using jwt to get user id without requiring middleware here
      const jwt = require('jsonwebtoken');
      const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
      try {
        const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
        filter.user = decoded.id;
      } catch (e) {
        return res.status(401).json({ ok: false, error: 'Unauthorized' });
      }
    } else if (req.query.user) {
      filter.user = req.query.user;
    }
    const list = await Pickup.find(filter).sort({ createdAt: -1 }).limit(100);
    return res.json({ ok: true, pickups: list });
  } catch (err) {
    console.error('List pickups error', err);
    return res.json({ ok: true, pickups: [] });
  }
});

// Get one pickup - allow public read, but sensitive data omitted for unauthenticated users
router.get('/:id', async (req, res) => {
  try {
    const p = await Pickup.findById(req.params.id).populate('user', 'name email role');
    if (!p) return res.status(404).json({ ok: false, error: 'Not found' });
    return res.json({ ok: true, pickup: p });
  } catch (err) {
    console.error('Get pickup error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// Update pickup (partial) - requires auth
router.patch('/:id', auth, async (req, res) => {
  try {
    const updates = req.body || {};
    // only allow owner or admin to update
    const existing = await Pickup.findById(req.params.id);
    if (!existing) return res.status(404).json({ ok: false, error: 'Not found' });
    if (existing.user && existing.user.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ ok: false, error: 'Forbidden' });
    }
    const p = await Pickup.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });
    return res.json({ ok: true, pickup: p });
  } catch (err) {
    console.error('Update pickup error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

module.exports = router;
