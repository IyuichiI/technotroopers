const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const { getAllUsers,getAllConsumption } = require("./controllers/userController")
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
        const consumption = await getAllConsumption(req, res);
        res.json(consumption);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get("/api/users", async (req, res) => {
    try {
        const users = await getAllUsers(req, res);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
pool.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the database successfully!");
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));