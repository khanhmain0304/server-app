const bcrypt = require("bcrypt");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");

const GameVersion = require("../models/gameVersion");
var crypto = require("crypto");
const { redisGetGameVersion, redisSetGameVersion } = require("../config/redisClient");

const addGameVersion = async (req, res, next) => {
  try {
    // Get GameVersion input
    const { client_id, is_valid, config } = req.body;

    // Validate GameVersion input
    if (!(client_id && is_valid && config)) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_ITEM, Message.GAME_VERSION_REQUIRE);
    }

    // Check if GameVersion already exist
    // Validate if GameVersion exist in our database
    const oldGameVersion = await GameVersion.findOne({ client_id });

    if (oldGameVersion) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.CONFLICT, ERROR_CODE.INVALID_ITEM, Message.GAME_VERSION_EXISTED);
    }

    // Create item in our database
    const newGameVersion = await GameVersion.create({
      client_id,
      is_valid,
      config,
    });

    // Return item
    return new SuccessResponse(res, HTTP_STATUS_CODE.CREATED, ERROR_CODE.NONE, {
      ...newGameVersion.getInfo(),
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_ITEM, Message.GAME_VERSION_CREATE_FAIL);
  }
};

const getGameVersion = async (req, res, next) => {
  const client_id = req.params.client_id;
  let gameVersion;
  console.log("getGameVersion client_id: ", client_id);
  try {
    // Validate if user exist in our database
    let redisGameVersion = await redisGetGameVersion(client_id);
    if (!redisGameVersion) {
      gameVersion = await GameVersion.findOne({ client_id });

      if (!gameVersion) {
        let redisGameVersionDefault = await redisGetGameVersion("default");

        if (!redisGameVersionDefault) {
          gameVersion = await GameVersion.findOne({ client_id: "default" });
          await redisSetGameVersion(client_id, { ...gameVersion.getInfo() });

          return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
            ...gameVersion.getInfo(),
          });
        } else {
          return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
            ...redisGameVersionDefault[0],
          });
        }
      } else {
        await redisSetGameVersion(client_id, { ...gameVersion.getInfo() });

        return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
          ...gameVersion.getInfo(),
        });
      }
    } else {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...redisGameVersion[0],
      });
    }
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_VERSION_NOT_FOUND);
  }
};

const getMD5 = async (req, res, next) => {
  const client_id = req.params.client_id;
  let gameVersion;
  console.log("getGameVersion client_id: ", client_id);
  try {
    // Validate if user exist in our database
    let redisGameMD5 = await redisGetGameVersion(client_id);
    if (!redisGameMD5) {
      gameVersion = await GameVersion.findOne({ client_id });

      if (!gameVersion) {
        let redisGameVersionDefault = await redisGetGameVersion("default");

        if (!redisGameVersionDefault) {
          gameVersion = await GameVersion.findOne({ client_id: "default" });
          return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
            ...gameVersion.getMD5(),
          });
        } else {
          return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
            ...redisGameVersionDefault[0],
          });
        }
      } else {
        return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
          ...gameVersion.getMD5(),
        });
      }
    } else {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        config: redisGameMD5[0].config,
      });
    }
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_VERSION_NOT_FOUND);
  }
};

module.exports = {
  addGameVersion,
  getGameVersion,
  getMD5
};
