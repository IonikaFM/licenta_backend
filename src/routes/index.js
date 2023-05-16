const express = require("express");
const router = express.Router();

const userRoutes = require("./../domains/user");
const reportRoutes = require("./../domains/report");

router.use("/user", userRoutes);
router.use("/report", reportRoutes);

module.exports = router;
