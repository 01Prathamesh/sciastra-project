const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/courses', (req, res) => {
  db.query('SELECT * FROM courses WHERE discount_price IS NOT NULL', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
