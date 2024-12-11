const pool = require("../db");

const createBill = async ({ user_id, amount, due_date }) => {
  try {
    const newBill = await pool.query(
      "INSERT INTO bills (user_id, amount, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, amount, due_date, "unpaid"]
    );
    return newBill.rows[0];
  } catch (err) {
    throw err;
  }
};

const getBillsByUser = async (user_id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM bills WHERE user_id = $1 ORDER BY due_date DESC",
      [user_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createBill,
  getBillsByUser,
};
