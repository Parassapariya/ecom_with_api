const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const dbconnect = require('./config/Dbconnect');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000
const userroute = require('./routes/userroute');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


dbconnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/api/user/",userroute);

app.listen(PORT,()=>{
    console.log("server is running 5000");
})