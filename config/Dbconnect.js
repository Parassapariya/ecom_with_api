const mongoose = require('mongoose');

const connection = ()=>{
    try {
        let con = mongoose.connect('mongodb://localhost:27017/Digital');       
        console.log("Db connect");
    } catch (error) {
        console.log("not connect");
    }
}

module.exports = connection;