const getEvent = require("./getEvent");
const claim_event_task = require("./claim_event_task");
const claim_event_milestone = require("./claim_event_milestone");
const claim_all_event_milestone = require("./claim_all_event_milestone");
const claim_all_event_task = require("./claim_all_event_task");



module.exports = {
  paths: {
    "/api/v1/events": {
      ...getEvent,
    },
    "/api/v1/claim_event_task": {
      ...claim_event_task,
    },
    "/api/v1/claim_event_milestone": {
      ...claim_event_milestone,
    },
    "/api/v1/claim_all_event_milestone": {
      ...claim_all_event_milestone,
    },
    "/api/v1/claim_all_event_task": {
      ...claim_all_event_task,
    }
  },
};
