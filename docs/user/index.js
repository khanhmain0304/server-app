const login = require("./login");
const login_guest = require("./login_guest");
const register = require("./register");
const profile = require("./profile");
const level_up = require("./level_up");
const login_gaia = require("./login_gaia");
const tutorial_step = require("./tutorial_step");
const choice_chest = require("./choice_chest")

module.exports = {
  paths: {
    "/api/v1/login_gaia": {
      ...login_gaia,
    },
    "/api/v1/login": {
      ...login,
    },
    "/api/v1/login_guest": {
      ...login_guest,
    },
    "/api/v1/register": {
      ...register,
    },
    "/api/v1/profile": {
      ...profile,
    },
    "/api/v1/level_up": {
      ...level_up,
    },
    "/api/v1/tutorial_step": {
      ...tutorial_step,
    },
    "/api/v1/choice_chest/{item_id}": {
      ...choice_chest,
    },

  },
};
