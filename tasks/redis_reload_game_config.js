require("../config/database")();
require("../config/redisClient");
const { initGameConfigRedis } = require("../controllers/gameConfig");

const main = async () => {

    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log("initGameConfigRedis Start!");
    await initGameConfigRedis();
  
  
    console.log("Done!");
    process.exit(0);
  };
  
  main();