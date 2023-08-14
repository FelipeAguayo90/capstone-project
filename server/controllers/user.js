const asyncWrapper = require('../middlewear/async');
const pool = require('../models/pool');
const jwt = require('jsonwebtoken');

const vrfyUser = asyncWrapper(async (req, res) => {
  console.log('hello');

  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    const user = decoded.username;
    const values = [user];
    const text = 'SELECT * FROM account WHERE username = $1';

    pool.query(text, values, (error, results) => {
      if (error) {
        return res.status(500).json({ msg: error });
      }
      console.log(results);
      return res.status(200).json(results.rows);
    });
  });
});

module.exports = { vrfyUser };
