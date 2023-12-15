const moment = require("moment");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const Message = require("../config/message");
const Types = require("../config/types");

const Campaign = require("../models/campaign");
const GameConfig = require("../models/gameConfig");

// const { json } = require("body-parser");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const User = require("../models/user");
// const Types = require("../config/types");
const { alternateGameConfig } = require("../helper/alternate_config");
const IAP = require("../models/iap");

const operationsMap = {
  ">=": (a, b) => a >= b,
  "<=": (a, b) => a <= b,
  ">": (a, b) => a > b,
  "<": (a, b) => a < b,
  "!=": (a, b) => a != b,
  "=": (a, b) => {
    if (Array.isArray(a)) {
      return a.includes(Number(b));
    } else {
      return a == b;
    }
  },
};

const checkRestrictionFunc = async (restriction, compare_field, check_restriction) => {
  if (check_restriction) {
    const operationFunction = operationsMap[restriction.operation];
    if (operationFunction && !operationFunction(compare_field, restriction.value)) {
      // console.log(`fail compare ${compare_field} ${restriction.operation} ${restriction.value}`);
      check_restriction = false;
    }
  }
  return check_restriction;
};
//   if (check_restriction) {
//     if (restriction.operation == ">=") {
//       if (compare_field < restriction.value) {
//         console.log("fail compare 1");
//         check_restriction = false;
//       }
//     } else if (restriction.operation == "<=") {
//       if (compare_field > restriction.value) {
//         console.log("fail compare 2");
//         check_restriction = false;
//       }
//     } else if (restriction.operation == ">") {
//       if (compare_field <= restriction.value) {
//         console.log("fail compare 3");
//         check_restriction = false;
//       }
//     } else if (restriction.operation == "<") {
//       if (compare_field >= restriction.value) {
//         console.log("fail compare 4");
//         check_restriction = false;
//       }
//     } else if (restriction.operation == "!=") {
//       if (compare_field == restriction.value) {
//         console.log("fail compare 5");
//         check_restriction = false;
//       }
//     } else {
//       if (compare_field.length > 0) {
//         if (!compare_field.includes(Number(restriction.value))) {
//           console.log("fail compare 6");
//           check_restriction = false;
//         }
//       } else {
//         if (compare_field != restriction.value) {
//           console.log("fail compare 7");
//           check_restriction = false;
//         }
//       }
//     }
//   }

//   return check_restriction;
// };

