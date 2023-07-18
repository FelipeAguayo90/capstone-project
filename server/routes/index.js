const express = require('express');
const router = express.Router();
const logger = require('./logger');

router.use('/', logger);

// Handle GET requests to /api route
router.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

module.exports = router;
