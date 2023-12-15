require("../config/database")();

const GameConfig = require("../models/gameConfig");

var crypto = require("crypto");

// game
const stage = require("../data/json/Stages.json");
const stages_9min = require("../data/json/stages_9min.json");
const stages_9min_2 = require("../data/json/stages_9min_2.json");
const cameras = require("../data/json/cameras.json");
const character = require("../data/json/character.json");
const character_9min = require("../data/json/character_9min.json");
const enemy = require("../data/json/enemy.json");
const reward = require("../data/json/reward.json");
const skill = require("../data/json/skill.json");
const user = require("../data/json/user.json");
const weapon = require("../data/json/weapon.json");
const evolve = require("../data/json/evolve.json");
const shop = require("../data/json/shop.json");
const crate = require("../data/json/supplyCrate.json");
const offline = require("../data/json/offlineEarning.json");
const firstIAP = require("../data/json/firstIAP.json");
const trials = require("../data/json/trials.json");
const iap = require("../data/json/iap.json");
const gold_mine = require("../data/json/gold_mine.json");
const daily_challenge = require("../data/json/daily_challenge.json");

// meta
const equipment_main_stats = require("../data/meta/equipment_main_stats.json");
const equipment_lvl_up = require("../data/meta/equipment_lvl_up.json");
const equipment_mere_rule = require("../data/meta/equipment_mere_rule.json");
const equipment_rarity = require("../data/meta/equipment_rarity.json");
const energy = require("../data/meta/energy.json");
const player_account_level = require("../data/meta/player_account_level.json");
const item_config = require("../data/meta/item_config.json");
const go_now = require("../data/meta/go_now.json");
const main_quest_boss_image = require("../data/meta/main_quest_boss_image.json");
const tip_and_trick = require("../data/meta/tip_and_trick.json");

const GAME_VERSION = "199";



const addGameConfig = async (name, config) => {
  // delete config
  await GameConfig.deleteMany({ version: GAME_VERSION, name });

  let stringConfig = JSON.stringify(config);
  // let md5 = crypto.createHash("md5").update(stringConfig).digest("hex");
  await GameConfig.create({
    name,
    file_name: name + ".json",
    version: GAME_VERSION,
    // md5,
    config,
  });

  console.log("addGameConfig: ", name);
};

const main = async () => {

  // await addGameConfig("stage", stage);
  // await addGameConfig("stages_9min", stages_9min);
  // await addGameConfig("stages_9min_2", stages_9min_2);
  // await addGameConfig("cameras", cameras);
  // await addGameConfig("character", character);
  // await addGameConfig("character_9min", character_9min);
  // await addGameConfig("enemy", enemy);
  // await addGameConfig("reward", reward);
  // await addGameConfig("skill", skill);
  // await addGameConfig("user", user);
  // await addGameConfig("weapon", weapon);
  // await addGameConfig("evolve", evolve);
  // await addGameConfig("shop", shop);
  // await addGameConfig("crate", crate);
  // await addGameConfig("offline_earning", offline);
  // await addGameConfig("first_iap", firstIAP);
  // await addGameConfig("trials", trials);
  // await addGameConfig("iap", iap);
  // await addGameConfig("gold_mine", gold_mine);
  // await addGameConfig("daily_challenge", daily_challenge);

  // // meta
  // await addGameConfig("equipment_main_stats", equipment_main_stats);
  // await addGameConfig("equipment_lvl_up", equipment_lvl_up);
  // await addGameConfig("equipment_mere_rule", equipment_mere_rule);
  // await addGameConfig("equipment_rarity", equipment_rarity);
  // await addGameConfig("energy", energy);
  // await addGameConfig("player_account_level", player_account_level);
  // await addGameConfig("item_config", item_config);
  // await addGameConfig("go_now", go_now);
  // await addGameConfig("main_quest_boss_image", main_quest_boss_image);
  // await addGameConfig("tip_and_trick", tip_and_trick);

  console.log("Done!");
  process.exit(0);
};

main();
