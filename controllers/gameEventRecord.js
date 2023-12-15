const {
  redisGetAllUserEventIds,
  redisIncrUserAndEventRecord,
  redisSetUserAndEventRecord,
  redisSetLoginDate,
  redisGetLoginDate,
  redisSetMaxUserAndEventRecord,
  redisGetCurrentTime,
  redis,
  redisGetAllUserLiveOpsEventIds,
  redisIncrLiveOpsEventRecord,
} = require("../config/redisClient");
const Types = require("../config/types");
var moment = require("moment"); // require

// === record logic

const recordEventLogin = async (user) => {
  let lastLoginDate = await redisGetLoginDate(user._id);

  // console.log("- lastLoginDate", lastLoginDate);
  let isSameDate = moment(moment(new Date()).format("YYYY-MM-DD")).isSame(moment.unix(lastLoginDate).format("YYYY-MM-DD"), "day");

  // FAKE TIME
  // const isTEST = process.env.TRACKING_SERVICE === "dev" ? true : false;
  // if (isTEST) {
  //   let moment_now = await redisGetCurrentTime(user._id);
  //   isSameDate = moment(moment.unix(moment_now).format("YYYY-MM-DD")).isSame(moment.unix(lastLoginDate).format("YYYY-MM-DD"), "day");
  //   console.log("FAKE isSameDate", isSameDate, " - ", moment_now, lastLoginDate);
  //   await redisSetLoginDate(user._id, moment_now);
  // }

  // console.log("- isSameDate", isSameDate);

  if (!isSameDate) {
    // console.log("-  add Login Event");
    user.day_count += 1;
    await recordEvent(user._id, Types.EventTaskCondition.TASK_CONDITION_3_LOGIN_X_DAY, 1);

    // const running_live_ops = user.live_ops_events.filter((event) => {
    //   return event.event_start_value + event.event_expiry_value * 3600 > moment().unix() && event.event_start_value < moment().unix();
    // });

    // if (running_live_ops.length > 0) {
    //   for (const event of running_live_ops) {
    //     await recordLiveOpsEvent(user._id, event.event_id, Types.EventTaskCondition.TASK_CONDITION_3_LOGIN_X_DAY, 1);
    //   }
    // }
  }

  // if (!isTEST) {
  await redisSetLoginDate(user._id, moment().unix());
  // }
};

// Play
const recordPlayMainChapterStage = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_4_PLAY_MAIN_STAGE_X_TIMES, 1);
};

const recordPlayDailyStage = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_5_PLAY_DAILY_STAGE_X_TIMES, 1);
};

const recordPlayQuickPatrol = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_10_QUICK_PATROL_X_TIMES, 1);
};

const recordPlayDailyChallenge = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_26_JOIN_DAILY_CHALLENGE_X_TIMES, 1);
};

const recordClaimPatrol = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_9_CLAIM_PATROL_X_TIMES, 1);
};

const recordClaimGoldPatrol = async (userId, gold) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_22_GET_TOTAL_X_GOLD_FROM_PATROL, gold);
};

const recordDefeatEnemy = async (userId, enemy) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_14_DEFEAT_X_MONSTER, enemy);
};

const recordDefeatBoss = async (userId, boss) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_15_DEFEAT_X_BOSS, boss);
};

const recordClearTrialsStage = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_17_CLEAR_TRIALS_STAGE_X_TIMES, 1);
};

// Evolve
const recordUnlockTalents = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_27_UNLOCK_X_TALENT, 1);
};

const recordUnlockKeyEvo = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_39_COMPLETE_X_KEY_EVOLUTION, 1);
};

const recordPurchageEnergy = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_23_PURCHAGE_ENERGY_X_TIMES, 1);
};
// ==== Profile
const recordUserLevel = async (userId, currentLevel) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_2_REACH_LEVEL_X, currentLevel);
};

const recordUserClearXStage = async (userId, currentStage) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_1_CLEAR_STAGE_X, currentStage);
};

const recordUseXXGem = async (userId, gem) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_20_SPEND_X_GEMS, gem);
};

const recordClaimTotalGold = async (userId, gold) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_36_OBTAIN_TOTAL_OF_X_GOLD, gold);
};

const recordClaimTotalGem = async (userId, gem) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_37_OBTAIN_TOTAL_OF_X_GEM, gem);
};

// ======== Shop
const recordBuyShop = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_6_BUY_X_ITEMS_AT_SHOP, 1);
};

const recordOpenSupplyCrate = async (userId, amount) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_8_OPEN_X_CHEST, amount);
};

const recordBuyIAP = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_12_PURCHAGE_IAP_X_TIMES, 1);
};

const recordBuyDailyShop = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_16_PURCHASE_DAILY_SHOP_X_TIMES, 1);
};

