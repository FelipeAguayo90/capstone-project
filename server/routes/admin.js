const express = require('express');
const router = express.Router();
const { getStudents, dltUser } = require('../controllers/admin');

router.get('/students', getStudents);

router.delete('/students/delete', dltUser);

module.exports = router;
