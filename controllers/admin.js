var _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { jwt_config } = require("../config/constant");
const { json } = require("body-parser");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const Types = require("../config/types");
const { recordUserLevel, recordClaimTotalGem } = require("./gameEventRecord");
var moment = require("moment");

const GameConfig = require("../models/gameConfig");
const {
  redisGetGameConfig,
  redisSetGameConfig,
  redisGetMultiGameConfig,
  redisSetMultiGameConfig,
  redisGetGameVersion,
  redisSetGameVersion,
  redisRemoveGameVersion,
} = require("../config/redisClient");
var crypto = require("crypto");
const GameVersion = require("../models/gameVersion");
const { UserInbox } = require("../models/inbox");

const Campaign = require("../models/campaign");
const Counter = require("../models/counter");

const clearCacheFunc = async (name, version) => {
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

const addGameVersionFunc = async (client_id, config) => {
  let stringConfig = JSON.stringify(config);
  // let md5 = crypto.createHash("md5").update(stringConfig).digest("hex");
  await GameVersion.create({
    client_id,
    is_valid: true,
    config,
  });

  console.log("addGameVersion: ", client_id);
};

const clearCacheOld = async (req, res, next) => {
  const { name, version } = req.body;

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

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {});
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  }
};

const clearCache = async (req, res, next) => {
  const { name, version } = req.body;

  try {
    if (!version) {
      console.log("Error: version isNull!!");
      return;
    }

    let params_version = version;
    console.log("params_version", params_version);

    const allGameConfig = await GameConfig.find({ version: params_version });

    console.log("GameConfig length:", allGameConfig.length);

    let configArray = [];
    for (var key_config in allGameConfig) {
      var config = allGameConfig[key_config];

      // Update MD5
      let stringConfig = JSON.stringify({ errorCode: 0, data: config.getInfo() });

      // console.log(stringConfig);

      if (config.name == "cameras") {
        console.log("-----------------------");
        console.log(stringConfig);
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
      await GameVersion.findByIdAndUpdate(oldGameVersion._id, { config: configArray });
      console.log("UPDATE: game version");
    } else {
      await addGameVersionFunc(params_version, configArray);
      console.log("CREATE: game version");
    }

    // Clear cache
    await clearCacheFunc("all", params_version);

    console.log("Done!");

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {});
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  }
};

const getProfileBySeqId = async (req, res, next) => {
  const { seq_id } = req.body;

  try {
    // Validate user input
    if (!seq_id) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.USERID_REQUIRED);
    }

    // Validate if user exist in our database
    const user = await User.findOne({ seq_id });

    if (user) {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...user.getInfo(),
      });
    }

    return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
      error_code: ERROR_CODE.INVALID_USER,
      data: {
        message: "User Not Foud!",
      },
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  }
};

const updateProfileBySeqId = async (req, res, next) => {
  try {
    const { first_name, last_name, avatar_name, location, dob, title, card_skin, character, comment, data_stage, tutorial_step } = req.body;

    // Update info
    const user = await User.findByIdAndUpdate(
      req.user_jwt.user_id,
      {
        first_name,
        last_name,
        avatar_name,
        location,
        dob,
        title,
        card_skin,
        character,
        comment,
        data_stage,
        tutorial_step,
      },
      { new: true }
    );

    if (user) {
      // Tracking

      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...user.getInfo(),
      });
    }
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.COULD_NOT_UPDATE_USER, Message.USER_NOT_FOUND);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.COULD_NOT_UPDATE_USER, Message.USER_NOT_FOUND);
  }
};

const loginGMTool = async (req, res, next) => {
  // Get user input
  const { email, password } = req.body;

  // console.log({ email, password });

  // Validate user input
  if (!(email && password)) {
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_EMAIL_PASSWORD);
  }

  // Validate if user exist in our database
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token

    if (/*user.hasOwnProperty('role') &&*/ user.role === "Admin") {
      console.log("Admin");
    } else {
      console.log("Admin only");

      return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
        error_code: ERROR_CODE.INVALID_USER,
        data: {
          message: "Admin only",
        },
      });
    }

    let login_session_id = uuidv4();

    const jwt_token = jwt.sign({ user_id: user._id, email, role: user.role, login_session_id }, jwt_config.secretKey, {
      expiresIn: jwt_config.expiresIn,
    });

    // save user token
    user.jwt_token = jwt_token;

    // EVENT

    // user
    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      // ...user.getInfo(),
      jwt_token: user.jwt_token,
      login_session_id,
    });
  }

  return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.INVALID_CREDENTIALS);
};

const getAdminGameConfig = async (req, res, next) => {
  try {
    const { name, version } = req.body;

    let game_configs = await GameConfig.findOne({ name, version });

    // console.log("getAdminGameConfig name: " + name + ": " + version);

    if (!game_configs) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_NOT_FOUND);
    }

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...game_configs.config,
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_NOT_FOUND);
  }
};

