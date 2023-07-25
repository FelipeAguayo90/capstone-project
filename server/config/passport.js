// const passport = require('passport');
const pool = require('../models/pool');
const users = require('../models/findOne');
const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithm: 'RS256',
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, (payload, done) => {
      users.findOne({ username: payload.username }, (err, user) => {
        if (err) {
          return done(err, null);
        }
        if (user) {
          return done(null, user);
        } else {
          console.log('problem check user');
          return done(null, false);
        }
      });
    })
  );
};
// passport.serializeUser((user, done) => {
//   done(null, user.rows[0].user_id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     // Fetch the user from the database using the user ID
//     const query = 'SELECT * FROM users WHERE user_id = $1';
//     const values = [id];
//     const result = await pool.query(query, values);
//     const user = result.rows[0];

//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// const passport = require('passport');
// // const { Strategy } = require('passport-local');
// const pool = require('../models/pool');
// const users = require('../models/findUser');
// const bcrypt = require('bcryptjs');
// const { Strategy, ExtractJwt } = require('passport-jwt');

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secret: process.env.JWT_SECRET,
//   algorithms: ['RS256'],
// };

// console.log(ExtractJwt);
// passport.use(
//   new Strategy((username, password, done) => {
//     users.findUser(username, (err, user) => {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       let isMatched = bcrypt.compareSync(password, user.rows[0].passhash);
//       if (!isMatched) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.rows[0].user_id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     // Fetch the user from the database using the user ID
//     const query = 'SELECT * FROM users WHERE user_id = $1';
//     const values = [id];
//     const result = await pool.query(query, values);
//     const user = result.rows[0];

//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });
