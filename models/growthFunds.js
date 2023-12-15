const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrowthFundsSchema = new Schema({
  _id: { type: Number, default: 0 },
  pack_id: { type: Number, default: 0 },
  pack_name: { type: String, default: null },
  progress: { type: [Number], default: [] },
  status: { type: Boolean, default: false },
});

GrowthFundsSchema.methods.getInfo = function getInfo() {
  return {
    pack_id: this.pack_id,
    pack_name: this.pack_name,
    progress: this.progress,
    status: this.status,
  };
};

// const Energy = mongoose.model("Energy", EnergySchema);
// module.exports = Energy;

module.exports = { GrowthFundsSchema };
