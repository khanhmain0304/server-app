const Item = {
  NONE: "None",
  WEAPON: "Weapon",
  NECKLACE: "Necklace",
  GLOVES: "Gloves",
  ARMOR: "Armor",
  BELT: "Belt",
  SHOES: "Shoes",
};

const Content = {
  NONE: "None",
  EQUIPMENT: "Equipment",
  DESIGN: "Design",
  MATERIAL: "Material",
  REVIVE_TOKEN: "ReviveToken",
  GOLD: "Gold",
  GEM: "Gem",
  KEY: "Key",
  TASK_POINT: "TaskPoint",
  PATROL_GOLD: "PatrolGold",
  RANDOM_SCROLL: "RandomScroll",
  DNA: "Dna",
  EXP: "Exp",
  ENERGY: "Energy",

  BLUE_KEY: "Blue key",
  GOLD_KEY: "Gold Key",
  GADGET: "Gadget",
  EVENT_TOKEN: "EventToken",
  EVENT_TICKET: "EventTicket",
};

const Stat = {
  ATK: "Atk",
  HP: "Hp",
  ARMOR: "Armor",
  MEAT_HEAL: "MeatHeal",
  ENERGY: "Energy",
  EXP: "Exp",
  GOLD: "Gold",
  GEM: "Gem",
  DNA: "Dna",
  FREE: "Free",
  ADS: "Ads",
  IAP: "IAP",
  DESIGN: "Design",
  EQUIPMENT: "Equipment",
  MATERIAL: "Material",
  RANDOM_SCROLL: "Random Scroll",
  RANDOM_EQUIPMENT: "Random Equipment",
  GADGET: "Gadget",

  // Subcription

  MONTHLY_CARD: "MonthlyCard",
  SUPPER_MONTHLY_CARD: "SupperMonthlyCard",

  // Event
  KEY: "Key",
  TASK_POINT: "TaskPoint",
  PATROL_GOLD: "PatrolGold",
  REVIVE_TOKEN: "ReviveToken",

  // Design
  WEAPON_DESIGN: "WeaponDesign",
  ARMOR_DESIGN: "ArmorDesign",
  NECKLACE_DESIGN: "NecklaceDesign",
  BELT_DESIGN: "BeltDesign",
  GLOVES_DESIGN: "GlovesDesign",
  SHOES_DESIGN: "ShoesDesign",

  // EVENT_TYPE
  EVENTS_TYPE_ROOKIE_LOGIN_GIFTS: "RookieLoginGifts",
  EVENTS_TYPE_SERVER_LAUNCH_CHALLENGE: "ServerLaunchChallenge",
  EVENTS_TYPE_DAILIES: "Dailies",
  EVENTS_TYPE_WEEKLIES: "Weeklies",
  EVENTS_TYPE_ACHIVEMENT: "Achievement",
  EVENTS_TYPE_DAILY_REWARDS: "DailyRewards",
  EVENTS_TYPE_MAIN_QUEST: "MainQuest",
};

const Rarity = {
  NONE: 0,
  NORMAL: 1,
  GOOD: 2,
  BETTER: 3,
  EXCELLENT: 4,
  EXCELLENT_1: 5,
  EXCELLENT_2: 6,
  EPIC: 7,
  EPIC_1: 8,
  EPIC_2: 9,
  EPIC_3: 10,
  LEGEND: 11,
};

const Crate = {
  NORMAL: "Normal",
  EXCELLENT_ELITE: "Excellent/Elite",
  S: "S",
  BLUE: "blue",
  PURPLE: "purple",
};

const EventStartCondition = {
  START_CONDITION_0_NOW: 0,
  START_CONDITION_1_SCHEDULED: 1,
  EXPIRY_INFINITE: -1,
};

const EventSpecialCondition = {
  SPECIAL_CONDITION_0_NONE: 0,
  SPECIAL_CONDITION_1_CLEAR_STAGE: 1,
  SPECIAL_CONDITION_2_LEVEL: 2,
  SPECIAL_CONDITION_3_SPECIAL: 3,
  SPECIAL_CONDITION_4_DAILY_REWARD: 4,
};

