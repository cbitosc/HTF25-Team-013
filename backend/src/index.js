require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const wasteRoutes = require('./routes/waste');
const centersRoutes = require('./routes/recyclingCenters');
const statsRoutes = require('./routes/stats');
const pickupsRoutes = require('./routes/pickups');

const app = express();
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

app.use('/api/auth', authRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/recycling-centers', centersRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/pickups', pickupsRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'Inorganic Waste API' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
