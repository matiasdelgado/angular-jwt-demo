const http = require('http');
const app = require('./app');

app.set('x-powered-by', false);

const port = 4201;
http.createServer(app).listen(port);
console.info(`Running http://localhost:${port}`);
