const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const Counter = require("../models/counter");
// const redis = require("../config/redis");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const { jwt_config } = require("../config/constant");
const { recordEventLogin } = require("../controllers/gameEventRecord");
const { recordUserClearXStage, recordUserLevel } = require("../controllers/gameEventRecord");
// const Types = require("../config/types");
const axios = require("axios");
var moment = require("moment"); // require
const { v4: uuidv4 } = require("uuid");
const { trackingServerRegistration, trackingServerLogin } = require("./tracking");
const {
  redisSetTrackingCommonColumns,
  redisGetTrackingCommonColumns,
  redisGetTrackingTotalSpt,
  redisGetLoginDate,
  redisGetLastTracking,
  redisSetTrackingTotalSpt,
} = require("../config/redisClient");
const Types = require("../config/types");
const GameConfig = require("../models/gameConfig");
const { GadgetInfo } = require("../models/gadget");
const { alternateGameConfig } = require("../helper/alternate_config");
const { getABSegmentFunc } = require("./abSegment");

const loginEmail = async (req, res, next) => {
  // Get user input
  const {
    email,
    password,
    version,
    device_id = "",
    adid = "",
    ab_test_segment = "",
    os = "",
    os_version = "",
    client_version = "",
    tracker_name = "",
    network = "",
    campaign = "",
    adgroup = "",
    creative = "",
    locale = "",
    timezone_offset = "",
  } = req.body;

  // Validate user input
  if (!(email && password)) {
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_EMAIL_PASSWORD);
  }

  // Validate if user exist in our database
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token

    let login_session_id = uuidv4();

    const jwt_token = jwt.sign({ user_id: user._id, email, version, login_session_id }, jwt_config.secretKey, {
      expiresIn: jwt_config.expiresIn,
    });

    // save user token
    user.jwt_token = jwt_token;

    // FIRST_TIME_LOGIN
    if (user.is_first_time_login === true) {
      const first_time_user = await User.findByIdAndUpdate(user._id, { is_first_time_login: false }, { new: true });
    }

    // Validate Subcription
    let lastLoginDate = await redisGetLoginDate(user._id);

    // EVENT
    await recordEventLogin(user);

    let isSameDate = moment(moment(new Date()).format("YYYY-MM-DD")).isSame(moment.unix(lastLoginDate).format("YYYY-MM-DD"), "day");

    const monthly_card = user.subscriptions.find((item) => item.pack_id == Types.IapID.MONTHLY_CARD);
    const super_monthly_card = user.subscriptions.find((item) => item.pack_id == Types.IapID.SUPPER_MONTHLY_CARD);

    let bonus_quick_patrol = 0;
    let bonus_max_energy = 0;

    if (monthly_card) {
      if (monthly_card.expiry_date <= moment().unix()) {
        user.subscriptions.pull({ _id: monthly_card._id });
      } else {
        bonus_quick_patrol = monthly_card.bonus.find((item) => item.bonus_id == 2).value;

        if (!isSameDate) {
          user.limit_record.limit_energy_quick_patrol += bonus_quick_patrol;
        }
      }
    }

    if (super_monthly_card) {
      if (super_monthly_card.expiry_date <= moment().unix()) {
        user.subscriptions.pull({ _id: super_monthly_card._id });
        user.skip_ads = false;
        user.energy_data.max_energy_amount = 30;
      } else {
        bonus_quick_patrol = super_monthly_card.bonus.find((item) => item.bonus_id == 2).value;
        bonus_max_energy += super_monthly_card.bonus.find((item) => item.bonus_id == 3).value;
        user.energy_data.max_energy_amount = 30 + bonus_max_energy;
        if (!isSameDate) {
          user.limit_record.limit_energy_quick_patrol += bonus_quick_patrol;
        }
      }
    }

    user.markModified("limit_record");
    user.markModified("subscriptions");

    // check end stage when add new stage
    let stage_config = await GameConfig.findOne({ name: "stage", version: version });

    if (!stage_config) {
      stage_config = await alternateGameConfig("stage");
    }

    // ==== Case: version 1.0.26 don't have stage 4 config => revert to stage 3 ====
    const check_stage = stage_config.config.stages.find((item) => item.stage_id == user.data_stage.id_stage_current);
    if (!check_stage) {
      console.log("check_stage");
      user.data_stage.id_stage_current = 1000002;
      user.data_stage.id_stage_select = 1000002;
      user.data_stage.time_survived = 480;
      user.data_stage.end_stage = true;

      if (user.data_stage.id_stage_reward == 1000003) {
        user.data_stage.id_stage_reward = 1000002;
        user.data_stage.current_reward = 2;
      }
      user.markModified("data_stage");
    }
    // =============================

    if (user.data_stage.end_stage) {
      console.log("end stage");
      const end_stage_config = stage_config.config.stages.find((item) => item.last_stage);

      if (end_stage_config) {
        if (user.data_stage.id_stage_current < end_stage_config.stage_id) {
          user.data_stage.id_stage_current += 1;
          user.data_stage.time_survived = 0;
          user.data_stage.end_stage = false;
          user.data_stage.id_stage_select = user.data_stage.id_stage_current;

          if (user.data_stage.end_reward) {
            user.data_stage.end_reward = false;
            user.data_stage.id_stage_reward += 1;
            user.data_stage.current_reward = 0;
          }
        }

        if (user.starter_pack_expiry && user.starter_pack_expiry < moment().unix()) {
          user.data_stage.last_time_survived = 0;
        }
        user.markModified("data_stage");
      }
    }

    // ABTEST
    let ab_test_segment = user.game_segment ? user.game_segment : "default";
    let game_version = user.game_version ? user.game_version : "default";
    let ab_config = await getABSegmentFunc(ab_test_segment, game_version);

    if (ab_config && ab_config.piggy_bank_rework) {
      if (user.piggy_bank.pack_id == 30001501) {
        user.piggy_bank.pack_id = 30001531;
        user.piggy_bank.current_gem = 480;
        user.piggy_bank.current_progress = 0;
        user.piggy_bank.current_value = 2;
      } else if (user.piggy_bank.pack_id == 30001502) {
        user.piggy_bank.pack_id = 30001532;
        user.piggy_bank.current_gem = 1000;
        user.piggy_bank.current_progress = 0;
        user.piggy_bank.current_value = 2;
      } else if (user.piggy_bank.pack_id == 30001503) {
        user.piggy_bank.pack_id = 30001533;
        user.piggy_bank.current_gem = 2400;
        user.piggy_bank.current_progress = 0;
        user.piggy_bank.current_value = 2;
      } else if (user.piggy_bank.pack_id == 30001504) {
        user.piggy_bank.pack_id = 30001534;
        user.piggy_bank.current_gem = 5000;
        user.piggy_bank.current_progress = 0;
        user.piggy_bank.current_value = 2;
      }
    } else {
      if (user.piggy_bank.pack_id == 30001531) {
        user.piggy_bank.pack_id = 30001501;
        user.piggy_bank.current_gem = 160;
        user.piggy_bank.current_progress = 0;
        user.piggy_bank.current_value = 2;
      } else if (user.piggy_bank.pack_id == 30001532) {
        user.piggy_bank.pack_id = 30001502;
        user.piggy_bank.current_gem = 1000;
        user.piggy_bank.current_progress = 0;
        user.piggy_bank.current_value = 2;
      } else if (user.piggy_bank.pack_id == 30001533) {
        user.piggy_bank.pack_id = 30001503;
        user.piggy_bank.current_gem = 2400;
        user.piggy_bank.current_progress = 0;
        user.piggy_bank.current_value = 2;
      } else if (user.piggy_bank.pack_id == 30001534) {
        user.piggy_bank.pack_id = 30001504;
        user.piggy_bank.current_gem = 5000;
        user.piggy_bank.current_progress = 0;
        user.piggy_bank.current_value = 2;
      }
    }

    await user.save();

    // ====================================

    const login_time = Date.now();

    redisSetTrackingCommonColumns(user._id, {
      device_id,
      adid,
      ab_test_segment,
      os,
      os_version,
      client_version,
      tracker_name,
      network,
      campaign,
      adgroup,
      creative,
      locale,
      timezone_offset,
      login_time,
    });

    // user
    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...user.getInfo(),
      jwt_token: user.jwt_token,
      login_session_id,
    });
  }

  return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.INVALID_CREDENTIALS);
};

