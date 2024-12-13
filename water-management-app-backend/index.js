const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const { getUsers, createUser, getConsumption, loginUser, signUp } = require("./models/UserModel");

require("dotenv").config();

const app = express();
const PORT = 8080;

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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

