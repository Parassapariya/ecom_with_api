const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var coupanSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        unique:true,
        upparcase:true,
    },
    Expire:{
        type:Date,
        required:true,
    },
    Discount:{
        type:Number,
        required:true,
    },

},{timestamps:true});

//Export the model
module.exports = mongoose.model('Coupan', coupanSchema);