const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const EquipmentMergeRuleSchema = new Schema(
  {
    // "rarity": 1,
    // "can_upgrade": true,
    // "can_downgrade": false,
    // "upgrade_require_item_id": 2,
    // "upgrade_require_type": 2,
    // "downgrade_to_rarity": -1,
    // "downgrade_material_reward": -1

    rarity: { type: Number, default: 0 },
    can_upgrade: { type: Boolean, default: false },
    can_downgrade: { type: Boolean, default: false },
    upgrade_require_item_id: { type: Number, default: 0 },
    upgrade_require_type: { type: Number, default: 0 },
    downgrade_to_rarity: { type: Number, default: 0 },
    downgrade_material_reward: { type: Number, default: 0 },
    upgrade_require_rarity: { type: Number, default: 0 },
    upgrade_require_rarity_count: { type: Number, default: 0 },


  },
  { timestamps: true }
);

EquipmentMergeRuleSchema.methods.getInfo = function getInfo() {
  return {
    rarity: this.rarity,
    can_upgrade: this.can_upgrade,
    can_downgrade: this.can_downgrade,
    upgrade_require_item_id: this.upgrade_require_item_id,
    upgrade_require_type: this.upgrade_require_type,
    downgrade_to_rarity: this.downgrade_to_rarity,
    downgrade_material_reward: this.downgrade_material_reward,
    upgrade_require_rarity: this.upgrade_require_rarity,
    upgrade_require_rarity_count: this.upgrade_require_rarity_count,
  };
};

const EquipmentMergeRule = mongoose.model("EquipmentMergeRule", EquipmentMergeRuleSchema);
module.exports = EquipmentMergeRule;