const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LiveOpsEventSchema = new Schema(
  {
    event_id: { type: Number, default: 0 },
    event_start: { type: Number, default: 0 },
    event_start_value: { type: Number, default: 0 },
    event_expiry: { type: Number, default: 0 },
    event_expiry_value: { type: Number, default: 0 },
    event_special_condition: { type: Number, default: 0 },
    event_special_condition_value: { type: Number, default: 0 },
    event_exchange_time: { type: Number, default: 0 },
    event_token: { type: Number, default: 0 },
    event_ticket: { type: Number, default: 0 },
    event_sign_in: { type: Schema.Types.Mixed, default: {} },
    event_mission: { type: Schema.Types.Mixed, default: [] },
    event_lottery: { type: Schema.Types.Mixed, default: {} },
    event_exchange: { type: Schema.Types.Mixed, default: [] },
    event_shop: { type: Schema.Types.Mixed, default: [] },
    event_daily_discount: { type: Schema.Types.Mixed, default: [] },
  },
  { timestamps: true }
);

LiveOpsEventSchema.methods.getInfo = function getInfo() {
  return {
    event_id: this.event_id,
    event_start: this.event_start,
    event_start_value: this.event_start_value,
    event_expiry: this.event_expiry,
    event_expiry_value: this.event_expiry_value,
    event_special_condition: this.event_special_condition,
    event_special_condition_value: this.event_special_condition_value,
    event_exchange_time: this.event_exchange_time,
    event_token: this.event_token,
    event_ticket: this.event_ticket,
    event_sign_in: this.event_sign_in,
    event_mission: this.event_mission,
    event_lottery: this.event_lottery,
    event_exchange: this.event_exchange,
    event_shop: this.event_shop,
  };
};

const LiveOpsEvent = mongoose.model("LiveOpsEvent", LiveOpsEventSchema);

module.exports = { LiveOpsEventSchema, LiveOpsEvent };