const checkRestriction = async (user, campaigns) => {
  let final_campaign = [];
  for (const campaign of campaigns) {
    // console.log(campaign.id);
    if (!campaign.campaign_status) continue;
    let check_restriction = true;
    for (const restriction of campaign.restriction) {
      switch (restriction.type) {
        case Types.Restriction.USER_ID:
          check_restriction = await checkRestrictionFunc(restriction, user.seq_id, check_restriction);
          break;
        case Types.Restriction.LEVEL:
          check_restriction = await checkRestrictionFunc(restriction, user.level, check_restriction);
          break;
        case Types.Restriction.DEVICE_OS:
          check_restriction = await checkRestrictionFunc(restriction, user.device_os, check_restriction);
          break;
        case Types.Restriction.VERSION:
          check_restriction = await checkRestrictionFunc(restriction, user.game_version, check_restriction);
          break;
        case Types.Restriction.SEGMENT_CURRENT:
          check_restriction = await checkRestrictionFunc(restriction, user.game_segment, check_restriction);
          break;
        case Types.Restriction.SEGMENT_PAST:
          break;
        case Types.Restriction.MEMBER_SINCE:
          check_restriction = await checkRestrictionFunc(restriction, moment(user.created_date).unix(), check_restriction);
          break;
        case Types.Restriction.COUNTRY:
          check_restriction = await checkRestrictionFunc(restriction, user.country, check_restriction);
          break;
        case Types.Restriction.LANGUAGE:
          check_restriction = await checkRestrictionFunc(restriction, user.language, check_restriction);
          break;
        case Types.Restriction.GEM_SUM:
          check_restriction = await checkRestrictionFunc(restriction, Number(user.paid_gem) + Number(user.free_gem), check_restriction);
          break;
        case Types.Restriction.GEM_CURRENT:
          check_restriction = await checkRestrictionFunc(restriction, user.gem, check_restriction);
          break;
        case Types.Restriction.GOLD_SUM:
          check_restriction = await checkRestrictionFunc(restriction, Number(user.paid_gold) + Number(user.free_gold), check_restriction);
          break;
        case Types.Restriction.GOLD_CURRENT:
          check_restriction = await checkRestrictionFunc(restriction, user.gold, check_restriction);
          break;
        case Types.Restriction.EQUIPMENTS:
          break;
        case Types.Restriction.HIGHEST_STAGE:
          check_restriction = await checkRestrictionFunc(restriction, user.data_stage.id_stage_current, check_restriction);
          break;
        case Types.Restriction.LOCAL_TIME:
          check_restriction = await checkRestrictionFunc(restriction, user.timezone_offset, check_restriction);
          break;
        case Types.Restriction.HIGHEST_PURCHASE_AMOUNT:
          check_restriction = await checkRestrictionFunc(restriction, user.iap_max_spend, check_restriction);
          break;
        case Types.Restriction.FAVORITE_PURCHASE_AMOUNT:
          break;
        case Types.Restriction.PURCHASE_COUNT:
          check_restriction = await checkRestrictionFunc(restriction, user.purchase_count, check_restriction);
          break;
        case Types.Restriction.LOGIN_COUNT:
          check_restriction = await checkRestrictionFunc(restriction, user.login_count, check_restriction);
          break;
        case Types.Restriction.LTV:
          check_restriction = await checkRestrictionFunc(restriction, user.iap_spend, check_restriction);
          break;
        case Types.Restriction.DAILY_SPEND:
          let total_days = Math.floor((new Date().getTime() - new Date(user.created_date).getTime()) / (1000 * 3600 * 24));
          let daily_spend = user.iap_spend / total_days;

          check_restriction = await checkRestrictionFunc(restriction, daily_spend, check_restriction);
          break;
        case Types.Restriction.PACK_PURCHASED:
          let bought_iap_pack = await IAP.find({
            user_id: user._id,
            status: 3,
          });

          let bought_iap_pack_id = [];
          for (const pack of bought_iap_pack) {
            bought_iap_pack_id.push(pack.iap_pack_id);
          }

          check_restriction = await checkRestrictionFunc(restriction, bought_iap_pack_id, check_restriction);
          break;
        case Types.Restriction.CURRENT_ENERGY:
          check_restriction = await checkRestrictionFunc(restriction, user.energy, check_restriction);
          break;
        case Types.Restriction.HIGHEST_EQUIPMENT_RARITY:
          let max_equipment = user.equipment.items.reduce((max, obj) => (obj.item_current_rarity > max.item_current_rarity ? obj : max), user.equipment.items[0]);

          let highest_equipment_rarity = 1;

          if (max_equipment) {
            highest_equipment_rarity = max_equipment.item_current_rarity;
          }

          check_restriction = await checkRestrictionFunc(restriction, highest_equipment_rarity, check_restriction);
          break;
        case Types.Restriction.HIGHEST_WEAPON_RARITY:
          let max_weapon = user.equipment.items.reduce((max, obj) => {
            if (obj.item_type == Types.Item.WEAPON && obj.item_current_rarity > max.item_current_rarity) {
              return obj;
            }
            return max;
          }, user.equipment.items[0]);

          let highest_weapon_rarity = 1;

          if (max_weapon) {
            highest_weapon_rarity = max_weapon.item_current_rarity;
          }

          check_restriction = await checkRestrictionFunc(restriction, highest_weapon_rarity, check_restriction);
          break;
        case Types.Restriction.HIGHEST_EQUIPMENT_LEVEL:
          let max_level = user.equipment.items.reduce((max, obj) => (obj.level > max.level ? obj : max), user.equipment.items[0]);
          let highest_equipment_level = 1;
          if (max_level) {
            highest_equipment_level = max_level.level;
          }

          check_restriction = await checkRestrictionFunc(restriction, highest_equipment_level, check_restriction);
          break;
        case Types.Restriction.S_EQUIPMENT_AMOUNT:
          let list_s_equipment = user.equipment.items.filter((item) => item.item_super);

          check_restriction = await checkRestrictionFunc(restriction, list_s_equipment.length, check_restriction);
          break;
        default:
          break;
      }

      if (!check_restriction) break;
    }

    if (check_restriction) {
      // start end
      if (!campaign.start) {
        campaign.start = 0;
      }
      if (!campaign.end) {
        campaign.end = 0;
      }

      if (campaign.template == Types.CampaignTemplate.TEMPLATE_5) {
        let final_iap_pack = await calReactiveMergeIAPPackFunc(user, campaign);

        if (final_iap_pack) {
          campaign.iap_pack = [final_iap_pack];

          const found = final_campaign.find((element) => element.template == Types.CampaignTemplate.TEMPLATE_5);

          if (!found) {
            final_campaign.push({ ...campaign.getInfo() });
          }
        }
        //
      } else if (campaign.template == Types.CampaignTemplate.TEMPLATE_6) {
        let final_iap_pack = await calReactiveYWDNTIAPPackFunc(user, campaign);

        if (final_iap_pack) {
          campaign.iap_pack = [final_iap_pack];

          const found = final_campaign.find((element) => element.template == Types.CampaignTemplate.TEMPLATE_6);

          if (!found) {
            final_campaign.push({ ...campaign.getInfo() });
          }
        }
        //
      }

      // reactive ===================
      else {
        final_campaign.push({ ...campaign.getInfo() });
      }
    }
  }

  return final_campaign;
};

