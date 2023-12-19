const express = require("express");
const router = express.Router();

const auth = require("../../../middleware/auth");
const adminAuth = require("../../../middleware/adminAuth");
const asyncMiddleware = require("../../../utils/async_middleware");
const { getBillHistory, getBillDetail, createBill, updateBill, deleteBill } = require("../../../controllers/bill");

router.get("/bill", auth, asyncMiddleware(getBillHistory));
router.get("/bill/:id", auth, asyncMiddleware(getBillDetail));
router.post("/bill", auth, asyncMiddleware(createBill));
router.patch("/bill/:id", auth, asyncMiddleware(updateBill));
router.delete("/bill/:id", auth, asyncMiddleware(deleteBill));

module.exports = router;
