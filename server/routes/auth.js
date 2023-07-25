const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { Strategy } = require('passport-local');
// const users = require('../db/users');

const secret = 'thisIsTemporary';
const auth = expressjwt({ secret: secret, algorithms: ['HS256'] });

// passport.use(new Strategy((username, password,cb)=>{
//     console.log(`in passport local strategy check user ${username}`);
//     users.findByUsername(username, (err,user))
// })

module.exports = router;
