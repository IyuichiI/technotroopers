const express = require("express");
const { getUsers, createUser, updateUser, deleteUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const userId = await createUser(req.body);
    res.status(201).json({ id: userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const message = await deleteUser(req.params.id);
    res.json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const userId = await loginUser(req.body);
    res.json({ id: userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
