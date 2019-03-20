const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const config = require('../config');
const auth = require('./auth.json');

router.post('/', (request, response) => {
  console.info("AUTH ROUTE");

  const { email, password } = request.body;
  const user = auth.find(user => user.email === email && user.password === password);

  if (user) {
    const data = {
      user: {
        email: user.email,
        role: user.role
      }
    };

    const result = {
      token: jwt.sign(data, config.jwtSecret, { expiresIn: config.tokenExpiration })
    };
    response.send(result);
  } else {
    response.status(401).send();
  }
});

module.exports = router;

