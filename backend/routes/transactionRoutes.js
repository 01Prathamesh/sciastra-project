const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all transactions
router.get('/transactions', (req, res) => {
  db.query('SELECT * FROM transactions ORDER BY created_at DESC', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(result);
    }
  });
});

// Get transactions by user ID
router.get('/transactions/user/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(result);
    }
  });
});

// Create a new transaction (for example, after a course purchase)
router.post('/transactions', (req, res) => {
  const { userId, courseId, amount, status } = req.body;
  const createdAt = new Date();
  db.query(
    'INSERT INTO transactions (user_id, course_id, amount, status, created_at) VALUES (?, ?, ?, ?, ?)',
    [userId, courseId, amount, status, createdAt],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.status(201).json({ message: 'Transaction created successfully', transactionId: result.insertId });
      }
    }
  );
});

module.exports = router;
