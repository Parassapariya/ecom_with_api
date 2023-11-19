const  mongoose  = require("mongoose");

const validatemongoid = (id)=>{
    const isvalid = mongoose.Types.ObjectId.isValid(id);
    // if (!isvalid) throw new Error("This Id is not valid or not found");
    if (!isvalid) {
        console.log("This Id is not valid or not found");
    }
}

module.exports = { validatemongoid }