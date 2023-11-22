const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var BrandSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
   
},{timestamps:true});

//Export the model
module.exports = mongoose.model('brand', BrandSchema);