const play_main_stage = require("./play_main_stage");
const play_daily_challenge = require("./play_daily_challenge");
const play_quick_patrol = require("./play_quick_patrol");
const end_main_stage = require("./end_main_stage");
const end_main_stage_bonus = require("./end_main_stage_bonus");
const end_daily_challenge = require("./end_daily_challenge");
const end_quick_patrol = require("./end_quick_patrol");
const revive = require("./revive");
const reward_stage = require("./reward_stage");
const daily_challenge = require("./daily_challenge");
const claim_daily_challenge = require("./claim_daily_challenge");
const play_daily_challenge_with_gem = require("./play_daily_challenge_with_gem");

module.exports = {
  paths: {
    "/api/v1/daily_challenge": {
      ...daily_challenge,
    },
    "/api/v1/play_main_stage": {
      ...play_main_stage,
    },
    "/api/v1/claim_daily_challenge": {
      ...claim_daily_challenge,
    },
    "/api/v1/play_daily_challenge": {
      ...play_daily_challenge,
    },
    "/api/v1/play_daily_challenge_with_gem": {
      ...play_daily_challenge_with_gem,
    },
    "/api/v1/play_quick_patrol": {
      ...play_quick_patrol,
    },
    "/api/v1/end_main_stage": {
      ...end_main_stage,
    },
    "/api/v1/end_main_stage_bonus": {
      ...end_main_stage_bonus,
    },
    "/api/v1/end_daily_challenge": {
      ...end_daily_challenge,
    },
    "/api/v1/end_quick_patrol": {
      ...end_quick_patrol,
    },
    "/api/v1/revive": {
      ...revive,
    },
    "/api/v1/reward_stage": {
      ...reward_stage,
    },
  },
};
