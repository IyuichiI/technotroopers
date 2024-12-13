const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

// Database connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Get all users from the database
const getUsers = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM users", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No users found in the database."));
        }
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error while fetching users.");
  }
};
// Get all consumption from the database
const getConsumption = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM consumption", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No consumption found in the database."));
        }
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error while fetching consumption.");
  }
};

// Create a new user in the database
const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { id_number, username, password, address } = body;

    // Check if ID number or username already exists
    pool.query(
      "SELECT id FROM users WHERE id_number = $1 OR username = $2",
      [id_number, username],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows && results.rows[0]) {
          resolve("ID number or username already in use.");
        } else {
          // Encrypt the password
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
              if (err) {
                reject(err);
              }
              // Insert the new user into the database
              pool.query(
                "INSERT INTO users (id_number, username, password, address) VALUES ($1, $2, $3, $4) RETURNING *",
                [id_number, username, hash, address],
                (error, results) => {
                  if (error) {
                    reject(error);
                  }
                  if (results && results.rows) {
                    resolve(`User created with ID: ${results.rows[0].id}`);
                  } else {
                    reject(new Error("Failed to create user."));
                  }
                }
              );
            });
          });
        }
      }
    );
  });
};

// Delete a user from the database
const deleteUser = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`User deleted with ID: ${id}`);
    });
  });
};

// Update a user record
const updateUser = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { username, password, address } = body;

    // Check if the username already exists (and is not the current user's username)
    pool.query(
      "SELECT id FROM users WHERE username = $1 AND id != $2",
      [username, id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows && results.rows[0]) {
          resolve("Username already in use by another user.");
        } else {
          // Handle password update if provided
          if (password) {
            bcrypt.genSalt(saltRounds, function (err, salt) {
              bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                  reject(err);
                }
                // Update user with the hashed password
                pool.query(
                  "UPDATE users SET username = $1, password = $2, address = $3 WHERE id = $4 RETURNING *",
                  [username, hash, address, id],
                  (error, results) => {
                    if (error) {
                      reject(error);
                    }
                    if (results && results.rows) {
                      resolve(`User updated: ${JSON.stringify(results.rows[0])}`);
                    } else {
                      reject(new Error("No user found to update."));
                    }
                  }
                );
              });
            });
          } else {
            // Update user without changing the password
            pool.query(
              "UPDATE users SET username = $1, address = $2 WHERE id = $3 RETURNING *",
              [username, address, id],
              (error, results) => {
                if (error) {
                  reject(error);
                }
                if (results && results.rows) {
                  resolve(`User updated: ${JSON.stringify(results.rows[0])}`);
                } else {
                  reject(new Error("No user found to update."));
                }
              }
            );
          }
        }
      }
    );
  });
};


// Login a user
const loginUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { email, password } = body;

    pool.query(
      "SELECT id, password FROM users WHERE email = $1",
      [email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows && results.rows[0]) {
          bcrypt.compare(password, results.rows[0].password, function (err, result) {
            if (err) {
              reject(err);
            }
            if (result === true) {
              resolve(results.rows[0].id);
            } else {
              resolve(JSON.stringify("Invalid email or password."));
            }
          });
        } else {
          resolve(JSON.stringify("No user found with the provided email."));
        }
      }
    );
  });
};

// signUp a user
const signUp = (body) => {
  return new Promise(function (resolve, reject) {
    const { id, email, password } = body;
    pool.query("SELECT id FROM users WHERE email = $1",
      [ email],(error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows && results.rows[0]) {
          resolve(JSON.stringify("email already in use"));
        } else
      {
        

    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          if (err){ reject(err)};
          pool.query(
            "INSERT INTO users (id_number,email,password) VALUES ($1, $2,$3) RETURNING *",
            [id,email, hash],
            (error, results) => {
              if (error) {
                reject(error);
              }
              if (results && results.rows) {
                resolve(
                  JSON.stringify(results.rows[0].id)
                );
              } else {
                reject(new Error("No results found"));
              }
            }
          );
      });
  });

  }
});
  });
};


// Export functions
module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  getConsumption,
  signUp
};
