const asyncWrapper = require('../middlewear/async');
const pool = require('../models/pool');
const jwt = require('jsonwebtoken');

const vrfyUser = asyncWrapper(async (req, res) => {
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
      results.rows[0].user = true;
      return res.status(200).json(results.rows[0]);
    });
  });
});

const updateUser = asyncWrapper(async (req, res) => {
  const userInfo = req.body.userInfo;
  const userId = req.body.user_id;

  const props = [];
  for (const key in userInfo) {
    props.push(`${key} = '${userInfo[key]}'`);
  }
  console.log(props);

  const joinedString = props.join(', ');
  console.log(joinedString);

  const values = [userId];
  const text = `UPDATE account SET ${joinedString} WHERE user_id = $1`;

  const results = pool.query(text, values);
  res.json({ results });
});

const enrollUser = asyncWrapper(async (req, res) => {
  const { course_id, user_id } = req.body;
  const values = [user_id, course_id];
  const text = 'INSERT INTO student_class (user_id, course_id) VALUES ($1, $2)';
  const results = await pool.query(text, values);
  const values2 = [course_id];
  const text2 =
    'UPDATE courses SET subscribers = subscribers + 1 WHERE course_id = $1';
  pool.query(text2, values2);
  res.json(results);
});

const deleteStdClass = asyncWrapper(async (req, res) => {
  const { course_id, user_id } = req.body;

  const values = [user_id, course_id];
  const text =
    'DELETE FROM student_class WHERE user_id = $1 AND course_id = $2';
  const results = await pool.query(text, values);
  res.json({ course_id });
});

module.exports = { vrfyUser, updateUser, enrollUser, deleteStdClass };
