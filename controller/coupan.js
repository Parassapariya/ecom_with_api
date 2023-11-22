const expressAsyncHandler = require("express-async-handler");
const coupan = require("../models/coupan");


createcoupan = expressAsyncHandler(async(req,res)=>{
    try {
        const result = await coupan.create(req.body);
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

deletecoupan = expressAsyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await coupan.findByIdAndDelete({_id:id});
        if (result) {
            res.json({
               msg:"Coupan deleted successfully"
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

getonecoupan = expressAsyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await coupan.findOne({_id:id});
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

getallcoupan = expressAsyncHandler(async(req,res)=>{
    try {
        const result = await coupan.find();
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

updatecoupan = expressAsyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await coupan.findByIdAndUpdate({_id:id},req.body,{new:true});
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

module.exports = {createcoupan, deletecoupan, getallcoupan, getonecoupan, updatecoupan}
