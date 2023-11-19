const expressAsyncHandler = require("express-async-handler");
const { gurateToken } = require("../config/jwtToken");
const User = require("../models/user");
const { validatemongoid } = require("../utils/validatemongodbid");
const { refressToken } = require("../config/refressTokan");
const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");

//create user
const createUser = async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
        const NewUser = await User.create(req.body);
        res.json(NewUser);
    } else {
        res.json({
            msg: "User Alredy Exist",
            success: false
        })
    }
}

//login controler
const loginuser = async (req, res) => {
    const { email, password } = req.body;
    const finduser = await User.findOne({ email: email });
    const refreshTokan = refressToken(finduser._id);
    const updateuser = await User.findByIdAndUpdate(
        {
            _id: finduser._id
        },
        {
            refreshTokan: refreshTokan
        },
        {
            new: true
        }
    );
    res.cookie("refreshTokan", refreshTokan, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    })
    if (finduser && (await finduser.isPasswordMatch(password))) {
        res.json({
            _id: finduser?._id,
            FirstName: finduser.FirstName,
            LastName: finduser.LastName,
            email: finduser.email,
            mobile: finduser.mobile,
            token: gurateToken(finduser._id),
        });
    } else {
        res.json({
            msg: "please enter correct email or password",
            success: false,
        })
    }
};

//refress Tokan Hendler
const refreshandler = expressAsyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie.refreshTokan) {
        res.json({
            msg: "Not Tokan Avilable In Cookie!!",
            success: false,
        })
    } else {
        let cookietokan = cookie.refreshTokan;
        let result = await User.findOne({
            refreshTokan: cookietokan
        });
        if (result) {
            jwt.verify(cookietokan, process.env.SECRET_KEY, (err, decoded) => {
                // console.log(decoded);
                if (err || result.id !== decoded.id) {
                    res.json({
                        msg: "There Is Something Wrong In RefressTokan!!",
                        success: false,
                    })
                } else {
                    let aceesTokan = gurateToken(result._id)
                    res.json({
                        aceesTokan
                    })
                }
            })
        } else {
            res.json({
                msg: "Not Tokan Avilable In Db!!",
                success: false,
            })
        }
    }
});

//Logout User
const logout = expressAsyncHandler(async (req, res) => {
    const cookie = req.cookies;
    // console.log(cookie);
    if (!cookie.refreshTokan) {
        res.json({
            msg: "Not Tokan Avilable In Cookie!!",
            success: false,
        })
    } else {
        let refreshTokan = cookie.refreshTokan;
        let result = await User.findOne({
            refreshTokan: refreshTokan
        });
        if (!result) {
            res.clearCookie("refreshTokan", {
                httpOnly: true,
                secure: true
            });
            return res.sendStatus(204);
        } 
            await User.findByIdAndUpdate(
                {
                    _id: result.id
                },
                {
                    refreshTokan: ""
                }
            );
            res.clearCookie("refreshTokan", {
                httpOnly: true,
                secure: true
            });
            return res.sendStatus(204);
        
    }
})

//all user show
const alluser = async (req, res) => {
    try {
        let alluser = await User.find();
        res.json({
            alluser,
        })
    } catch (error) {
        res.json({
            msg: "User Not Found",
            success: false,
        })
    }

}

//One user
const Oneuser = async (req, res) => {
    const { id } = req.params;
    validatemongoid(id);
    try {
        let Oneuser = await User.findById({ _id: id });
        res.json({
            Oneuser,
        })
    } catch (error) {
        res.json({
            msg: "User Not Found!!!!",
            success: false,
        })
    }

}


//delete user
const deluser = async (req, res) => {
    const { id } = req.params;
    validatemongoid(id);
    try {
        let deleteuser = await User.deleteOne({ _id: id });
        res.json({
            deleteuser,
        })
    } catch (error) {
        res.json({
            msg: "User Not Deleted",
            success: false,
        })
    }

}

//Update user
const Updateuser = expressAsyncHandler(async (req, res) => {
    // console.log(req.data._id);
    const { id } = req.params;
    validatemongoid(id);
    try {
        let Updateuser = await User.findByIdAndUpdate(
            {
                _id: id
            },
            {
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                email: req.body.email,
                mobile: req.body.mobile,
            },
            {
                new: true
            }
        );
        res.json({
            Updateuser,
        })
    } catch (error) {
        res.json({
            msg: "User Not Updated",
            success: false,
        })
    }

});

//user block
const Blockuser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validatemongoid(id);
    try {
        let Updateuser = await User.findByIdAndUpdate(
            {
                _id: id
            },
            {
                IsBlooked: true
            },
            {
                new: true
            }
        );
        res.json({
            msg: "User Bloked",
        })
    } catch (error) {
        res.json({
            msg: "User Not Bloked",
            success: false,
        })
    }
});

//user unblock
const Unblockuser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validatemongoid(id);
    try {
        let Updateuser = await User.findByIdAndUpdate(
            {
                _id: id
            },
            {
                IsBlooked: false
            },
            {
                new: true
            }
        );
        res.json({
            msg: "User  Unbloked",
        })
    } catch (error) {
        res.json({
            msg: "User Not Unbloked",
            success: false,
        })
    }
});


module.exports = { createUser, loginuser, alluser, Oneuser, deluser, Updateuser, Blockuser, Unblockuser, refreshandler, logout }
