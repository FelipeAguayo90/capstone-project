const express = require('express');
const router = express.Router();
const { getStudents, dltUser } = require('../controllers/admin');

const dltStdUrl = 'http://localhost:5173/api/v1/admin/students/delete';

router.get('/students', getStudents);

router.delete('/students/delete', dltUser);

module.exports = router;
