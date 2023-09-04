const {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const asyncWrapper = require('../middlewear/async');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const sharp = require('sharp');
const pool = require('../models/pool');

const client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.BUCKET_REGION,
});

const getObject = asyncWrapper(async (req, res) => {
  const userId = req.params.userId;

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: userId,
    });
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    return res.json({ url });
  } catch (err) {
    console.log('Error', err);
  }
});

const getUserPhoto = asyncWrapper(async (req, res) => {
  const userId = req.params.userId;

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: userId,
    });
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    return res.json({ url });
  } catch (err) {
    console.log('Error', err);
  }
});

const uploadPhoto = asyncWrapper(async (req, res) => {
  const file = req.file;
  const userId = req.body.user;

  const buffer = await sharp(file.buffer)
    .resize({ height: 100, width: 100, fit: 'contain' })
    .toBuffer();

  console.log(buffer);

  const command = new PutObjectCommand({
    Bucket: 'mycapstoneproject2023',
    Key: userId,
    Body: buffer,
    ContentType: file.mimetype,
  });

  try {
    const response = await client.send(command);

    const values = [userId];
    const text = 'UPDATE account SET profile_photo = $1 WHERE user_id = $1';

    const results = pool.query(text, values);

    return res.json(results);
  } catch (err) {
    console.error(err);
  }
});

module.exports = { uploadPhoto, getObject, getUserPhoto };
// const client = new S3Client({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: 'US West (N. California) us-west-1',
// });

// const command = new PutObjectCommand({
//   Bucket: 'arn:aws:s3:::mycapstoneproject2023',
//   Key: 'hello-s3.txt',
//   Body: 'Hello S3!',
// });

// export const main = async () => {
//   const command = new PutObjectCommand({
//     Bucket: 'arn:aws:s3:::mycapstoneproject2023',
//     Key: 'hello-s3.txt',
//     Body: 'Hello S3!',
//   });

//   try {
//     const response = await client.send(command);
//     console.log(response);
//   } catch (err) {
//     console.error(err);
//   }
// };

// snippet-end:[s3.JavaScript.buckets.uploadV3]

// Invoke main function if this file was run directly.
// if (process.argv[1] === fileURLToPath(import.meta.url)) {
//   main();
// }

// const aws = require('aws-sdk');

// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: 'US West (N. California)',
// });

// const s3 = new aws.S3();

// module.exports = { s3 };

// 'US West (N. California) us-west-1';
