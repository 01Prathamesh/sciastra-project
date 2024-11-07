const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to get all courses
router.get('/', (req, res) => {
  // Query all courses, for now, without filtering by discount_price
  db.query('SELECT * FROM courses', (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    // Check if courses were found, then return them
    if (result.length === 0) {
      return res.status(404).json({ message: 'No courses found' });
    }
    res.json(result); // Send the results as a JSON response
  });
});

module.exports = router;