const recordOpenSCrate = async (userId, amount) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_38_OPEN_X_EXECUTIVE_CREATE_OR_S_GRADE, amount);
};

// =========Equipment
const recordEnchaneEquipmentXTime = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_7_ENHANCE_EQUIPMENT_X_TIMES, 1);
};

const recordMergeEquipmentXTime = async (userId) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_13_MERGE_EQUIPMENT_X_TIMES, 1);
};

const recordEquipLvlX = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_21_EQUIP_LVL_X_1_SLOT, value);
};

const recordEquipAllLvlX = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_24_EQUIP_LVL_X_ALL_SLOT, value);
};

const recordEquip28XRare = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_28_GET_A_EQUIPMENT_AT_X_RARE, value);
};
const recordEquip29TotalXEquipment = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_29_GET_TOTAL_OF_X_EQUIPMENT, value);
};
const recordEquip30GetXOutfit = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_30_GET_X_OUTFIT, value);
};
const recordEquip31XAboveNormalRare = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_31_EQUIP_X_ABOVE_NORMAL_RARE, value);
};
const recordEquip32XAboveGoodRare = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_32_EQUIP_X_ABOVE_GOOD_RARE, value);
};
const recordEquip33XAboveBetterRare = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_33_EQUIP_X_ABOVE_BETTER_RARE, value);
};
const recordEquip34XAboveExcellentRare = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_34_EQUIP_X_ABOVE_EXCELLENT_RARE, value);
};
const recordEquip35XAboveEpicRare = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_35_EQUIP_X_ABOVE_EPIC_RARE, value);
};

const recordTotalXGadget = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_25_GET_TOTAL_OF_X_TECH_PARTS, value);
};

const recordEquip40AllNormalRare = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_40_WEAR_FULL_NORMAL, value);
};

const recordEquip41AllGoodRare = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_41_WEAR_FULL_GOOD, value);
};

const recordEquip42AllBetterRare = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_42_WEAR_FULL_BETTER, value);
};

const recordEquip43AllExcellentRare = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_43_WEAR_FULL_EXCELLENT, value);
};

const record45Reached3MinChapterX = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_45_REACHED_3_MIN_CHAPTER_X, value);
};

const record46Reached6MinChapterX = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_46_REACHED_6_MIN_CHAPTER_X, value);
};

const record47CompleteXDailyTask = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_47_COMPLETE_X_DAILY_TASK, value);
};

const record48ClearTrialX = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_48_CLEAR_TRIAL_X, value);
};

const record49EvoAnySkillXTime = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_49_EVO_ANY_SKILL_X_TIME, value);
};

const record50UseWeaponPlayStage1Time = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_50_USE_X_TO_PLAY_STAGE_1_TIME, value);
};

const record51UseWeaponClearStage = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_51_CLEAR_STAGE_WITH_X, value);
};

const record52EvolveSkills = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_52_EVOLVE_X_SKILLS, value);
};

const record53EvolveSkill = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_53_EVOLVE_SKILL_X, value);
};

const record54ReachedAtk = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_54_REACHED_X_ATK, value);
};

const record55GetGadgetRarity = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_55_GET_GADGET_RARITY_X, value);
};

const record56EquipmentSEquipment = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_56_EQUIP_X_S_EQUIPMENT, value);
};

const record57GetWeaponRarity = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_57_GET_WEAPON_RARITY_X, value);
};

const record58ClearStageNoHit = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_58_CLEAR_STAGE_NO_HIT, value);
};

const record59OpenOfficerCrate = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_59_OPEN_X_OFFICER_CRATE, value);
};

const record60KillBossMainStageByWeapon = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_60_KILL_BOSS_MAIN_STAGE_WEAPON_X, value);
};

const record62PlayChapter = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_62_PLAY_CHAPTER_X_1_TIME, value);
};

const record63UpgradeEquipment = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_63_UPGRADE_EQUIPMENT_X_TIME, value);
};

const record64Get5StarSkill = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_64_GET_5_STAR_SKILL_X, value);
};

const record65UpgradeLevelEquipment = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_65_UPGRADE_EQUIPMENT_TO_LEVEL_X, value);
};

const record66DefeatElite = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_66_DEFEAT_X_ELITE, value);
};

const record67DefeatBoss = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_67_DEFEAT_X_BOSS, value);
};

const record68OpenSCrate = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_68_OPEN_S_CRATE_X_TIME, value);
};

const record69ClaimDailyMileStone = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_69_CLAIM_DAILY_MILESTONE_X_TIME, value);
};

const record70UseBomb = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_70_USE_POWER_UP_BOMB_X_TIME, value);
};

const record71DefeatEliteWithCrossbow = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_71_DEFEAT_X_ELITE_BY_CROSSBOW, value);
};

const record72DefeatMobWithRevolver = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_72_DEFEAT_X_MOB_BY_REVOLVER, value);
};

