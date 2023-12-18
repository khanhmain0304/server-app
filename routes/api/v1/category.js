const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../../../middleware/auth");
const asyncMiddleware = require("../../../utils/async_middleware");
const { createCategory, updateCategory, deleteCategory, getAllCategory } = require("../../../controllers/category");

router.get("/category", asyncMiddleware(getAllCategory));
router.post("/category", asyncMiddleware(createCategory));
router.patch("/category/:id", asyncMiddleware(updateCategory));
router.delete("/category/:id", asyncMiddleware(deleteCategory));

module.exports = router;
