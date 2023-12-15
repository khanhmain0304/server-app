const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const item = new Schema(
    {
      max_energy_amount: { type: Number, default: 30 },
      energy_gem_remain: { type: Number, default: 0 },
      energy_ads_remain: { type: Number, default: 0 },
      last_energy_buy_date: { type: Date, default: null },
      last_energy_regen_date: { type: Number, default: 0 },
      next_energy_regen_date: { type: Number, default: 0 },
    }
  );


const RewardSchema = new Schema(
  {
    max_energy_amount: { type: Number, default: 30 },
    energy_gem_remain: { type: Number, default: 0 },
    energy_ads_remain: { type: Number, default: 0 },
    last_energy_buy_date: { type: Date, default: null },
    last_energy_regen_date: { type: Number, default: 0 },
    next_energy_regen_date: { type: Number, default: 0 },
  }
);

RewardSchema.methods.getInfo = function getInfo() {
  return {
    max_energy_amount: this.max_energy_amount,
    energy_gem_remain: this.energy_gem_remain,
    energy_ads_remain: this.energy_ads_remain,
    last_energy_buy_date: this.last_energy_ads_date,
    last_energy_regen_date: this.last_energy_regen_date,
    next_energy_regen_date: this.next_energy_regen_date
  };
};



module.exports = { RewardSchema };
