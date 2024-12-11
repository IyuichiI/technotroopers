const { getUsers, createUser,getConsumption } = require("../models/UserModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const createNewUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "Failed to create user" });
  }
};
const getAllConsumption = async (req, res) => {
  try {
    const consumption = await getConsumption();
    res.json(consumption);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch consumption" });
  }
};



module.exports = { getAllUsers, createNewUser,getAllConsumption  };