const EventTaskCondition = {
  TASK_CONDITION_0_NONE: 0,
  TASK_CONDITION_1_CLEAR_STAGE_X: 1,
  TASK_CONDITION_2_REACH_LEVEL_X: 2,
  TASK_CONDITION_3_LOGIN_X_DAY: 3,
  TASK_CONDITION_4_PLAY_MAIN_STAGE_X_TIMES: 4,
  TASK_CONDITION_5_PLAY_DAILY_STAGE_X_TIMES: 5,
  TASK_CONDITION_6_BUY_X_ITEMS_AT_SHOP: 6,
  TASK_CONDITION_7_ENHANCE_EQUIPMENT_X_TIMES: 7,
  TASK_CONDITION_8_OPEN_X_CHEST: 8,
  TASK_CONDITION_9_CLAIM_PATROL_X_TIMES: 9,
  TASK_CONDITION_10_QUICK_PATROL_X_TIMES: 10,
  TASK_CONDITION_11_JOIN_DAILY_CHALLENGE_X_TIMES: 11,
  TASK_CONDITION_12_PURCHAGE_IAP_X_TIMES: 12,
  TASK_CONDITION_13_MERGE_EQUIPMENT_X_TIMES: 13,
  TASK_CONDITION_14_DEFEAT_X_MONSTER: 14,
  TASK_CONDITION_15_DEFEAT_X_BOSS: 15,
  TASK_CONDITION_16_PURCHASE_DAILY_SHOP_X_TIMES: 16,
  TASK_CONDITION_17_CLEAR_TRIALS_STAGE_X_TIMES: 17,
  TASK_CONDITION_18_GET_TOTAL_X_EXCELLENT_EQUIPMENT: 18,
  TASK_CONDITION_19_GET_A_TECH_PART_AT_RARE_X: 19,
  TASK_CONDITION_20_SPEND_X_GEMS: 20,
  TASK_CONDITION_21_EQUIP_LVL_X_1_SLOT: 21,
  TASK_CONDITION_22_GET_TOTAL_X_GOLD_FROM_PATROL: 22,
  TASK_CONDITION_23_PURCHAGE_ENERGY_X_TIMES: 23,
  TASK_CONDITION_24_EQUIP_LVL_X_ALL_SLOT: 24,
  TASK_CONDITION_25_GET_TOTAL_OF_X_TECH_PARTS: 25,
  TASK_CONDITION_26_JOIN_DAILY_CHALLENGE_X_TIMES: 26,
  TASK_CONDITION_27_UNLOCK_X_TALENT: 27,
  TASK_CONDITION_28_GET_A_EQUIPMENT_AT_X_RARE: 28,
  TASK_CONDITION_29_GET_TOTAL_OF_X_EQUIPMENT: 29,
  TASK_CONDITION_30_GET_X_OUTFIT: 30,
  TASK_CONDITION_31_EQUIP_X_ABOVE_NORMAL_RARE: 31,
  TASK_CONDITION_32_EQUIP_X_ABOVE_GOOD_RARE: 32,
  TASK_CONDITION_33_EQUIP_X_ABOVE_BETTER_RARE: 33,
  TASK_CONDITION_34_EQUIP_X_ABOVE_EXCELLENT_RARE: 34,
  TASK_CONDITION_35_EQUIP_X_ABOVE_EPIC_RARE: 35,
  TASK_CONDITION_36_OBTAIN_TOTAL_OF_X_GOLD: 36,
  TASK_CONDITION_37_OBTAIN_TOTAL_OF_X_GEM: 37,
  TASK_CONDITION_38_OPEN_X_EXECUTIVE_CREATE_OR_S_GRADE: 38,
  TASK_CONDITION_39_COMPLETE_X_KEY_EVOLUTION: 39,
  TASK_CONDITION_40_WEAR_FULL_NORMAL: 40,
  TASK_CONDITION_41_WEAR_FULL_GOOD: 41,
  TASK_CONDITION_42_WEAR_FULL_BETTER: 42,
  TASK_CONDITION_43_WEAR_FULL_EXCELLENT: 43,

  TASK_CONDITION_45_REACHED_3_MIN_CHAPTER_X: 45,
  TASK_CONDITION_46_REACHED_6_MIN_CHAPTER_X: 46,
  TASK_CONDITION_47_COMPLETE_X_DAILY_TASK: 47,
  TASK_CONDITION_48_CLEAR_TRIAL_X: 48,
  TASK_CONDITION_49_EVO_ANY_SKILL_X_TIME: 49,

  TASK_CONDITION_50_USE_X_TO_PLAY_STAGE_1_TIME: 50,
  TASK_CONDITION_51_CLEAR_STAGE_WITH_X: 51,
  TASK_CONDITION_52_EVOLVE_X_SKILLS: 52,
  TASK_CONDITION_53_EVOLVE_SKILL_X: 53,
  TASK_CONDITION_54_REACHED_X_ATK: 54,
  TASK_CONDITION_55_GET_GADGET_RARITY_X: 55,
  TASK_CONDITION_56_EQUIP_X_S_EQUIPMENT: 56,
  TASK_CONDITION_57_GET_WEAPON_RARITY_X: 57,
  TASK_CONDITION_58_CLEAR_STAGE_NO_HIT: 58,
  TASK_CONDITION_59_OPEN_X_OFFICER_CRATE: 59,
  TASK_CONDITION_60_KILL_BOSS_MAIN_STAGE_WEAPON_X: 60,
  TASK_CONDITION_62_PLAY_CHAPTER_X_1_TIME: 62,
  TASK_CONDITION_63_UPGRADE_EQUIPMENT_X_TIME: 63,
  TASK_CONDITION_64_GET_5_STAR_SKILL_X: 64,
  TASK_CONDITION_65_UPGRADE_EQUIPMENT_TO_LEVEL_X: 65,
  TASK_CONDITION_66_DEFEAT_X_ELITE: 66,
  TASK_CONDITION_67_DEFEAT_X_BOSS: 67,
  TASK_CONDITION_68_OPEN_S_CRATE_X_TIME: 68,
  TASK_CONDITION_69_CLAIM_DAILY_MILESTONE_X_TIME: 69,
  TASK_CONDITION_70_USE_POWER_UP_BOMB_X_TIME: 70,
  TASK_CONDITION_71_DEFEAT_X_ELITE_BY_CROSSBOW: 71,
  TASK_CONDITION_72_DEFEAT_X_MOB_BY_REVOLVER: 72,
  TASK_CONDITION_73_DEFEAT_X_MOB_BY_CROSSBOW: 73,
  TASK_CONDITION_74_USE_EXCELLENT_EQUIPMENT_PLAY_CHAPTER_X: 74,
  TASK_CONDITION_75_MERGE_GADGET_X_TIME: 75,
  TASK_CONDITION_76_SPEND_TOTAL_X_GEM_OPEN_CHEST: 76,
  TASK_CONDITION_77_USE_S_EQUIPMENT_IN_BATTLE: 77,
  TASK_CONDITION_78_EARN_X_EXCELLENT_1_WEAPON: 78,
  TASK_CONDITION_79_USE_X_ACTIVE_SKILL_IN_BATTLE: 79,
  TASK_CONDITION_80_DEFEAT_X_ELITE_BY_MACHETTE: 80,
};

