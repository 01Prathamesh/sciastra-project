const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to get all courses
router.get('/', (req, res) => {
  db.query('SELECT * FROM courses', (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'No courses found' });
    }
    res.json(result);
  });
});

// Route to create a new course
router.post('/', (req, res) => {
  const { title, description, price, discount_price } = req.body;
  const createdAt = new Date();

  // Validate input data (basic checks)
  if (!title || !description || !price) {
    return res.status(400).json({ error: 'Missing required fields: title, description, and price are required.' });
  }

  // Validate that 'price' is a valid number
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ error: 'Price must be a valid number greater than 0.' });
  }

  // Optional: Check if discount_price is a valid number
  if (discount_price && (isNaN(discount_price) || discount_price < 0)) {
    return res.status(400).json({ error: 'Discount price must be a valid number or omitted.' });
  }

  // Insert new course into the database
  db.query(
    'INSERT INTO courses (title, description, price, discount_price, created_at) VALUES (?, ?, ?, ?, ?)',
    [title, description, price, discount_price || null, createdAt],
    (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({
        message: 'Course created successfully',
        courseId: result.insertId, // Return the ID of the newly created course
      });
    }
  );
});

module.exports = router;
