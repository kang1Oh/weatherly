require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Routes
const imagesRouter = require('./routes/outfit_images_routes');
const suggestionsRouter = require('./routes/activity_suggestions_routes');

const app = express();
app.use(cors());
app.use(express.json());

// Static file serving (corrected)
app.use('/outfits', express.static(path.join(__dirname, '../public/outfits')));

// Route handlers
app.use('/api/outfit_images', imagesRouter);
app.use('/api/activity_suggestions', suggestionsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Weatherly API listening on ${port}`));
