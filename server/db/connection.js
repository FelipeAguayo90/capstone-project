const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const connectDB = () => {
  pool.connect();
};

module.exports = connectDB;
