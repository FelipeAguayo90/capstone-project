const asyncWrapper = require('../middlewear/async');
const pool = require('../models/pool');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const register = asyncWrapper(async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    isAdmin,
    city,
    country,
    state,
    street,
    telephone,
    zipCode,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const values = [
    username,
    firstName,
    lastName,
    hashedPassword,
    email,
    isAdmin,
    city,
    country,
    state,
    street,
    telephone,
    zipCode,
  ];
  const text = `INSERT INTO account(username, first_name, last_name, passhash, email, created_on, is_admin, city, country, state, street_address, telephone, zip_code) VALUES ($1, $2, $3, $4 , $5, CURRENT_TIMESTAMP, $6, $7, $8, $9, $10, $11, $12) returning *`;
  pool.query(text, values, (error, results) => {
    if (error) {
      return res.status(500).json({ msg: error });
    }

    const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
    const { email, first_name, is_admin, last_login, user_id } =
      results.rows[0];
    res.status(200).json({
      msg: 'Logged in successfully',
      token: `Bearer ${token}`,
      first_name,
      is_admin,
      last_login,
      user_id,
      email,
      user: true,
    });
  });
});

module.exports = register;