const TaskStatus = {
  NEW: 0,
  INPROGRESS: 1,
  COMPLETED: 2,
  CLAIMED: 3,
};

const TabStatus = {
  LOCK: 0,
  OPEN: 1,
  COMPLETED: 2,
};

const EventStatus = {
  NEW: 0,
  INPROGRESS: 1,
  COMPLETED: 2,
  EXPIRED: 3,
};

const ItemID = {
  WEAPON_DESIGN: 2400009,
  ARMOR_DESIGN: 2400010,
  NECKLACE_DESIGN: 2400011,
  BELT_DESIGN: 2400012,
  GLOVES_DESIGN: 2400013,
  SHOES_DESIGN: 2400014,
  GEM: 2400002,
  GOLD: 2400003,
  DNA: 2400004,
  REVOLVER_EQUIPMENT: 1110000,
  SHOTGUN_EQUIPMENT: 1110001,
  WHIP_EQUIPMENT: 1110002,
  MACHETTE_EQUIPMENT: 1110004,
  CROSSBOW_EQUIPMENT: 1110009,

  LIGHT_SAVIOR: 1110003,
  BLACK_HOLE_CANNON: 1110010,
  IMMORTAL_SUIT: 2130002,
  IMMORTAL_NECKLACE: 2110005,
  IMMORTAL_GLOVES: 2120005,
  IMMORTAL_BELT: 2140005,
  IMMORTAL_BOOTS : 2150005,

  NECKLACE_1_EQUIPMENT: 2110000,
  NECKLACE_2_EQUIPMENT: 2110001,
  NECKLACE_3_EQUIPMENT: 2110002,
  NECKLACE_4_EQUIPMENT: 2110003,
  NECKLACE_5_EQUIPMENT: 2110004,

  GLOVES_1_EQUIPMENT: 2120000,
  GLOVES_2_EQUIPMENT: 2120001,
  GLOVES_3_EQUIPMENT: 2120002,
  GLOVES_4_EQUIPMENT: 2120003,
  GLOVES_5_EQUIPMENT: 2120004,

  ARMOR_1_EQUIPMENT: 2130000,
  ARMOR_2_EQUIPMENT: 2130001,
  ARMOR_3_EQUIPMENT: 2130003,
  ARMOR_4_EQUIPMENT: 2130004,
  ARMOR_5_EQUIPMENT: 2130005,

  BELT_1_EQUIPMENT: 2140000,
  BELT_2_EQUIPMENT: 2140001,
  BELT_3_EQUIPMENT: 2140002,
  BELT_4_EQUIPMENT: 2140003,
  BELT_5_EQUIPMENT: 2140004,

  SHOES_1_EQUIPMENT: 2150000,
  SHOES_2_EQUIPMENT: 2150001,
  SHOES_3_EQUIPMENT: 2150002,
  SHOES_4_EQUIPMENT: 2150003,
  SHOES_5_EQUIPMENT: 2150004,

  SILVER_KEY: 2400005,
  GOLD_KEY: 2400006,
  S_KEY: 2400008,

  EXCELLENT_WEAPON_CHEST: 2400019,
  EXCELLENT_ARMOR_CHEST: 2400020,
  EXCELLENT_NECKLACE_CHEST: 2400021,
  EXCELLENT_BELT_CHEST: 2400022,
  EXCELLENT_GLOVES_CHEST: 2400023,
  EXCELLENT_SHOES_CHEST: 2400024,
  EXCELLENT_EQUIPMENT_CHEST: 2400025,
  EPIC_EQUIPMENT_CHEST: 2400026,
  EPIC_WEAPON_CHEST: 2400039,
  EPIC_ARMOR_CHEST: 2400040,
  EPIC_NECKLACE_CHEST: 2400041,
  EPIC_BELT_CHEST: 2400042,
  EPIC_GLOVES_CHEST: 2400043,
  EPIC_SHOES_CHEST: 2400044,
  EQUIPMENT_CHOICE_CHEST: 2400045,
  EQUIPMENT_CHOICE_CHEST_AUTUMN: 2400046,
  S_EQUIPMENT_CHEST: 2400047,


  EXCELLENT_WEAPON_MATERIAL: 2400027,
  EXCELLENT_ARMOR_MATERIAL: 2400028,
  EXCELLENT_NECKLACE_MATERIAL: 2400029,
  EXCELLENT_BELT_MATERIAL: 2400030,
  EXCELLENT_GLOVES_MATERIAL: 2400031,
  EXCELLENT_SHOES_MATERIAL: 2400032,
  EPIC_WEAPON_MATERIAL: 2400033,
  EPIC_ARMOR_MATERIAL: 2400034,
  EPIC_NECKLACE_MATERIAL: 2400035,
  EPIC_BELT_MATERIAL: 2400036,
  EPIC_GLOVES_MATERIAL: 2400037,
  EPIC_SHOES_MATERIAL: 2400038,

  NORMAL_GADGET: 2161000,
  GOOD_GADGET: 2161001,
  BETTER_GADGET: 2161002,
  EXCELLENT_GADGET: 2161003,
};

