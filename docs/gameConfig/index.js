const gameConfig = require("./gameConfig");
const gameConfigs = require("./gameConfigs");

module.exports = {
  paths: {
    "/api/v1/game_config/{name}/{version}": {
      ...gameConfig,
    },
    "/api/v1/game_configs": {
      ...gameConfigs,
    },
  },
};
