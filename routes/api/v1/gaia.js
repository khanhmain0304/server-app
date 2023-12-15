const express = require('express');
const router = express.Router();

const HTTP_STATUS_CODE = require("../../../config/http_status_code")
const ERROR_CODE = require("../../../config/error_code");


// Middleware
const auth = require("../../../middleware/auth");
const asyncMiddleware = require('../../../utils/async_middleware');


// Controller
const {gaiaValidateIAP} = require("../../../controllers/gaia");

/**
 **********************************************************************
 * API
 */

 router.post("/gaia_validate_iap", auth, asyncMiddleware(gaiaValidateIAP));





 

 module.exports = router;
