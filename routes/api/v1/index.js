const express = require("express");
const router = express.Router();

router.use("/", require("./user"));;
router.use("/", require("./category"));
router.use("/", require("./product"));

// router.use("/", require("./giftCode"));
router.use("/admin", require("./admin"));

module.exports = router;
