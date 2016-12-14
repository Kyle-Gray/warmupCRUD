'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const path = require('path');

app.use(express.static(path.join('public')));

app.use(bodyParser.json());

const comics = require('./routes/comics');

app.use(comics);


switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

app.use((err, req, res, next) => {
  if(err.output && err.output.statusCode) {
    return res
    .status(err.output.statusCode)
    .set('Content-Type', 'text/plain')
    .send(err.message);
  }
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
