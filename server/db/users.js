const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect();

module.exports = pool;

// Parameterized query sql injection
// const text = 'INSERT INTO student(name, age) VALUES($1, $2) RETURNING *';
// const values = ['Joe Bell', '30'];

// // callback
// client.query(text, values, (err, res) => {
//   if (err) {
//     console.log(err.stack);
//   } else {
//     console.log(res.rows[0]); // { name: 'Joe Bell', age: '30' }
//   }
// });
