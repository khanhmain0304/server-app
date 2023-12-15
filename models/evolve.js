const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Stat } = require("../config/types");

// const statType = [Stat.HP, Stat.ATK, Stat.ARMOR, Stat.MEAT_HEAL];

const BonusStatSchema = new Schema(
  {
    stat_type: {
      type: String,
      // enum: statType,
    },
    value: { type: Number, default: 0 },
  },
  { _id: false }
);

const EvolveSchema = new Schema(
  {
    current_level: { type: Number, default: 0 },
    current_evolve_id: { type: Number, default: 0 },
    current_key_evolve_id: { type: Number, default: 0 },
    bonus_stats: {
      type: [BonusStatSchema],
      default: [
        {
          stat_type: "Hp",
          value: 0,
        },
        {
          stat_type: "Atk",
          value: 0,
        },
        {
          stat_type: "Armor",
          value: 0,
        },
        {
          stat_type: "MeatHeal",
          value: 0,
        },
      ],
    },
    key_evolve: { type: [Number], default: [] },
  },
  { _id: false }
);

module.exports = EvolveSchema;