const record73DefeatMobWithCrossbow = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_73_DEFEAT_X_MOB_BY_CROSSBOW, value);
};

const record74UseExcellentEquipmentPlayChapter = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_74_USE_EXCELLENT_EQUIPMENT_PLAY_CHAPTER_X, value);
};

const record75MergeGadget = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_75_MERGE_GADGET_X_TIME, value);
};

const record76SpendGemOpenChest = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_76_SPEND_TOTAL_X_GEM_OPEN_CHEST, value);
};

const record77UseSEquipment = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_77_USE_S_EQUIPMENT_IN_BATTLE, value);
};

const record78EarnExcellent1Weapon = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_78_EARN_X_EXCELLENT_1_WEAPON, value);
};

const record79UseActiveSkill = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_79_USE_X_ACTIVE_SKILL_IN_BATTLE, value);
};

const record80DefeatEliteWithMachette = async (userId, value) => {
  await recordEvent(userId, Types.EventTaskCondition.TASK_CONDITION_80_DEFEAT_X_ELITE_BY_MACHETTE, value);
};

// =====================
// SAVE Record
const recordEvent = async (userId, condition, value) => {
  if (!userId || !value || !condition) {
    return;
  }

  let eventIdArray = await redisGetAllUserEventIds(userId);

  switch (condition) {
    case Types.EventTaskCondition.TASK_CONDITION_0_NONE:
      break;
    case Types.EventTaskCondition.TASK_CONDITION_1_CLEAR_STAGE_X:
      await redisSetMaxUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_2_REACH_LEVEL_X:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_3_LOGIN_X_DAY:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_4_PLAY_MAIN_STAGE_X_TIMES:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_5_PLAY_DAILY_STAGE_X_TIMES:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_6_BUY_X_ITEMS_AT_SHOP:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_7_ENHANCE_EQUIPMENT_X_TIMES:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_8_OPEN_X_CHEST:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_9_CLAIM_PATROL_X_TIMES:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_10_QUICK_PATROL_X_TIMES:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_11_JOIN_DAILY_CHALLENGE_X_TIMES:
      break;
    case Types.EventTaskCondition.TASK_CONDITION_12_PURCHAGE_IAP_X_TIMES:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_13_MERGE_EQUIPMENT_X_TIMES:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_14_DEFEAT_X_MONSTER:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_15_DEFEAT_X_BOSS:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_16_PURCHASE_DAILY_SHOP_X_TIMES:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_17_CLEAR_TRIALS_STAGE_X_TIMES:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_18_GET_TOTAL_X_EXCELLENT_EQUIPMENT:
      break;
    case Types.EventTaskCondition.TASK_CONDITION_19_GET_A_TECH_PART_AT_RARE_X:
      break;
    case Types.EventTaskCondition.TASK_CONDITION_20_SPEND_X_GEMS:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_21_EQUIP_LVL_X_1_SLOT:
      await redisSetMaxUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_22_GET_TOTAL_X_GOLD_FROM_PATROL:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_23_PURCHAGE_ENERGY_X_TIMES:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_24_EQUIP_LVL_X_ALL_SLOT:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_25_GET_TOTAL_OF_X_TECH_PARTS:
      await redisSetMaxUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_26_JOIN_DAILY_CHALLENGE_X_TIMES:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_27_UNLOCK_X_TALENT:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_28_GET_A_EQUIPMENT_AT_X_RARE:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_29_GET_TOTAL_OF_X_EQUIPMENT:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_30_GET_X_OUTFIT:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_31_EQUIP_X_ABOVE_NORMAL_RARE:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_32_EQUIP_X_ABOVE_GOOD_RARE:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_33_EQUIP_X_ABOVE_BETTER_RARE:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_34_EQUIP_X_ABOVE_EXCELLENT_RARE:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_35_EQUIP_X_ABOVE_EPIC_RARE:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_36_OBTAIN_TOTAL_OF_X_GOLD:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_37_OBTAIN_TOTAL_OF_X_GEM:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_38_OPEN_X_EXECUTIVE_CREATE_OR_S_GRADE:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_39_COMPLETE_X_KEY_EVOLUTION:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_40_WEAR_FULL_NORMAL:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_41_WEAR_FULL_GOOD:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_42_WEAR_FULL_BETTER:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_43_WEAR_FULL_EXCELLENT:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;

    case Types.EventTaskCondition.TASK_CONDITION_45_REACHED_3_MIN_CHAPTER_X:
      await redisSetMaxUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_46_REACHED_6_MIN_CHAPTER_X:
      await redisSetMaxUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_47_COMPLETE_X_DAILY_TASK:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_48_CLEAR_TRIAL_X:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_49_EVO_ANY_SKILL_X_TIME:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_50_USE_X_TO_PLAY_STAGE_1_TIME:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_51_CLEAR_STAGE_WITH_X:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_52_EVOLVE_X_SKILLS:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_53_EVOLVE_SKILL_X:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_54_REACHED_X_ATK:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_55_GET_GADGET_RARITY_X:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_56_EQUIP_X_S_EQUIPMENT:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_57_GET_WEAPON_RARITY_X:
      await redisSetMaxUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_58_CLEAR_STAGE_NO_HIT:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_59_OPEN_X_OFFICER_CRATE:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_60_KILL_BOSS_MAIN_STAGE_WEAPON_X:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_62_PLAY_CHAPTER_X_1_TIME:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_63_UPGRADE_EQUIPMENT_X_TIME:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_64_GET_5_STAR_SKILL_X:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_65_UPGRADE_EQUIPMENT_TO_LEVEL_X:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_66_DEFEAT_X_ELITE:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_67_DEFEAT_X_BOSS:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_68_OPEN_S_CRATE_X_TIME:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_69_CLAIM_DAILY_MILESTONE_X_TIME:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_70_USE_POWER_UP_BOMB_X_TIME:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_71_DEFEAT_X_ELITE_BY_CROSSBOW:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_72_DEFEAT_X_MOB_BY_REVOLVER:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_73_DEFEAT_X_MOB_BY_CROSSBOW:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_74_USE_EXCELLENT_EQUIPMENT_PLAY_CHAPTER_X:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_75_MERGE_GADGET_X_TIME:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_76_SPEND_TOTAL_X_GEM_OPEN_CHEST:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_77_USE_S_EQUIPMENT_IN_BATTLE:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_78_EARN_X_EXCELLENT_1_WEAPON:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_79_USE_X_ACTIVE_SKILL_IN_BATTLE:
      await redisSetUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    case Types.EventTaskCondition.TASK_CONDITION_80_DEFEAT_X_ELITE_BY_MACHETTE:
      await redisIncrUserAndEventRecord(userId, eventIdArray, condition, value);
      break;
    default:
      break;
  }
};

