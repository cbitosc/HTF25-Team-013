const express = require('express');
const router = express.Router();
const WasteCategory = require('../models/WasteCategory');

const SAMPLE = [
  { name: 'Metals', icon: '🔩', color: 'gray', ratePerKg: 50, recyclabilityScore: 85 },
  { name: 'Plastics', icon: '♻️', color: 'blue', ratePerKg: 20, recyclabilityScore: 60 },
  { name: 'Glass', icon: '🍾', color: 'green', ratePerKg: 15, recyclabilityScore: 70 },
  { name: 'E-Waste', icon: '🔌', color: 'red', ratePerKg: 80, recyclabilityScore: 40 },
  { name: 'Paper', icon: '📄', color: 'yellow', ratePerKg: 10, recyclabilityScore: 75 },
  { name: 'Construction', icon: '🏗️', color: 'brown', ratePerKg: 5, recyclabilityScore: 30 }
];

// GET /api/waste/categories
router.get('/categories', async (req, res) => {
  try{
    const dbList = await WasteCategory.find().lean().limit(100);
    if (dbList && dbList.length) return res.json(dbList);
  }catch(err){
    // log but fall back
    console.error('Waste categories DB error', err.message);
  }
  res.json(SAMPLE);
});

module.exports = router;