const loginGuest = async (req, res, next) => {
  try {
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, "Lock!");

    // Get user input
    const { userId, password, version } = req.body;

    // Validate user input
    if (!userId) {
      if (!password) {
        return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_EMAIL_PASSWORD);
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const seq_id = await Counter.getNextValue("users_count");
      // Create user in our database
      const new_user = await User.create({
        seq_id,
        password: encryptedPassword,
        account_type: "guest",
      });

      if (new_user) {
        // // FIXME: TEST HERE
        // recordUserLevel(user._id, 1);
        // recordUserClearXStage(user._id, 1000000);

        // Create token
        let login_session_id = uuidv4();

        const jwt_token = jwt.sign({ user_id: new_user._id, account_type: "guest", version, login_session_id }, jwt_config.secretKey, {
          expiresIn: jwt_config.expiresIn,
        });
        // save user token
        new_user.jwt_token = jwt_token;

        // FIRST_TIME_LOGIN
        if (new_user.is_first_time_login === true) {
          const first_time_user = await User.findByIdAndUpdate(new_user._id, { is_first_time_login: false }, { new: true });
        }

        //  return user

        // EVENT
        recordEventLogin(new_user);

        return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
          ...new_user.getInfo(),
          jwt_token: new_user.jwt_token,
          login_session_id,
        });
      }

      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.AUTHENTICATION_ERROR, Message.INVALID_CREDENTIALS);
    }

    // Validate if user exist in our database
    const user = await User.findById(userId);

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.account_type === "guest") {
        // Create token

        let login_session_id = uuidv4();

        const jwt_token = jwt.sign({ user_id: user._id, account_type: "guest", version, login_session_id }, jwt_config.secretKey, {
          expiresIn: jwt_config.expiresIn,
        });
        // save user token
        user.jwt_token = jwt_token;

        // FIRST_TIME_LOGIN
        if (user.is_first_time_login === true) {
          const first_time_user = await User.findByIdAndUpdate(user._id, { is_first_time_login: false }, { new: true });
        }

        // EVENT
        recordEventLogin(user);

        //  return user
        return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
          ...user.getInfo(),
          jwt_token: user.jwt_token,
          login_session_id,
        });
      } else {
        return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.AUTHENTICATION_ERROR, Message.GUEST_ONLY);
      }
    }
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.AUTHENTICATION_ERROR, Message.INVALID_CREDENTIALS);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.AUTHENTICATION_ERROR, Message.INVALID_CREDENTIALS);
  }
};

