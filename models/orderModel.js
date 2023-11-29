const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    Products:[
        {
            Product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            count: Number,
            color: String,
        }
    ],
    paymentintent: {},
    orderstatus:{
        type:String,
        default:"Not Process",
        enum:["Not Process","Cash On Delivery","Processing","Dispatched","Cancelled","Delivered"],
    },
    ordertype:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Order', orderSchema);