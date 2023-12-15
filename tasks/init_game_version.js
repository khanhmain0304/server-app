require("../config/database")();

const GameVersion = require("../models/gameVersion");
const GameConfig = require("../models/gameConfig");

var crypto = require("crypto");

const GAME_VERSION = "199";

const deleteAllGameVersion = async () => {
  await GameVersion.deleteMany({ client_id: GAME_VERSION });
  console.log("Done! deleteAllGameVersion");
};

const addGameVersion = async (client_id, config) => {
  let stringConfig = JSON.stringify(config);
  let md5 = crypto.createHash("md5").update(stringConfig).digest("hex");
  await GameVersion.create({
    client_id,
    server_url: "http://a00c96e671ef44ed0987d8deab99c2d9-896151166.us-west-2.elb.amazonaws.com",
    server_env: "alpha",
    tracking_url: "https://dev.events.nmg1.data.bagelcode.com/v1/events",
    tracking_env: "dev",
    tracking_region: "nmg1",
    is_valid: true,
    force_absegment: 0,
    config,
  });

  console.log("addGameVersion: ", client_id);
};

const main = async () => {
  await deleteAllGameVersion();

  let allDefaultgameConfig = await GameConfig.find({ version: GAME_VERSION });

  console.log(allDefaultgameConfig);

  let configArray = [];
  for (var key_config in allDefaultgameConfig) {
    var config = allDefaultgameConfig[key_config];
    configArray.push({
      name: config.name,
      version: GAME_VERSION,
      md5: config.md5,
    });
  }

  await addGameVersion(GAME_VERSION, configArray);
  // await addGameVersion("default", configArray);

  // await addGameVersion("default", configArray);

  console.log("Done!");
  process.exit(0);
};

main();
