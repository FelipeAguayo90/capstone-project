const express = require('express');
const router = express.Router();
const { vrfyUser } = require('../controllers/user');

router.get('/', vrfyUser);

module.exports = router;
