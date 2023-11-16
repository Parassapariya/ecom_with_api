const express = require('express');
const { createUser, loginuser } = require('../controller/usercontrol');
const route = express.Router();

route.post('/registration',createUser);

route.post('/login',loginuser);


module.exports = route