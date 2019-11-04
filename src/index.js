const express = require('express');
const cors = require('cors');

const router = require('./router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use((err, req, res, next) => {
  res.json(err);
});

module.exports = app;
