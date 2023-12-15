const mongoose = require("mongoose");
const { Gadget, GadgetSlot } = require("./gadget");
const Schema = mongoose.Schema;

const EquipmentLvlUpPrice = new Schema(
  {
    type: { type: String, default: "" },
    value: { type: Number, default: 0 },
  },
  { _id: false }
);

const EquipmentLvlBonus = new Schema(
  {
    type: { type: String, default: "" },
    value: { type: Number, default: 0 },
  },
  { _id: false }
);

const Material = new Schema({
  _id: { type: Number },
  item_id: { type: Number, default: 0 },
  item_name: { type: String, default: "material name" },
  item_type: { type: String, default: null },
  item_description: { type: String, default: "material description" },
  item_current_rarity: { type: Number, default: 4 },
  quantity: { type: Number, default: 0 },
  isDesign: { type: Boolean, default: false },
  isItem: { type: Boolean, default: false },
  isMaterial: { type: Boolean, default: true },
});

const Design = new Schema({
  _id: { type: Number },
  item_id: { type: Number, default: 0 },
  item_name: { type: String, default: "design name" },
  item_type: { type: String, default: null },
  item_description: { type: String, default: "design description" },
  item_current_rarity: { type: Number, default: 1 },
  quantity: { type: Number, default: 0 },
  isDesign: { type: Boolean, default: true },
  isItem: { type: Boolean, default: false },
  isMaterial: { type: Boolean, default: false },
});

const EquipmentStats = new Schema(
  {
    type: { type: String, default: "" },
    value: { type: Number, default: 0 },
  },
  { _id: false }
);

const EquipmentSlot = new Schema(
  {
    weapon: { type: Schema.Types.ObjectId, default: null },
    necklace: { type: Schema.Types.ObjectId, default: null },
    gloves: { type: Schema.Types.ObjectId, default: null },
    armor: { type: Schema.Types.ObjectId, default: null },
    belt: { type: Schema.Types.ObjectId, default: null },
    shoes: { type: Schema.Types.ObjectId, default: null },
  },
  { _id: false }
);

const EquipmentItems = new Schema({
  content: { type: String, default: "" },
  item_id: { type: Number, default: 0 },
  item_name: { type: String, default: "" },
  item_type: { type: String, default: "" },
  item_description: { type: String, default: "" },
  item_mainstats: { type: String, default: "" },
  item_starting_rarity: { type: Number, default: 1 },
  item_effect: { type: [String], default: [] },

  // merge rarity
  item_current_rarity: { type: Number, default: 1 },
  item_super: { type: Boolean, default: false },
  isDesign: { type: Boolean, default: false },
  isItem: { type: Boolean, default: true },
  isMaterial: { type: Boolean, default: false },
  isEquipped: { type: Boolean, default: false },

  base_stats: {
    type: [EquipmentStats],
    default: [],
  },

  effect_bonus: {
    type: [EquipmentStats],
    default: [],
  },

  // ---------------
  level_up_price: {
    type: [EquipmentLvlUpPrice],
    default: [],
  },

  level_down_reward: {
    type: [EquipmentLvlUpPrice],
    default: [],
  },

  level_bonus: {
    type: [EquipmentLvlBonus],
    default: [],
  },

  min_level: { type: Number, default: 1 },
  max_level: { type: Number, default: 1 },
  // ---------------

  level: { type: Number, default: 1 },
});

const ChoiceChest = new Schema({
  content: { type: String, default: "" },
  item_id: { type: Number, default: 0 },
  item_name: { type: String, default: "" },
  item_type: { type: String, default: "" },
  item_description: { type: String, default: "" },
  item_current_rarity: { type: Number, default: 1 },
  item_super: { type: Boolean, default: false },
  value: { type: Number, default: 0 },
});

EquipmentItems.methods.getInfo = function getInfo() {
  return {
    content: this.content,
    item_id: this.item_id,
    item_name: this.item_name,
    item_type: this.item_type,
    item_description: this.item_description,
    item_mainstats: this.item_mainstats,
    item_starting_rarity: this.item_starting_rarity,
    item_effect: this.item_effect,

    // merge rarity
    item_current_rarity: this.item_current_rarity,
    item_super: this.item_super,
    isDesign: this.isDesign,
    isItem: this.isItem,
    isMaterial: this.isMaterial,
    isEquipped: this.isEquipped,
    base_stats: this.base_stats,
    effect_bonus: this.effect_bonus,

    // ---------------
    level_up_price: this.level_up_price,
    level_down_reward: this.level_down_reward,
    level_bonus: this.level_bonus,
    min_level: this.min_level,
    max_level: this.max_level,
    // ---------------
    level: this.level,
  };
};

const EquipmentSchema = new Schema(
  {
    slots: EquipmentSlot,
    items: [EquipmentItems],
    materials: [Material],
    designs: [Design],
    gadget_slots: { type: GadgetSlot, default: {} },
    gadgets: [Gadget],
    choice_chests: [ChoiceChest],
  },
  {
    _id: false,
    timestamps: true,
  }
);

EquipmentSchema.methods.getInfo = function getInfo() {
  return {
    slots: this.slots,
    items: this.items,
    materials: this.slots,
    designs: this.designs,
    gadget_slots: this.gadget_slots,
    gadgets: this.gadgets,
    choice_chests: this.choice_chests,
  };
};

const EquipmentInfo = mongoose.model("EquipmentInfo", EquipmentItems);
module.exports = { EquipmentSchema, EquipmentInfo };
