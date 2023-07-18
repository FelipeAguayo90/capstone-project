// server/server.js

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const index = require('./routes/index');
const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/', index);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
