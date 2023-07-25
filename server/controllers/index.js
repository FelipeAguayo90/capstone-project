const pool = require('../models/pool');
const asyncWrapper = require('../middlewear/async');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// const login = asyncWrapper(async (req, res) => {
//   console.log(`db getActors`);
//   pool.query(
//     'SELECT actor_id, first_name, last_name FROM actor ORDER BY last_name ASC',
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).json(results.rows);
//     }
//   );
// });

const login = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await pool.query(
    `INSERT INTO account(username,first_name,last_name,passhash,email,created_on)
VALUES
('alex','alex','Rodrigez','simple','fakerer@email.com',CURRENT_TIMESTAMP)`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );

  const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '10d',
  });

  res.status(200).json({ msg: 'user created', token });
});

module.exports = login;
