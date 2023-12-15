const express = require("express");
const router = express.Router();

const auth = require("../../../middleware/auth");
const asyncMiddleware = require("../../../utils/async_middleware");

const { getGameEvent, claimEventTask, claimEventMilestone, claimAllEventMilestone, claimAllEventTask } = require("../../../controllers/gameEvent");

router.get("/events", auth, asyncMiddleware(getGameEvent));
router.post("/claim_event_task", auth, asyncMiddleware(claimEventTask));
router.post("/claim_event_milestone", auth, asyncMiddleware(claimEventMilestone));

// router.post("/claim_event_task", auth, asyncMiddleware(claimAllEventTask));
// router.post("/claim_event_milestone", auth, asyncMiddleware(claimAllEventMilestone));

router.post("/claim_all_event_task", auth, asyncMiddleware(claimAllEventTask));
router.post("/claim_all_event_milestone", auth, asyncMiddleware(claimAllEventMilestone));

module.exports = router;
