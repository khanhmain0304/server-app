const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopLiveOpsSchema = new Schema(
  {
    event_id: { type: Number, default: 0 },
    event_name: { type: String, default: "" },
    event_start: { type: Number, default: 0 },
    event_start_value: { type: Number, default: 0 },
    event_expiry: { type: Number, default: 0 },
    event_expiry_value: { type: Number, default: 0 },
    event_start_condition: { type: Number, default: 0 },
    event_special_condition: { type: Number, default: 0 },
    event_start_condition_value: { type: Number, default: 0 },
    event_exchange_time: { type: Number, default: 0 },
    items: { type: Schema.Types.Mixed, default: [] },
  },
  { timestamps: true }
);

ShopLiveOpsSchema.methods.getInfo = function getInfo() {
  return {
    event_id: this.event_id,
    event_name: this.event_name,
    event_start: this.event_start,
    event_start_value: this.event_start_value,
    event_expiry: this.event_expiry,
    event_expiry_value: this.event_expiry_value,
    event_start_condition: this.event_start_condition,
    event_special_condition: this.event_special_condition,
    event_start_condition_value: this.event_start_condition_value,
    event_exchange_time: this.event_exchange_time,
    items: this.items
  };
};

const ShopLiveOps = mongoose.model("ShopLiveOps", ShopLiveOpsSchema);

module.exports = { ShopLiveOpsSchema, ShopLiveOps };
