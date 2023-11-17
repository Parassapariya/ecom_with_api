const expressAsyncHandler = require("express-async-handler");
const { gurateToken } = require("../config/jwtToken");
const User = require("../models/user");

const createUser = async(req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if (!findUser) {
        const NewUser = await User.create(req.body);
        res.json(NewUser);
    } else {
        res.json({
            msg:"User Alredy Exist",
            success:false
        })
    }
}

//login controler
const loginuser = async(req,res)=>{
    const { email , password}  = req.body;
    const finduser = await User.findOne({email:email});
    if (finduser && (await finduser.isPasswordMatch(password))) {
        res.json({
            _id: finduser?._id,
            FirstName: finduser?.FirstName,
            LastName: finduser?.LastName,
            email: finduser?.email,
            mobile: finduser?.mobile,
            token:gurateToken(finduser?._id),
        });
    } else {
        res.json({
            msg:"please enter correct email or password",
            success:false,
        })
    }
};

//all user show
const alluser = async(req,res)=>{
    try {
        let alluser = await User.find();
        res.json({
            alluser,
        })
    } catch (error) {
        res.json({
            msg:"User Not Found",
            success:false,
        })
    }
   
}

//One user
const Oneuser = async(req,res)=>{
    const { id }  = req.params;
    try {
        let Oneuser = await User.findById({_id:id});
        res.json({
            Oneuser,
        })
    } catch (error) {
        res.json({
            msg:"User Not Found!!!!",
            success:false,
        })
    }
   
}


//delete user
const deluser = async(req,res)=>{
    const { id }  = req.params;
    try {
        let deleteuser = await User.deleteOne({_id:id});
        res.json({
            deleteuser,
        })
    } catch (error) {
        res.json({
            msg:"User Not Deleted",
            success:false,
        })
    }
   
}

//Update user
const Updateuser = expressAsyncHandler(async(req,res)=>{
    // console.log(req.data._id);
    const { _id }  = req.data;
    try {
        let Updateuser = await User.findByIdAndUpdate(
            {
                _id
            },
            {
                FirstName:req.body.FirstName,
                LastName:req.body.LastName,
                email:req.body.email,
                mobile:req.body.mobile,
            },
            {
                new:true
            }
        );
        res.json({
            Updateuser,
        })
    } catch (error) {
        res.json({
            msg:"User Not Updated",
            success:false,
        })
    }
   
});

const Blockuser = expressAsyncHandler(async(req,res)=>{
    const { id }  = req.params;
    try {
        let Updateuser = await User.findByIdAndUpdate(
            {
                _id:id
            },
            {
                IsBlooked:true
            },
            {
                new:true
            }
        );
        res.json({
            msg:"User Bloked",
        })
    } catch (error) {
        res.json({
            msg:"User Not Bloked",
            success:false,
        })
    }
});
const Unblockuser = expressAsyncHandler(async(req,res)=>{
    const { id }  = req.params;
    try {
        let Updateuser = await User.findByIdAndUpdate(
            {
                _id:id
            },
            {
                IsBlooked:false
            },
            {
                new:true
            }
        );
        res.json({
            msg:"User  Unbloked",
        })
    } catch (error) {
        res.json({
            msg:"User Not Unbloked",
            success:false,
        })
    }
});
module.exports = {createUser , loginuser, alluser, Oneuser, deluser , Updateuser ,Blockuser, Unblockuser}
