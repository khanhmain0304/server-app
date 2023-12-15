const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscribeSchema = new Schema({
  seq_id: { type: Number, default: 0 },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  unsubscribe: { type: Boolean, default: false},
  created_date: { type: Date, default: Date.now },
});

SubscribeSchema.methods.getInfo = function getInfo() {
  return {
    id: this._id,
    seq_id: this.seq_id,
    email: this.email,
    name: this.name,
    unsubscribe: this.unsubscribe,
    created_date: this.created_date,

  }
}

const Subscribe = mongoose.model("Subscribe", SubscribeSchema);
module.exports = Subscribe;
