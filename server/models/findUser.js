const pool = require('./pool');

exports.findUser = (username, cb) => {
  const values = [username];
  const text = 'SELECT * FROM account WHERE username = $1';

  pool.query(text, values, (error, results) => {
    if (error) {
      return cb(error, null);
    }
    if (!results) {
      return cb(null, false);
    }
    return cb(null, results);
  });
};
