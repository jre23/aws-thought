const express = require("express");
const router = express.Router();
// multer package will add a file property on the req object that contains the image file uploaded by the form
const multer = require("multer");
const AWS = require("aws-sdk");
const paramsConfig = require("../../utils/params-config");
// create temporary storage to hold image files until they're uploaded to S3 bucket
const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, "");
  },
});
// create upload object to store image data, contain storage destination, and image key. single method defines upload function will only receive one image
const upload = multer({ storage }).single("image");
// create S3 service object to allow communication with the S3 web service
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
// route to post an image. matches with /api/image-upload POST
router.post("/", upload, (req, res) => {
  const params = paramsConfig(req.file);
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.json(data);
  });
});

module.exports = router;
