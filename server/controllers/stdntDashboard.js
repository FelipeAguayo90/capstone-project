const asyncWrapper = require('../middlewear/async');
const jwt = require('jsonwebtoken');

const dashboard = asyncWrapper(async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers);
  res.status(200).json({ msg: 'success' });
});

module.exports = dashboard;
