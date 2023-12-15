const express = require("express");
const router = express.Router();

const HTTP_STATUS_CODE = require("../../../config/http_status_code");
const ERROR_CODE = require("../../../config/error_code");

// Middleware
const auth = require("../../../middleware/auth");
const adminAuth = require("../../../middleware/adminAuth");
const asyncMiddleware = require("../../../utils/async_middleware");

// Controller
const {
  getProfileBySeqId,
  updateProfileBySeqId,
  loginGMTool,
  clearCache,
  getAdminGameConfig,
  setAdminGameConfig,
  cloneGameConfig,
  deleteUser,
  getAdminGameVersion,
  setAdminGameVersion,
  backupUserTest,
  sendRewardInbox,
  createCampaign,
  getAllCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../../../controllers/admin");

/**
 **********************************************************************
 * API
 */

router.post("/login_gmtool", asyncMiddleware(loginGMTool));
router.post("/get_profile_by_seqid", adminAuth, asyncMiddleware(getProfileBySeqId));
router.post("/update_profile_by_seqid", adminAuth, asyncMiddleware(updateProfileBySeqId));
router.post("/clear_cache", adminAuth, asyncMiddleware(clearCache));
router.post("/get_admin_gameconfig", adminAuth, asyncMiddleware(getAdminGameConfig));
router.post("/set_admin_gameconfig", adminAuth, asyncMiddleware(setAdminGameConfig));
router.post("/clone_gameconfig", adminAuth, asyncMiddleware(cloneGameConfig));
router.post("/delete_user/:user_id", adminAuth, asyncMiddleware(deleteUser));
router.post("/get_admin_gameversion", adminAuth, asyncMiddleware(getAdminGameVersion));
router.post("/set_admin_gameversion", adminAuth, asyncMiddleware(setAdminGameVersion));
// router.post("/backup_user", adminAuth, asyncMiddleware(backupUserTest));
router.post("/send_inbox", adminAuth, asyncMiddleware(sendRewardInbox));

// TODO: adminAuth
router.post("/create_campaign", adminAuth, asyncMiddleware(createCampaign));
router.post("/get_all_campaigns", adminAuth, asyncMiddleware(getAllCampaign));
router.post("/update_campaign", adminAuth, asyncMiddleware(updateCampaign));
router.post("/delete_campaign", adminAuth, asyncMiddleware(deleteCampaign));

module.exports = router;
