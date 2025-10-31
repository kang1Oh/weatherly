require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Routes
const imagesRouter = require('./routes/outfit_images_routes');
const suggestionsRouter = require('./routes/activity_suggestions_routes');
const adminRoutes = require('./routes/admin_routes');

const app = express();
app.use(cors());
app.use(express.json());

// Static file serving
app.use('/outfits', express.static(path.join(__dirname, '../public/outfits')));
app.use(express.static(path.join(__dirname, "public")));

// Route handlers
app.use('/api/outfit_images', imagesRouter);
app.use('/api/activity_suggestions', suggestionsRouter);
app.use("/api/admin", adminRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Weatherly API listening on ${port}`));
