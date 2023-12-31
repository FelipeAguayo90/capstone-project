const express = require('express');
const router = express.Router();
const user = require('./user');
const logger = require('./logger');
const register = require('./register');
const admin = require('./admin');
const dashboard = require('./stdntDashboard');
const passport = require('passport');
const login = require('./login');
const courses = require('./courses');
const s3bucket = require('./s3bucket');

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

require('../config/passport')(passport);

router.use(passport.initialize());

router.use(logger);

router.use('/courses', courses);

router.use('/login', login);

router.use('/register', register);

router.use('/s3', s3bucket);

router.use('/user', passport.authenticate('jwt', { session: false }), user);

router.use('/admin', passport.authenticate('jwt', { session: false }), admin);

router.use(
  '/student',
  passport.authenticate('jwt', { session: false }),
  dashboard
);

module.exports = router;
