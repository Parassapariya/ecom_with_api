const blog = require("../models/blog");
const User = require("../models/user");
const asynchandler =  require("express-async-handler");
const validatemongose = require("../utils/validatemongodbid");

const createBlog = asynchandler(async(req,res)=>{
    try {
        let result = await blog.create(req.body);
        if (result) {
            res.json("Blog Create Sucessfully")
        }
    } catch (error) {
        res.json("Some Error!!!")
    }
});

const UpdateBlog = asynchandler(async(req,res)=>{
    try {
        let id = req.params.id;
        let result = await blog.findByIdAndUpdate({_id:id},req.body,{new:true});
        if (result) {
            res.json("Blog Update Sucessfully")
        }
    } catch (error) {
        res.json("Some Error!!!")
    }
});

const GetBlog = asynchandler(async(req,res)=>{
    try {
        let id = req.params.id;
        let result = await blog.findById({_id:id}).populate('Likes').populate('Dislikes');
        let updateblog = await blog.findByIdAndUpdate({_id:id},{$inc:{numView : 1}},{new:true})
        if (result) {
            res.json(result)
        }
    } catch (error) {
        res.json("Some Error!!!")
    }
});


const GetAllBlog = asynchandler(async(req,res)=>{
    try {
        let result = await blog.find();  
        if (result) {
            res.json(result)
        }
    } catch (error) {
        res.json("Some Error!!!")
    }
});

const DeleteBlog = asynchandler(async(req,res)=>{
    try {
        let id = req.params.id;
   
        let result = await blog.findOneAndDelete({_id:id});  
        if (result) {
            res.json({
                msg:"Blog Is Deleted"
            })
        }
    } catch (error) {
        throw new Error(error);
    }
});


const LikeBlog = asynchandler(async(req,res)=>{
    try {
        let Blogid = req.body.id;
        let result = await blog.findById({_id:Blogid}); 
        console.log(result);
        let userid = req.data.id;
        let isLike = result.isLiked;
        let alerdydislike = result.Dislikes.find(
            (userId)=>userId.toString() === userid.toString()
        ); 
        if (alerdydislike) {
           const Blog = await blog.findByIdAndUpdate({_id:Blogid},
            {
                $pull:{Dislikes:userid},
                isDislike:false
            },
            {
                new:true
            })
            res.json(Blog);
        }
        if (isLike) {
            const Blog = await blog.findByIdAndUpdate({_id:Blogid},
             {
                 $pull:{Likes:userid},
                 isLiked:false
             },
             {
                 new:true
             })
             res.json(Blog);
         }
         else
         {
            const Blog = await blog.findByIdAndUpdate({_id:Blogid},
                {
                    $push:{Likes:userid},
                    isLiked:true
                },
                {
                    new:true
                })
                res.json(Blog);
         }
    } catch (error) {
        res.json("Some Error!!!")
    }
});


const DishikeBlog = asynchandler(async(req,res)=>{
    try {
        let Blogid = req.body.id;
        let result = await blog.findById({_id:Blogid}); 
        
        let userid = req.data.id;
        let isDislike = result.isDislike;
        let alerdyLike = result.Likes.find(
            (userId)=>userId.toString() === userid.toString()
        ); 
        console.log(alerdyLike);
        if (alerdyLike) {
           const Blog = await blog.findByIdAndUpdate({_id:Blogid},
            {
                $pull:{Likes:userid},
                isLiked:false
            },
            {
                new:true
            })
            res.json(Blog);
        }
        if (isDislike) {
            const Blog = await blog.findByIdAndUpdate({_id:Blogid},
             {
                 $pull:{Dislikes:userid},
                 isDislike:false
             },
             {
                 new:true
             })
             res.json(Blog);
         }else
         {
            const Blog = await blog.findByIdAndUpdate({_id:Blogid},
                {
                    $push:{Dislikes:userid},
                    isDislike:true
                },
                {
                    new:true
                })
                res.json(Blog);
         }
    } catch (error) {
        res.json("Some Error!!!")
    }
});

module.exports = {createBlog , UpdateBlog, GetBlog, GetAllBlog , DeleteBlog , LikeBlog , DishikeBlog}