const EventRestart = {
  NEVER: 0,
  DAILY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
  YEARLY: 4,
};

const IAPStatus = {
  NEW: 0,
  PENDING: 1,
  VERIFIED: 2,
  CLAIMED: 3,
  FAILED: 4,
  RESTORED: 5,
};

const EventID = {
  ACHIEVEMENT: 3100003,
  DAILIES: 3100001,
  DAILY_REWARDS: 3100004,
  ROOKIE_LOGIN: 3000001,
  SERVER_LAUNCH: 3000002,
  SERVER_LAUNCH_9MIN: 30000029,
  WEEKLIES: 3100002,
  WEEKLIES_9MIN: 31000029,
  MAIN_QUEST: 3100005,
};

const IapID = {
  FIRST_IAP: 3000102,
  MONTHLY_CARD: 30001021,
  SUPPER_MONTHLY_CARD: 30001022,
  GROWTH_FUNDS_FREE: 30001031,
  GROWTH_FUNDS_PREMIUM: 30001032,
  GROWTH_FUNDS_SUPER: 30001033,
  STARTER_PACK: 30001041,
  PIGGY_BANK_S: 30001501,
  PIGGY_BANK_M: 30001502,
  PIGGY_BANK_L: 30001503,
  PIGGY_BANK_XL: 30001504,
  COMBAT_CARE: 3000170,
  EQUIPMENT_QUALITY_UP: 3000190,
  ADVENTURE: 3000190,
};

