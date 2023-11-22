const express = require("express");

const { createcategory,  deletecategory, getonecategory, getallcategory, updatecategory } = require("../controller/Category");
const { authmiddleware , isadmin } = require("../middlewares/authmiddelware");
const route = express.Router();

route.post("/create/",authmiddleware , isadmin,createcategory);

route.get("/getonecategory/:id",authmiddleware , isadmin,getonecategory);

route.get("/getallcategory/",getallcategory);

route.delete("/delcategory/:id",authmiddleware , isadmin,deletecategory);

route.put("/updatecategory/:id",authmiddleware , isadmin,updatecategory);

module.exports = route;