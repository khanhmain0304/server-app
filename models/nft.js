const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Set = require("../models/set");

const NFTSchema = new Schema({
  seq_id: { type: Number, default: 0, unique: true, },
  nft_id: { type: Number, default: -1 },
  set_id: { type: String, default: "" },
  set_seq_id: { type: Number, default: -1 },
  owner: { type: String, default: "" },
  rarity: { type: Number, default: 0 },
  chain_id: { type: Number, default: -1 },
  status: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now },
});


NFTSchema.methods.getInfo = function getInfo() {
  return {
    id: this.nft_id,
    // seq_id: this.seq_id,
    // set_id: this.set_id,
    owner: this.owner,
    rarity: this.rarity,
    chain_id: this.chain_id,
    set_seq_id: this.set_seq_id,
  }
}

NFTSchema.methods.getMetadata = function getMetadata() {
  return {
    id: this.nft_id,
    // seq_id: this.seq_id,
    // set_id: this.set_id,
    owner: this.owner,
    rarity: this.rarity,
    chain_id: this.chain_id,
    set_seq_id: this.set_seq_id,
  }
}


const NFT = mongoose.model("NFT", NFTSchema);
module.exports = NFT;
