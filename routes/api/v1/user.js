const express = require("express");
const router = express.Router();

const HTTP_STATUS_CODE = require("../../../config/http_status_code");
const ERROR_CODE = require("../../../config/error_code");

// Middleware
const auth = require("../../../middleware/auth");
const asyncMiddleware = require("../../../utils/async_middleware");

// Controller
const { registerEmail, linkGuest } = require("../../../controllers/register");
const { loginWallet } = require("../../../controllers/loginWallet");
const { loginEmail, loginGuest, loginGaia } = require("../../../controllers/login");
const {
  getProfile,
  updateProfile,
  uploadAvatar,
  getPublicProfile,
  getUserItem,
  getUserNFT,
  levelUp,
  tutorialStep,
  updateSegment,
  getInbox,
  claimRewardInbox,
  removeInbox,
  removeAllInbox,
  preChoiceChest,
  choiceChest,
  updateUser,
} = require("../../../controllers/profile");
const { changePassword } = require("../../../controllers/changePassword");

/**
 **********************************************************************
 * API
 */

router.post("/register", asyncMiddleware(registerEmail));
router.post("/loginWallet", asyncMiddleware(loginWallet));
router.post("/login", asyncMiddleware(loginEmail));
router.post("/login_guest", asyncMiddleware(loginGuest));
router.post("/login_gaia", asyncMiddleware(loginGaia));

router.post("/publicProfile", asyncMiddleware(getPublicProfile));

router.post("/profile", auth, asyncMiddleware(updateProfile));
router.post("/linkGuest", auth, asyncMiddleware(linkGuest));
router.get("/profile", auth, asyncMiddleware(getProfile));
router.post("/change-password", auth, asyncMiddleware(changePassword));
router.post("/avatar", auth, asyncMiddleware(uploadAvatar));

router.get("/inventory/item", auth, asyncMiddleware(getUserItem));
router.get("/inventory/nft", auth, asyncMiddleware(getUserNFT));

router.post("/level_up", auth, asyncMiddleware(levelUp));
router.post("/tutorial_step", auth, asyncMiddleware(tutorialStep));
router.post("/update_segment", auth, asyncMiddleware(updateSegment));

router.get("/inbox", auth, asyncMiddleware(getInbox));
router.post("/inbox/:id", auth, asyncMiddleware(claimRewardInbox));
router.post("/remove_inbox/:id", auth, asyncMiddleware(removeInbox));
router.post("/remove_all_inbox", auth, asyncMiddleware(removeAllInbox));

router.get("/choice_chest/:item_id", auth, asyncMiddleware(preChoiceChest));
router.post("/choice_chest/:item_id", auth, asyncMiddleware(choiceChest));

router.post("/user_data", auth, asyncMiddleware(updateUser));

module.exports = router;
