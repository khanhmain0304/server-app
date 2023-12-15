const express = require('express');
const router = express.Router();

const HTTP_STATUS_CODE = require("../../../config/http_status_code")
const ERROR_CODE = require("../../../config/error_code");

// Middleware
const auth = require("../../../middleware/auth");
const asyncMiddleware = require('../../../utils/async_middleware');


// Controller
const {addGameConfig, getGameConfig, getGameConfigArray} = require("../../../controllers/gameConfig");

/**
 **********************************************************************
 * API
 */

 router.post("/game_config", auth, addGameConfig);
 router.post("/game_configs", getGameConfigArray);
 router.get("/game_config/:name/:version", getGameConfig);

 module.exports = router;
