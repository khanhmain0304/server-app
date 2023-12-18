const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    tag: { type: String, unique: true, required: true },
    description: { type: String, default: "" },
    is_deleted: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

CategorySchema.pre(/^find/, function (next) {
  this.find({ is_deleted: { $ne: true } });
  next();
});

CategorySchema.methods.getInfo = function getInfo() {
  return {
    name: this.name,
    tag: this.tag,
    description: this.description,
  };
};

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
