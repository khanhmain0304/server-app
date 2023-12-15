const express = require('express');
const router = express.Router();

const auth = require("../../../middleware/auth");
const adminAuth = require("../../../middleware/adminAuth");
const asyncMiddleware = require('../../../utils/async_middleware');

const { getCampaign, setTemplateExpire} = require('../../../controllers/campaign');

router.post("/campaign", auth, asyncMiddleware(getCampaign));
router.post("/set_template_expire", auth, asyncMiddleware(setTemplateExpire));




module.exports = router;