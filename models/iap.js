const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const bcrypt = require("bcrypt");

const IAPSchema = new Schema(
  {
    //   seq_id: { type: Number, default: 0 },
    user_id: { type: Schema.Types.ObjectId },
    payload: { type: Schema.Types.Mixed, default: {} },
    store: { type: String, default: null },
    transaction_id: { type: String, default: null },
    merchant: { type: String, default: null },
    device_type: { type: String, default: null },
    status: {type: Number, default: 0},
    info: { type: String, default: null },
    gaia: {  type: Schema.Types.Mixed, default: {} },
    iap_pack_id: { type: Number, default: 0 },
  },
  { timestamps: true }
);

IAPSchema.methods.getInfo = function getInfo() {
  return {
    id: this._id,
    user_id: this.user_id,
    payload: this.payload,
    store: this.store,
    transaction_id: this.transaction_id,
    merchant: this.merchant,
    device_type: this.device_type,
    status: this.status,
    info: this.info,
    gaia: this.gaia,
    iap_pack_id: this.iap_pack_id,

  };
};

const IAP = mongoose.model("IAP", IAPSchema);
module.exports = IAP;
