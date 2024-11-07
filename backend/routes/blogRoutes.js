// blogRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all blog posts
router.get('/', (req, res) => {
  console.log('GET request to /api/blogs');
  db.query('SELECT * FROM blogs ORDER BY created_at DESC', (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(result);
    }
  });
});

// Get a single blog post by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(`GET request to /api/blogs/${id}`);
  db.query('SELECT * FROM blogs WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Database error' });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Blog not found' });
    } else {
      res.json(result[0]);
    }
  });
});

// Create a new blog post
router.post('/', (req, res) => {
  const { title, content, author } = req.body;
  const createdAt = new Date();
  console.log('POST request to /api/blogs', { title, content, author });
  db.query(
    'INSERT INTO blogs (title, content, author, created_at) VALUES (?, ?, ?, ?)',
    [title, content, author, createdAt],
    (err, result) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.status(201).json({ message: 'Blog created successfully', blogId: result.insertId });
      }
    }
  );
});

module.exports = router;
