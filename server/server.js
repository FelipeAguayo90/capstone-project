// server/server.js
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const connectDB = require('./db/connection');
const indexRoute = require('./routes/indexRoute');
const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api/v1', indexRoute);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
