// const users = require('../models/findUser');
const pool = require('../models/pool');
const bcrypt = require('bcryptjs');
const asyncWrapper = require('../middlewear/async');
const jwt = require('jsonwebtoken');

const login = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  const values = [username];
  const text = 'SELECT * FROM account WHERE username = $1';

  pool.query(text, values, (error, results) => {
    if (error) {
      return res.status(500).json({ msg: error });
    }
    if (results < 1) {
      return res.status(404).json({ msg: 'User does not exist' });
    }
    let isMatched = bcrypt.compareSync(password, results.rows[0].passhash);

    if (!isMatched) {
      return res.status(400).json({ msg: 'Wrong password' });
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

module.exports = login;
