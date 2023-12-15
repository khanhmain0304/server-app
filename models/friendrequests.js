const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  sender: { type: Schema.Types.ObjectId },
  receiver: { type: Schema.Types.ObjectId },
  created_date: { type: Date, default: Date.now },
});


FriendRequestSchema.methods.getInfo = function getInfo() {
  return {
    // id: this._id,
    sender: this.sender,
    // receiver: this.receiver,
  }
}

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);
module.exports = FriendRequest;
