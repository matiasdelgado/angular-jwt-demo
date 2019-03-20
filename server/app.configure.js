const bodyParser = require('body-parser');
const compression = require('compression');

function configureBodyParser(app) {
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
}

function configureCompression(app) {
  app.use(compression());
}

module.exports = {
  configureBodyParser,
  configureCompression
};
