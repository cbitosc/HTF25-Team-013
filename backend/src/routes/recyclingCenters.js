const express = require('express');
const router = express.Router();
const RecyclingCenter = require('../models/RecyclingCenter');

const SAMPLE = [
  { name: 'GreenCity Recycling', address: { street: '12 Green St', city: 'Bengaluru' }, acceptedWasteTypes: ['Metals','Plastics'], coordinates: { lat: 12.9716, lng: 77.5946 }, currentCapacity: 40, maxCapacity: 100, rating: 4.5 },
  { name: 'Urban Scrap Depot', address: { street: '5 Depot Rd', city: 'Chennai' }, acceptedWasteTypes: ['Metals','E-Waste'], coordinates: { lat: 13.0827, lng: 80.2707 }, currentCapacity: 60, maxCapacity: 120, rating: 4.2 }
];

router.get('/', async (req, res) => {
  try{
    const list = await RecyclingCenter.find().lean().limit(200);
    if (list && list.length) return res.json(list);
  }catch(err){
    console.error('Recycling centers DB error', err.message);
  }
  res.json(SAMPLE);
});

router.get('/:id', async (req, res) => {
  try{
    const center = await RecyclingCenter.findById(req.params.id).lean();
    if (center) return res.json(center);
  }catch(err){
    console.error('Recycling center get error', err.message);
  }
  res.status(404).json({ error: 'Not found' });
});

module.exports = router;
