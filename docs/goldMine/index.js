const goldMine = require("./goldMine");
const playGoldMine = require("./playGoldMine");
const endGoldMine = require("./endGoldMine");

module.exports = {
  paths: {
    "/api/v1/gold_mine": {
      ...goldMine,
    },
    "/api/v1/play_gold_mine": {
      ...playGoldMine,
    },
    "/api/v1/end_gold_mine": {
      ...endGoldMine,
    },
  },
};
