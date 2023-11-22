const expressAsyncHandler = require("express-async-handler");
const brand = require("../models/brand");

createbrand = expressAsyncHandler(async(req,res)=>{
    try {
        const result = await brand.create(req.body);
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

deletebrand = expressAsyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await brand.findByIdAndDelete({_id:id});
        if (result) {
            res.json({
               msg:"brand deleted successfully"
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

getonebrand = expressAsyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await brand.findOne({_id:id});
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

getallbrand = expressAsyncHandler(async(req,res)=>{
    try {
        const result = await brand.find();
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

updatebrand = expressAsyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await brand.findByIdAndUpdate({_id:id},req.body,{new:true});
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

module.exports = { createbrand , deletebrand, getonebrand, getallbrand, updatebrand}