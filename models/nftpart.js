const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NFTPartSchema = new Schema({
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
    created_date: { type: Date, default: Date.now },
});


NFTPartSchema.methods.getInfo = function getInfo() {
  return {
    // id: this._id,
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
    created_date: this.created_date,
  }
}


NFTPartSchema.methods.getMetadata = function getMetadata() {
  return {
    // id: this._id,
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
    created_date: this.created_date,
  }
}


const NFTPart = mongoose.model("NFTPart", NFTPartSchema);
module.exports = NFTPart;
