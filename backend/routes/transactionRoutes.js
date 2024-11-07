const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all transactions
router.get('/', (req, res) => {
  db.query('SELECT * FROM transactions ORDER BY transaction_date DESC', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(result);
    }
  });
});

// Get transactions by user email
router.get('/user/:userEmail', (req, res) => {
  const { userEmail } = req.params;
  db.query('SELECT * FROM transactions WHERE user_email = ? ORDER BY transaction_date DESC', [userEmail], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(result);
    }
  });
});

// Create a new transaction (for example, after a course purchase)
router.post('/', (req, res) => {
  const { userEmail, courseId, amount, status } = req.body;
  const transactionDate = new Date();

  // Validate input data (basic checks)
  if (!userEmail || !courseId || !amount || !status) {
    return res.status(400).json({ error: 'Missing required fields: user_email, course_id, amount, and status are required.' });
  }

  // Insert new transaction into the database
  db.query(
    'INSERT INTO transactions (user_email, course_id, amount, status, transaction_date) VALUES (?, ?, ?, ?, ?)',
    [userEmail, courseId, amount, status, transactionDate],
    (err, result) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.status(201).json({
          message: 'Transaction created successfully',
          transactionId: result.insertId, // Return the ID of the newly created transaction
        });
      }
    }
  );
});

module.exports = router;
