const express = require('express');
const router = express.Router();
const {
  vrfyUser,
  updateUser,
  enrollUser,
  deleteStdClass,
} = require('../controllers/user');
const stdClasses = require('../controllers/stdntDashboard');

router.post('/update', updateUser);

router.post('/enroll', enrollUser);

router.delete('/delete/class', deleteStdClass);

router.get('/verify-token', vrfyUser);

router.get(':stdId/class', stdClasses);

module.exports = router;
