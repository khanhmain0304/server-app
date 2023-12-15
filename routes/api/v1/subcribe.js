

const express = require('express');
const router = express.Router();

const HTTP_STATUS_CODE = require("../../../config/http_status_code")
const ERROR_CODE = require("../../../config/error_code");

const {addSubcribe, unSubcribe} = require("../../../controllers/subscribe");
const asyncMiddleware = require('../../../utils/async_middleware');



/**
 **********************************************************************
 * API
 */

 router.get("/subscribe/:email/:name", addSubcribe);
 router.get("/unsubscribe/:email", unSubcribe);


 module.exports = router;
