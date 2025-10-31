const express = require('express');
const db = require('../db');
const router = express.Router();

function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}

// submit suggestion (public)
router.post("/", async (req, res) => {
  try {
    const {
      name,
      activity,
      reason,
      duration,
      energyLevel,
      timeOfDay,
      category,
      indoor,
      condition,
      status,
    } = req.body;

    if (!activity) {
      return res.status(400).json({ error: "Activity name is required." });
    }

    const result = await db.query(
      `INSERT INTO suggestions 
        (name, activity, reason, duration, "energyLevel", "timeOfDay", category, indoor, condition, status) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        name || "Anonymous",
        activity,
        reason || null,
        duration || null,
        energyLevel || "Any",
        timeOfDay || "Any",
        category || "Relaxation",
        indoor === true || indoor === "true",
        condition || "any",
        status || "inactive",
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error inserting suggestion:", err);
    res.status(500).json({ error: "Failed to submit suggestion." });
  }
});

// admin: list suggestions
router.get('/', requireAdmin, async (req, res) => {
  const result = await db.query('SELECT * FROM suggestions ORDER BY created_at DESC');
  res.json(result.rows);
});

// public: get all approved activity suggestions
router.get('/public', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM suggestions WHERE status = $1 ORDER BY created_at DESC',
      ['active']
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching public activity suggestions:', err);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

// admin: moderate (approve/reject)
router.put('/:id/status', requireAdmin, async (req, res) => {
  const { status } = req.body; // 'active' or 'deactive'
  const id = req.params.id;
  const result = await db.query('UPDATE suggestions SET status=$1 WHERE suggestion_id=$2 RETURNING *', [status, id]);
  res.json(result.rows[0]);
});

module.exports = router;
