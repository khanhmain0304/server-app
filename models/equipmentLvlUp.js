const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentBonusStats = new Schema(
  {
    type: { type: String, default: "" },
    value: { type: Number, default: 0 },
  },
  { _id: false }
);

const EquipmentLvlUpPrice = new Schema(
  {
    type: { type: String, default: "" },
    value: { type: Number, default: 0 },
  },
  { _id: false }
);

const EquipmentLvlUpSchema = new Schema(
  {
    level: { type: Number, default: 0 },
    gold_cost: { type: Number, default: 0 },
    design_cost: { type: Number, default: 0 },
    level_up_price: [EquipmentLvlUpPrice],
    level_down_reward: [EquipmentLvlUpPrice],
    type: { type: String, default: "" },
    rarity: { type: Number, default: 1 },
    min_level: { type: Number, default: 0 },
    max_level: { type: Number, default: 0 },
    level_bonus: { type: [EquipmentBonusStats], default: null },
  },
  { timestamps: true }
);

EquipmentLvlUpSchema.methods.getInfo = function getInfo() {
  return {
    // level: this.level,
    // gold_cost: this.gold_cost,
    // design_cost: this.design_cost,
    level_up_price: this.level_up_price,
    level_down_reward: this.level_down_reward,
    // type: this.type,
    // rarity: this.rarity,
    min_level: this.min_level,
    max_level: this.max_level,
    level_bonus: this.level_bonus,
  };
};

const EquipmentLvlUp = mongoose.model("EquipmentLvlUp", EquipmentLvlUpSchema);
module.exports = EquipmentLvlUp;
