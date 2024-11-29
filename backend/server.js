const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');  

// Environment variables for database configuration  
require('dotenv').config();  

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SoftwareProject',
  password: 'Nakgc1cda',
  port: 5433,
});

// Remove pool.end() here as it will close the pool prematurely
pool.query('SELECT 1', (err, res) => {
  if (err) {
      console.error('Database connection failed:', err);
  } else {
      console.log('Database connection successful:', res.rows);
  }
  // Remove pool.end() here, as you still need the pool for further queries
});

app.get('/test-db', async (req, res) => {
  try {
      const result = await pool.query('SELECT 1');
      res.send('Database connection is working!');
  } catch (error) {
      res.status(500).send('Database connection failed: ' + error.message);
  }
});

app.post('/SoftwareProject', async (req, res) => {
  const sql = `INSERT INTO login (name, email, password) VALUES ($1, $2, $3)`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ];

  try {
      const result = await pool.query(sql, values); // Make sure the query is executed properly
      res.json({ success: true, message: 'User registered successfully!' });
  } catch (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ success: false, message: 'Error inserting data' });
  }
});

app.post('/logIn', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists in the database
    const result = await pool.query('SELECT * FROM login WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      // Email not found
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    // Verify the password
    const user = result.rows[0];
    if (user.password === password) {
      res.json({ success: true, message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Listen on port
app.listen(8081, () => {
  console.log('Server is running on port 8081');
});

