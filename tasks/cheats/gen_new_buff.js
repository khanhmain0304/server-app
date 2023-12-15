const cron = require("node-cron");
const User = require("../../models/user");
const { redisSetBuffDailyChallenge } = require("../../config/redisClient");
const GameConfig = require("../../models/gameConfig");


const setBuffDailyChallenge = async () => {
  let daily_challenge_config = await GameConfig.findOne({ name: "daily_challenge", version: "199" }).exec();

  if (!daily_challenge_config) {
    daily_challenge_config = await alternateGameConfig("daily_challenge");
  }

  const defuff_list = daily_challenge_config.config.debuff;
  const random_debuff = defuff_list[Math.floor(Math.random() * defuff_list.length)];

  const buff_list = daily_challenge_config.config.buff;
  const random_buff = buff_list[Math.floor(Math.random() * buff_list.length)];
  await redisSetBuffDailyChallenge(random_buff, random_debuff);
};


setBuffDailyChallenge();

