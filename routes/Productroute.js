const express = require("express");
const route = express.Router();
const { authmiddleware , isadmin } = require('../middlewares/authmiddelware');
const {createproduct , Getallproduct , Oneproduct, UpdatePro, DeletePro, addwishlist, uplordimag} = require("../controller/Product");
const { uploadPhoto ,productImgResize} = require("../middlewares/uplordimages");


route.post("/create",authmiddleware,isadmin,createproduct);

route.put("/uplord/:id",authmiddleware, isadmin, uploadPhoto.array('images',10), productImgResize,  uplordimag )

route.get("/allproduct",Getallproduct);

route.get("/Oneproduct/:id",authmiddleware,isadmin,Oneproduct);

route.put("/UpdateProduct/:id",authmiddleware,isadmin,UpdatePro);

route.delete("/DelProduct/:id",authmiddleware,isadmin,DeletePro);

route.get("/wishlist/",authmiddleware,addwishlist);


module.exports = route;