const CHAPTER = {
  CHAPTER_1: 1000000,
  CHAPTER_2: 1000001,
  CHAPTER_3: 1000002,
  CHAPTER_4: 1000003,
  CHAPTER_5: 1000004,
  CHAPTER_6: 1000005,
  CHAPTER_7: 1000006,
  CHAPTER_8: 1000007,
  CHAPTER_9: 1000008,
  CHAPTER_10: 1000009,
  CHAPTER_11: 1000010,
  CHAPTER_12: 1000011,
};

const Restriction = {
  USER_ID: 1000,
  LEVEL: 1001,
  DEVICE_OS: 1002,
  VERSION: 1003,
  SEGMENT_CURRENT: 1004,
  SEGMENT_PAST: 1005,
  MEMBER_SINCE: 1006,
  COUNTRY: 1007,
  LANGUAGE: 1008,
  GEM_SUM: 1009,
  GEM_CURRENT: 1010,
  GOLD_SUM: 1011,
  GOLD_CURRENT: 1012,
  EQUIPMENTS: 1013,
  HIGHEST_STAGE: 1014,
  LOCAL_TIME: 1015,
  HIGHEST_PURCHASE_AMOUNT: 1016,
  FAVORITE_PURCHASE_AMOUNT: 1017,
  PURCHASE_COUNT: 1018,
  LOGIN_COUNT: 1019,
  LTV: 1020,
  DAILY_SPEND: 1021,
  PACK_PURCHASED: 1022,
  CURRENT_ENERGY: 1023,
  HIGHEST_EQUIPMENT_RARITY: 1024,
  HIGHEST_WEAPON_RARITY: 1025,
  HIGHEST_EQUIPMENT_LEVEL: 1026,
  S_EQUIPMENT_AMOUNT: 1027,
};

const CampaignTemplate = {
  TEMPLATE_1: 1,
  TEMPLATE_2: 2,
  TEMPLATE_3: 3,
  TEMPLATE_4: 4,
  TEMPLATE_5: 5,
  TEMPLATE_6: 6,
};

//=============================
class Types {}

Types.Item = Item;
Types.Stat = Stat;
Types.Rarity = Rarity;
Types.Crate = Crate;
// Types.Event = Event;
Types.TaskStatus = TaskStatus;
Types.EventStatus = EventStatus;
Types.ItemID = ItemID;
Types.Content = Content;
Types.EventStartCondition = EventStartCondition;
Types.EventSpecialCondition = EventSpecialCondition;
Types.EventTaskCondition = EventTaskCondition;
Types.IAPStatus = IAPStatus;
Types.EventID = EventID;
Types.IapID = IapID;
Types.Restriction = Restriction;
Types.CampaignTemplate = CampaignTemplate;

module.exports = Types;
