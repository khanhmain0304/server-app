const Message = {
  SERVER_ERROR: "Server error",
  // Authentication
  TOKEN_REQUIRE: "A jwt token is required for authentication",
  INVALID_TOKEN: "Invalid JWT Token",

  // Signature
  INVALID_SIGNATURE: "Signature Invalid.",

  // Register
  REQUIRED_EMAIL_PASSWORD: "Email, password are required!",
  REQUIRED_GAIA: "GaiaToken, version are required!",
  USER_EXISTED: "User Already Exist. Please Login",
  CREATE_USER_FAIL: "Can't create user!",
  UPDATE_USER_FAIL: "Could not update user!",
  GUEST_ONLY: "Guest only.",
  INVALID_CREDENTIALS: "Invalid Credentials",

  // Login
  LOGIN_WALLET_REQUIRED: "Message, signature, address are required!",
  VERIFY_FAIL: "Verify Message Failed!",

  // Profile
  USER_NOT_FOUND: "User Not Found!",
  INVALID_USER: "Invalid user!",
  USERID_REQUIRED: "UserId required!",
  AVATAR_NOT_FOUND: "uploadAvatar Not Found!",

  // Change password
  PASSWORD_REQUIRED: "Password, New Password are required!",
  CHANGE_PASSWORD_FAIL: "Change pass failed!",

  EMAIL_REQUIRED: "Email is required!",
  SUBSCRIBE_SUCCESS: "Subscribe Successful!",
  UNSUBSCRIBE_SUCCESS: "Unsubscribe Successful!",
  ALREADY_SUBSCRIBE: "Already Subscribed!",
  SUBSCRIBE_FAIL: "Can't subscribe!",
  UNSUBSCRIBED: "Unsubscribed!!!",

  // NFT
  NFT_OWNED: "NFT Already Owned!",
  NFT_INVALID: "NFT Invalid!",
  CREATE_NFT_FAIL: "Can't create NFT!",
  NFT_LOCK_ERR: "NFT lock error",
  NFT_SET_ERR: "NFT set error",
  NFT_NOT_FOUND: "NFT not found",

  // Item
  ITEM_REQUIRE: "Item fields are required!",
  ITEM_EXISTED: "Item Already Exist",
  CREATE_ITEM_FAIL: "Can't create item!",
  ITEM_NOT_FOUND: "Item not found!",

  // Game
  GAME_VERSION_REQUIRE: "client_id, is_valid, config are required",
  GAME_VERSION_EXISTED: "GameVersion Already Exist. Please Login",
  GAME_VERSION_CREATE_FAIL: "Can't create GameVersion!",
  GAME_VERSION_NOT_FOUND: "GameVersion Not Found!",
  GAME_CONFIG_REQUIRE: "Name, file_name, version, config are required",
  GAME_CONFIG_EXISTED: "GameConfig Already Exist. Please Login",
  GAME_CONFIG_CREATE_FAIL: "Can't create GameConfig!",
  GAME_CONFIG_NOT_FOUND: "GameConfig Not Found!",

  // Friend
  FRIEND_NOT_FOUND: "Friend Not Foud!",
  FRIEND_ID_REQUIRE: "friendIds is required",
  DECLINE_FRIEND_REQUEST: "Decline Friend Request!",

  // Evolve
  WRONG_SERIAL: "Upgrade fail. Serial is wrong.",
  EVOLVE_NOT_FOUND: "Evolve not found",

  // EQUIPMENT
  EQUIP_MAX_LEVEL: "EQUIP_MAX_LEVEL",
  EQUIP_MIN_LEVEL: "EQUIP_MIN_LEVEL",
  EQUIP_LVL_DOWN_ERROR: "EQUIP_LVL_DOWN_ERROR",
  EQUIP_LVL_UP_ERROR: "EQUIP_LVL_UP_ERROR",
  EQUIP_MERGE_ERROR: "EQUIP_MERGE_ERROR",
  EQUIP_MERGE_MIN_ERROR: "EQUIP_MERGE_MIN_ERROR",
  EQUIP_MERGE_MAX_ERROR: "EQUIP_MERGE_MIN_ERROR",
  EQUIP_DOWNGRADE_ERROR: "EQUIP_DOWNGRADE_ERROR",

  // Evolve/Cost
  NOT_AFFORD_PAYMENT: "Not enough expense!",
  WRONG_SERIAL: "Upgrade fail. Serial is wrong.",
  EVOLVE_NOT_FOUND: "Evolve not found",
  INVALID_COST_TYPE: "Cost type is invalid",

  // Shop
  PACK_NOT_FOUND: "Pack not found",
  BUY_LIMIT: "Item limitted. Can't buy",

  // Engergy
  ENERGY_BUY_GEM_ERROR: "ENERGY_BUY_GEM_ERROR",
  ENERGY_BUY_GEM_MAX: "ENERGY_BUY_GEM_MAX",
  ENERGY_BUY_ADS_ERROR: "ENERGY_BUY_ADS_ERROR",
  ENERGY_BUY_ADS_MAX: "ENERGY_BUY_ADS_MAX",

  // Patrol

  // Event
  EVENT_ERROR_TASK_NOT_FOUND: "EVENT_ERROR_TASK_NOT_FOUND",
  EVENT_ERROR_TASK_NOT_COMPLETED: "EVENT_ERROR_TASK_NOT_COMPLETED",
  EVENT_ERROR_TASK_CLAIMED: "EVENT_ERROR_TASK_CLAIMED",
  EVENT_ERROR_EVENT_NOT_FOUND: "EVENT_ERROR_EVENT_NOT_FOUND",
  EVENT_ERROR_EVENT_ENDED: "EVENT_ERROR_EVENT_ENDED",

  // AB TEST
  AB_SEGMENT_NOT_FOUND: "Segment Not Found!",
  CAMPAIGN_NOT_FOUND: "Campaign Not Found!",
};

module.exports = Message;
