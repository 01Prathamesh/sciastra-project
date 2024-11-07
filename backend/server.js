const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const blogRoutes = require('./routes/blogRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());  // Parse incoming requests as JSON

// Test DB connection
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

// Use routes
app.use('/api', courseRoutes);
app.use('/api', blogRoutes);
app.use('/api', transactionRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('SciAstra API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
