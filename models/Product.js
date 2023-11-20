const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ProductSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    Slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    Description:{
        type:String,
        required:true,
    },
    Price:{
        type:Number,
        required:true,
    },
    Category:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"Category"
        type:String,
        required:true,
    },
    Brand:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"Brand"
        type:String,
        required:true,
    },
    Quntity:{
        type:Number,
        required:true,
    },
    Sold:{
        type:Number,
        default:0,
    },
    Images:{
        type:Array,
    },
    color:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"Color"
        type:String,
        required:true,
    },
    Ratings:[
        {
            star:Number,
            postedby:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ]
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Product',ProductSchema);