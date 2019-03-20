const express = require('express');
const router = express.Router();

const auth = require('./auth.json');

router.get('/', (request, response) => {
  const result = auth.map(user => ({ email: user.email, role: user.role }));
  response.send(result);
});

module.exports = router;

