const { recordUserLevel, recordClaimTotalGem } = require("../controllers/gameEventRecord");
const GameConfig = require("../models/gameConfig");
const { alternateGameConfig } = require("./alternate_config");

const levelUp = async (user) => {
  const current_level = user.level;
  const current_exp = user.exp;

  let player_level_config = await GameConfig.findOne({
    name: "player_account_level",
    version: "default",
  }).exec();

  if (!player_level_config) {
    player_level_config = await alternateGameConfig("player_account_level");
  }

  const next_level = player_level_config.config.find((item) => item.account_level == current_level + 1);

  if (!next_level) {
    console.log("Next level not found");
    return;
  }

  if (current_exp < next_level.exp_required) {
    console.log("Not enough exp to level up");
    return;
  }

  const all_next_level = player_level_config.config.filter((item) => item.account_level > current_level);

  let item_config = await GameConfig.findOne({
    name: "item_config",
    version: "default",
  }).exec();

  if (!item_config) {
    item_config = await alternateGameConfig("item_config");
  }

  const item_gem = item_config.config.find((item) => item.content == Types.Stat.GEM);

  const item_energy = item_config.config.find((item) => item.content == Types.Stat.ENERGY);

  const total_reward = [];
  let total_gem_reward = 0;
  let total_energy_reward = 0;

  for (const item of all_next_level) {
    if (item.exp_required > user.exp) break;

    user.$inc("exp", -item.exp_required);
    user.$inc("level", 1);

    const gem_reward = item.reward.find((item) => item.type == Types.Stat.GEM).value;

    total_gem_reward += gem_reward;

    const energy_reward = item.reward.find((item) => item.type == Types.Stat.ENERGY).value;
    total_energy_reward += energy_reward;

    user.$inc("gem", gem_reward);
    user.$inc("energy", energy_reward);

    await user.save();
  }

  recordUserLevel(user._id, user.level);

  recordClaimTotalGem(user._id, total_gem_reward);

  total_reward.push(
    {
      ...item_gem,
      value: total_gem_reward,
    },
    {
      ...item_energy,
      value: total_energy_reward,
    }
  );

  const data = {
    reward: total_reward,
    user,
  };

  return data;
};
