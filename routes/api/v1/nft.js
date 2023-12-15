

const express = require('express');
const router = express.Router();

const HTTP_STATUS_CODE = require("../../../config/http_status_code")
const ERROR_CODE = require("../../../config/error_code");

// Middleware
const auth = require("../../../middleware/auth");
const bcsSignature = require("../../../middleware/bcs-signature");
const asyncMiddleware = require('../../../utils/async_middleware');


// Controller
const {verifyMintNFT, notifyEvent} = require("../../../controllers/nft");

/**
 **********************************************************************
 * API
 */

 router.post("/verifyMintNFT", bcsSignature, verifyMintNFT);
 router.post("/notifyEvent", bcsSignature, notifyEvent);

 module.exports = router;
