const pool = require('./pool');
// const asyncWrapper = require('../middlewear/async');

exports.findOne = async (username, cb) => {
  try {
    console.log(username);
    const userName = username;
    const values = [userName];
    const text = 'SELECT * FROM account WHERE username = $1';
    pool.query(text, values, (error, results) => {
      if (results) {
        return cb(null, results);
      } else {
        return cb(null, false);
      }
    });
  } catch (error) {
    return cb(error, null);
  }
};
