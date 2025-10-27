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

// list images
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM images ORDER BY created_at DESC');
  res.json(result.rows);
});

// create image (admin)
router.post('/', requireAdmin, async (req, res) => {
  const { filename, url, category, tags } = req.body;
  const result = await db.query(
    `INSERT INTO images (filename, url, category, tags) VALUES ($1,$2,$3,$4) RETURNING *`,
    [filename, url, category, tags || []]
  );
  res.status(201).json(result.rows[0]);
});

// update image (admin)
router.put('/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  const { filename, url, category, tags } = req.body;
  const result = await db.query(
    `UPDATE images SET filename=$1, url=$2, category=$3, tags=$4, updated_at=NOW() WHERE image_id=$5 RETURNING *`,
    [filename, url, category, tags || [], id]
  );
  res.json(result.rows[0]);
});

// delete image (admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  await db.query('DELETE FROM images WHERE image_id=$1', [id]);
  res.json({ deleted: true });
});

module.exports = router;
