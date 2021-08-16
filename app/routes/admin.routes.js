const express = require('express');
const router = express.Router();
const upload = require("../services/ImageUpload");
const singleUpload = upload.single("file");

router.post("/upload-file", function (req, res) {

  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }

    let update = { profilePicture: req.file.location };

    console.log(update)
     res.status(200).json({ success: true, message: 'Success', update })
  });
  
});


module.exports = router;

