const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: { type: Number, default: 0 },
  },
  { _id: false }
);

const BillSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    total_amount: { type: Number, default: 0 },
    products: [BillProductSchema],
    is_deleted: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

BillSchema.pre(/^find/, function (next) {
  this.find({ is_deleted: { $ne: true } });
  next();
});

BillSchema.methods.getInfo = function getInfo() {
  return {
    user: this.user,
    total_amount: this.total_amount,
    products: this.products,
  };
};

const Bill = mongoose.model("Bill", BillSchema);
module.exports = Bill;
