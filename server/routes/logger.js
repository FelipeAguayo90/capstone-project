const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const winston = require('winston');

// Winston for general application logging
const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' }),
  ],
});
// Morgan for HTTP request logging
router.use(
  morgan('common', {
    stream: {
      write: (message) => {
        logger.http(message.trim());
      },
    },
  })
);

module.exports = router;
