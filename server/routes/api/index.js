const router = require("express").Router();
const userRoutes = require("./user-routes");
const imageRoutes = require("./image-upload");

// user routes
router.use("/users", userRoutes);
// file upload routes
router.use("/image-upload", imageRoutes);

module.exports = router;
