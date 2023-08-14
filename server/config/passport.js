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
