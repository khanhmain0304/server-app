require("../config/database")();

const ABSegment = require("../models/abSegment");

const SEGMENT_ID = "default";

const deleteDefaultABSegment = async () => {
  await ABSegment.deleteMany({ segment_id: SEGMENT_ID });
  console.log("Done! deleteDefaultABSegment");
};

const addDefaultABSegment = async () => {
  await ABSegment.create({
    segment_id: SEGMENT_ID,
    game_version: "default",

    normal_chest_2_ads: false,
    normal_chest_5_ads: false,
    rare_chest_1_day: false,
    rare_chest_2_day: false,
    gold_2_ad: false,
    gold_5_ad: false,
    revive_5: false,
    revive_1: false,
    revive_monthly: false,
    reroll_per_battle: false,
    reroll_per_level: false,
    reroll_no_limit: false,
    x_2_reward: false,
    x_n_reward: false,
    x_2_gold_chest: false,
    blue_revolver: false,
    purple_gauntlet: false,
    gold_popup: false,
    chapter_9_min: false,
    kick_start_299: false,
    kick_start_499: false,
    kick_start_shop: false,
    packages_rework: false,
    new_packages: false,
    newbie_starter_price_up: false,
    gems_pack_bonus_up: false,
    monthly_card_rework: false,
    first_time_reward_redesign: false,
    starter_pack_chap1: false,
    make_gif_video: false,
    forced_lose_chap1: false,
    endless_goodies: false,
    live_ops_3: false,
    checkpoint: false,
    no_evo: false,
    limit_pool_skill: false,
    claim_all: false,
    discount_shop_rework: false,
    coupon_shop: false,
    starter_newbie_upsale: false,
    piggy_bank_rework: false,
    endless_goodies_rework: false,
    gold_popup_upgrade: false,
    apply_segment_1002: false,
  });
};

const main = async () => {
  await deleteDefaultABSegment();
  await addDefaultABSegment();

  console.log("Done!");
  process.exit(0);
};

main();
