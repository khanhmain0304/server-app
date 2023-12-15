const express = require('express');
const router = express.Router();

const HTTP_STATUS_CODE = require("../../../config/http_status_code")
const ERROR_CODE = require("../../../config/error_code");

// Middleware
const auth = require("../../../middleware/auth");
const bcsSignature = require("../../../middleware/bcs-signature");
const asyncMiddleware = require('../../../utils/async_middleware');


// Controller
const {getAllFriend,
    getOnlineFriend,
    getFriendRequest,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    blockUser,
    unblockUser, 
    getFriendInfo,
    deleteFriend,
    getPendingRequest,
    getAllFriendInfo} = require("../../../controllers/friend");

/**
 **********************************************************************
 * API
 */

 router.get("/all", auth, getAllFriend);
 router.get("/info", auth, getFriendInfo);
 router.get("/allinfo", auth, getAllFriendInfo);
 router.get("/online", auth, getOnlineFriend);
 router.get("/requests", auth, getFriendRequest);
 router.get("/pending", auth, getPendingRequest);
 router.post("/requests", auth, sendFriendRequest);
 router.put("/requests", auth, acceptFriendRequest);
 router.delete("/requests", auth, declineFriendRequest);
 router.delete("/delete", auth, deleteFriend);
 router.post("/block", auth, blockUser);
 router.put("/block", auth, unblockUser);
 
 module.exports = router;
