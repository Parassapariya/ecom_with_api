const token = require('jsonwebtoken');

const gurateToken = (id)=>{
    return token.sign({id},process.env.SECRET_KEY,{ expiresIn:"1d" });
}

module.exports = {gurateToken};