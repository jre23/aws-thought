const express = require("express");
const router = express.Router();

const upload = require("../../services/file-upload");

const singleUpload = upload.single("image");

router.post("/", (req, res) => {
  singleUpload(req, res, (err) => {
    return res.json({ imageUrl: req.file.location });
  });
});

// router.get('/users', (req, res) => {
//     res.json({"which": "which"})
// });

module.exports = router;
