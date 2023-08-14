const asyncWrapper = require('../middlewear/async');
const pool = require('../models/pool');

const getStudents = asyncWrapper(async (req, res) => {
  const text = 'SELECT * FROM account';
  const results = await pool.query(text);

  res.json(results.rows);
});

const dltUser = asyncWrapper(async (req, res) => {
  const userId = req.body.user_id;
  const text = 'DELETE FROM account WHERE user_id = $1';
  const values = [userId];
  pool.query(text, values, (error, results) => {
    if (error) {
      res.json({ msg: error });
    }
    res.json({ msg: results.rows[0] });
  });
  console.log(userId);
});

module.exports = { getStudents, dltUser };
