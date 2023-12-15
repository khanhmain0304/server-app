const live_ops = require("./live_ops");
const claim_sign_in = require("./claim_sign_in");
const buy_mega_reward = require("./buy_mega_reward");
const claim_mission = require("./claim_mission");
const exchange_event = require("./exchange_event");
const event_shop = require("./event_shop");
const unlock_sign_in = require("./unlock_sign_in");
const open_lottery = require("./open_lottery");
const reward_lottery = require("./reward_lottery");
const buy_ticket = require("./buy_ticket");

module.exports = {
  paths: {
    "/api/v1/live_ops": {
      ...live_ops,
    },
    "/api/v1/sign_in/{event_id}": {
      ...claim_sign_in,
    },
    "/api/v1/sign_in_mega/{event_id}": {
      ...buy_mega_reward,
    },
    "/api/v1/unlock_sign_in/{event_id}": {
      ...unlock_sign_in,
    },
    "/api/v1/mission/{event_id}": {
      ...claim_mission,
    },
    "/api/v1/exchange/{event_id}": {
      ...exchange_event,
    },
    "/api/v1/event_shop/{event_id}": {
      ...event_shop,
    },
    "/api/v1/event_lottery/{event_id}": {
      ...open_lottery,
    },
    "/api/v1/reward_lottery/{event_id}": {
      ...reward_lottery,
    },
    "/api/v1/buy_ticket/{event_id}": {
      ...buy_ticket,
    },
  },
};
