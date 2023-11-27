const multer = require("multer");
const sharp = require("sharp");
const path =  require("path");

const multerStroge = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/images/"));
    },
    filename:function(req,file,cb){
        const uniqsufficx = Date.now()+"-"+Math.round(Math.random());
        cb(null,file.fieldname + "-" + uniqsufficx + ".jpg");
    }
});

const multerFillter = (req,file,cb)=>{
    if (file.mimetype.startsWith('image')) {
        cb(null,true)
    }else{
        cb({
            msg:"File Is NOt Supported",
        }
        ,false
        )
    }
}

const uplordimage = multer({
    storage: multerStroge,
    fileFilter: multerFillter,
    limits:{fieldSize:20000000},
});

const primageresize = async(req,res,next)=>{
    console.log(req.files);
    if (!req.files) {
        return next();
    }else{
        await Promise.all(
            req.files.map(async(file)=>{
                await sharp(file.path)
                .resize(300,300)
                .toFormat("jpeg")
                .jpeg({quality:90})
                .toFile(`public/images/product/${file.filename}`);
            })
        )
    }
    next();
}

const Blogimageresize = async(req,res,next)=>{
    if (!req.files) {
        return next();
    }else{
        await Promise.all(
            req.files.map(async(file)=>{
                await sharp(file.path).resize(300,300).toFormat("jpeg").jpeg({quality:90}).toFile(`public/images/blog/${file.filename}`);
            })
        )
    }
}

module.exports = {uplordimage, primageresize, Blogimageresize}