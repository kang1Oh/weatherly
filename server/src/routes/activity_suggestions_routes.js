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
router.post('/', async (req, res) => {
  const { name, email, activity, indoor, location, city, country } = req.body;
  if (!activity || !location) return res.status(400).json({ error: 'activity and location required' });

  const result = await db.query(
    `INSERT INTO suggestions (name,activity,indoor,location,city,country) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [name, email, activity, indoor, location, city, country]
  );
  res.status(201).json(result.rows[0]);
});

// admin: list suggestions
router.get('/', requireAdmin, async (req, res) => {
  const result = await db.query('SELECT * FROM suggestions ORDER BY created_at DESC');
  res.json(result.rows);
});

// admin: moderate (approve/reject)
router.put('/:id/status', requireAdmin, async (req, res) => {
  const { status } = req.body; // 'approved' or 'rejected'
  const id = req.params.id;
  const result = await db.query('UPDATE suggestions SET status=$1 WHERE suggestion_id=$2 RETURNING *', [status, id]);
  res.json(result.rows[0]);
});

module.exports = router;
