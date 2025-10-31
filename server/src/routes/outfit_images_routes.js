const express = require('express');
const db = require('../db');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}

// File upload helpers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', '..', 'public', 'outfits');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // use original filename
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /png|jpg|jpeg/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg, and .jpeg files are allowed'));
    }
  },
});

// list images
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM images ORDER BY created_at DESC');
  res.json(result.rows);
});

// create image (admin)
router.post('/', requireAdmin, upload.single('file'), async (req, res) => {
  try {
    const { category, item_name, type } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const filename = file.filename;
    const url = `/outfits/${filename}`;

    const result = await db.query(
      `INSERT INTO images (filename, url, category, item_name, type)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [filename, url, category, item_name, type]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating image:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// update image (admin)
router.put('/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  const { filename, url, category, item_name, type } = req.body;
  const result = await db.query(
    `UPDATE images SET filename=$1, url=$2, category=$3, item_name=$4, type=$5, updated_at=NOW() WHERE image_id=$6 RETURNING *`,
    [filename, url, category, item_name, type, id]
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
