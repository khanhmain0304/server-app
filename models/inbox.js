const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserInboxSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId },
  title: { type: String, default: null },
  message: { type: String, default: null },
  items: { type: Schema.Types.Mixed, default: [] },
  expiry_time: { type: Number, default: 0 },
  status: { type: Number, default: 0 },
});

UserInboxSchema.methods.getInfo = function getInfo() {
  return {
    user_id: this.user_id,
    title: this.title,
    message: this.message,
    items: this.items,
    expiry_time: this.expiry_time,
    status: this.status,
  };
};

const UserInbox = mongoose.model("UserInbox", UserInboxSchema);

module.exports = { UserInboxSchema, UserInbox };
