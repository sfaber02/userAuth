const express = require('express');
const users = express.Router();

const { register } = require('../controllers/register.js');
const { login } = require('../controllers/login.js');


users.post('/register', register);

users.post('/login', login);


module.exports = users;