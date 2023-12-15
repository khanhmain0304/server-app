const GameConfig = require("../models/gameConfig");

const alternateGameConfig = async (config_name) => {
  const alternate_version = "199";
  const alternate_game_config = await GameConfig.findOne({ name: config_name, version: alternate_version });
  return alternate_game_config;
};

module.exports = { alternateGameConfig };
