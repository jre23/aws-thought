const router = require("express").Router();
const userRoutes = require("./user-routes");
const fileRoutes = require("./file-upload");

// user routes
router.use("/users", userRoutes);
// file upload routes
router.use("/image-upload", fileRoutes);

module.exports = router;
