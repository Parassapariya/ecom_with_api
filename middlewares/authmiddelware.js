let user = require("../models/user");
let jwt = require("jsonwebtoken");
let asynchandler = require("express-async-handler");

let authmiddleware = asynchandler(async(req,res,next)=>{
    let tokan;
    try {
        if (req.headers.authorization.startsWith("Bearer")) {
            tokan = req.headers.authorization.split(" ")[1];
            // let test = req.headers.authorization.startsWith("Bearer");
            // console.log(test);
            try {
                if (tokan) {
                    const decoded = jwt.verify(tokan,process.env.SECRET_KEY);
                    let data = await user.findById({_id:decoded.id});
                    req.data = data;
                    next();
                } 
            } catch (error) {
                res.json({
                    msg : "not authorization",
                })
            }
        }
    } catch (error) {
        res.json({
            msg : "Please Provide Token!!!!!!!!!!",
        })
    }
});


const isadmin = asynchandler(async(req,res,next)=>{
    // console.log(req.data);
    let data = await user.findOne({email:req.data.email});
    if (data.Role !== "admin") {
        res.json({
            msg : "you are not admin"
        })
    } else {
        next();
    }
});

module.exports = { authmiddleware , isadmin}