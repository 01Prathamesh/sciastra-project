const mysql = require('mysql2');
require('dotenv').config();

// In db.js or server.js to check if env variables are loaded correctly
console.log(process.env.DB_HOST);  // Should log 'localhost'
console.log(process.env.DB_USER);  // Should log 'sciastra_user'


// Create DB connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = db;
