const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    inventory_quantity: { type: Number, default: 0 },
    imageUrl: { type: String, default: "" },
    is_deleted: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

ProductSchema.pre(/^find/, function (next) {
  this.find({ is_deleted: { $ne: true } });
  next();
});

ProductSchema.methods.getInfo = function getInfo() {
  return {
    name: this.name,
    description: this.description,
    price: this.price,
    inventory_quantity: this.inventory_quantity,
    imageUrl: this.imageUrl,
  };
};

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
