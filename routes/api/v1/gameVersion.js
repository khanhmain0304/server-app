const express = require('express');
const router = express.Router();

const HTTP_STATUS_CODE = require("../../../config/http_status_code")
const ERROR_CODE = require("../../../config/error_code");

// Middleware
const auth = require("../../../middleware/auth");
const asyncMiddleware = require('../../../utils/async_middleware');


// Controller
const {addGameVersion, getGameVersion, getMD5} = require("../../../controllers/gameVersion");

/**
 **********************************************************************
 * API
 */

//  router.post("/game_version", auth, addGameVersion);
 router.get("/game_version/:client_id", getGameVersion);
 router.get("/game_md5/:client_id", getMD5);

 module.exports = router;
