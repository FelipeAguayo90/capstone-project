const express = require('express');
const stdClasses = require('../controllers/stdntDashboard');
const router = express.Router();

router.get('/:stdId/class', stdClasses);

module.exports = router;
