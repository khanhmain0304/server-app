const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../../../middleware/auth");
const asyncMiddleware = require("../../../utils/async_middleware");

// Controller
const { loginEmail, register } = require("../../../controllers/login");
const { getProfile, updateProfile } = require("../../../controllers/profile");
const { changePassword } = require("../../../controllers/profile");

/**
 **********************************************************************
 * API
 */

router.post("/register", asyncMiddleware(register));
router.post("/login", asyncMiddleware(loginEmail));

router.get("/profile", auth, asyncMiddleware(getProfile));
router.patch("/profile", auth, asyncMiddleware(updateProfile));
router.post("/change-password", auth, asyncMiddleware(changePassword));

module.exports = router;
