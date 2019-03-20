const express = require('express');
const router = express.Router();

const todos = require('./todos.json');

router.get('/', (request, response) => {
  response.send(todos);
});

module.exports = router;
