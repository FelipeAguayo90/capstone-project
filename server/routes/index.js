const express = require('express');
const router = express.Router();
const logger = require('./logger');
const pool = require('../db/users');

router.use(logger);

// router.use('/register');

// router.use('/login');

// router.use('/api/student');

// router.use('/api/courses');

// router.use('/api/admin');

module.exports = router;
