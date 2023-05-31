const express = require("express");
const router = express.Router();

const userRoutes = require("./../domains/user");
const reportRoutes = require("./../domains/report");
const commentRoutes = require("./../domains/comment");

router.use("/user", userRoutes);
router.use("/report", reportRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
