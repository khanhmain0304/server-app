const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../../../middleware/auth");
const asyncMiddleware = require("../../../utils/async_middleware");
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetail } = require("../../../controllers/product");

router.get("/product", asyncMiddleware(getAllProduct));
router.get("/product/:id", asyncMiddleware(getProductDetail));
router.post("/product", asyncMiddleware(createProduct));
router.patch("/product/:id", asyncMiddleware(updateProduct));
router.delete("/product/:id", asyncMiddleware(deleteProduct));

module.exports = router;
