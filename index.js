const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const dbconnect = require('./config/Dbconnect');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000
const userroute = require('./routes/userroute');
const productroute = require('./routes/Productroute');
const blogroute = require('./routes/Blogroute');
const categoryroute = require('./routes/categoryroute');
const brandroute = require('./routes/brandroute');
const coupanroute = require('./routes/coupan');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const { errorHandler, NotFound } = require('./middlewares/errorHandler');
const asynchandler = require('express-async-handler');

dbconnect();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/api/user/",userroute);
app.use("/api/product/",productroute);
app.use("/api/blog/",blogroute);
app.use("/api/category/",categoryroute);
app.use("/api/brand/",brandroute);
app.use("/api/coupan/",coupanroute);

app.use(NotFound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log("server is running 5000");
})