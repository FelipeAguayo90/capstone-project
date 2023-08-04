const express = require('express');
const router = express.Router();
const logger = require('./logger');
const register = require('./register');
const dashboard = require('./stdntDashboard');
const passport = require('passport');
const login = require('./login');
const courses = require('./courses');

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

require('../config/passport')(passport);

router.use(passport.initialize());

router.use(logger);

router.use('/courses', courses);

router.use('/login', login);

router.use('/register', register);

router.use(
  '/student/dashboard',
  passport.authenticate('jwt', { session: false }),
  dashboard
);

module.exports = router;
