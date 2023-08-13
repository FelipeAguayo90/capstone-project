const express = require('express');
const router = express.Router();
const { getCarouselCourses, getCourses } = require('../controllers/courses');

router.get('/', getCourses);

router.get('/carousel', getCarouselCourses);

module.exports = router;
