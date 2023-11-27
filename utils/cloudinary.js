const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: 'dc7a3uass', 
    api_key: '198494623397443', 
    api_secret: "koNdY2qyfuc8GUerFAzScyVMBfo"
})

const cloudinaryimage = async(fileupload)=>{
    //console.log(fileuplaod)

     const data = await   cloudinary.uploader.upload(fileupload.path, {
        public_id: `${Date.now()}`, 
        resource_type: "auto"
    })
     console.log(data)
    
};

module.exports = {cloudinaryimage}