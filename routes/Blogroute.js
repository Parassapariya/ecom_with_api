const express = require("express");
const route = express.Router();
const { authmiddleware , isadmin } = require('../middlewares/authmiddelware');
const { createBlog, UpdateBlog, GetBlog, GetAllBlog, DeleteBlog, LikeBlog, DishikeBlog } =  require("../controller/Blog");

route.post("/create/",authmiddleware,isadmin,createBlog);

route.put("/Update/:id",authmiddleware,isadmin,UpdateBlog);

route.get("/Getblog/:id",authmiddleware,isadmin,GetBlog);

route.get("/Getallblog/",GetAllBlog);

route.delete("/Deleteblog/:id",authmiddleware,isadmin,DeleteBlog);

route.put("/likes/",authmiddleware,isadmin,LikeBlog);

route.put("/Dishlike/",authmiddleware,isadmin,DishikeBlog);
module.exports = route;