const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const bcrypt = require("bcrypt");

const GameConfigSchema = new Schema(
  {
    //   seq_id: { type: Number, default: 0 },
    name: { type: String, default: null },
    file_name: { type: String, default: null },
    version: { type: String, default: "default" },
    // md5: { type: String, default: null },
    config: { type: Schema.Types.Mixed, default: {} },
    // created_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

GameConfigSchema.methods.getInfo = function getInfo() {
  return {
    // id: this._id,
    // seq_id: this.seq_id,
    name: this.name,
    file_name: this.file_name,
    version: this.version,
    // md5: this.md5,
    config: this.config,
    // created_date: this.created_date,
  };
};


GameConfigSchema.methods.getData = function getData() {
  return {
    config: this.config,
  };
};

const GameConfig = mongoose.model("GameConfig", GameConfigSchema);
module.exports = GameConfig;
