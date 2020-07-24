const cloudinary = require("cloudinary");
const { request } = require("express");

module.exports = {
  cloudinary_config: () => {
    console.log("Cloudinary is configuread");
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });
  },

  cloudinary_upload: (file, folder) => {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(file, (err, result) => {
        if (err) reject(err);
        // Return object
        const cloud_file = {
          url: result.secure_url,
          id: result.public_id,
        };
        resolve(cloud_file);
      });
    });
  },
};
