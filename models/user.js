const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    seq_id: { type: Number, default: 0 },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    avatar: { type: String, default: "" },
    is_deleted: { type: Boolean, default: false },
    jwt_token: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.pre(/^find/, function (next) {
  this.find({ is_deleted: { $ne: true } });
  next();
});

UserSchema.methods.getInfo = function getInfo() {
  return {
    email: this.email,
    name: this.name,
    phone: this.phone,
    address: this.address,
    avatar: this.avatar,
  };
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
