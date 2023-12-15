const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ABSegmentSchema = new Schema({
  segment_id: { type: String, default: null },
  game_version: { type: String, default: null },

  normal_chest_2_ads: { type: Boolean, default: false },
  normal_chest_5_ads: { type: Boolean, default: false },
  rare_chest_1_day: { type: Boolean, default: false },
  rare_chest_2_day: { type: Boolean, default: false },
  gold_2_ad: { type: Boolean, default: false },
  gold_5_ad: { type: Boolean, default: false },
  revive_5: { type: Boolean, default: false },
  revive_1: { type: Boolean, default: false },
  revive_monthly: { type: Boolean, default: false },
  reroll_per_battle: { type: Boolean, default: false },
  reroll_per_level: { type: Boolean, default: false },
  reroll_no_limit: { type: Boolean, default: false },
  x_2_reward: { type: Boolean, default: false },
  x_n_reward: { type: Boolean, default: false },
  x_2_gold_chest: { type: Boolean, default: false },
  blue_revolver: { type: Boolean, default: false },
  purple_gauntlet: { type: Boolean, default: false },
  gold_popup: { type: Boolean, default: false },
  chapter_9_min: { type: Boolean, default: false },
  chapter_9_min_2: { type: Boolean, default: false },
  kick_start_299: { type: Boolean, default: false },
  kick_start_499: { type: Boolean, default: false },
  kick_start_shop: { type: Boolean, default: false },
  packages_rework: { type: Boolean, default: false },
  new_packages: { type: Boolean, default: false },
  newbie_starter_price_up: { type: Boolean, default: false },
  gems_pack_bonus_up: { type: Boolean, default: false },
  monthly_card_rework: { type: Boolean, default: false },
  first_time_reward_redesign: { type: Boolean, default: false },
  starter_pack_chap1: { type: Boolean, default: false },
  make_gif_video: { type: Boolean, default: false },
  forced_lose_chap1: { type: Boolean, default: false },
  endless_goodies: { type: Boolean, default: false },
  live_ops_3: { type: Boolean, default: false },
  checkpoint: { type: Boolean, default: false },
  no_evo: { type: Boolean, default: false },
  limit_pool_skill: { type: Boolean, default: false },
  claim_all: { type: Boolean, default: false },

  discount_shop_rework: { type: Boolean, default: false },
  coupon_shop: { type: Boolean, default: false },
  starter_newbie_upsale: { type: Boolean, default: false },
  piggy_bank_rework: { type: Boolean, default: false },
  endless_goodies_rework: { type: Boolean, default: false },
  gold_popup_upgrade: { type: Boolean, default: false },
  apply_segment_1002: { type: Boolean, default: false },
  total_price_rework: { type: Boolean, default: false },
  package_expire_faster: { type: Boolean, default: false },
  new_event_unlock: { type: Boolean, default: false },

  rebalance_1311: { type: Boolean, default: false },
  force_skill_2: { type: Boolean, default: false },
  limit_pool_skill_2: { type: Boolean, default: false },
});

ABSegmentSchema.methods.getInfo = function getInfo() {
  return {
    segment_id: this.segment_id,
    game_version: this.game_version,

    normal_chest_2_ads: this.normal_chest_2_ads,
    normal_chest_5_ads: this.normal_chest_5_ads,
    rare_chest_1_day: this.rare_chest_1_day,
    rare_chest_2_day: this.rare_chest_2_day,
    gold_2_ad: this.gold_2_ad,
    gold_5_ad: this.gold_5_ad,
    revive_5: this.revive_5,
    revive_1: this.revive_1,
    revive_monthly: this.revive_monthly,
    reroll_per_battle: this.reroll_per_battle,
    reroll_per_level: this.reroll_per_level,
    reroll_no_limit: this.reroll_no_limit,
    x_2_reward: this.x_2_reward,
    x_n_reward: this.x_n_reward,
    x_2_gold_chest: this.x_2_gold_chest,
    blue_revolver: this.blue_revolver,
    purple_gauntlet: this.purple_gauntlet,
    gold_popup: this.gold_popup,
    chapter_9_min: this.chapter_9_min,
    chapter_9_min_2: this.chapter_9_min_2,
    kick_start_299: this.kick_start_299,
    kick_start_499: this.kick_start_499,
    kick_start_shop: this.kick_start_shop,
    packages_rework: this.packages_rework,
    new_packages: this.new_packages,
    newbie_starter_price_up: this.newbie_starter_price_up,
    gems_pack_bonus_up: this.gems_pack_bonus_up,
    monthly_card_rework: this.monthly_card_rework,
    first_time_reward_redesign: this.first_time_reward_redesign,
    starter_pack_chap1: this.starter_pack_chap1,
    make_gif_video: this.make_gif_video,
    forced_lose_chap1: this.forced_lose_chap1,
    endless_goodies: this.endless_goodies,
    live_ops_3: this.live_ops_3,
    checkpoint: this.checkpoint,
    no_evo: this.no_evo,
    limit_pool_skill: this.limit_pool_skill,
    claim_all: this.claim_all,

    // 2.8
    discount_shop_rework: this.discount_shop_rework,
    coupon_shop: this.coupon_shop,
    starter_newbie_upsale: this.starter_newbie_upsale,
    piggy_bank_rework: this.piggy_bank_rework,
    endless_goodies_rework: this.endless_goodies_rework,
    gold_popup_upgrade: this.gold_popup_upgrade,

    // 2.7
    apply_segment_1002: this.apply_segment_1002,

    // 2.9
    total_price_rework: this.total_price_rework,
    package_expire_faster: this.package_expire_faster,
    new_event_unlock: this.new_event_unlock,


    rebalance_1311: this.rebalance_1311,
    force_skill_2: this.force_skill_2,
    limit_pool_skill_2: this.limit_pool_skill_2,


  };
};

const ABSegment = mongoose.model("ABSegment", ABSegmentSchema);

module.exports = ABSegment;
