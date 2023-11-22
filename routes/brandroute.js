const express = require("express");

const { createbrand, deletebrand, getonebrand, getallbrand, updatebrand } = require("../controller/brandcontro");
const { authmiddleware , isadmin } = require("../middlewares/authmiddelware");
const route = express.Router();

route.post("/create/",authmiddleware , isadmin,createbrand);

route.get("/getonebrand/:id",authmiddleware , isadmin,getonebrand);

route.get("/getallbrand/",getallbrand);

route.delete("/delbrand/:id",authmiddleware , isadmin,deletebrand);

route.put("/updatebrand/:id",authmiddleware , isadmin,updatebrand);

module.exports = route;