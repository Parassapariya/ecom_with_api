const express = require('express');
const { createUser } = require('../controller/usercontrol');
const route = express.Router();

route.post('/registration',createUser);


module.exports = route