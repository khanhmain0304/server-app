const express = require("express");
const router = express.Router();

router.use("/", require("./user"));;
router.use("/", require("./set"));
router.use("/", require("./nft"));
router.use("/", require("./gameserver"));
router.use("/", require("./subcribe"));
router.use("/", require("./gameConfig"));
router.use("/", require("./gameVersion"));
router.use("/", require("./gameEvent"));
router.use("/", require("./gaia"));
router.use("/", require("./abSegment"));

// router.use("/", require("./giftCode"));
router.use("/admin", require("./admin"));

router.use("/friends", require("./friend"));

module.exports = router;
