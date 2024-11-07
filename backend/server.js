// const express = require('express');
// const dotenv = require('dotenv');
// const db = require('./config/db'); // Ensure correct path
// const courseRoutes = require('./routes/courseRoutes');
// const blogRoutes = require('./routes/blogRoutes');
// const transactionRoutes = require('./routes/transactionRoutes');

// // Load environment variables at the very beginning
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware: Use Express' built-in JSON parsing (instead of body-parser)
// app.use(express.json());  // Parse incoming requests as JSON

// // // Test DB connection
// // db.connect((err) => {
// //   if (err) {
// //     console.error('Error connecting to the MySQL database:', err);
// //     return;
// //   }
// //   console.log('Connected to the MySQL database');
// // });

// // Use routes
// app.use('/api/courses', courseRoutes);  // Routes for courses
// app.use('/api/blogs', blogRoutes);      // Routes for blogs
// app.use('/api/transactions', transactionRoutes);  // Routes for transactions

// // Default route
// app.get('/', (req, res) => {
//   res.send('SciAstra API is running');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong' });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const blogRoutes = require('./routes/blogRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware: Use Express' built-in JSON parsing (instead of body-parser)
app.use(express.json());  // Parse incoming requests as JSON

// Register routes with '/api' prefix
app.use('/api/courses', courseRoutes);      // Courses API
app.use('/api/blogs', blogRoutes);          // Blogs API
app.use('/api/transactions', transactionRoutes); // Transactions API

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Default route
app.get('/', (req, res) => {
  res.send('SciAstra API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
