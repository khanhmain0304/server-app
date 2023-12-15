var _ = require("lodash");
var moment = require("moment");
var ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const Item = require("../models/item");
const Set = require("../models/set");
const GameConfig = require("../models/gameConfig");

const { json } = require("body-parser");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const Types = require("../config/types");
const { recordUserLevel, recordClaimTotalGem } = require("./gameEventRecord");
const { trackingServer } = require("./tracking");
const { redisGetTrackingCommonColumns, redisGetTrackingTotalSpt, redisGetLastTracking, redisSetTrackingTotalSpt, redisGetGameConfig } = require("../config/redisClient");
const { alternateGameConfig } = require("../helper/alternate_config");
const { UserInbox } = require("../models/inbox");
const { addReward } = require("./reward");
const { EquipmentInfo } = require("../models/equipment");
// const {uploadToBucket} = require("./upload");

const getProfile = async (req, res, next) => {
  try {
    const fields = req.body;

    // Validate if user exist in our database
    const user = await User.findById(req.user_jwt.user_id);

    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error_code: ERROR_CODE.INVALID_USER,
        data: {
          message: "User Not Foud!",
        },
      });
    }

    if (fields && fields.length > 0) {
      let resultFields = {};

      let userArray = { ...user.getInfo() };

      for (let element of fields) {
        let temp = _.get(userArray, element);
        console.log(temp);
        if (temp === undefined) {
          temp = null;
        }
        resultFields[element] = temp;
      }

      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...resultFields,
      });
    } else {
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

const getPublicProfile = async (req, res, next) => {
  const { userId } = req.body;

  try {
    // Validate user input
    if (!userId) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.USERID_REQUIRED);
    }

    // Validate if user exist in our database
    const user = await User.findById(userId);

    if (user) {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...user.getPublicInfo(),
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

const updateProfile = async (req, res, next) => {
  try {
    const { first_name, last_name, avatar_name, location, dob, title, card_skin, character, comment, data_stage, tutorial_step, CRMTriggerCount } = req.body;
    console.log({ first_name, last_name, avatar_name, location, dob, title, card_skin, character, comment, data_stage, tutorial_step, CRMTriggerCount });
    const user = await User.findById(req.user_jwt.user_id);
    const previous_name = user.first_name + " " + user.last_name;

    // Tracking
    const common_column = await redisGetTrackingCommonColumns(user._id);
    let last_tracking = await redisGetLastTracking(user.gaia.id);
    const total_spt = await redisSetTrackingTotalSpt(user.gaia.id, Date.now() - last_tracking);

    let common_tracking = {
      user_id: user.gaia.id ? user.gaia.id : user._id,
      device_id: common_column.device_id,
      adid: common_column.adid,
      login_count: user.login_count,
      register_ts: user.register_ts,
      os: common_column.os,
      client_version: common_column.client_version,
      // login_time: common_column.login_time,
      total_spt,
      ab_test_segment: common_column.ab_test_segment,
      level: user.level,
      exp: user.exp,
      os_version: common_column.os_version,
      lifetime_spend: user.lifetime_spend,
      purchase_count: user.purchase_count,
      paid_gold: user.paid_gold,
      free_gold: user.free_gold,
      gold: user.gold,
      paid_gem: user.paid_gem,
      free_gem: user.free_gem,
      gem: user.gem,
      tracker_name: common_column.tracker_name,
      network: common_column.network,
      campaign: common_column.campaign,
      adgroup: common_column.adgroup,
      creative: common_column.creative,
      locale: common_column.locale,
      timezone_offset: common_column.timezone_offset,
    };

    // Update info
    const updateUser = await User.findByIdAndUpdate(
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
        total_spt,
        CRMTriggerCount,
      },
      { new: true }
    );

    if (user) {
      let body_tracking = [
        {
          event_id: "server_change_profile",
          type: "name",
          previous_value: previous_name,
          current_value: user.first_name + " " + user.last_name,
          spent_gem: 0,
        },
        // {
        //   event_id: "server_spend_gem",
        //   spent_gem: 100,
        //   category: "META",
        //   sub_category: "UPDATE_PROFILE",
        // },
      ];

      trackingServer(common_tracking, body_tracking);

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

const tutorialStep = async (req, res, next) => {
  try {
    const { tutorial_step } = req.body;

    // Update info
    const user = await User.findByIdAndUpdate(req.user_jwt.user_id, {
      tutorial_step,
    });

    if (user) {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {});
    }
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.COULD_NOT_UPDATE_USER, Message.USER_NOT_FOUND);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.COULD_NOT_UPDATE_USER, Message.USER_NOT_FOUND);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const user_before = await User.findById(req.user_jwt.user_id);

    let newAvatarUrl = ""; // await uploadToBucket(req.file);
    // Update info
    const user = await User.findByIdAndUpdate(req.user_jwt.user_id, { avatar_url: newAvatarUrl }, { new: true });

    if (user) {
      // Tracking
      const common_column = await redisGetTrackingCommonColumns(user._id);
      let last_tracking = await redisGetLastTracking(user.gaia.id);
      const total_spt = await redisSetTrackingTotalSpt(user.gaia.id, Date.now() - last_tracking);
      // const total_spt = await redisGetTrackingTotalSpt(user.gaia.id);

      user.total_spt = total_spt;
      await user.save();

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

const getUserItem = async (req, res, next) => {
  try {
    // Validate if user exist in our database

    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 10;

    const user = await User.findById(req.user_jwt.user_id);

    //  .skip(offset).limit(limit);

    //  const tradesCollectionCount = await Trades.count()
    //  const totalPages = Math.ceil(tradesCollectionCount / limit)
    //  const currentPage = Math.ceil(tradesCollectionCount % offset)

    if (user) {
      let itemArr = [];

      for (let key in user.items) {
        let item = await Item.findOne({ part_id: user.items[key] });

        if (item) {
          // console.log(item.getInfo())
          itemArr.push(item.getInfo());
        }
      }

      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, itemArr);
    }

    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  }
};

const getUserNFT = async (req, res, next) => {
  try {
    // Validate if user exist in our database
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 10;

    const user = await User.findById(req.user_jwt.user_id);

    //  .skip(offset).limit(limit);

    //  const tradesCollectionCount = await Trades.count()
    //  const totalPages = Math.ceil(tradesCollectionCount / limit)
    //  const currentPage = Math.ceil(tradesCollectionCount % offset)

    if (user) {
      let itemArr = [];

      for (let key in user.items) {
        let item = await Set.findOne({ seq_id: user.items[key] });

        if (item) {
          // console.log(item.getInfo())
          itemArr.push(item.getInfo());
        }
      }

      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, itemArr);
    }

    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  }
};

const levelUp = async (req, res, next) => {
  try {
    const user = await User.findById(req.user_jwt.user_id);

    const current_level = user.level;
    const current_exp = user.exp;

    // const player_level_config = await GameConfig.findOne({
    //   name: "player_account_level",
    //   version: req.user_jwt.version,
    // }).exec();

    let player_level_config = await redisGetGameConfig("player_account_level", "default");

    if (!player_level_config) {
      player_level_config = await alternateGameConfig("player_account_level");
    }

    const next_level = player_level_config.config.find((item) => item.account_level == current_level + 1);

    if (!next_level) {
      console.log("Next level not found");
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_GATEWAY, ERROR_CODE.INVALID_ITEM, Message.USER_NOT_FOUND);
    }

    if (current_exp < next_level.exp_required) {
      console.log("Not enough exp to level up");
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...user.getInfo(),
      });
    }

    const all_next_level = player_level_config.config.filter((item) => item.account_level > current_level);

    let item_config = await GameConfig.findOne({
      name: "item_config",
      version: req.user_jwt.version,
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

    await recordUserLevel(user._id, user.level);

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

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, data);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const levelUpFunc = async (user, version) => {
  try {
    // console.log("levelUpFunc");
    const current_level = user.level;
    const current_exp = user.exp;
    const energy_before = user.energy;

    // const player_level_config = await GameConfig.findOne({
    //   name: "player_account_level",
    //   version: req.user_jwt.version,
    // }).exec();

    let player_level_config = await redisGetGameConfig("player_account_level", version);

    if (!player_level_config) {
      player_level_config = await alternateGameConfig("player_account_level");
    }

    const next_level = player_level_config.config.find((item) => item.account_level == current_level + 1);

    if (!next_level) {
      const max_level = player_level_config.config[player_level_config.config.length - 1];
      if (user.exp >= max_level.exp_required) {
        user.exp = max_level.exp_required;
      }
      // return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_GATEWAY, ERROR_CODE.INVALID_ITEM, Message.USER_NOT_FOUND);
      return false;
    }

    if (current_exp < next_level.exp_required) {
      // console.log("Not enough exp to level up");
      // return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      //   ...user.getInfo(),
      // });
      return false;
    }

    const all_next_level = player_level_config.config.filter((item) => item.account_level > current_level);

    let item_config = await GameConfig.findOne({
      name: "item_config",
      version: version ? version : "199",
    }).exec();

    if (!item_config) {
      item_config = await alternateGameConfig("item_config");
    }

    const item_gem = item_config.config.find((item) => item.content == Types.Stat.GEM);

    const item_energy = item_config.config.find((item) => item.content == Types.Stat.ENERGY);

    // const total_reward = [];
    let total_gem_reward = 0;
    let total_energy_reward = 0;

    for (const item of all_next_level) {
      if (item.exp_required > user.exp) break;

      // user.$inc("exp", -item.exp_required);
      // user.$inc("level", 1);

      user.exp -= Math.floor(item.exp_required);
      user.level += 1;

      const gem_reward = item.reward.find((item) => item.type == Types.Stat.GEM).value;

      total_gem_reward += gem_reward;

      const energy_reward = item.reward.find((item) => item.type == Types.Stat.ENERGY).value;
      total_energy_reward += energy_reward;

      // user.$inc("gem", gem_reward);
      // user.$inc("energy", energy_reward);

      user.gem += gem_reward;
      user.free_gem += gem_reward;
      user.energy += energy_reward;

      // await user.save();
    }

    recordUserLevel(user._id, user.level);

    recordClaimTotalGem(user._id, total_gem_reward);

    // Tracking
    const common_column = await redisGetTrackingCommonColumns(user._id);
    let last_tracking = await redisGetLastTracking(user.gaia.id);
    const total_spt = await redisSetTrackingTotalSpt(user.gaia.id, Date.now() - last_tracking);
    // const total_spt = await redisGetTrackingTotalSpt(user.gaia.id);

    user.total_spt = total_spt;

    let common_tracking = {
      user_id: user.gaia.id ? user.gaia.id : user._id,
      device_id: common_column.device_id,
      adid: common_column.adid,
      login_count: user.login_count,
      register_ts: user.register_ts,
      os: common_column.os,
      client_version: common_column.client_version,
      // login_time: common_column.login_time,
      total_spt,
      ab_test_segment: common_column.ab_test_segment,
      level: current_level,
      exp: current_exp,
      os_version: common_column.os_version,
      lifetime_spend: user.lifetime_spend,
      purchase_count: user.purchase_count,
      paid_gold: user.paid_gold,
      free_gold: user.free_gold,
      gold: user.gold,
      paid_gem: user.paid_gem,
      free_gem: user.free_gem,
      gem: user.gem,
      tracker_name: common_column.tracker_name,
      network: common_column.network,
      campaign: common_column.campaign,
      adgroup: common_column.adgroup,
      creative: common_column.creative,
      locale: common_column.locale,
      timezone_offset: common_column.timezone_offset,
    };

    let body_tracking = [
      {
        event_id: "server_earn_energy",
        cause_type: "level_up",
        earned_energy: total_energy_reward,
        energy: energy_before,
        max_energy: user.energy_data.max_energy_amount,
      },
      {
        event_id: "server_earn_consumable",
        consumable_content: "energy",
        consumable_id: 2400015,
        consumable_type: "Energy",
        consumable_name: "Energy",
        category: "META",
        sub_category: "LEVEL_UP",
        earned_amount: total_energy_reward,
      },
      {
        event_id: "server_level_up",
        reached_level: user.level,
        earned_gem: total_gem_reward,
      },
      {
        event_id: "server_earn_gem",
        earned_gem: total_gem_reward,
        category: "META",
        sub_category: "LEVEL_UP",
      },
    ];

    trackingServer(common_tracking, body_tracking);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateSegment = async (req, res, next) => {
  try {
    const { ab_test_segment } = req.body;

    console.log("AAA updateSegment", ab_test_segment);

    if (ab_test_segment == "1001" || ab_test_segment == "1002") {
      const user = await User.findById(req.user_jwt.user_id);

      if (user && !user.is_claim_segment) {
        const update_user = await User.findByIdAndUpdate(req.user_jwt.user_id, {
          revive_token: user.is_claim_segment + 1,
          is_claim_segment: true,
        });
      }
    }

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {});
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.COULD_NOT_UPDATE_USER, Message.USER_NOT_FOUND);
  }
};

const getInbox = async (req, res, next) => {
  try {
    const inbox_users = await UserInbox.find(
      {
        user_id: new ObjectId(req.user_jwt.user_id),
        expiry_time: { $gte: moment().unix() },
      },
      { __v: false }
    );

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, [...inbox_users]);
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const claimRewardInbox = async (req, res, next) => {
  try {
    const inbox_user = await UserInbox.findById(req.params.id);

    if (!inbox_user) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, "Not Found User Message");
    }

    if (inbox_user.user_id != req.user_jwt.user_id) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, "User Doesn't Have Reward Message");
    }

    if (inbox_user.status == Types.TaskStatus.CLAIMED) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, "User Reward Is Claimed");
    }

    const user = await User.findById(req.user_jwt.user_id);

    const item_list = await addReward(user, inbox_user.items, req.user_jwt.version);

    inbox_user.status = Types.TaskStatus.CLAIMED;

    await inbox_user.save();
    await user.save();

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      item_list,
      inbox_user: { ...inbox_user.getInfo() },
      user: { ...user.getInfo() },
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const removeInbox = async (req, res, next) => {
  try {
    const inbox_user = await UserInbox.findById(req.params.id);

    if (!inbox_user) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, "Not Found User Message");
    }

    if (inbox_user.user_id != req.user_jwt.user_id) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, "User Doesn't Have Reward Message");
    }

    if (inbox_user.status == Types.TaskStatus.NEW) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, "Can't Remove User Message");
    }

    await inbox_user.remove();

    const new_inbox_users = await UserInbox.find(
      {
        user_id: new ObjectId(req.user_jwt.user_id),
        expiry_time: { $gte: moment().unix() },
      },
      { __v: false }
    );

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, [...new_inbox_users]);
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const removeAllInbox = async (req, res, next) => {
  try {
    await UserInbox.deleteMany(
      {
        user_id: new ObjectId(req.user_jwt.user_id),
        status: Types.TaskStatus.CLAIMED,
      },
      { __v: false }
    );

    const new_inbox_users = await UserInbox.find(
      {
        user_id: new ObjectId(req.user_jwt.user_id),
        expiry_time: { $gte: moment().unix() },
      },
      { __v: false }
    );

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, [...new_inbox_users]);
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const preChoiceChest = async (req, res, next) => {
  try {
    const user = await User.findById(req.user_jwt.user_id);

    let item_config = await GameConfig.findOne({ name: "item_config", version: req.user_jwt.version }).exec();

    if (!item_config) {
      item_config = await alternateGameConfig("item_config");
    }

    const user_chest = user.equipment.choice_chests.find((item) => item.item_id == req.params.item_id);

    if (!user_chest || user_chest.value == 0) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, Message.ITEM_NOT_FOUND);
    }

    let item_list = [];
    if (user_chest.content == Types.Content.EQUIPMENT) {
      let item_list_config = item_config.config.filter(
        (item) => item.content == user_chest.content && item.item_type != "All" && item.item_type != "Choice" && item.item_super == user_chest.item_super
      );

      for (const item of item_list_config) {
        const item_infor = await EquipmentInfo.findOne({ item_id: item.item_id, item_current_rarity: item.item_current_rarity });

        item_list.push({ ...item_infor.getInfo() });
      }
    } else if (user_chest.content == Types.Content.GADGET) {
      let gadget_type;
      if (user_chest.item_id == 2162000) {
        gadget_type = 1;
      } else {
        gadget_type = 2;
      }

      item_list = item_config.config.filter(
        (item) =>
          item.content == user_chest.content &&
          item.item_type != "All" &&
          item.item_type != "Choice" &&
          item.item_super == user_chest.item_super &&
          item.item_type == gadget_type &&
          item.item_id != 2160010 &&
          item.item_id != 2160011
      );
    }

    item_list.forEach((element) => {
      element.item_current_rarity = user_chest.item_current_rarity;
    });

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      item_list,
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const choiceChest = async (req, res, next) => {
  try {
    const { items } = req.body;

    const user = await User.findById(req.user_jwt.user_id);

    const user_chest = user.equipment.choice_chests.find((item) => item.item_id == req.params.item_id);

    if (user_chest.value < items.length) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_ITEM, "Item quantity limited");
    }

    user_chest.value -= items.length;

    // FIXME: Khanh
    for (const iterator of items) {
      if (iterator.content == 4) {
        iterator.content = "Equipment";
      } else if (iterator.content == 12) {
        iterator.content = "Gadget";
      }
    }

    const item_list = await addReward(user, items, req.user_jwt.version);

    user.markModified("equipment");

    await user.save();

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      item_list,
      user: { ...user.getInfo() },
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

// const updateUser = async (req, res, next) => {
//   try {
//     const {
//       energy,
//       gem,
//       gold,
//       dna,
//       revive_token,
//       exp,
//       silver_key,
//       gold_key,
//       s_key,
//       offline_earning,
//       evolve,
//       limit_record,
//       limit_double_value,
//       limit_chapter_pack,
//       crate_record,
//       data_stage,
//       paid_gold,
//       free_gold,
//       paid_gem,
//       free_gem,
//       equipment,
//     } = req.body;

//     const current_user = await User.findById(req.user_jwt.user_id);

//     const update_user = await User.findByIdAndUpdate(req.user_jwt.user_id, {
//       energy: !energy ? current_user.energy : energy,
//       gem: !gem ? current_user.gem : gem,
//       gold: !gold ? current_user.gold : gold,
//       dna: !dna ? current_user.dna : dna,
//       revive_token: !revive_token ? current_user.revive_token : revive_token,
//       exp: !exp ? current_user.exp : exp,
//       silver_key: !silver_key ? current_user.silver_key : silver_key,
//       gold_key: !gold_key ? current_user.gold_key : gold_key,
//       s_key: !s_key ? current_user.s_key : s_key,
//       offline_earning: !offline_earning ? current_user.offline_earning : offline_earning,
//       evolve: !evolve ? current_user.evolve : evolve,
//       limit_record: !limit_record ? current_user.limit_record : limit_record,
//       limit_double_value: !limit_double_value ? current_user.limit_double_value : limit_double_value,
//       limit_chapter_pack: !limit_chapter_pack ? current_user.limit_chapter_pack : limit_chapter_pack,
//       crate_record: !crate_record ? current_user.crate_record : crate_record,
//       data_stage: !data_stage ? current_user.data_stage : data_stage,
//       paid_gold: !paid_gold ? current_user.paid_gold : paid_gold,
//       free_gold: !free_gold ? current_user.free_gold : free_gold,
//       paid_gem: !paid_gem ? current_user.paid_gem : paid_gem,
//       free_gem: !free_gem ? current_user.free_gem : free_gem,
//       equipment: !equipment ? current_user.equipment : equipment,
//     });

//     return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
//       user: { ...update_user.getInfo() },
//     });
//   } catch (error) {
//     console.log(error);
//     return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
//   }
// };

const updateUser = async (req, res, next) => {
  try {
    const {
      energy,
      gem,
      gold,
      dna,
      revive_token,
      level,
      exp,
      silver_key,
      gold_key,
      s_key,
      offline_earning,
      evolve,
      limit_record,
      limit_double_value,
      limit_chapter_pack,
      crate_record,
      data_stage,
      paid_gold,
      free_gold,
      paid_gem,
      free_gem,
      equipment,
    } = req.body;

    const user = await User.findById(req.user_jwt.user_id);

    user.energy = !energy ? user.energy : energy;
    user.gem = !gem ? user.gem : gem;
    user.gold = !gold ? user.gold : gold;
    user.dna = !dna ? user.dna : dna;
    user.revive_token = !revive_token ? user.revive_token : revive_token;
    user.level = !energlevely ? user.level : level;
    user.exp = !exp ? user.exp : exp;
    user.silver_key = !silver_key ? user.silver_key : silver_key;
    user.gold_key = !gold_key ? user.gold_key : gold_key;
    user.s_key = !s_key ? user.s_key : s_key;
    user.paid_gold = !paid_gold ? user.paid_gold : paid_gold;
    user.free_gold = !free_gold ? user.free_gold : free_gold;
    user.paid_gem = !paid_gem ? user.paid_gem : paid_gem;
    user.free_gem = !free_gem ? user.free_gem : free_gem;

    await user.save();

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      user: { ...user.getInfo() },
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  getPublicProfile,
  getUserItem,
  getUserNFT,
  levelUp,
  levelUpFunc,
  tutorialStep,
  updateSegment,
  getInbox,
  claimRewardInbox,
  removeInbox,
  removeAllInbox,
  preChoiceChest,
  choiceChest,
  updateUser,
};
