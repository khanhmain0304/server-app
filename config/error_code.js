const ErrorCode = {
  NONE: 0,
  UNKNOW: 1000,
  AUTHENTICATION_ERROR: 1,
  INVALID_ADDRESS: 2,
  SIGNATURE_INVALID: 3,
  SERVER_ERROR: 4,
  INVALID_OWNER_ADDRESS: 5,
  COULD_NOT_READ_CONTRACT: 6,
  CONFIG_NOT_AUTHORIZED: 7,
  COULD_NOT_CHANGE_PASSWORD: 8,
  INVALID_USER: 9,
  COULD_NOT_UPDATE_USER: 10,

  INVALID_ITEM: 11,
  INVALID_NFT: 12,
  NFT_OWNED: 13,
  NFT_LOCK: 14,

  EQUIP_MAX_LEVEL: 15,
  EQUIP_MIN_LEVEL: 16,

  EQUIP_LVL_UP_ERROR: 17,
  EQUIP_LVL_DOWN_ERROR: 18,
  EQUIP_MERGE_ERROR: 19,
  EQUIP_MERGE_MIN_ERROR: 20,
  EQUIP_MERGE_MAX_ERROR: 21,

  ENERGY_BUY_GEM_ERROR: 22,
  ENERGY_BUY_GEM_MAX: 23,
  ENERGY_BUY_ADS_ERROR: 24,
  ENERGY_BUY_ADS_MAX: 25,

  // EVENT
  EVENT_ERROR_TASK_NOT_FOUND : 26,
  EVENT_ERROR_TASK_NOT_COMPLETED : 27,
  EVENT_ERROR_TASK_CLAIMED : 28,
  EVENT_ERROR_EVENT_NOT_FOUND : 29,
  EVENT_ERROR_EVENT_ENDED : 30,

  EQUIP_DOWNGRADE_ERROR: 31,
  AB_SEGMENT_NOT_FOUND: 32,
  CAMPAIGN_NOT_FOUND: 32,

};

module.exports = ErrorCode;
