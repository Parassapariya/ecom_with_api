const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log("server is running 5000");
})