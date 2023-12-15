const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const bcrypt = require("bcrypt");

const GameVersionSchema = new Schema({
  // seq_id: { type: Number, default: 0 },
  client_id: { type: String, default: null },
  server_url: { type: String, default: "http://a00c96e671ef44ed0987d8deab99c2d9-896151166.us-west-2.elb.amazonaws.com" },
  server_env: { type: String, default: "alpha" },
  tracking_url: { type: String, default: "https://dev.events.nmg1.data.bagelcode.com/v1/events" },
  tracking_env: { type: String, default: "dev" },
  tracking_region: { type: String, default: "nmg1" },
  is_valid: { type: Boolean, default: true },
  config: { type: Schema.Types.Mixed, default: [] },
  force_absegment: { type: Number, default: 0 },
  // created_date: { type: Date, default: Date.now },
});

GameVersionSchema.methods.getInfo = function getInfo() {
  return {
    // id: this._id,
    // seq_id: this.seq_id,
    client_id: this.client_id,
    server_url: this.server_url,
    server_env: this.server_env,
    tracking_url: this.tracking_url,
    tracking_env: this.tracking_env,
    tracking_region: this.tracking_region,
    is_valid: this.is_valid,
    config: this.config,
    force_absegment: this.force_absegment,
    // created_date: this.created_date,
  };
};

GameVersionSchema.methods.getMD5 = function getMD5() {
  return {
    // id: this._id,
    // seq_id: this.seq_id,
    // client_id: this.client_id,
    // server_url: this.server_url,
    // server_env: this.server_env,
    // tracking_url: this.tracking_url,
    // tracking_env: this.tracking_env,
    // tracking_region: this.tracking_region,
    // is_valid: this.is_valid,
    config: this.config,
    // force_absegment: this.force_absegment,
    // created_date: this.created_date,
  };
};

const GameVersion = mongoose.model("GameVersion", GameVersionSchema);
module.exports = GameVersion;
