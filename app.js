const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const usersController = require('./routes/users.js');
app.use('/users', usersController);

app.get('/', (req, res) => {
    res.send('Welcome to the user Auth backend');
});

app.get('*', (req, res) => {
    res.status(404).send('Page not found.');
})



module.exports = app;