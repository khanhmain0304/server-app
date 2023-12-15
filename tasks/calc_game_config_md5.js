require("../config/database")();
const {
  redisGetGameConfig,
  redisSetGameConfig,
  redisGetMultiGameConfig,
  redisSetMultiGameConfig,
  redisGetGameVersion,
  redisSetGameVersion,
  redisRemoveGameVersion,
} = require("../config/redisClient");
const User = require("../models/user");
const GameVersion = require("../models/gameVersion");
const GameConfig = require("../models/gameConfig");
var crypto = require("crypto");

const clearCache = async (name, version) => {
  try {
    const GAME_CONFIG_KEY = "game_config:";
    const GAME_VERSION_KEY = "game_version:";
    let game_configs;

    if (name && name !== "all") {
      game_configs = await GameConfig.find({ name, version });
    } else {
      game_configs = await GameConfig.find({ version });
    }

    const objectConfig = {};

    for (const game_config of game_configs) {
      const key = GAME_CONFIG_KEY + game_config.name + "_" + game_config.version;
      objectConfig[key] = JSON.stringify({ ...game_config.getInfo() });
    }
    await redisSetMultiGameConfig(objectConfig);

    // Clear version
    await redisRemoveGameVersion(version);
    let gameVersion = await GameVersion.findOne({ client_id: version });
    if (gameVersion) {
      await redisSetGameVersion(version, { ...gameVersion.getInfo() });
    }

  } catch (err) {
    console.log(err);
  }
};

const addGameVersion = async (client_id, config) => {
  let stringConfig = JSON.stringify(config);
  // let md5 = crypto.createHash("md5").update(stringConfig).digest("hex");
  await GameVersion.create({
    client_id,
    is_valid: true,
    config,
  });

  console.log("addGameVersion: ", client_id);
};

const main = async () => {
  const params = process.argv;

  if (!params) {
    console.log("Error: params_version isNull!!");
    return;
  }

  let params_version = params[3];
  console.log("params_version", params_version);


  const allGameConfig = await GameConfig.find({ version: params_version });

  console.log("GameConfig length:", allGameConfig.length);

  let configArray = [];
  for (var key_config in allGameConfig) {
    var config = allGameConfig[key_config];

    // Update MD5
    let stringConfig = JSON.stringify({errorCode:0,data:config.getInfo()});

    // console.log(stringConfig);
    
    if(config.name == "cameras")
    {
      console.log("-----------------------");
      console.log(stringConfig)
      console.log("-----------------------");
    }

    let new_md5 = crypto.createHash("md5").update(stringConfig).digest("hex");

    // if (config.md5 != new_md5) {
    //   console.log(config.name, "\t", config.md5, "!!!", new_md5);
    //   await GameConfig.findByIdAndUpdate(config._id, { md5: new_md5 });
    // } else {
    //   console.log(config.name, "\t", config.md5, "===", new_md5);
    // }

    configArray.push({
      name: config.name,
      version: params_version,
      md5: new_md5,
    });
  }

  // return;

  // remove game version
  let oldGameVersion = await GameVersion.findOne({ client_id: params_version });

  if (oldGameVersion) {
    await GameVersion.findByIdAndUpdate(oldGameVersion._id, {config: configArray});
    console.log("UPDATE: game version");
  } else {
    await addGameVersion(params_version, configArray);
    console.log("CREATE: game version");
  }

  // Clear cache
  await clearCache("all", params_version);

  console.log("Done!");
  process.exit(0);
};

main();
