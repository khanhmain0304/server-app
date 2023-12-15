const growth_funds = require("./grow_funds");
const claim_growth_funds = require("./claim_growth_funds");
const monthly_card = require("./monthly_card");
const claim_daily = require("./claim_daily_reward");
const starter_pack = require("./starter_pack");
const piggy_bank = require("./piggy_bank");
const daily_discount = require("./daily_discount");
const claim_daily_discount = require("./claim_daily_discount");
const value_combat_care = require("./value_combat_care");
const value_equipment_quality_up = require("./value_equipment_quality");
const value_adventure = require("./value_adventure");
const blue_revolver = require("./blue_revolver");
const purple_gauntlet = require("./purple_gauntlet");
const need_more_upgrade = require("./need_more_upgrade");
const out_of_gold = require("./out_of_gold");
const kick_start_299 = require("./kick_start_299");
const kick_start_499 = require("./kick_start_499");
const kick_start_shop = require("./kick_start_shop");
const survivor_pack = require("./survivor_pack");
const undoubtedly_need = require("./undoubtedly_need");
const buy_campaign = require("./buy_campaign");

module.exports = {
  paths: {
    "/api/v1/growth_funds": {
      ...growth_funds,
    },
    "/api/v1/claim_growth_funds": {
      ...claim_growth_funds,
    },
    "/api/v1/monthly_card": {
      ...monthly_card,
    },
    "/api/v1/claim_monthly_card": {
      ...claim_daily,
    },
    "/api/v1/starter_pack": {
      ...starter_pack,
    },
    "/api/v1/piggy_bank": {
      ...piggy_bank,
    },
    "/api/v1/daily_discount": {
      ...daily_discount,
    },
    "/api/v1/claim_total_days": {
      ...claim_daily_discount,
    },
    "/api/v1/combat_care": {
      ...value_combat_care,
    },
    "/api/v1/equipment_quality_up": {
      ...value_equipment_quality_up,
    },
    "/api/v1/adventure": {
      ...value_adventure,
    },
    "/api/v1/blue_revolver": {
      ...blue_revolver,
    },
    "/api/v1/purple_gauntlet": {
      ...purple_gauntlet,
    },
    "/api/v1/need_more_upgrade": {
      ...need_more_upgrade,
    },
    "/api/v1/out_of_gold": {
      ...out_of_gold,
    },
    "/api/v1/kick_start_299": {
      ...kick_start_299,
    },
    "/api/v1/kick_start_499": {
      ...kick_start_499,
    },
    "/api/v1/kick_start_shop": {
      ...kick_start_shop,
    },
    "/api/v1/survivor_pack": {
      ...survivor_pack,
    },
    "/api/v1/undoubtedly_need": {
      ...undoubtedly_need,
    },
    "/api/v1/buy_campaign": {
      ...buy_campaign,
    },
  },
};
