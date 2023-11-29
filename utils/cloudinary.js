const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: 'dc7a3uass', 
    api_key: '198494623397443', 
    api_secret: "koNdY2qyfuc8GUerFAzScyVMBfo"
})

const cloudinaryUploadImg = async(fileToUploads) => {

    console.log(fileToUploads);
    
    return new Promise((resolve) => {
        cloudinary.uploader
        .upload(fileToUploads)
        .then(result=> resolve(
            {
              url: result.secure_url,
              
            },
            {
              resource_type: "auto",
            }
          ));
    //   cloudinary.uploader.upload(fileToUploads, (result) => {
       
    //   });
    });
  };

module.exports = {cloudinaryUploadImg}