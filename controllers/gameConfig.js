const bcrypt = require("bcrypt");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");

const GameConfig = require("../models/gameConfig");
var crypto = require("crypto");
const { redisGetGameConfig, redisSetGameConfig, redisGetMultiGameConfig, redisSetMultiGameConfig } = require("../config/redisClient");

const initGameConfigRedis = async () => {
  const GAME_CONFIG = "game_config:";
  const game_configs = await GameConfig.find({});

  const objectConfig = {};

  for (const game_config of game_configs) {
    
    const key = GAME_CONFIG + game_config.name + "_" + game_config.version;
    objectConfig[key] = JSON.stringify({ ...game_config.getInfo() });
  }
  await redisSetMultiGameConfig(objectConfig);
};

const addGameConfig = async (req, res, next) => {
  try {
    // Get GameConfig input
    const { name, file_name, version, config } = req.body;

    // Validate GameConfig input
    if (!(name && version && config && file_name)) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_REQUIRE);
    }

    // Check if GameConfig already exist
    // Validate if GameConfig exist in our database
    const oldGameConfig = await GameConfig.findOne({ name, version });

    if (oldGameConfig) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.CONFLICT, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_EXISTED);
    }

    let stringConfig = JSON.stringify(config);
    let md5 = crypto.createHash("md5").update(stringConfig).digest("hex");

    // Create item in our database
    const newGameConfig = await GameConfig.create({
      name,
      file_name,
      version: parseInt(version),
      md5,
      config,
    });

    // Return item
    return new SuccessResponse(res, HTTP_STATUS_CODE.CREATED, ERROR_CODE.NONE, {
      ...newGameConfig.getInfo(),
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_CREATE_FAIL);
  }
};

const getGameConfig = async (req, res, next) => {
  const name = req.params.name;
  const version = req.params.version;

  console.log("getGameConfig name: " + name + ": " + version);
  try {
    // Validate if user exist in our database
    let redisGameConfig = await redisGetGameConfig(name, version);

    if (redisGameConfig) {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...redisGameConfig,
      });
    } else {
      let redisGameConfigDefault = await redisGetGameConfig(name, "default");

      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...redisGameConfigDefault,
      });
    }
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_NOT_FOUND);
  }
};

const getGameConfigArray = async (req, res, next) => {
  let reqBody = req.body;
  try {
    let result = {};
    result = await redisGetMultiGameConfig(reqBody);
    if (result) {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, result);
    }

    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_NOT_FOUND);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_NOT_FOUND);
  }
};

module.exports = {
  initGameConfigRedis,
  addGameConfig,
  getGameConfig,
  getGameConfigArray,
};
