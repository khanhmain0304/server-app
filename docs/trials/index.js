const trials = require("./trials");
const end_trials = require("./end_trials");
const trials_reward = require("./trials_reward");

module.exports = {
  paths: {
    "/api/v1/trials": {
      ...trials,
    },
    "/api/v1/end_trials": {
      ...end_trials,
    },
    "/api/v1/trials_reward": {
      ...trials_reward,
    },
  },
};