const loginGaia = async (req, res, next) => {
  let respondSend = false;
  try {
    // Get user input
    const {
      gaiaToken,
      version,
      device_id = "",
      adid = "",
      ab_test_segment = "",
      os = "",
      os_version = "",
      client_version = "",
      tracker_name = "",
      network = "",
      campaign = "",
      adgroup = "",
      creative = "",
      locale = "",
      timezone_offset = "",

      ip_address = "",
      country = "",
      state = "",
      city = "",
      device_name = "",
      language = "",
      login_type = "",
      context_id = "",
    } = req.body;

    let new_user;
    let gaiaData;
    if ((!gaiaToken && !device_id) || !version) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_GAIA);
    }

    if (gaiaToken) {
      // ============== GAIA =============
      // /oauth/token
      let gaia_api = await axios.get(`${process.env.GAIA_URL}/oauth/token`, {
        headers: {
          "x-client-id": process.env.GAIA_CLIENT_ID,
          "x-client-secret": process.env.GAIA_CLIENT_SECRET,
          Authorization: `Bearer ${gaiaToken}`,
        },
      });

      // GAIA_CLIENT_ID
      // GAIA_CLIENT_SECRET

      // console.log(gaia_api);
      if (!gaia_api.data.id) {
        return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_GAIA);
      }

      gaiaData = gaia_api.data;

      new_user = await User.findOne({ "gaia.id": gaiaData.id, is_deleted: { $in: [false, null] } });

      if (!new_user) {
        new_user = await User.findOne({ device_id: device_id, is_deleted: { $in: [false, null] } });

        // override real gaia.id
        if (new_user && gaiaData) {
          new_user.gaia = gaiaData;
          new_user.markModified("gaia");
        }
      }

      // ============== GAIA END =============
    } else if (device_id) {
      console.log("Login by device id", device_id);

      let fake_gaia_id = "device_id_" + device_id;
      gaiaData = {
        id: fake_gaia_id,
        state: "GUEST",
        nickname: null,
        profileImage: null,
        restriction: null,
        registeredDate: "2000-05-22T01:00:00.000Z",
        currentAuthentication: {
          id: fake_gaia_id,
          appId: "SurvivalHero",
          state: "JOINED",
          idType: "GUEST",
          deviceType: "ANDROID",
          identifier: null,
          restriction: null,
          registeredDate: "2000-05-22T01:00:00.000Z",
        },
      };

      new_user = await User.findOne({ device_id: device_id, is_deleted: { $in: [false, null] } });

      // TODO: select all
    } else {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_GAIA);
    }

    if (!new_user) {
      const seq_id = await Counter.getNextValue("users_count");
      // Create user in our database
      // TODO: Tracking.

      let temp_silver_key = 1;
      let temp_gold_key = 0;

      // if (version != "1.0.54" && version != "1.0.55" && version != "1.0.56") {
      //   temp_silver_key = 0;
      //   temp_gold_key = 1;
      // }

      console.log("SEGMENT_LOGIN ab_test_segment:", ab_test_segment);
      new_user = await User.create({
        seq_id,
        account_type: gaiaToken ? "GAIA" : "DEVICE_ID",
        gaia: gaiaData,
        login_count: 1,
        revive_token: 1,
        silver_key: temp_silver_key,
        gold_key: temp_gold_key,
        is_claim_segment: true,
        register_ts: moment().unix(),
        created_client_version: client_version,
        device_id,
        device_os: os,
        country,
        language,
        timezone_offset,
      });

      // Tracking
      trackingServerRegistration(gaiaData.id, device_id, new_user.register_ts, os, os_version, client_version, new_user.login_count, locale, timezone_offset);
    }

    console.log("Login Gaia: ", new_user.seq_id, "version", version);

    if (version == "1.0.59") {
      if (new_user.game_version == "1.0.54" || new_user.game_version == "1.0.55" || new_user.game_version == "1.0.56") {
        if (new_user.tutorial_step >= 15) {
          new_user.tutorial_step += 2;
        }
      }
    }

    // Create token
    // gaia_id: gaiaData.id

    let login_session_id = uuidv4();
    const jwt_token = jwt.sign({ user_id: new_user._id, account_type: "GAIA", version, gaia_id: gaiaData.id, login_session_id, ab_test_segment }, jwt_config.secretKey, {
      expiresIn: jwt_config.expiresIn,
    });
    // save user token
    new_user.jwt_token = jwt_token;

    new_user.login_count += 1;

    // device id
    if (device_id && new_user.device_id != device_id) {
      console.log("Update new devices id");
      new_user.device_id = device_id;
    }

    // Validate Subcription
    let lastLoginDate = await redisGetLoginDate(new_user._id);

    await recordEventLogin(new_user);

    let isSameDate = moment(moment(new Date()).format("YYYY-MM-DD")).isSame(moment.unix(lastLoginDate).format("YYYY-MM-DD"), "day");

    const monthly_card = new_user.subscriptions.find((item) => item.pack_id == Types.IapID.MONTHLY_CARD);
    const super_monthly_card = new_user.subscriptions.find((item) => item.pack_id == Types.IapID.SUPPER_MONTHLY_CARD);

    let bonus_quick_patrol = 0;
    let bonus_max_energy = 0;

    if (monthly_card) {
      if (monthly_card.expiry_date <= moment().unix()) {
        new_user.subscriptions.pull({ _id: monthly_card._id });
      } else {
        bonus_quick_patrol = monthly_card.bonus.find((item) => item.bonus_id == 2).value;

        if (!isSameDate) {
          new_user.limit_record.limit_energy_quick_patrol += bonus_quick_patrol;
        }
      }
    }

    if (super_monthly_card) {
      if (super_monthly_card.expiry_date <= moment().unix()) {
        new_user.subscriptions.pull({ _id: super_monthly_card._id });
        new_user.skip_ads = false;
        new_user.energy_data.max_energy_amount = 30;
      } else {
        bonus_quick_patrol = super_monthly_card.bonus.find((item) => item.bonus_id == 2).value;
        bonus_max_energy += super_monthly_card.bonus.find((item) => item.bonus_id == 3).value;
        new_user.energy_data.max_energy_amount = 30 + bonus_max_energy;
        if (!isSameDate) {
          new_user.limit_record.limit_energy_quick_patrol += bonus_quick_patrol;
        }
      }
    }

    // stage 5 quick_patrol = 3
    if (new_user.data_stage.id_stage_current >= 1000004) {
      if (!isSameDate) {
        new_user.limit_record.limit_energy_quick_patrol += 1;
      }
    }

    new_user.markModified("limit_record");
    new_user.markModified("subscriptions");

    // ====================================

    // check end stage when add new stage
    // ABTEST
    let abtest_segment = new_user.game_segment ? new_user.game_segment : "default";
    let game_version = new_user.game_version ? new_user.game_version : "default";
    let ab_config = await getABSegmentFunc(abtest_segment, game_version);

    let stage_config;
    if (ab_config && ab_config.chapter_9_min_2) {
      stage_config = await GameConfig.findOne({ name: "stages_9min_2", version: version });
      if (!stage_config) {
        stage_config = await alternateGameConfig("stages_9min_2");
      }
    } else if (ab_config && ab_config.chapter_9_min) {
      stage_config = await GameConfig.findOne({ name: "stages_9min", version: version });
      if (!stage_config) {
        stage_config = await alternateGameConfig("stages_9min");
      }
    } else {
      stage_config = await GameConfig.findOne({ name: "stage", version: version });
      if (!stage_config) {
        stage_config = await alternateGameConfig("stage");
      }
    }

    // ==== Case: version 1.0.26 don't have stage 4 config => revert to stage 3 ====
    const check_stage = stage_config.config.stages.find((item) => item.stage_id == new_user.data_stage.id_stage_current);
    if (!check_stage) {
      console.log("check_stage");
      new_user.data_stage.id_stage_current = 1000002;
      new_user.data_stage.id_stage_select = 1000002;
      new_user.data_stage.id_stage_reward = 1000002;
      new_user.data_stage.end_stage = true;
      new_user.markModified("data_stage");
    }
    // =============================

    if (new_user.data_stage.end_stage) {
      console.log("end stage");
      const end_stage_config = stage_config.config.stages.find((item) => item.last_stage);

      if (end_stage_config) {
        if (new_user.data_stage.id_stage_current < end_stage_config.stage_id) {
          new_user.data_stage.id_stage_current += 1;
          new_user.data_stage.time_survived = 0;
          new_user.data_stage.end_stage = false;
          new_user.data_stage.id_stage_select = new_user.data_stage.id_stage_current;

          if (new_user.data_stage.end_reward) {
            new_user.data_stage.end_reward = false;
            new_user.data_stage.id_stage_reward += 1;
            new_user.data_stage.current_reward = 0;
          }
        }

        new_user.markModified("data_stage");
      }
    }

    // Check gadget
    if (new_user.equipment.gadgets.length == 0) {
      const itemInfo = await GadgetInfo.findOne({ item_id: 2160007, item_current_rarity: 1 });

      new_user.equipment.gadgets.push({ ...itemInfo.getInfo() });

      new_user.markModified("equipment");
    }

    // FIRST_TIME_LOGIN
    if (new_user.is_first_time_login === true) {
      const first_time_user = await User.findByIdAndUpdate(new_user._id, { is_first_time_login: false }, { new: true });
    }

    const login_time = Date.now();

    redisSetTrackingCommonColumns(new_user._id, {
      device_id,
      adid,
      ab_test_segment,
      os,
      os_version,
      client_version,
      tracker_name,
      network,
      campaign,
      adgroup,
      creative,
      locale,
      timezone_offset,
      login_time,
    });

    // EVENT

    const total_spt = await redisGetTrackingTotalSpt(new_user.gaia.id);

    // Tracking
    trackingServerLogin(
      gaiaData.id,
      device_id,
      new_user.register_ts,
      os,
      os_version,
      client_version,
      new_user.login_count,
      total_spt,
      ab_test_segment,
      new_user.level,
      new_user.exp,
      new_user.lifetime_spend,
      new_user.purchase_count,
      new_user.paid_gold,
      new_user.free_gold,
      new_user.gold,
      new_user.paid_gem,
      new_user.free_gem,
      new_user.gem,
      locale,
      timezone_offset,
      ip_address,
      country,
      state,
      city,
      device_name,
      language,
      login_type,
      context_id
    );

    // return

    if (!respondSend) {
      respondSend = true;

      let temp = new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...new_user.getInfo(),
        jwt_token: new_user.jwt_token,
        login_session_id,
      });
    }

    console.log("Response Login: ", new_user.seq_id);

    await new_user.save();
    console.log("Save user: ", new_user.seq_id);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.AUTHENTICATION_ERROR, Message.INVALID_CREDENTIALS);
  }
};

module.exports = {
  loginEmail,
  loginGuest,
  loginGaia,
};