const setAdminGameConfig = async (req, res, next) => {
  // let stringConfig = JSON.stringify(config);
  // let md5 = crypto.createHash("md5").update(stringConfig).digest("hex");

  try {
    const { name, version, config } = req.body;

    let game_configs = await GameConfig.findOne({ name, version });

    let stringConfig = JSON.stringify(config);
    let md5 = crypto.createHash("md5").update(stringConfig).digest("hex");

    // Create item in our database
    const newGameConfig = await GameConfig.findByIdAndUpdate(
      game_configs._id,
      {
        md5,
        config,
      },
      { new: true }
    );

    if (!newGameConfig) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_NOT_FOUND);
    }

    // RESET CACHE
    const GAME_CONFIG_KEY = "game_config:";
    const objectConfig = {};
    const key = GAME_CONFIG_KEY + newGameConfig.name + "_" + newGameConfig.version;
    objectConfig[key] = JSON.stringify({ ...newGameConfig.getInfo() });
    await redisSetMultiGameConfig(objectConfig);

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...newGameConfig.config,
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_NOT_FOUND);
  }
};

const cloneGameConfig = async (req, res, next) => {
  try {
    const { original_version, clone_version } = req.body;

    const original_configs = await GameConfig.find({ version: original_version });
    const target_configs = await GameConfig.find({ version: clone_version });
    const original_game_versions = await GameVersion.findOne({ client_id: original_version });
    const target_game_versions = await GameVersion.findOne({ client_id: clone_version });

    if (original_configs.length === 0 || !original_game_versions) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_NOT_FOUND);
    }

    if (target_configs.length > 0 || target_game_versions) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, "Target Version Existed");
    }

    const GAME_CONFIG_KEY = "game_config:";
    const objectConfig = {};
    const dataNewConfig = [];

    for (const game_config of original_configs) {
      const key = GAME_CONFIG_KEY + game_config.name + "_" + clone_version;
      const data_new_config = { ...game_config.getInfo() };
      data_new_config.version = clone_version;
      objectConfig[key] = JSON.stringify(data_new_config);

      dataNewConfig.push(data_new_config);
    }

    const clone_configs = await GameConfig.insertMany(dataNewConfig);

    await redisSetMultiGameConfig(objectConfig);

    // CLONE GAME VERSION
    const configs_game_versions = original_game_versions.config;
    for (const config_game_versions of configs_game_versions) {
      config_game_versions.version = clone_version;
    }
    const new_game_versions = await GameVersion.create({
      client_id: clone_version,
      server_url: original_game_versions.server_url,
      server_env: original_game_versions.server_env,
      tracking_url: original_game_versions.tracking_url,
      tracking_env: original_game_versions.tracking_env,
      tracking_region: original_game_versions.tracking_region,
      is_valid: original_game_versions.is_valid,
      config: configs_game_versions,
    });

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...clone_configs,
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_NOT_FOUND);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;

    const user = await User.findById(user_id);

    if (!user) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
    }

    user.is_deleted = true;
    user.gaia.id += "deleted";

    user.markModified("gaia");
    await user.save();

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      message: "Delete successful",
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};
const setAdminGameVersion = async (req, res, next) => {
  const API_DEV = "http://a00c96e671ef44ed0987d8deab99c2d9-896151166.us-west-2.elb.amazonaws.com";
  const API_ALPHA = "http://abfa1e244bbe6454f9462002d9cd3016-1110281543.ap-southeast-1.elb.amazonaws.com";
  const API_PROD = "http://acaaaebfe54d941a097244d08eda8cac-1101507742.us-west-2.elb.amazonaws.com";

  const TRACKING_DEV = "https://dev.events.nmg1.data.bagelcode.com/v1/events";
  const TRACKING_ALPHA = "https://dev.events.nmg1.data.bagelcode.com/v1/events";
  const TRACKING_PROD = "https://prod.events.nmg1.data.bagelcode.com/v1/events";

  const TRACKING_ENV_DEV = "dev";
  const TRACKING_ENV_ALPHA = "alpha";
  const TRACKING_ENV_PROD = "prod";

  const SERVER_ENV_DEV = "development";
  const SERVER_ENV_ALPHA = "alpha";
  const SERVER_ENV_PROD = "production";
  try {
    const { client_id, env } = req.body;
    console.log({ client_id, env });
    let gameVersion = await GameVersion.findOne({ client_id });

    let server_url, server_env, tracking_url, tracking_env;

    if (env === "production") {
      server_url = API_PROD;
      server_env = SERVER_ENV_PROD;
      tracking_url = TRACKING_PROD;
      tracking_env = TRACKING_ENV_PROD;
    } else if (env === "alpha") {
      server_url = API_ALPHA;
      server_env = SERVER_ENV_ALPHA;
      tracking_url = TRACKING_ALPHA;
      tracking_env = TRACKING_ENV_ALPHA;
    } else if (env === "development") {
      server_url = API_DEV;
      server_env = SERVER_ENV_DEV;
      tracking_url = TRACKING_DEV;
      tracking_env = TRACKING_ENV_DEV;
    } else {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_VERSION_NOT_FOUND);
    }

    if (!gameVersion) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_VERSION_NOT_FOUND);
    }

    let updateGameVersion = await GameVersion.findByIdAndUpdate(gameVersion._id, { server_url, server_env, tracking_url, tracking_env }, { new: true });

    if (updateGameVersion) {
      await redisSetGameVersion(client_id, { ...gameVersion.getInfo() });
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, updateGameVersion.getInfo());
    }

    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_VERSION_NOT_FOUND);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_CONFIG_NOT_FOUND);
  }
};