// Init Record
// const recordInit = async (userId) => {
//     await redisSetLoginDate(userId);
//   };

module.exports = {
  //   recordEvent,
  recordEventLogin,
  recordPlayMainChapterStage,
  recordPlayDailyStage,
  recordPlayQuickPatrol,
  recordPlayDailyChallenge,
  recordClaimPatrol,
  recordClaimGoldPatrol,
  recordDefeatEnemy,
  recordDefeatBoss,
  recordClearTrialsStage,
  recordUnlockTalents,
  recordUnlockKeyEvo,
  recordPurchageEnergy,
  recordUserClearXStage,
  recordUseXXGem,
  recordClaimTotalGold,
  recordClaimTotalGem,
  recordUserLevel,
  recordBuyShop,
  recordOpenSupplyCrate,
  recordBuyIAP,
  recordBuyDailyShop,
  recordOpenSCrate,
  recordEnchaneEquipmentXTime,
  recordMergeEquipmentXTime,
  recordEquipLvlX,
  recordEquipAllLvlX,
  recordTotalXGadget,
  recordEquip28XRare,
  recordEquip29TotalXEquipment,
  recordEquip30GetXOutfit,
  recordEquip31XAboveNormalRare,
  recordEquip32XAboveGoodRare,
  recordEquip33XAboveBetterRare,
  recordEquip34XAboveExcellentRare,
  recordEquip35XAboveEpicRare,
  recordEquip40AllNormalRare,
  recordEquip41AllGoodRare,
  recordEquip42AllBetterRare,
  recordEquip43AllExcellentRare,

  record45Reached3MinChapterX,
  record46Reached6MinChapterX,
  record47CompleteXDailyTask,
  record48ClearTrialX,
  record49EvoAnySkillXTime,

  record50UseWeaponPlayStage1Time,
  record51UseWeaponClearStage,
  record52EvolveSkills,
  record53EvolveSkill,
  record54ReachedAtk,
  record55GetGadgetRarity,
  record56EquipmentSEquipment,
  record57GetWeaponRarity,
  record58ClearStageNoHit,
  record59OpenOfficerCrate,
  record60KillBossMainStageByWeapon,

  record62PlayChapter,
  record63UpgradeEquipment,
  record64Get5StarSkill,
  record65UpgradeLevelEquipment,
  record66DefeatElite,
  record67DefeatBoss,
  record68OpenSCrate,
  record69ClaimDailyMileStone,
  record70UseBomb,
  record71DefeatEliteWithCrossbow,
  record72DefeatMobWithRevolver,
  record73DefeatMobWithCrossbow,
  record74UseExcellentEquipmentPlayChapter,
  record75MergeGadget,
  record76SpendGemOpenChest,
  record77UseSEquipment,
  record78EarnExcellent1Weapon,
  record79UseActiveSkill,
  record80DefeatEliteWithMachette,
};
