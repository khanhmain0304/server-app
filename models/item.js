const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  seq_id: { type: Number, default: 0, unique: true },
  description: { type: String, default: "" },
  name: { type: String, default: "" },
  image: { type: String, default: "" },
  strength: { type: Number, default: 0 },
  agility: { type: Number, default: 0 },
  intelligence: { type: Number, default: 0 },

  //
  version: { type: Number, default: 0},
  part_id: { type: Number, default: 0, unique: true },
  set_num: { type: Number, default: 0 },
  set: { type: String },
  traits_no: { type: Number, default: 0 },
  slot: { type: String },
  traits_id: { type: String },
  traits_name: { type: String },
  traits_value: { type: String },
  rarity: { type: Number, default: 0 },
  //

  // attribute_1: { type: String, default: "" },
  // attribute_2: { type: String, default: "" },
  // attribute_3: { type: String, default: "" },
  // attribute_4: { type: String, default: "" },
  // attribute_5: { type: String, default: "" },
  // attribute_6: { type: String, default: "" },
  // attribute_7: { type: String, default: "" },
  // attribute_8: { type: String, default: "" },
  // attribute_9: { type: String, default: "" },
  // attribute_10: { type: String, default: "" },

  created_date: { type: Date, default: Date.now },
});

ItemSchema.methods.getInfo = function getInfo() {
  return {
    // id: this._id,
    id: this.seq_id,
    description: this.description,
    name: this.name,
    image: this.image,
    strength: this.strength,
    agility: this.agility,
    intelligence: this.intelligence,

    //
    version: this.version,
    part_id: this.part_id,
    set_num: this.set_num,
    set: this.set,
    traits_no: this.traits_no,
    slot: this.slot,
    traits_id: this.traits_id,
    traits_name: this.traits_name,
    traits_value: this.traits_value,
    rarity: this.rarity,
    //

    // attribute_1: this.attribute_1,
    // attribute_2: this.attribute_2,
    // attribute_3: this.attribute_3,
    // attribute_4: this.attribute_4,
    // attribute_5: this.attribute_5,
    // attribute_6: this.attribute_6,
    // attribute_7: this.attribute_7,
    // attribute_8: this.attribute_8,
    // attribute_9: this.attribute_9,
    // attribute_10: this.attribute_10,
  };
};

ItemSchema.methods.getMetadata = function getMetadata() {
  return {
    // id: this._id,
    id: this.seq_id,
    description: this.description,
    name: this.name,
    image: this.image,
    attributes: [
      {
        trait_type: "traits id",
        value: this.traits_id,
      },
      {
        trait_type: "strength",
        value: this.strength,
      },
      {
        trait_type: "agility",
        value: this.agility,
      },
      {
        trait_type: "intelligence",
        value: this.intelligence,
      },
      // {
      //   trait_type: "attribute_1",
      //   value: this.attribute_1,
      // },
      // {
      //   trait_type: "attribute_2",
      //   value: this.attribute_2,
      // },
      // {
      //   trait_type: "attribute_3",
      //   value: this.attribute_3,
      // },
      // {
      //   trait_type: "attribute_4",
      //   value: this.attribute_4,
      // },
      // {
      //   trait_type: "attribute_5",
      //   value: this.attribute_5,
      // },
      // {
      //   trait_type: "attribute_6",
      //   value: this.attribute_6,
      // },
      // {
      //   trait_type: "attribute_7",
      //   value: this.attribute_7,
      // },
      // {
      //   trait_type: "attribute_8",
      //   value: this.attribute_8,
      // },
      // {
      //   trait_type: "attribute_9",
      //   value: this.attribute_9,
      // },
      // {
      //   trait_type: "attribute_10",
      //   value: this.attribute_10,
      // },
    ],
  };
};

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
