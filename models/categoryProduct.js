const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryProductSchema = new Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true, versionKey: false }
);

CategoryProductSchema.methods.getInfo = function getInfo() {
  return {
    category: this.category,
    product: this.product,
  };
};

const CategoryProduct = mongoose.model("CategoryProduct", CategoryProductSchema);

module.exports = CategoryProduct;
