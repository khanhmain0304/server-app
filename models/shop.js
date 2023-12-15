const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyShopSchema = new Schema(
  {
    date: { type: String, default: null },
    item_list: { type: Schema.Types.Mixed, default: [] },
  },
  { _id: false }
);

module.exports = DailyShopSchema;
