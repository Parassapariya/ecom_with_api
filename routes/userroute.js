const express = require('express');
const { authmiddleware , isadmin } = require('../middlewares/authmiddelware');
const { createUser, loginuser, deluser, alluser, Oneuser, Updateuser, Blockuser, Unblockuser, refreshandler, logout, changepassword } = require('../controller/usercontrol');
const route = express.Router();

route.post('/registration',createUser);

route.post('/login',loginuser);

route.put('/changepass',authmiddleware,changepassword);

route.get('/alluser', alluser);

route.get('/refresh',refreshandler);

route.get('/Logout',logout);

route.get('/:id', authmiddleware, isadmin ,Oneuser);

route.delete('/:id',deluser);

route.put('/edit-data/:id',authmiddleware, isadmin, Updateuser);

route.put('/Block-user/:id',authmiddleware,isadmin, Blockuser);

route.put('/Unblock-user/:id',authmiddleware,isadmin, Unblockuser);







module.exports = route