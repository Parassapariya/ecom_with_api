const express = require("express");

const { createcoupan , getonecoupan, deletecoupan ,getallcoupan, updatecoupan } = require("../controller/coupan");
const { authmiddleware , isadmin } = require("../middlewares/authmiddelware");
const route = express.Router();

route.post("/create/",authmiddleware , isadmin,createcoupan);

route.get("/getonecoupan/:id",authmiddleware , isadmin,getonecoupan);

route.get("/getallcoupan/",authmiddleware , isadmin,getallcoupan);

route.delete("/deletecoupan/:id",authmiddleware , isadmin,deletecoupan);

route.put("/updatecoupan/:id",authmiddleware , isadmin,updatecoupan);

module.exports = route;