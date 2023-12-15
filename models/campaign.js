const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TriggerConditionSchema = new Schema(
  {
    condition_type: { type: Number, default: 0 },
    condition_operation: { type: String, default: "=" },
    condition_value: { type: Number, default: 0 },
  },
  { _id: true }
);

const RepeatConditionSchema = new Schema(
  {
    condition_type: { type: Number, default: 0 },
    condition_operation: { type: String, default: "=" },
    condition_value: { type: Number, default: 0 },
  },
  { _id: true }
);

const CampaignReward = new Schema(
  {
    content: { type: String, default: "" },
    item_id: { type: Number, default: 0 },
    item_name: { type: String, default: "" },
    item_type: { type: String, default: "" },
    item_description: { type: String, default: "" },
    item_current_rarity: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    item_super: { type: Boolean, default: false },
  },
  { _id: true }
);

const Restriction = new Schema(
  {
    type: { type: Number, default: 0 },
    operation: { type: String, default: "=" },
    value: { type: String, default: "" },
  },
  { _id: true }
);

const Asset = new Schema(
  {
    type: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    online: { type: Boolean, default: false },
    value: { type: String, default: "" },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
  },
  { _id: true }
);

const PriceSchema = new Schema(
  {
    value: { type: Number, default: 0 },
    price_type: { type: String, default: "IAP" },
  },
  { _id: true }
);

const IAPPack = new Schema(
  {
    id: { type: Number, default: 0 },
    name: { type: String, default: null },
    sku: { type: String, default: null },
    price: { type: PriceSchema, default: null },
    original_price: { type: Number, default: 0 },
    discount_percentage: { type: Number, default: 0 },
    item_list: { type: [CampaignReward], default: [] },
  },
  { _id: true }
);

const CampaignSchema = new Schema({
  // _id

  // iap pack
  id: { type: String, default: null }, // seq auto incre
  name: { type: String, default: null },
  campaign_status: { type: Boolean, default: true },
  description: { type: String, default: null },
  iap_pack: { type: [IAPPack], default: [] },

  // Location
  appear: { type: [String], default: [] },

  // triger
  trigger_condition: { type: [TriggerConditionSchema], default: [] },
  trigger_rule: { type: String, default: "AND" },
  repop_mainmenu: { type: Boolean, default: false },
  repeat_times: { type: Number, default: 0 },

  //
  start: { type: Number, default: 0 },
  end: { type: Number, default: 0 },
  timer: { type: Number, default: 0 },
  buy_chances: { type: Number, default: 1 },
  order: { type: Number, default: 0 },
  // repeat: { type: Boolean, default: false },
  // repeat_times: { type: Number, default: 0 },
  // repeat_cooldown: { type: Number, default: 0 },

  repeat_condition: { type: [RepeatConditionSchema], default: [] },

  // reward

  // restriction
  restriction: { type: [Restriction], default: [] },

  // restriction tag
  restriction_tag: { type: [String], default: [] },

  // restriction
  asset: { type: [Asset], default: [] },
  template: { type: Number, default: 0 },
});

CampaignSchema.methods.getInfo = function getInfo() {
  return {
    id: this.id,
    name: this.name,
    description: this.description,
    campaign_status: this.campaign_status,
    // price: this.price,
    // original_price: this.original_price,
    // discount_percentage: this.discount_percentage,
    // sku: this.sku,
    // item_list: this.item_list,

    iap_pack: this.iap_pack,

    // Location
    appear: this.appear,

    // triger
    trigger_condition: this.trigger_condition,
    trigger_rule: this.trigger_rule,

    repop_mainmenu: this.repop_mainmenu,
    repeat_times: this.repeat_times,
    //
    start: this.start,
    end: this.end,
    timer: this.timer,
    buy_chances: this.buy_chances,
    order: this.order,
    // repeat: this.repeat,
    // repeat_times: this.repeat_times,
    // repeat_cooldown: this.repeat_cooldown,

    repeat_condition: this.repeat_condition,

    // reward

    // restriction
    // restriction: this.restriction,

    // restriction tag
    restriction_tag: this.restriction_tag,

    // restriction
    asset: this.asset,
    template: this.template,
  };
};

CampaignSchema.methods.getAllInfo = function getAllInfo() {
  return {
    _id: this._id,
    id: this.id,
    name: this.name,
    description: this.description,
    campaign_status: this.campaign_status,

    // price: this.price,
    // original_price: this.original_price,
    // discount_percentage: this.discount_percentage,
    // sku: this.sku,
    // item_list: this.item_list,

    iap_pack: this.iap_pack,

    // Location
    appear: this.appear,

    // triger
    trigger_condition: this.trigger_condition,
    trigger_rule: this.trigger_rule,

    repop_mainmenu: this.repop_mainmenu,
    repeat_times: this.repeat_times,
    //
    start: this.start,
    end: this.end,
    timer: this.timer,
    buy_chances: this.buy_chances,
    order: this.order,
    // repeat: this.repeat,
    // repeat_times: this.repeat_times,
    // repeat_cooldown: this.repeat_cooldown,

    repeat_condition: this.repeat_condition,

    // reward

    // restriction
    restriction: this.restriction,

    // restriction tag
    restriction_tag: this.restriction_tag,

    // restriction
    asset: this.asset,
    template: this.template,
  };
};

const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = Campaign;
