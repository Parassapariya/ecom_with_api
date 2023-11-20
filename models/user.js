const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const  crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    LastName:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    Role:{
        type:String,
        default:"User",
    },
    cart:{
        type:Array,
        default:[],
    },
    IsBlooked:{
        type:Boolean,
        default:false,
    },
    Address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
    }],
    Wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wishlist",
    }],
    refreshTokan:{
        type:String,
    },
    passwordchangeat:Date,
    passwordresettokan:String,
    passwordrestexpires:Date,
    },
    {
        timestamps:true
    }
);

userSchema.pre('save',async function (next){
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password ,salt);
});

userSchema.methods.isPasswordMatch = async function(enterpass){
    return await bcrypt.compare(enterpass,this.password)
}

userSchema.method.CreatePasswordResetTokan = async function(){
    const resettokan = crypto.randomBytes(32).toString("hex");
    console.log(resettokan);
    this.passwordresettokan = crypto.createHash("sha256").update(resettokan).digest("hex");
    this.passwordrestexpires = Date.now()+30*60*1000; //10 min
    return resettokan;
}

//Export the model
module.exports = mongoose.model('User', userSchema);