// Reactive

const calReactiveMergeIAPPackFunc = async (user, campaign) => {
  console.log("calReactiveMergeIAPPackFunc");
  let game_version = user.game_version;
  let item_id, rarity;
  let iap_pack_name = 0;
  let final_iap_pack;

  // console.log("campaign.iap_pack----------")
  // console.log(campaign.iap_pack)

  if (user.first_merge_equip) {
    item_id = user.first_merge_equip.item_id;
    rarity = user.first_merge_equip.item_current_rarity;
  } else if (user.first_merge_gadget) {
    item_id = user.first_merge_gadget.item_id;
    rarity = user.first_merge_gadget.item_current_rarity;
  } else {
    return false;
  }

  let item_config = await GameConfig.findOne({
    name: "item_config",
    version: game_version, // req.user_jwt.version,
  });

  if (!item_config) {
    item_config = await alternateGameConfig("item_config");
  }

  if (!item_config) {
    return false;
  }

  const target_item = item_config.config.find((item) => item.item_id === item_id);

  if (!target_item) {
    return false;
  }

  let reward_value = 1;
  let reward_rarity = 1;
  let reward_id;

  if (target_item.content == "Equipment") {
    switch (rarity) {
      case 3:
        reward_rarity = 3;
        iap_pack_name = 1;
        reward_value = 2;
        reward_id = item_id;
        break;
      case 4:
        reward_value = 1;
        iap_pack_name = 2;
        if (target_item.item_type == Types.Item.WEAPON) {
          reward_id = 2400027;
        } else if (target_item.item_type == Types.Item.ARMOR) {
          reward_id = 2400028;
        } else if (target_item.item_type == Types.Item.NECKLACE) {
          reward_id = 2400029;
        } else if (target_item.item_type == Types.Item.BELT) {
          reward_id = 2400030;
        } else if (target_item.item_type == Types.Item.GLOVES) {
          reward_id = 2400031;
        } else if (target_item.item_type == Types.Item.SHOES) {
          reward_id = 2400032;
        }

        break;
      case 5:
        reward_value = 2;
        iap_pack_name = 3;
        if (target_item.item_type == Types.Item.WEAPON) {
          reward_id = 2400027;
        } else if (target_item.item_type == Types.Item.ARMOR) {
          reward_id = 2400028;
        } else if (target_item.item_type == Types.Item.NECKLACE) {
          reward_id = 2400029;
        } else if (target_item.item_type == Types.Item.BELT) {
          reward_id = 2400030;
        } else if (target_item.item_type == Types.Item.GLOVES) {
          reward_id = 2400031;
        } else if (target_item.item_type == Types.Item.SHOES) {
          reward_id = 2400032;
        }

        break;
      case 6:
        reward_value = 1;
        iap_pack_name = 4;
        reward_rarity = 3;
        reward_id = item_id;
        break;
      case 7:
        reward_value = 1;
        iap_pack_name = 5;
        if (target_item.item_type == Types.Item.WEAPON) {
          reward_id = 2400033;
        } else if (target_item.item_type == Types.Item.ARMOR) {
          reward_id = 2400034;
        } else if (target_item.item_type == Types.Item.NECKLACE) {
          reward_id = 2400035;
        } else if (target_item.item_type == Types.Item.BELT) {
          reward_id = 2400036;
        } else if (target_item.item_type == Types.Item.GLOVES) {
          reward_id = 2400037;
        } else if (target_item.item_type == Types.Item.SHOES) {
          reward_id = 2400038;
        }

        break;
      case 8:
        reward_value = 2;
        iap_pack_name = 6;
        if (target_item.item_type == Types.Item.WEAPON) {
          reward_id = 2400033;
        } else if (target_item.item_type == Types.Item.ARMOR) {
          reward_id = 2400034;
        } else if (target_item.item_type == Types.Item.NECKLACE) {
          reward_id = 2400035;
        } else if (target_item.item_type == Types.Item.BELT) {
          reward_id = 2400036;
        } else if (target_item.item_type == Types.Item.GLOVES) {
          reward_id = 2400037;
        } else if (target_item.item_type == Types.Item.SHOES) {
          reward_id = 2400038;
        }
        break;
    }
  } else if (target_item.content == "Gadget") {
    switch (rarity) {
      case 3:
        reward_id = item_id;
        iap_pack_name = 1;
        reward_rarity = 3;
        reward_value = 2;
        break;
      case 4:
        reward_id = item_id;
        iap_pack_name = 2;
        reward_rarity = 4;
        reward_value = 1;
        break;
      case 5:
        reward_id = item_id;
        iap_pack_name = 3;
        reward_rarity = 5;
        reward_value = 2;
        break;
    }
  }

  let final_reactive_item = [];

  let reactive_item = item_config.config.find((item) => item.item_id === reward_id);

  if (!reactive_item) {
    return false;
  }

  reactive_item.item_current_rarity = reward_rarity;

  // console.log("final_reactive_item");
  // console.log(reactive_item);

  if (reactive_item.content == "Equipment" || reactive_item.content == "Gadget") {
    reactive_item.value = 1;

    for (let index = 0; index < reward_value; index++) {
      final_reactive_item.push(reactive_item);
    }
  } else {
    reactive_item.value = reward_value;
    final_reactive_item.push(reactive_item);
  }

  final_iap_pack = campaign.iap_pack.find((elm) => {
    return elm.name == iap_pack_name;
  });
  // [iap_pack_id - 1];

  if (!final_iap_pack) {
    return false;
  }

  final_iap_pack.item_list.push(...final_reactive_item);

  final_iap_pack.name = campaign.description;

  // console.log("final_iap_pack######################");
  // console.log(final_iap_pack);

  return final_iap_pack;
};

