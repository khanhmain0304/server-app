const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfflineEarningSchema = new Schema(
  {
    last_received_patrol: { type: Number, default: null },
    last_get_patrol: { type: Number, default: null },
    recent_gold_patrol: { type: Number, default: 0 },
    recent_exp_patrol: { type: Number, default: 0 },
    recent_random_designs: { type: Number, default: 0 },
    recent_random_equipments: { type: Number, default: 0 },
  },
  { _id: false }
);

module.exports = OfflineEarningSchema;
