const express = require('express');
const users = express.Router();

const { register } = require('../controllers/register.js');
const { login } = require('../controllers/login.js');
const res = require('express/lib/response');

users.get ('/', (req, res) => res.send('success'));

users.post('/register', register);

users.post('/login', login);


module.exports = users;