const calReactiveYWDNTIAPPackFunc = async (user, campaign) => {
  console.log("calReactiveYWDNTIAPPackFunc");

  let game_version = user.game_version;
  let item_id, rarity;
  let iap_pack_name = 0;
  let final_iap_pack;

  // config
  let item_config = await GameConfig.findOne({
    name: "item_config",
    version: game_version, // req.user_jwt.version,
  });

  if (!item_config) {
    item_config = await alternateGameConfig("item_config");
  }

  if (!item_config) {
    return false;
  }
  // ----------------------------

  if (!user.first_ywdnt_equip.item_id) {
    console.log("calReactiveYWDNTRewardFunc");

    let equip_weapon = user.equipment.slots.weapon?.toString();
    if (!equip_weapon) {
      return false;
    }

    let equipment_info = user.equipment.items.find((item) => item._id == equip_weapon);

    if (!equipment_info) {
      return false;
    }

    item_id = equipment_info.item_id;
    rarity = equipment_info.item_current_rarity;

    const wearing_id_arr = [1110000, 1110001, 1110002, 1110004, 1110009];

    if (!wearing_id_arr.includes(item_id) || (rarity != 2 && rarity != 3)) {
      console.log("calReactiveYWDNTRewardFunc Not Meet ", item_id, rarity);
      return false;
    }

    await User.findByIdAndUpdate(user._id, { first_ywdnt_equip: { item_id: item_id, item_current_rarity: rarity, expire: null } });
  } else {
    item_id = user.first_ywdnt_equip.item_id;
    rarity = user.first_ywdnt_equip.item_current_rarity;
  }

  let reward_value = 2;
  let reward_rarity = rarity;
  let reward_id = item_id;

  switch (rarity) {
    case 2:
      iap_pack_name = 1;
      break;
    case 3:
      iap_pack_name = 2;
      break;
  }

  let final_reactive_item = [];

  let reactive_item = item_config.config.find((item) => item.item_id === reward_id);

  if (!reactive_item) {
    return false;
  }

  reactive_item.item_current_rarity = reward_rarity;

  // console.log("final_reactive_item");
  // console.log(reactive_item);

  if (reactive_item.content == "Equipment" || reactive_item.content == "Gadget") {
    reactive_item.value = 1;

    for (let index = 0; index < reward_value; index++) {
      final_reactive_item.push(reactive_item);
    }
  } else {
    reactive_item.value = reward_value;
    final_reactive_item.push(reactive_item);
  }

  final_iap_pack = campaign.iap_pack.find((elm) => {
    return elm.name == iap_pack_name;
  });

  // final_iap_pack = campaign.iap_pack[iap_pack_id - 1];

  if (!final_iap_pack) {
    return false;
  }

  final_iap_pack.item_list.push(...final_reactive_item);
  final_iap_pack.name = campaign.description;
  // console.log(final_iap_pack);
  return final_iap_pack;
};

