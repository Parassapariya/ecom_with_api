const slugify = require("slugify");
const Product = require("../models/Product");
const asynchandler = require("express-async-handler");
const { query } = require("express");
const User = require("../models/user");
const { cloudinaryUploadImg } = require("../utils/cloudinary");
const fs = require("fs")

const createproduct = asynchandler(async (req, res) => {
    try {
        if (req.body.Title) {
            req.body.Slug = slugify(req.body.Title);
        }
        const result = await Product.create(req.body)
        if (result) {
            res.json({
                msg: "product create successfully"
            })
        }
    } catch (error) {
        res.json({
            msg: "Please Enter Unqie Product"
        })
    }
});

const UpdatePro = asynchandler(async (req, res) => {
    try {
        if (req.body.Title) {
            req.body.Slug = slugify(req.body.Title);
        }
        const result = await Product.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            req.body,
            {
                new: true
            }
        )
        if (result) {
            res.json({
                msg: "product Update successfully"
            })
        }
    } catch (error) {
        res.json({
            msg: "Please Enter Unqie Product"
        })
    }
});

const DeletePro = asynchandler(async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(
            {
                _id: req.params.id
            },
        )
        if (result) {
            res.json({
                msg: "product Delete successfully"
            })
        }
    } catch (error) {
        res.json({
            msg: "Please Enter  Product ID"
        })
    }
});

const Getallproduct = asynchandler(async (req, res) => {
    try {
        //filtering
        let query = { ...req.query };
        let excludefilds = ["page", "sort", "limit", "fields"];
        excludefilds.forEach((er) => delete query[er])

        let newquery = JSON.stringify(query);
        newquery = newquery.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`)
        console.log(req.query);

        let finalquery = Product.find(JSON.parse(newquery));


        //Shorting
        if (req.query.sort) {
            let sortby = req.query.sort.split(',').join(" ");
            console.log("Sort:" + sortby);
            finalquery = finalquery.sort(sortby);
        } else {
            finalquery = finalquery.sort("-createdAt");
        }

        //field
        if (req.query.fields) {
            let fieldsby = req.query.fields.split(',').join(" ");
            console.log("fileds:" + fieldsby);
            finalquery = finalquery.select(fieldsby);
        } else {
            finalquery = finalquery.select("-__v");
        }

        //pagination 
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        finalquery = finalquery.skip(skip).limit(limit);
        if (req.query.page) {
            const pdcount = await Product.countDocuments();
            if (skip >= pdcount) {
                res.json({
                    msg: "This page is not available"
                })
            }
        }
        console.log(page, limit, skip);

        const result = await finalquery;
        if (result) {
            res.json({
                result
            })
        } else {
            res.json({
                msg: "product Not Found"
            })
        }
    } catch (error) {

    }
});

const Oneproduct = asynchandler(async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);
        if (result) {
            res.json({
                result
            })
        } else {
            res.json({
                msg: "product Not Found"
            })
        }
    } catch (error) {

    }
});

const addwishlist = asynchandler(async (req, res) => {
    const { id } = req.data;
    const { prodid } = req.body;
    try {
        const user = await User.findById({ _id: id });
        const alredyadded = user.Wishlist.find((id) => id.toString() === prodid);

        if (alredyadded) {
            let userdata = await User.findByIdAndUpdate(
                { _id: user.id },
                {
                    $pull: { Wishlist: prodid },
                },
                {
                    new: true
                });
            res.json(userdata)
        }
        else {
            let userdata = await User.findByIdAndUpdate(
                { _id: user.id },
                {
                    $push: { Wishlist: prodid },
                },
                {
                    new: true
                });
            res.json(userdata)
        }
    } catch (error) {
        throw new Error(error)
    }
});

const uplordimag = asynchandler(async (req, res) => {
    const id = req.params.id;
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            //console.log(newpath);
            urls.push(newpath);
            fs.unlinkSync(path);
        }
        const findprodcut = await Product.findByIdAndUpdate({ _id: id },
            {
                Images: urls.map((file) => {
                    return file;
                })
            }, { new: true });
        res.json(findprodcut);
        res.json(images);
    } catch (error) {
        throw new Error(error);
    }
});



module.exports = { createproduct, Getallproduct, Oneproduct, UpdatePro, DeletePro, addwishlist, uplordimag }
