const Redis = require("ioredis");
const { v4: uuidv4 } = require("uuid");
var moment = require("moment"); // require
const redis = new Redis({
  port: 6379, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  // username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

// const redisClient = asyncRedis.createClient(6379, process.env.REDIS_HOST,{ no_ready_check: true,
//     auth_pass: process.env.REDIS_PASSWORD, }); //creates a new redis client

const USER_RECORD = "user_record:";
const EVENT_RECORD = "event_record:";
const USER_EVENT = "user_event:";
const LIVE_OPS_LOTTERY_RECORD = "live_ops_lottery_record:";
const LOGIN_DATE = "login_date:";
const CURRENT_TIME = "current_time:";
const GAME_VERSION = "game_version:";
const GAME_CONFIG = "game_config:";
const TRACKING_COMMON = "tracking_common:";
const TRACKING_TOTAL_SPT = "tracking_total_spt:";
const ERROR_RECORD = "error_record:";
const DAILY_DISCOUNT = "daily_discount:";
const DAILY_DISCOUNT_REWORK = "daily_discount_rework:";
const TOTAL_DAYS_PURCHASE = "total_days_purchase:";
const TOTAL_DAYS_PURCHASE_REWORK = "total_days_purchase_rework:";
const IAP_VALUE_PACK = "iap_value_pack:";
const BUFF_DAILY_CHALLENGE = "buff_daily_challenge:";

redis.on("connect", function () {
  console.log("Redis connected");
});

redis.on("close", function () {
  console.log("Redis closed");
});

redis.on("error", function (err) {
  console.log("Redis went wrong " + err);
});

// ============================================

let redisAddUserEventId = async (userId, eventId) => {
  try {
    let key = USER_EVENT + userId;
    await redis.sadd(key, eventId);
  } catch (err) {
    console.log(err);
  }
};

let redisGetAllUserEventIds = async (userId) => {
  try {
    let key = USER_EVENT + userId;
    return await redis.smembers(key);
  } catch (err) {
    console.log(err);
    return null;
  }
};

let redisRemoveUserEventId = async (userId, eventId) => {
  try {
    let key = USER_EVENT + userId;
    await redis.srem(key, eventId);
  } catch (err) {
    console.log(err);
  }
};

// ============================================
// User Record
let redisSetUserRecords = async (userId, field, value) => {
  try {
    let key = USER_RECORD + userId;
    await redis.hset(key, field, value);
  } catch (err) {
    console.log(err);
  }
};

let redisGetAllUserRecords = async (userId) => {
  try {
    let key = USER_RECORD + userId;
    return await redis.hgetall(key);
  } catch (err) {
    console.log(err);
    return null;
  }
};

let redisIncrUserRecord = async (userId, field, increment) => {
  try {
    let key = USER_RECORD + userId;
    await redis.hincrby(key, field, increment);
  } catch (err) {
    console.log(err);
  }
};

// ============================================
// User Event Record
let redisSetUserEventRecords = async (userId, eventId, field, value) => {
  try {
    let key = EVENT_RECORD + userId + "_" + eventId;
    await redis.hset(key, field, value);
  } catch (err) {
    console.log(err);
  }
};

let redisGetAllUserEventRecords = async (userId, eventId) => {
  try {
    let key = EVENT_RECORD + userId + "_" + eventId;
    return await redis.hgetall(key);
  } catch (err) {
    console.log(err);
    return null;
  }
};

let redisIncrUserEventRecord = async (userId, eventId, field, increment) => {
  try {
    let key = EVENT_RECORD + userId + "_" + eventId;
    await redis.hincrby(key, field, increment);
  } catch (err) {
    console.log(err);
  }
};

// User Event Record
let redisRemoveUserEventRecords = async (userId, eventId) => {
  try {
    let key = EVENT_RECORD + userId + "_" + eventId;
    await redis.del(key);
  } catch (err) {
    console.log(err);
  }
};

// ============================================
let redisSetUserAndEventRecord = async (userId, eventIdArray, field, value) => {
  try {
    await redisSetUserRecords(userId, field, value);
    for (let eventId of eventIdArray) {
      await redisSetUserEventRecords(userId, eventId, field, value);
    }
  } catch (err) {
    console.log(err);
  }
};

let redisIncrUserAndEventRecord = async (userId, eventIdArray, field, increment) => {
  try {
    await redisIncrUserRecord(userId, field, increment);
    for (let eventId of eventIdArray) {
      await redisIncrUserEventRecord(userId, eventId, field, increment);
    }
  } catch (err) {
    console.log(err);
  }
};

let redisSetMaxUserAndEventRecord = async (userId, eventIdArray, field, value) => {
  try {
    let keyUser = USER_RECORD + userId;

    let userMax = await redis.hget(keyUser, field);
    userMax = userMax ? userMax : 0;

    if (userMax < value) {
      await redisSetUserRecords(userId, field, value);
    }

    for (let eventId of eventIdArray) {
      let keyEent = EVENT_RECORD + userId + "_" + eventId;
      let eventMax = await redis.hget(keyEent, field);
      eventMax = eventMax ? eventMax : 0;
      if (eventMax < value) {
        await redisSetUserEventRecords(userId, eventId, field, value);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// ==== EVENT ONLY=============================

// let redisSetMinUserAndEventRecord = async (userId, eventIdArray, field, value) => {
//   try {
//     let keyUser = USER_RECORD + userId;

//     let userMin = await redis.hget(keyUser, field);
//     userMin = userMin ? userMin : 0;

//     if (userMin > value) {
//       await redisSetUserRecords(userId, field, value);
//     }

//     for (let eventId of eventIdArray) {
//       let keyEent = EVENT_RECORD + userId + "_" + eventId;
//       let eventMax = await redis.hget(keyEent, field);
//       eventMax = eventMax ? eventMax : 0;
//       if (eventMax > value) {
//         await redisSetUserEventRecords(userId, eventId, field, value);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// ==================== HELPER ========================
let redisSetLoginDate = async (userId, timestamp) => {
  try {
    let key = LOGIN_DATE + userId;
    // let timestamp = moment().unix();
    await redis.set(key, timestamp);
  } catch (err) {
    console.log(err);
  }
};

let redisGetLoginDate = async (userId) => {
  try {
    let key = LOGIN_DATE + userId;
    let timestamp = await redis.get(key);
    return timestamp ? parseInt(timestamp) : moment().unix() - 84600;
  } catch (err) {
    console.log(err);
  }
};

// =================== CURRENT TIME =====================

let redisSetCurrentTime = async (userId, time) => {
  try {
    let key = CURRENT_TIME + userId;
    let timestamp = time;
    await redis.set(key, timestamp);
  } catch (err) {
    console.log(err);
  }
};

let redisGetCurrentTime = async (userId) => {
  try {
    let key = CURRENT_TIME + userId;
    let timestamp = await redis.get(key);

    if (!timestamp) {
      timestamp = moment().unix();
      await redisSetCurrentTime(userId, timestamp);
    }

    console.log("redisGetCurrentTime:", timestamp);

    return parseInt(timestamp);
  } catch (err) {
    console.log(err);
  }
};

// ============================================

let redisGetGameVersion = async (client_id) => {
  let key = GAME_VERSION + client_id;
  const game_version = await redis.call("JSON.GET", key, "$");
  return JSON.parse(game_version);
};

let redisSetGameVersion = async (client_id, data) => {
  let key = GAME_VERSION + client_id;
  await redis.call("JSON.SET", key, "$", JSON.stringify(data));
};

// ============================================

let redisGetGameConfig = async (name, version) => {
  let key = GAME_CONFIG + name + "_" + version;
  // const game_config = await redis.call("JSON.GET", key, "$");
  const game_config = await redis.get(key);
  return JSON.parse(game_config);
};

let redisSetGameConfig = async (name, version, data) => {
  let key = GAME_CONFIG + name + "_" + version;
  // await redis.call("JSON.SET", key, "$", JSON.stringify(data));
  await redis.set(key, JSON.stringify(data));
};

let redisGetMultiGameConfig = async (configs) => {
  const allKeys = await redis.keys("game_config:*");

  let keys = [];

  for (const config of configs) {
    if (!allKeys.includes(GAME_CONFIG + config.name + "_" + config.version)) {
      config.version = "default";
    }

    let key = GAME_CONFIG + config.name + "_" + config.version;

    keys.push(key);
  }

  let result = [];
  const game_config = await redis.mget(...keys);

  for (const config of game_config) {
    result.push(JSON.parse(config));
  }
  return result;
};

let redisSetMultiGameConfig = async (objectConfig) => {
  await redis.mset(objectConfig);
};

let redisSetTrackingCommonColumns = async (user_id, objectCommon) => {
  const key = TRACKING_COMMON + user_id;
  await redis.set(key, JSON.stringify(objectCommon));
};

let redisGetTrackingCommonColumns = async (user_id) => {
  const key = TRACKING_COMMON + user_id;
  let common_column = await redis.get(key);

  if (!common_column) {
    return {
      device_id: "",
      adid: "",
      ab_test_segment: "",
      os: "",
      os_version: "",
      client_version: "",
      tracker_name: "",
      network: "",
      campaign: "",
      adgroup: "",
      creative: "",
      locale: "",
      timezone_offset: "",
      login_time: Date.now(),
    };
  }
  return JSON.parse(common_column);
};

let redisSetTrackingTotalSpt = async (user_id, spt) => {
  const key = TRACKING_TOTAL_SPT + user_id;
  return await redis.hincrby(key, "total_spt", spt);
};

let redisGetTrackingTotalSpt = async (user_id) => {
  const key = TRACKING_TOTAL_SPT + user_id;
  return await redis.hget(key, "total_spt");
};

let redisSetLastTracking = async (user_id, last_tracking) => {
  const key = TRACKING_TOTAL_SPT + user_id;
  await redis.hset(key, "last_tracking", last_tracking);
};

let redisGetLastTracking = async (user_id) => {
  const key = TRACKING_TOTAL_SPT + user_id;
  const last_tracking = await redis.hget(key, "last_tracking");
  return last_tracking ? parseInt(last_tracking) : Date.now();
};

let redisLogError = async (error) => {
  try {
    let error_id = uuidv4();

    let key = ERROR_RECORD + error_id;

    await redis.set(key, error, "EX", 864000);
  } catch (err) {
    console.log(err);
  }
};

let redisSetDailyDiscount = async (user_id, pack_id, last_day_buy) => {
  const key = DAILY_DISCOUNT + user_id;
  await redis.hset(key, pack_id, last_day_buy);
};

let redisGetDailyDiscount = async (user_id, field) => {
  const key = DAILY_DISCOUNT + user_id;
  return await redis.hget(key, field);
};

let redisSetDailyDiscountRework = async (user_id, pack_id, last_day_buy) => {
  const key = DAILY_DISCOUNT_REWORK + user_id;
  await redis.hset(key, pack_id, last_day_buy);
};

let redisGetDailyDiscountRework = async (user_id, field) => {
  const key = DAILY_DISCOUNT_REWORK + user_id;
  return await redis.hget(key, field);
};

let redisGetAllDailyDiscount = async (user_id) => {
  const key = DAILY_DISCOUNT + user_id;
  return await redis.hgetall(key);
};

let redisSetTotalDaysPurchase = async (user_id, day_buy) => {
  const key = DAILY_DISCOUNT + user_id;
  await redis.hset(key, "total_days", day_buy);
};

let redisGetAllDailyDiscountRework = async (user_id) => {
  const key = DAILY_DISCOUNT_REWORK + user_id;
  return await redis.hgetall(key);
};

let redisSetTotalDaysPurchaseRework = async (user_id, day_buy) => {
  const key = DAILY_DISCOUNT_REWORK + user_id;
  await redis.hset(key, "total_days", day_buy);
};

let redisSetStatusTotalDays = async (user_id, total_day_purchased_config) => {
  const key = TOTAL_DAYS_PURCHASE + user_id;
  await redis.set(key, JSON.stringify(total_day_purchased_config));
};

let redisSetStatusTotalDaysRework = async (user_id, total_day_purchased_config) => {
  const key = TOTAL_DAYS_PURCHASE_REWORK + user_id;
  await redis.set(key, JSON.stringify(total_day_purchased_config));
};

let redisGetStatusTotalDays = async (user_id) => {
  const key = TOTAL_DAYS_PURCHASE + user_id;
  const config = await redis.get(key);
  return JSON.parse(config);
};

let redisGetStatusTotalDaysRework = async (user_id) => {
  const key = TOTAL_DAYS_PURCHASE_REWORK + user_id;
  const config = await redis.get(key);
  return JSON.parse(config);
};

let redisSetIapValuePack = async (user_id, field, value) => {
  const key = IAP_VALUE_PACK + user_id;
  await redis.hset(key, field, value);
};

let redisGetIapValuePack = async (user_id, field) => {
  const key = IAP_VALUE_PACK + user_id;
  let result = await redis.hget(key, field);

  if (result == "true") {
    result = true;
  } else if (result == "false") {
    result = false;
  }
  return result;
};

let redisSetIapValuePackNormal = async (user_id, field, value) => {
  const key = "equipment_quality:" + user_id;
  await redis.hset(key, field, value);
};

let redisSetIapValuePackExpiry = async (user_id, time) => {
  const key = "equipment_quality:" + user_id;
  await redis.expire(key, Number(time));
};

let redisGetIapValuePackExpiry = async (user_id, field) => {
  const key = "equipment_quality:" + user_id;
  let result = await redis.hget(key, field);

  if (result == "true") {
    result = true;
  } else if (result == "false") {
    result = false;
  }
  return result;
};

let redisSetBuffDailyChallenge = async (buff, debuff) => {
  const key = BUFF_DAILY_CHALLENGE + "all";
  const buff_debuff = [buff, debuff];
  await redis.set(key, JSON.stringify(buff_debuff));
};

let redisGetBuffDailyChallenge = async () => {
  const key = BUFF_DAILY_CHALLENGE + "all";
  const result = await redis.get(key);
  return JSON.parse(result);
};

let redisRemoveGameVersion = async (version) => {
  try {
    let key = GAME_VERSION + version;
    await redis.del(key);
  } catch (err) {
    console.log(err);
  }
};

let redisSetEventLottery = async (userId, field, value) => {
  try {
    let key = LIVE_OPS_LOTTERY_RECORD + userId;
    await redis.hset(key, field, value);
  } catch (err) {
    console.log(err);
  }
};

let redisGetEventLottery = async (userId, field) => {
  try {
    let key = LIVE_OPS_LOTTERY_RECORD + userId;
    return Number(await redis.hget(key, field));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  redisSetUserRecords,
  redisGetAllUserRecords,
  redisSetUserEventRecords,
  redisGetAllUserEventRecords,
  redisSetUserAndEventRecord,
  redisAddUserEventId,
  redisGetAllUserEventIds,
  redisRemoveUserEventId,
  redisIncrUserRecord,
  redisIncrUserEventRecord,
  redisIncrUserAndEventRecord,
  redisSetLoginDate,
  redisGetLoginDate,
  redisGetGameVersion,
  redisSetGameVersion,
  redisGetGameConfig,
  redisSetGameConfig,
  redisGetMultiGameConfig,
  redisSetMultiGameConfig,
  redisRemoveUserEventRecords,
  redisSetMaxUserAndEventRecord,
  redisSetTrackingCommonColumns,
  redisGetTrackingCommonColumns,
  redisSetTrackingTotalSpt,
  redisGetTrackingTotalSpt,
  redisSetLastTracking,
  redisGetLastTracking,
  redisSetCurrentTime,
  redisGetCurrentTime,
  redisLogError,
  redisSetDailyDiscount,
  redisGetDailyDiscount,
  redisSetDailyDiscountRework,
  redisGetDailyDiscountRework,
  redisGetAllDailyDiscount,
  redisSetTotalDaysPurchase,
  redisGetAllDailyDiscountRework,
  redisSetTotalDaysPurchaseRework,
  redisSetStatusTotalDays,
  redisGetStatusTotalDays,
  redisSetStatusTotalDaysRework,
  redisGetStatusTotalDaysRework,
  redisSetIapValuePack,
  redisGetIapValuePack,
  redisSetIapValuePackNormal,
  redisSetIapValuePackExpiry,
  redisGetIapValuePackExpiry,
  redisSetBuffDailyChallenge,
  redisGetBuffDailyChallenge,
  redisRemoveGameVersion,
  redisSetEventLottery,
  redisGetEventLottery,
  redis,
};
