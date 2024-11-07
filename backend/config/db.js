const mysql = require('mysql2');
require('dotenv').config();

// In db.js to check if env variables are loaded correctly (useful for debugging)
console.log('DB_HOST:', process.env.DB_HOST);  // Logs DB Host (for debugging)
console.log('DB_USER:', process.env.DB_USER);  // Logs DB User (for debugging)

// Create DB connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test DB connection on startup
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL database:', err);
    process.exit(1); // Exit the process if DB connection fails
  }
  console.log('Connected to the MySQL database');
});

module.exports = db;
