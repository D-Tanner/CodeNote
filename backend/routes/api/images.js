const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { Image } = require('../../db/models')
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3.js')

//what I have do far for image upload

// router.post(
//   "/",
//   singleMulterUpload("image"),
//   validateSignup,
//   asyncHandler(async (req, res) => {
//     const { url, noteId } = req.body
//     const newImageUrl = await singlePublicFileUpload(req.file);
//     const image = await Image.create({
//       url: newImageUrl,
//       noteId
//     });

//     return res.json({
//       image,
//     });
//   })
// );


module.exports = router;
