const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SetSchema = new Schema({
  seq_id: { type: Number, default: 0, unique: true, },
  render_id: { type: Number, default: 0, unique: true, },
  // set_id: { type: String },
  description: { type: String },
  name: { type: String },
  image: { type: String },
  thumbnail: { type: String },
  items: { type: [Schema.Types.Mixed] },
  status: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now },
});


SetSchema.methods.getInfo = function getInfo() {
  return {
    id: this.seq_id,
    // set_id: this.set_id,
    render_id: this.render_id,
    description: this.description,
    name: this.name,
    image: this.image,
    thumbnail: this.thumbnail,
    items: this.items,
    // status: this.status
  }
}


SetSchema.methods.getMetadata = function getMetadata() {
  return {
    // id: this._id,
    // id: this.set_id,
    description: this.description,
    name: this.name,
    image: this.image,
    thumbnail: this.thumbnail,
    items: this.items,
  }
}


const Set = mongoose.model("Set", SetSchema);
module.exports = Set;
