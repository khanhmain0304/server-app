const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
  },
  { _id: false }
);

const BillSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalAmount: { type: Number, default: 0 },
    products: [BillProductSchema],
  },
  { versionKey: false, timestamps: true }
);

BillSchema.pre(/^find/, function (next) {
  this.find({ is_deleted: { $ne: true } });
  next();
});

BillSchema.methods.getInfo = function getInfo() {
  return {
    is_unlocked: this.is_unlocked,
    play_remain: this.play_remain,
  };
};

const Bill = mongoose.model("Bill", BillSchema);
module.exports = Bill;
