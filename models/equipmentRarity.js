const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentRaritySchema = new Schema(
  {
    type: { type: String, default: "" },
    rarity: { type: Number, default: 1 },
    base_atk: { type: Number, default: 0 },
    base_atk_s: { type: Number, default: 0 },
    base_hp: { type: Number, default: 0 },
    base_hp_s: { type: Number, default: 0 },
  },
  { timestamps: true }
);

EquipmentRaritySchema.methods.getInfo = function getInfo() {
  return {
    type: this.type,
    rarity: this.rarity,
    base_atk: this.base_atk,
    base_atk_s: this.base_atk_s,
    base_hp: this.base_hp,
    base_hp_s: this.base_hp_s
  };
};

const EquipmentRarity = mongoose.model("EquipmentRarity", EquipmentRaritySchema);
module.exports = EquipmentRarity;
