const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Use your DB if needed for saving transaction details

// Payment endpoint (POST request to simulate a payment)
router.post('/process', (req, res) => {
    const { cardNumber, expiryDate, cvv, userId, courseId } = req.body;
    
    // Payment processing logic (this is where you'd integrate with Stripe or PayPal)
    if (validateCard(cardNumber, expiryDate, cvv)) {
        // Simulate saving the payment to the database
        db.query('INSERT INTO transactions (user_id, course_id, amount, status) VALUES (?, ?, ?, ?)', 
            [userId, courseId, 99.99, 'success'], (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'Payment processing failed.' });
                } else {
                    res.status(200).json({ message: 'Payment successful', transactionId: result.insertId });
                }
            });
    } else {
        res.status(400).json({ error: 'Invalid payment details' });
    }
});

function validateCard(cardNumber, expiryDate, cvv) {
    // Simple validation - you can improve this with regex
    return cardNumber.length === 16 && expiryDate.length === 5 && cvv.length === 3;
}

module.exports = router;
