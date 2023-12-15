const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubcriptionSchema = new Schema({
  pack_id: { type: Number, default: 0 },
  pack_name: { type: String, default: null },
  purchase_date: { type: Number, default: null },
  expiry_date: { type: Number, default: null },
  bonus: { type: Schema.Types.Mixed, default: [] },
  daily_reward: { type: Schema.Types.Mixed, default: [] },
  last_claim_daily_reward: { type: Number, default: null },
  time_left: { type: Number, default: null },
});

SubcriptionSchema.methods.getInfo = function getInfo() {
  return {
    _id: this._id,
    item_id: this.item_id,
    item_type: this.item_type,
    purchase_date: this.purchase_date,
    expiry_date: this.expiry_date,
  };
};

// const Energy = mongoose.model("Energy", EnergySchema);
// module.exports = Energy;

module.exports = { SubcriptionSchema };
