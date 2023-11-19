const token = require('jsonwebtoken');

const refressToken = (id)=>{
    return token.sign({id},process.env.SECRET_KEY,{ expiresIn:"3d" });
}

module.exports = {refressToken};