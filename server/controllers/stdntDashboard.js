const asyncWrapper = require('../middlewear/async');
const pool = require('../models/pool');

const stdClasses = asyncWrapper(async (req, res) => {
  const userId = req.params.stdId;

  console.log(userId);
  const values = [userId];
  const text = 'select * from student_class where user_id = $1';

  const resp = await pool.query(text, values);
  console.log(resp.rows);

  res.status(200).json(resp.rows);
});

module.exports = stdClasses;
