const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  uploadPhoto,
  getObject,
  getUserPhoto,
} = require('../controllers/s3bucket');

router.use(express.urlencoded({ extended: false }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadPhoto);

router.get('/profile/picture/:userId', getObject);

router.get('/user/picture/:userId', getUserPhoto);

module.exports = router;
