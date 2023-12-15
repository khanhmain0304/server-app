const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentBonusStatsSchema = new Schema(
    {
      rarity: { type: Number, default: 1 },
      type: { type: String, default: "" },
      value: { type: Number, default: 0 },
    },
    { _id: false }
  );

const EquipmentMainStatsSchema = new Schema(
  {
    item_id: { type: Number, default: 0 },
    item_name: { type: String, default: "" },
    item_type: { type: String, default: "" },
    item_description: { type: String, default: "" },
    item_mainstats: { type: String, default: "" },
    item_starting_rarity: { type: Number, default: 1 },
    item_effect: { type: [String], default: [] },
    item_effect1: { type: String, default: "" },
    item_effect2: { type: String, default: "" },
    item_effect3: { type: String, default: "" },
    item_effect4: { type: String, default: "" },
    item_effect5: { type: String, default: "" },
    item_super: { type: Boolean, default: false },

    effect_bonus: [EquipmentBonusStatsSchema],

  },
  { timestamps: true }
);

EquipmentMainStatsSchema.methods.getInfo = function getInfo() {
  return {
    item_id: this.item_id,
    item_name: this.item_name,
    item_type: this.item_type,
    item_description: this.item_description,
    item_mainstats: this.item_mainstats,
    item_starting_rarity: this.item_starting_rarity,
    item_effect: this.item_effect,
    item_effect1: this.item_effect1,
    item_effect2: this.item_effect2,
    item_effect3: this.item_effect3,
    item_effect4: this.item_effect4,
    item_effect5: this.item_effect5,
    item_super: this.item_super
  };
};

const EquipmentMainStats = mongoose.model("EquipmentMainStats", EquipmentMainStatsSchema);
module.exports = EquipmentMainStats;
