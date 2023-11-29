const express = require("express");
const route = express.Router();
const { authmiddleware , isadmin } = require('../middlewares/authmiddelware');
const { uploadPhoto ,productImgResize, blogImgResize} = require("../middlewares/uplordimages");
const { createBlog, UpdateBlog, GetBlog, GetAllBlog, DeleteBlog, LikeBlog, DishikeBlog, uplordblogimag } =  require("../controller/Blog");

route.post("/create/",authmiddleware,isadmin,createBlog);

route.put("/uplord/:id",authmiddleware, isadmin, uploadPhoto.array('images',10), blogImgResize,  uplordblogimag )

route.put("/Update/:id",authmiddleware,isadmin,UpdateBlog);

route.get("/Getblog/:id",authmiddleware,isadmin,GetBlog);

route.get("/Getallblog/",GetAllBlog);

route.delete("/Deleteblog/:id",authmiddleware,isadmin,DeleteBlog);

route.put("/likes/",authmiddleware,isadmin,LikeBlog);

route.put("/Dishlike/",authmiddleware,isadmin,DishikeBlog);
module.exports = route;