const getAdminGameVersion = async (req, res, next) => {
  // let stringConfig = JSON.stringify(config);
  // let md5 = crypto.createHash("md5").update(stringConfig).digest("hex");

  try {
    const { client_id } = req.body;

    let gameVersion;

    if (client_id) {
      gameVersion = await GameVersion.find({ client_id });
    } else {
      gameVersion = await GameVersion.find({});
    }

    if (gameVersion) {
      const gameConfigArray = gameVersion.map((x) => x.getInfo());
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, gameConfigArray);
    }

    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_VERSION_NOT_FOUND);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.GAME_VERSION_NOT_FOUND);
  }
};

const backupUserTest = async (req, res, next) => {
  try {
    const { backup_user, target_user } = req.body;

    let backup_user_data = await User.findOne({ seq_id: backup_user }).exec();
    let target_user_data = await User.findOne({ seq_id: target_user }).exec();

    if (!backup_user_data || !target_user_data) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.USER_NOT_FOUND);
    }

    const target_user_id = target_user_data._id;
    const target_seq_id = target_user_data.seq_id;
    const target_gaia = target_user_data.gaia;

    await User.deleteOne({ seq_id: target_user }).exec();

    const final_target_user = await User.create({
      _id: target_user_id,
      seq_id: target_seq_id,
      gaia: target_gaia,
      ...backup_user_data.getInfoBackup(),
    });

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, { ...final_target_user.getInfo() });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const sendRewardInbox = async (req, res, next) => {
  const { user_id, title, message, items, time } = req.body;

  if (!user_id || !title || !message || !items || !time) {
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, "Require Data");
  }

  const new_inbox = await UserInbox.create({
    user_id,
    title,
    message,
    items,
    expiry_time: moment().unix() + time,
  });

  return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, { ...new_inbox.getInfo() });
};

const createCampaign = async (req, res, next) => {
  try {
    let { name, description, iap_pack, appear, trigger_condition, trigger_rule, repop_mainmenu, campaign_status, repeat_times, start, end, timer, buy_chances, order, repeat_condition, restriction, restriction_tag, asset, template } =
      req.body;

    const id = await Counter.getNextValue("campaigns_count");
    let new_campaign = await Campaign.create({
      id,
      name,
      description,
      iap_pack,
      appear,
      trigger_condition,
      trigger_rule,
      repop_mainmenu,
      campaign_status,
      repeat_times,
      start,
      end,
      timer,
      buy_chances,
      order,
      repeat_condition,
      restriction,
      restriction_tag,
      asset,
      template,
    });

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, new_campaign.getInfo());
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.CAMPAIGN_NOT_FOUND, Message.CAMPAIGN_NOT_FOUND);
  }
};

const getAllCampaign = async (req, res, next) => {
  try {
    await User.findById(req.user_jwt.user_id);

    let campaign = await Campaign.find({});

    if (!campaign) {
    }

    // console.log("final segment", campaign);

    const campaignArray = campaign.map((x) => x.getAllInfo());

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, campaignArray);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.CAMPAIGN_NOT_FOUND, Message.CAMPAIGN_NOT_FOUND);
  }
};

const updateCampaign = async (req, res, next) => {
  try {
    const { _id, name, description, iap_pack, appear, trigger_condition, trigger_rule, repop_mainmenu, campaign_status, repeat_times, start, end, timer, buy_chances, order, repeat_condition, restriction, restriction_tag, asset, template } =
      req.body;

    const campaign = await Campaign.findById(_id);

    if (!campaign) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, "Campaign Not Found");
    }

    const new_campaign = await Campaign.findByIdAndUpdate(
      _id,
      {
        name,
        description,
        iap_pack,
        appear,
        trigger_condition,
        trigger_rule,
        repop_mainmenu,
        campaign_status,
        repeat_times,
        start,
        end,
        timer,
        buy_chances,
        order,
        repeat_condition,
        restriction,
        restriction_tag,
        asset,
        template,
      },
      { new: true }
    );

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, new_campaign);
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const deleteCampaign = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const campaign = await Campaign.findById(_id);

    if (!campaign) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, "Campaign Not Found");
    }

    const delete_campaign = await Campaign.deleteOne({ _id });

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, delete_campaign);
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

module.exports = {
  getProfileBySeqId,
  updateProfileBySeqId,
  loginGMTool,
  clearCache,
  getAdminGameConfig,
  setAdminGameConfig,
  cloneGameConfig,
  deleteUser,
  getAdminGameVersion,
  setAdminGameVersion,
  backupUserTest,
  sendRewardInbox,
  createCampaign,
  getAllCampaign,
  updateCampaign,
  deleteCampaign,
};
