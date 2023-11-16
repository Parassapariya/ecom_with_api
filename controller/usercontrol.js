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

module.exports = {createUser , loginuser}
