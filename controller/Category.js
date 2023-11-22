const expressAsyncHandler = require("express-async-handler");
const category = require("../models/category");
const { create } = require("../models/blog");



createcategory = expressAsyncHandler(async(req,res)=>{
    try {
        const result = await category.create(req.body);
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

deletecategory = expressAsyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await category.findByIdAndDelete({_id:id});
        if (result) {
            res.json({
               msg:"category deleted successfully"
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

getonecategory = expressAsyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await category.findOne({_id:id});
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

getallcategory = expressAsyncHandler(async(req,res)=>{
    try {
        const result = await category.find();
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

updatecategory = expressAsyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await category.findByIdAndUpdate({_id:id},req.body,{new:true});
        if (result) {
            res.json({
                result
            });
        }
    } catch (error) {
        throw new Error(error)
    }
});

module.exports = {createcategory, deletecategory, getonecategory, getallcategory, updatecategory}