const reset_evolve = require("./reset_evolve");
const reset_limit = require("./reset_limit");
const reset_energy = require("./reset_energy");
const update_buff_daily_challenge = require("./update_buff_daily_challenge");

module.exports = {
  paths: {
    // "/api/v1/test/reset_evolve": {
    //   ...reset_evolve,
    // },
    // "/api/v1/test/reset_limit": {
    //   ...reset_limit,
    // },
    // "/api/v1/test/reset_energy": {
    //   ...reset_energy,
    // }
    "/api/v1/test/update_buff": {
      ...update_buff_daily_challenge,
    },
  },
};
