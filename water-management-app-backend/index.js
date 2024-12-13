const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const { getUsers, createUser, getConsumption, loginUser, signUp } = require("./models/UserModel");

require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Routes
app.get("/api/consumption", async (req, res) => {
    try {
        const consumption = await getConsumption();
        res.json(consumption);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login route
app.post("/api/login", async (req, res) => {
    try {
        console.log(req.body.values);
        const result = await loginUser(req.body.values); // Call the loginUser function from the controller
        console.log(result)
        if (result == JSON.stringify("No user found with the provided email.")) {
            res.status(500).json({ error: "No user found with the provided email." });

        } else if (result == JSON.stringify("Invalid email or password.")) {
            res.status(501).json({ error: "Invalid email or password." });

        } else {
            res.json(result); // Send back the login result (success or failure)
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Login failed" });
    }
});
// SignUp route
app.post("/api/signup", async (req, res) => {
    try {
        const result = await signUp(req.body.values); // Call the loginUser function from the controller
        if (result == JSON.stringify("email already in use")) {
            res.status(500).json({ error: "Email or Id already in use" });
        } else {
            res.json(result); // Send back the login result (success or failure)
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Login failed" });
    }
});

// Test database connection
pool.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the database successfully!");
    }
});

app.get('/api/billing-data/:userId', async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required.' });
    }
  
    try {
      const query = `
        SELECT month, consumption, amount_due, status
        FROM bills
        WHERE user_id = $1
        ORDER BY month;
      `;
      const result = await pool.query(query, [userId]);
  
      if (result.rows.length > 0) {
        res.json({ success: true, billingData: result.rows });
      } else {
        res.status(404).json({ success: false, message: 'No billing data found for this user.' });
      }
    } catch (err) {
      console.error('Error fetching billing data:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });
  
  

app.get("/api/consumption/:userId/:year", async (req, res) => {
    const { userId, year } = req.params;
    console.log(year);
    console.log(userId);
    try {
        const result = await pool.query(
            `SELECT EXTRACT(MONTH FROM consumption_date) AS month, SUM(consumption_value) AS total_consumption
            FROM consumption
            WHERE user_id = $1 AND EXTRACT(YEAR FROM consumption_date) = $2
            GROUP BY month
            ORDER BY month`,
            [userId, year]
        );
        console.log(result.rows)
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});
const fetchBillingData = () => {
    axios
      .get(`http://localhost:5000/api/billing-data/${id}`)
      .then((response) => {
        console.log("Billing Data API Response:", response.data); // Debugging
        if (response.data.success) {
         const unpaid = response.data.billingData.filter((bill) => bill.status.toLowerCase() === "unpaid");
          const paid = response.data.billingData.filter((bill) => bill.status.toLowerCase() === "paid");            
          console.log("Unpaid Bills:", unpaid);
          console.log("Paid Bills:", paid);
          setUnpaidBills(unpaid);
          setPaidBills(paid);
        }
      })
      .catch((err) => console.error("Error fetching billing data:", err));
  };
  
app.post('/api/pay-bill', async (req, res) => {
    const { billId } = req.body;
  
    try {
      // Update the bill status to 'Paid'
      const query = `
        UPDATE bills
        SET status = 'Paid'
        WHERE id = $1
        RETURNING *;
      `;
      const result = await pool.query(query, [billId]);
  
      if (result.rowCount > 0) {
        res.json({ success: true, message: 'Bill paid successfully.', bill: result.rows[0] });
      } else {
        res.status(404).json({ success: false, message: 'Bill not found.' });
      }
    } catch (err) {
      console.error('Error paying bill:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });
  

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