// =====================================================================================
const getCampaign = async (req, res, next) => {
  try {
    const user = await User.findById(req.user_jwt.user_id);

    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error_code: ERROR_CODE.INVALID_USER,
        data: {
          message: "User Not Foud!",
        },
      });
    }

    // let campaigns = await Campaign.find({ end: { $gte: moment().unix() } });
    let moment_now = moment().unix();

    // reset template
    if ((user.first_merge_equip.expire && user.first_merge_equip.expire <= moment_now) || (user.first_merge_gadget.expire && user.first_merge_gadget.expire <= moment_now)) {
      user.first_merge_equip.item_id = null;
      user.first_merge_equip.item_current_rarity = null;
      user.first_merge_equip.expire = null;

      user.first_merge_gadget.item_id = null;
      user.first_merge_gadget.item_current_rarity = null;
      user.first_merge_gadget.expire = null;

      console.log("reset first_merge_gadget");
      await User.findByIdAndUpdate(req.user_jwt.user_id, {
        first_merge_equip: { item_id: null, item_current_rarity: null, expire: null },
        first_merge_gadget: { item_id: null, item_current_rarity: null, expire: null },
      });
    }

    if (user.first_ywdnt_equip.expire && user.first_ywdnt_equip.expire <= moment_now) {
      console.log("reset first_ywdnt_equip");
      user.first_ywdnt_equip.item_id = null;
      user.first_ywdnt_equip.item_current_rarity = null;
      user.first_ywdnt_equip.expire = null;
      await User.findByIdAndUpdate(
        req.user_jwt.user_id,
        {
          first_ywdnt_equip: { item_id: null, item_current_rarity: null, expire: null },
        },
        { new: true }
      );
    }

    let campaigns = await Campaign.find({
      $or: [
        {
          start: { $in: [0, null] },
          end: { $in: [0, null] },
        },
        {
          start: { $lt: moment_now },
          end: { $in: [0, null] },
        },
        {
          start: { $in: [0, null] },
          end: { $gt: moment_now },
        },
        {
          start: { $lt: moment_now },
          end: { $gt: moment_now },
        },
      ],
    });

    if (!campaigns) {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, []);
    }

    let final_campaigns = await checkRestriction(user, campaigns);

    // const campaignArray = final_campaigns.map((x) => x.getInfo());

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, final_campaigns);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.CAMPAIGN_NOT_FOUND, Message.CAMPAIGN_NOT_FOUND);
  }
};

const setTemplateExpire = async (req, res, next) => {
  let { template, expire } = req.body;
  // const user = await User.findById(req.user_jwt.user_id);

  // if (!user) {
  //   return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
  //     error_code: ERROR_CODE.INVALID_USER,
  //     data: {
  //       message: "User Not Foud!",
  //     },
  //   });
  // }

  if (!template) {
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.CAMPAIGN_NOT_FOUND, Message.CAMPAIGN_NOT_FOUND);
  }

  //
  // first_merge_equip: { type: FirstMergeEquip, default: {} },
  // first_merge_gadget: { type: FirstMergeGadget, default: {} },
  // first_ywdnt_equip: { type: CurrentYWDNTEquip, default: {} },
  switch (template) {
    case 5:
      await User.findByIdAndUpdate(req.user_jwt.user_id, { "first_merge_equip.expire": expire, "first_merge_gadget.expire": expire });
      break;

    case 6:
      await User.findByIdAndUpdate(req.user_jwt.user_id, { "first_ywdnt_equip.expire": expire });
      break;
  }

  return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {});
};

module.exports = {
  getCampaign,
  // calReactiveMergeRewardFunc,
  // calReactiveYWDNTRewardFunc,
  calReactiveMergeIAPPackFunc,
  calReactiveYWDNTIAPPackFunc,
  setTemplateExpire,
};
