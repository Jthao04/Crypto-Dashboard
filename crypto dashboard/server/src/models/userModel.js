const pool = require('../config/db');

const createUser = async (username, email, hashedPassword, preference) => {
  const result = await pool.query(
    "INSERT INTO users (username, email, password, preference) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, email, hashedPassword, preference]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows[0];
};

module.exports = { createUser, findUserByUsername };