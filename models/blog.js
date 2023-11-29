const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var BlogSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true,
    },
    Discription:{
        type:String,
        required:true,
    },
    Category:{
        type:String,
        required:true,
    },
    numView:{
        type:Number,
        default:0,
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    isDislike:{
        type:Boolean,
        default:false,
    },
    Likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    Dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    Image:[],
    Author:{
        type:String,
        default:"Admin"
    },
},
    {
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
);

//Export the model
module.exports = mongoose.model('Blog', BlogSchema);