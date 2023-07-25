const express = require('express');
const stdntDashboard = require('../controllers/stdntDashboard');
const router = express.Router();

router.get('/', stdntDashboard);

module.exports = router;
