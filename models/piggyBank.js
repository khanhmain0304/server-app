const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PiggyBankSchema = new Schema({
  pack_id: { type: Number, default: 30001501 },
  pack_name: { type: String, default: "Gold Piggy (S)" },
  expiry_date: { type: Number, default: null },
  current_gem: { type: Number, default: 160 },
  current_progress: { type: Number, default: 0 },
  current_value: { type: Number, default: 2 },
});

PiggyBankSchema.methods.getInfo = function getInfo() {
  return {
    _id: this._id,
    pack_name: this.pack_name,
    expiry_date: this.expiry_date,
    current_gem: this.current_gem,
    current_progress: this.current_progress,
    current_value: this.current_value,
  };
};

// const Energy = mongoose.model("Energy", EnergySchema);
// module.exports = Energy;

module.exports = { PiggyBankSchema };
