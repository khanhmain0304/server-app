const mongoose = require("mongoose");

var CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

// CounterSchema.statics.initCounter = async function initCounter() {
//   const counter = await this.findById("users_count");

//   if (counter) {
//     console.log("[DB] Counter already initialized!");
//     return counter.seq;
//   } else {
//     const createCounter = await this.create({ _id: "users_count", seq: 0 });
//     if (createCounter) {
//       console.log("[DB] Counter initialized!");
//       return createCounter.seq;
//     } else {
//       console.error("[DB] Counter initialize failed!");
//     }
//   }
// };

CounterSchema.statics.getNextValue = async function getNextValue(seqName) {
  const nextValue = await this.findByIdAndUpdate(
    seqName,
    { $inc: { seq: 1 } },
    { new: true }
  );

  if (nextValue) {
    return nextValue.seq;
  } else {
    const counter = await this.findById(seqName);

    if (counter) {
      console.log("[DB] Counter already initialized!");
      return counter.seq;
    } else {
      const createCounter = await this.create({ _id: seqName, seq: 0 });
      if (createCounter) {
        console.log("[DB] Counter initialized!");
        return createCounter.seq;
      } else {
        console.error("[DB] Counter initialize failed!");
      }
    }
  }
};

var Counter = mongoose.model("Counter", CounterSchema);

module.exports = Counter;
