const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var moment = require("moment"); // require

const GoldMineSchema = new Schema(
  {
    is_unlocked: { type: Boolean, default: false },
    play_remain: { type: Number, default: 2 },
    last_play_date: {
      type: Number,
      default: function () {
        return moment().unix();
      },
    },
  },
  { timestamps: true, _id: false }
);

GoldMineSchema.methods.getInfo = function getInfo() {
  return {
    is_unlocked: this.is_unlocked,
    play_remain: this.play_remain,
  };
};

// const Energy = mongoose.model("Energy", EnergySchema);
// module.exports = Energy;

module.exports = { GoldMineSchema };
