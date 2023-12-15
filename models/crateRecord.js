const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrateRecordSchema = new Schema(
  {
    lasttime_open_normal_crate: { type: Date, default: null },
    lasttime_open_elite_crate: { type: Date, default: null },
    guarantee_item_elite_crate: { type: Number, default: 10 },
    guarantee_item_s_crate: { type: Number, default: 10 },
    guarantee_s_item: { type: Number, default: 50 },
  },
  { _id: false }
);

module.exports = CrateRecordSchema;
