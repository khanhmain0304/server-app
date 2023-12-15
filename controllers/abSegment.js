const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const Message = require("../config/message");

const ABSegment = require("../models/abSegment");

// const { json } = require("body-parser");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const User = require("../models/user");
// const Types = require("../config/types");

// =====================================================================================
const getABSegment = async (req, res, next) => {
  try {
    console.log("test");
    let { ab_test_segment, game_version } = req.body;
    ab_test_segment = ab_test_segment ? ab_test_segment : "default";
    game_version = game_version ? game_version : "default";
    console.log(ab_test_segment, game_version);

    await User.findByIdAndUpdate(req.user_jwt.user_id, {
      game_segment: ab_test_segment,
      game_version,
    });

    let aBSegment = await ABSegment.findOne({ segment_id: ab_test_segment, game_version });

    if (!aBSegment) {
      aBSegment = await ABSegment.findOne({ segment_id: ab_test_segment }, null, { sort: { _id: -1 } });
      console.log("override", { segment_id: ab_test_segment, game_version: "default" });
    }

    if (!aBSegment) {
      aBSegment = await ABSegment.findOne({ segment_id: "default", game_version: "default" });
      console.log("override 2", { segment_id: "default", game_version: "default" });
    }

    if (!aBSegment) {
      aBSegment = {
        segment_id: "default",
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
        chapter_9_min_2: false,
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
      };
    }

    console.log("final segment", { segment_id: aBSegment.segment_id, game_version: aBSegment.game_version });

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...aBSegment.getInfo(),
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.AB_SEGMENT_NOT_FOUND, Message.AB_SEGMENT_NOT_FOUND);
  }
};

const getABSegmentFunc = async (ab_test_segment, game_version) => {
  try {
    console.log("getABSegmentFunc", ab_test_segment, game_version);

    let aBSegment = await ABSegment.findOne({ segment_id: ab_test_segment, game_version });

    if (!aBSegment) {
      aBSegment = await ABSegment.findOne({ segment_id: ab_test_segment }, null, { sort: { _id: -1 } });
      console.log("override", { segment_id: ab_test_segment, game_version: "default" });
    }

    if (!aBSegment) {
      aBSegment = await ABSegment.findOne({ segment_id: "default", game_version: "default" });
      console.log("override 2", { segment_id: "default", game_version: "default" });
    }

    if (!aBSegment) {
      console.log("override 3");
      aBSegment = {
        segment_id: "default",
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
      };
    }

    console.log("final segment", { segment_id: aBSegment.segment_id, game_version: aBSegment.game_version });

    return aBSegment;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  getABSegment,
  getABSegmentFunc,
};
