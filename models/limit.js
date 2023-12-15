const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LimitRecordSchema = new Schema(
  {
    time_reset: { type: String, default: "00:00" },
    limit_free_gold_pack: { type: Number, default: 1 },
    limit_ads_gold_pack: { type: Number, default: 1 },
    limit_free_slot_1: { type: Number, default: 1 },
    limit_ads_slot_1: { type: Number, default: 2 },
    limit_slot_2: { type: Number, default: 1 },
    limit_slot_3: { type: Number, default: 1 },
    limit_slot_4: { type: Number, default: 1 },
    limit_slot_5: { type: Number, default: 1 },
    limit_slot_6: { type: Number, default: 1 },
    limit_energy_quick_patrol: { type: Number, default: 2 },
    limit_ads_quick_patrol: { type: Number, default: 1 },
    limit_play_daily_challenge: { type: Number, default: 2 },
    limit_rv_normal_chest_2_ads: { type: Number, default: 2 },
    limit_rv_normal_chest_5_ads: { type: Number, default: 5 },
    // limit_rv_ads_rare_chest: { type: Number, default: 1 },
  },
  { _id: false }
);

const LimitDoubleValue = new Schema(
  {
    is_x2_value_pack_1: { type: Boolean, default: true },
    is_x2_value_pack_2: { type: Boolean, default: true },
    is_x2_value_pack_3: { type: Boolean, default: true },
    is_x2_value_pack_4: { type: Boolean, default: true },
    is_x2_value_pack_5: { type: Boolean, default: true },
    is_x2_value_pack_6: { type: Boolean, default: true },
  },
  { _id: false }
);

module.exports = { LimitRecordSchema, LimitDoubleValue };
