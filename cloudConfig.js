const cloudinary = require('cloudinary').v2;// cloudinary ke verson 2 ko acquire kr rahe hai 
const { CloudinaryStorage } = require('multer-storage-cloudinary');//multer-storage-cloudinary' ko acquire kr rahe hai 



// backened ko jod rahe hai cloudnery data base se 
// cloudConfig.js

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY, // Changed 'key' to 'KEY'
    api_secret: process.env.CLOUD_API_SECRET,
});


// cludner se judne ke baad ek folder banana hai "storage" naam ka 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',//--->some-folder-name cloudnnery account pe iss naame ka foder chahye jo  ["png","jpg","jpeg"] iss iss naam ko file access karega  banana hai  // kis format based file aayengi 
      allowedFormats: ["png","jpg","jpeg"], // supports promises as well
     
    },
  });  

  module.exports={
    cloudinary,
    storage,
  }