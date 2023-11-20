const express = require("express");
const route = express.Router();
const { authmiddleware , isadmin } = require('../middlewares/authmiddelware');
const {createproduct , Getallproduct , Oneproduct, UpdatePro, DeletePro} = require("../controller/Product");


route.post("/create",authmiddleware,isadmin,createproduct);

route.get("/allproduct",Getallproduct);

route.get("/Oneproduct/:id",authmiddleware,isadmin,Oneproduct);

route.put("/UpdateProduct/:id",authmiddleware,isadmin,UpdatePro);

route.delete("/DelProduct/:id",authmiddleware,isadmin,DeletePro);

module.exports = route;
