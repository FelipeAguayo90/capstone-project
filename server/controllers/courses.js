const asyncWrapper = require('../middlewear/async');
const pool = require('../models/pool');

const getCarouselCourses = asyncWrapper(async (req, res) => {
  const text =
    'SELECT * FROM courses WHERE course_title IN ($1, $2, $3, $4, $5)';
  const values = [
    'Advanced Algorithms',
    'Data Structures',
    'Computer Architecture',
    'Introduction to Computer Science',
    'Networking & Security',
  ];
  const results = await pool.query(text, values);
  res.json(results.rows);
});

const getCourses = asyncWrapper(async (req, res) => {
  const text = 'SELECT * FROM courses';
  const results = await pool.query(text);
  res.json(results.rows);
});

module.exports = { getCarouselCourses, getCourses };

// SELECT *
// FROM courses
// WHERE course_title IN ('Advanced Algorithms', 'Data Structures', 'Computer Architecture', 'Introduction to Computer Science', 'Networking & Security')
