const express = require('express');
const router = express.Router();

const auth = require("../../../middleware/auth");
const asyncMiddleware = require('../../../utils/async_middleware');

const { getABSegment } = require('../../../controllers/abSegment');

router.post("/ab_segment", auth, asyncMiddleware(getABSegment));



module.exports = router;