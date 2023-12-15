const evolve = require("./evolve");
const keyEvolve = require("./keyEvolve");

module.exports = {
  paths: {
    "/api/v1/evolve/updateEvolve/{evolve_id}": {
      ...evolve,
    },
    "/api/v1/evolve/updateKeyEvolve/{key_evolve_id}": {
      ...keyEvolve,
    },
  },
};