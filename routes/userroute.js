const express = require('express');
const { authmiddleware , isadmin } = require('../middlewares/authmiddelware');
const { createUser, loginuser, deluser, alluser, Oneuser, Updateuser, Blockuser, Unblockuser, refreshandler, logout, changepassword, Adminloginuser, getWishlist, saveAddress, UserCart, getUserCart, emptycart, ApplyCoupan, createOrder, getOrder, updateorderstatus } = require('../controller/usercontrol');
const route = express.Router();

route.post('/registration',createUser);

route.post('/login',loginuser);

route.post('/adminlogin',Adminloginuser);

route.put('/changepass',authmiddleware,changepassword);

route.get('/wishlist',authmiddleware,getWishlist);

route.post('/address',authmiddleware,saveAddress);

route.post('/usercart',authmiddleware,UserCart);

route.get('/getcart',authmiddleware,getUserCart);

route.delete('/emptycart',authmiddleware,emptycart);

route.post('/Cart/ApplyCoupan',authmiddleware,ApplyCoupan);

route.post('/Cashondil',authmiddleware,createOrder);

route.get('/cart/getorder',authmiddleware,getOrder);

route.put('/cart/orderstatus-update/:id',authmiddleware,updateorderstatus);

route.get('/alluser', alluser);

route.get('/refresh',refreshandler);

route.get('/Logout',logout);

route.get('/:id', authmiddleware, isadmin ,Oneuser);

route.delete('/:id',deluser);

route.put('/edit-data/:id',authmiddleware, isadmin, Updateuser);

route.put('/Block-user/:id',authmiddleware,isadmin, Blockuser);

route.put('/Unblock-user/:id',authmiddleware,isadmin, Unblockuser);







module.exports = route