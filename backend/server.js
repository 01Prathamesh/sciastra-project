const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());  // Parse incoming requests as JSON

// Create DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test DB connection
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

// Routes (we will define more later)
app.get('/', (req, res) => {
  res.send('SciAstra API is running');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
