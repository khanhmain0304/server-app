const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var moment = require("moment"); // require

const EnergySchema = new Schema(
  {
    energy_restore_rate: { type: Number, default: 1200 },
    // subcription_max_energy_amount: { type: Number, default: 0 },
    // subcription_energy_restore_rate: { type: Number, default: 0 },
    // energy_received_ads: { type: Number, default: 0 },
    // energy_received_gem: { type: Number, default: 0 },
    // energy_received_accountlevelup: { type: Number, default: 0 },
    // energy_cost_stage: { type: Number, default: 0 },
    // energy_cost_challenge: { type: Number, default: 0 },
    // energy_cost_quickpatrol: { type: Number, default: 0 },
    max_energy_amount: { type: Number, default: 30 },
    energy_gem_remain: { type: Number, default: 3 },
    energy_ads_remain: { type: Number, default: 3 },
    last_energy_buy_date: {
      type: Number,
      default: function () {
        return moment().unix();
      },
    },
    last_energy_regen_date: {
      type: Number,
      default: function () {
        return moment().unix();
      },
    },
    next_energy_regen_date: {
      type: Number,
      default: function () {
        return 0;
      },
    },
  },
  { timestamps: true, _id: false }
);

EnergySchema.methods.getInfo = function getInfo() {
  return {
    max_energy_amount: this.max_energy_amount,
    energy_gem_remain: this.energy_gem_remain,
    energy_ads_remain: this.energy_ads_remain,
    last_energy_buy_date: this.last_energy_ads_date,
    last_energy_regen_date: this.last_energy_regen_date,
    next_energy_regen_date: this.next_energy_regen_date,
  };
};

// const Energy = mongoose.model("Energy", EnergySchema);
// module.exports = Energy;

module.exports = { EnergySchema };
