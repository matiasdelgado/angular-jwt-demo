const path = require('path');
const express = require('express');

const {
  configureBodyParser,
  configureCompression,
  configureErrorHandler
} = require('./app.configure');

const app = express();

init(app);

function init(app) {
  configureBodyParser(app);
  configureCompression(app);

  require('./routes')(app);
}

module.exports = app;

