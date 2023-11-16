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

module.exports = {createUser }
