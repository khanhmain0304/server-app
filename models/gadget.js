const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GadgetSlot = new Schema(
  {
    attack_1: { type: Schema.Types.ObjectId, default: null },
    attack_2: { type: Schema.Types.ObjectId, default: null },
    attack_3: { type: Schema.Types.ObjectId, default: null },
    defense_1: { type: Schema.Types.ObjectId, default: null },
    defense_2: { type: Schema.Types.ObjectId, default: null },
    defense_3: { type: Schema.Types.ObjectId, default: null },
  },
  { _id: false }
);

const BonusStats = new Schema(
  {
    type: { type: String, default: "" },
    value: { type: Number, default: 0 },
  },
  { _id: false }
);

const Gadget = new Schema({
  content: { type: String, default: "" },
  item_id: { type: Number, default: 0 },
  item_name: { type: String, default: "" },
  item_type: { type: Number, default: 0 },
  item_description: { type: String, default: "" },
  item_relate_skill: { type: [Number], default: [] },
  item_current_rarity: { type: Number, default: 1 },
  item_bonus_hp: { type: Number, default: 0 },
  item_bonus_atk: { type: Number, default: 0 },
  item_effect: { type: [String], default: [] },
  item_effect_bonus: { type: [BonusStats], default: [] },
});

Gadget.methods.getInfo = function getInfo() {
  return {
    content: this.content,
    item_id: this.item_id,
    item_name: this.item_name,
    item_type: this.item_type,
    item_description: this.item_description,
    item_relate_skill: this.item_relate_skill,
    item_current_rarity: this.item_current_rarity,
    item_bonus_hp: this.item_bonus_hp,
    item_bonus_atk: this.item_bonus_atk,
    item_effect: this.item_effect,
    item_effect_bonus: this.item_effect_bonus,
  };
};

const GadgetInfo = mongoose.model("Gadget", Gadget);
module.exports = { Gadget, GadgetInfo, GadgetSlot };
