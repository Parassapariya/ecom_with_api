const expressAsyncHandler = require("express-async-handler");
const { gurateToken } = require("../config/jwtToken");
const jwt = require("jsonwebtoken");
const uniqeid = require("uniqid");

const User = require("../models/user");
const coupanmodel = require("../models/coupan");
const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");
const Product = require("../models/Product");

const { validatemongoid } = require("../utils/validatemongodbid");
const { refressToken } = require("../config/refressTokan");






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
            _id: finduser._id,
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

//Admin Login controler
const Adminloginuser = async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email: email });
    if (findAdmin.Role !== "admin") {
        res.json({
            msg: "You Are Not Admin",
            success: false,
        })
    }
    const refreshTokan = refressToken(findAdmin._id);
    const updateuser = await User.findByIdAndUpdate(
        {
            _id: findAdmin._id
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
    if (findAdmin && (await findAdmin.isPasswordMatch(password))) {
        res.json({
            _id: findAdmin._id,
            FirstName: findAdmin.FirstName,
            LastName: findAdmin.LastName,
            email: findAdmin.email,
            mobile: findAdmin.mobile,
            token: gurateToken(findAdmin._id),
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
        let Oneuser = await User.findById({ _id: id }).populate('');
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

//change password
const changepassword = expressAsyncHandler(async (req, res) => {
    let { _id } = req.data;
    let password = req.body.password;
    const user = await User.findById({ _id: _id });
    if (password) {
        user.password = password;
        const updatepassword = await user.save();
        res.json(updatepassword)
    } else {
        res.json(user);
    }
});

const getWishlist = expressAsyncHandler(async (req, res) => {

    try {
        const { _id } = req.data;
        let result = await User.findById({ _id: _id }).populate("Wishlist");
        res.json({
            result
        })
    } catch (error) {
        res.json({
            msg: "User Not Found!!!",
            success: false,
        })
    }
})

const saveAddress = expressAsyncHandler(async (req, res) => {
    try {
        const id = req.data;
        const findUser = await User.findOne({ _id: id });

        if (findUser) {
            const UpdateAddress = await User.findByIdAndUpdate({ _id: findUser.id }, {
                Address: req.body.Address,
            }, { new: true }).populate("Wishlist");
            res.json(UpdateAddress);
        } else {
            res.json({
                msg: "Please Login After You Can Save Address",
                success: false
            })
        }
    } catch (error) {
        res.json({
            msg: "User Not Found!!!",
            success: false,
        })
    }
});

const UserCart = expressAsyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.data;
    try {
        let Productsarray = [];
        const user = await User.findById({ _id: _id });
        const alreadyexist = await cartModel.findOne({ orderby: user._id });
        if (alreadyexist) {
            alreadyexist.remove();
        }
        for (let i = 0; i < cart.length; i++) {
            let object = {};
            object.Product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;
            let getprice = await Product.findById({ _id: cart[i]._id }).select("Price").exec();
            object.Price = getprice.Price;
            Productsarray.push(object);
        }
        let total = 0;
        for (let i = 0; i < Productsarray.length; i++) {
            total += Productsarray[i].Price * Productsarray[i].count;
        }
        let cartinsert = await new cartModel({
            Products: Productsarray,
            cartTotal: total,
            orderby: user._id,
        }).save();
        res.json(cartinsert)
    } catch (error) {
        res.json({
            msg: "User Not Found!!!",
            success: false,
        })
    }
});

const getUserCart = expressAsyncHandler(async (req, res) => {
    const { _id } = req.data;
    //console.log(_id);
    try {
        const getcartdata = await cartModel.findOne({ orderby: _id })
            .populate("Products.Product");
        //console.log(getcartdata);
        if (getcartdata) {
            res.json(getcartdata)
        } else {
            res.json({
                msg: "No Cart Item Found Found!!!",
                success: false,
            })
        }
    } catch (error) {
        res.json({
            msg: "Somthing Wrong Found!!!",
            success: false,
        })
    }
});

const emptycart = expressAsyncHandler(async (req, res) => {
    const { _id } = req.data;
    try {
        const getcartdata = await cartModel.findOneAndDelete({ orderby: _id })
        res.json({
            msg: "Cart Item Deleted",
            success: false,
        })
    } catch (error) {
        res.json({
            msg: "No Cart Item Found Found!!!",
            success: false,
        })
    }
});

const ApplyCoupan = expressAsyncHandler(async (req, res) => {
    const { Coupan } = req.body;
    const { _id } = req.data;
    try {
        const coup = await coupanmodel.findOne({ Name: Coupan });
        if (coup === null) {
            res.json({ msg: "coupan not found" })
        }
        let user = await User.findOne({ _id: _id });
        let { product, cartTotal } = await cartModel.findOne({ orderby: user._id })
            .populate("Products.Product");
        let totalAfterDiscount = (cartTotal - (cartTotal * coup.Discount) / 100).toFixed(2);
        await cartModel.findOneAndUpdate(
            { orderby: user._id },
            { totalAfterDiscount },
            { new: true }
        )
        res.json(totalAfterDiscount);
    } catch (error) {
        throw new Error("Something Is Wrong");
    }
});

const createOrder = expressAsyncHandler(async (req, res) => {
    //console.log(req.body);
    const { COD, CoupanApply } = req.body;
    const { _id } = req.data;
    try {
        if (!COD) {
            res.json({ msg: "cod not available" });
        }
        const user = await User.findById({ _id: _id });
        const usercart = await cartModel.findOne({ orderby: user._id });
        let finalAmount = 0;
        if (CoupanApply && usercart.totalAfterDiscount) {
            finalAmount = usercart.totalAfterDiscount;
        } else {
            finalAmount = usercart.cartTotal;
        }

        let newOrder = await orderModel.create({
            Products: usercart.Products,
            paymentintent: {
                id: uniqeid(),
                method: "COD",
                amount: finalAmount,
                status: "Cash On Delivery",
                created: Date.now(),
                currency: "USD"
            },
            ordertype: user._id,
            orderstatus: "Cash On Delivery",
        })

        // let updatequentity =  usercart.Products.map((item)=>{
        //     return{
        //         updateOne: {
        //             filter:{_id:item.Product._id},
        //             update:{$inc: {Quntity:-item.count, Sold:+item.count}}
        //         }
        //     }
        // });

        // const updated = await Product.bulkWrite(updatequentity,{});
        // res.json({msg:"success"})
    } catch (error) {
        throw new Error("Cash on dilevvry not abile")
    }
});

const getOrder = expressAsyncHandler(async (req, res) => {
    const { _id } = req.data;
    try {
        const user = await orderModel.findOne({ ordertype: _id })
            .populate("Products.Product");
        res.json(user);
    } catch (error) {
        throw new Error("Wrong!!")
    }
})

const updateorderstatus = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const {status} = req.body;
    try {
        const user = await orderModel.findByIdAndUpdate({ _id: id },{
            orderstatus:status,
            paymentintent:{
                status:status
            }
        },{new:true})
        res.json(user);
    } catch (error) {
        throw new Error("Wrong!!")
    }
})

module.exports = {
    createUser,
    loginuser,
    alluser,
    Oneuser,
    deluser,
    Updateuser,
    Blockuser,
    Unblockuser,
    refreshandler,
    logout,
    changepassword,
    Adminloginuser,
    getWishlist,
    saveAddress,
    UserCart,
    getUserCart,
    emptycart,
    ApplyCoupan,
    createOrder,
    getOrder,
    updateorderstatus
}
