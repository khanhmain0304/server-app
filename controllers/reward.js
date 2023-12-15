const Types = require("../config/types");

// const User = require("../models/user");
// const EquipmentRarity = require("../models/equipmentRarity");
// const EquipmentLvlUp = require("../models/equipmentLvlUp");
// const EquipmentMainStats = require("../models/equipmentMainStats");
// const EquipmentMergeRule = require("../models/equipmentMergeRule");
const GameConfig = require("../models/gameConfig");
const { EquipmentInfo } = require("../models/equipment");
// var ObjectId = require("mongoose").Types.ObjectId;
const { redisGetGameConfig, redisGetTrackingCommonColumns, redisGetAllUserRecords } = require("../config/redisClient");
const { randomDesigns, weightedRandom } = require("../helper/random");
const { addDesigns } = require("../helper/add_design");
const { GadgetInfo } = require("../models/gadget");
const { recordClaimTotalGem, recordClaimTotalGold, record55GetGadgetRarity, record78EarnExcellent1Weapon } = require("./gameEventRecord");

const addReward = async (user, rewardArray, version) => {
  // console.log(rewardArray)
  // const shop_config_redis = await redisGetGameConfig("shop", "default");
  // const common_column = await redisGetTrackingCommonColumns(user._id);

  const item_config = await GameConfig.findOne({
    name: "item_config",
    version: version ? version : "199",
  }).exec();

  // const item_config = await redisGetGameConfig("item_config", "default");

  let item_list = [];

  for (let reward of rewardArray) {
    ///console.log("Add:", reward.content, reward.value);

    switch (reward.content) {
      case Types.Content.TASK_POINT:
        // No need to add
        break;
      case Types.Content.EQUIPMENT:
        if (reward.item_type === "All") {
          let allEquimentIds;
          if (reward.item_id == 2400047) {
            allEquimentIds = [
              Types.ItemID.LIGHT_SAVIOR,
              Types.ItemID.BLACK_HOLE_CANNON,
              Types.ItemID.IMMORTAL_BELT,
              Types.ItemID.IMMORTAL_BOOTS,
              Types.ItemID.IMMORTAL_GLOVES,
              Types.ItemID.IMMORTAL_NECKLACE,
              Types.ItemID.IMMORTAL_SUIT,
            ];
          } else {
            allEquimentIds = [
              Types.ItemID.REVOLVER_EQUIPMENT,
              Types.ItemID.SHOTGUN_EQUIPMENT,
              Types.ItemID.WHIP_EQUIPMENT,
              Types.ItemID.MACHETTE_EQUIPMENT,
              Types.ItemID.CROSSBOW_EQUIPMENT,
              Types.ItemID.NECKLACE_1_EQUIPMENT,
              Types.ItemID.NECKLACE_2_EQUIPMENT,
              Types.ItemID.NECKLACE_3_EQUIPMENT,
              Types.ItemID.NECKLACE_4_EQUIPMENT,
              Types.ItemID.NECKLACE_5_EQUIPMENT,
              Types.ItemID.GLOVES_1_EQUIPMENT,
              Types.ItemID.GLOVES_2_EQUIPMENT,
              Types.ItemID.GLOVES_3_EQUIPMENT,
              Types.ItemID.GLOVES_4_EQUIPMENT,
              Types.ItemID.GLOVES_5_EQUIPMENT,
              Types.ItemID.ARMOR_1_EQUIPMENT,
              Types.ItemID.ARMOR_2_EQUIPMENT,
              Types.ItemID.ARMOR_3_EQUIPMENT,
              Types.ItemID.ARMOR_4_EQUIPMENT,
              Types.ItemID.ARMOR_5_EQUIPMENT,
              Types.ItemID.BELT_1_EQUIPMENT,
              Types.ItemID.BELT_2_EQUIPMENT,
              Types.ItemID.BELT_3_EQUIPMENT,
              Types.ItemID.BELT_4_EQUIPMENT,
              Types.ItemID.BELT_5_EQUIPMENT,
              Types.ItemID.SHOES_1_EQUIPMENT,
              Types.ItemID.SHOES_2_EQUIPMENT,
              Types.ItemID.SHOES_3_EQUIPMENT,
              Types.ItemID.SHOES_4_EQUIPMENT,
              Types.ItemID.SHOES_5_EQUIPMENT,
            ];
          }

          if (reward.item_id === Types.ItemID.EXCELLENT_WEAPON_CHEST || reward.item_id === Types.ItemID.EPIC_WEAPON_CHEST) {
            allEquimentIds = [
              Types.ItemID.REVOLVER_EQUIPMENT,
              Types.ItemID.SHOTGUN_EQUIPMENT,
              Types.ItemID.WHIP_EQUIPMENT,
              Types.ItemID.MACHETTE_EQUIPMENT,
              Types.ItemID.CROSSBOW_EQUIPMENT,
            ];
          } else if (reward.item_id === Types.ItemID.EXCELLENT_ARMOR_CHEST || reward.item_id === Types.ItemID.EPIC_ARMOR_CHEST) {
            allEquimentIds = [
              Types.ItemID.ARMOR_1_EQUIPMENT,
              Types.ItemID.ARMOR_2_EQUIPMENT,
              Types.ItemID.ARMOR_3_EQUIPMENT,
              Types.ItemID.ARMOR_4_EQUIPMENT,
              Types.ItemID.ARMOR_5_EQUIPMENT,
            ];
          } else if (reward.item_id === Types.ItemID.EXCELLENT_NECKLACE_CHEST || reward.item_id === Types.ItemID.EPIC_NECKLACE_CHEST) {
            allEquimentIds = [
              Types.ItemID.NECKLACE_1_EQUIPMENT,
              Types.ItemID.NECKLACE_2_EQUIPMENT,
              Types.ItemID.NECKLACE_3_EQUIPMENT,
              Types.ItemID.NECKLACE_4_EQUIPMENT,
              Types.ItemID.NECKLACE_5_EQUIPMENT,
            ];
          } else if (reward.item_id === Types.ItemID.EXCELLENT_BELT_CHEST || reward.item_id === Types.ItemID.EPIC_BELT_CHEST) {
            allEquimentIds = [
              Types.ItemID.BELT_1_EQUIPMENT,
              Types.ItemID.BELT_2_EQUIPMENT,
              Types.ItemID.BELT_3_EQUIPMENT,
              Types.ItemID.BELT_4_EQUIPMENT,
              Types.ItemID.BELT_5_EQUIPMENT,
            ];
          } else if (reward.item_id === Types.ItemID.EXCELLENT_GLOVES_CHEST || reward.item_id === Types.ItemID.EPIC_GLOVES_CHEST) {
            allEquimentIds = [
              Types.ItemID.GLOVES_1_EQUIPMENT,
              Types.ItemID.GLOVES_2_EQUIPMENT,
              Types.ItemID.GLOVES_3_EQUIPMENT,
              Types.ItemID.GLOVES_4_EQUIPMENT,
              Types.ItemID.GLOVES_5_EQUIPMENT,
            ];
          } else if (reward.item_id === Types.ItemID.EXCELLENT_SHOES_CHEST || reward.item_id === Types.ItemID.EPIC_SHOES_CHEST) {
            allEquimentIds = [
              Types.ItemID.SHOES_1_EQUIPMENT,
              Types.ItemID.SHOES_2_EQUIPMENT,
              Types.ItemID.SHOES_3_EQUIPMENT,
              Types.ItemID.SHOES_4_EQUIPMENT,
              Types.ItemID.SHOES_5_EQUIPMENT,
            ];
          }

          for (let index = 0; index < reward.value; index++) {
            let equpmentId = allEquimentIds[Math.floor(Math.random() * allEquimentIds.length)];
            console.log("Random EQUIPMENT: ", equpmentId);

            let itemInfo = await EquipmentInfo.findOne({ item_id: equpmentId, item_current_rarity: reward.item_current_rarity });

            if (!itemInfo) {
              continue;
            }
            user.equipment.items.push({ ...itemInfo.getInfo() });

            // add result
            // const equip_reward_info = item_config.config.find((item) => item.item_id == itemInfo.item_id && item.item_current_rarity == itemInfo.item_current_rarity);
            const equip_reward_info = {
              content: itemInfo.content,
              item_id: itemInfo.item_id,
              item_name: itemInfo.item_name,
              item_type: itemInfo.item_type,
              item_description: itemInfo.item_description,
              item_current_rarity: itemInfo.item_current_rarity,
              item_super: itemInfo.item_super,
              display_in_bag: itemInfo.display_in_bag,
            };
            if (equip_reward_info) {
              const foundIndex = item_list.findIndex((x) => x.item_id == equip_reward_info.item_id);

              if (foundIndex !== -1) {
                item_list[foundIndex].value += 1;
              } else {
                item_list.push({
                  ...equip_reward_info,
                  value: 1,
                });
              }
            }
            // end add result
          }
        } else if (reward.item_type === "Choice") {
          reward.value = reward.value ? reward.value : 1;

          let choice_chest = item_config.config.find((item) => item.item_id == reward.item_id);
          choice_chest.value = reward.value;

          if (!user.equipment.choice_chests.find((item) => item.item_id == reward.item_id)) {
            user.equipment.choice_chests.push(choice_chest);
          } else {
            user.equipment.choice_chests.find((item) => item.item_id == reward.item_id).value += reward.value;
          }

          item_list.push(choice_chest);

          user.markModified("equipment.choice_chests");
        } else {
          let itemInfo = await EquipmentInfo.findOne({ item_id: reward.item_id, item_current_rarity: reward.item_current_rarity });

          if (!itemInfo) {
            continue;
          }

          reward.value = reward.value ? reward.value : 1;

          for (let index = 0; index < reward.value; index++) {
            user.equipment.items.push({ ...itemInfo.getInfo() });
          }

          // add result
          const equip_reward_info = item_config.config.find((item) => item.item_id == itemInfo.item_id);
          if (equip_reward_info) {
            equip_reward_info.item_current_rarity = reward.item_current_rarity;
            const foundIndex = item_list.findIndex((x) => x.item_id == equip_reward_info.item_id && x.item_current_rarity == reward.item_current_rarity);

            // if (foundIndex !== -1) {
            //   item_list[foundIndex].value += reward.value;
            // } else {
              item_list.push({
                ...equip_reward_info,
                value: reward.value,
              });
            // }
          }
          // end add result
        }

        user.markModified("equipment.items");

        for (const item of item_list) {
          if (item.item_type == Types.Item.WEAPON && item.item_current_rarity == 5) {
            record78EarnExcellent1Weapon(user._id, 1);
          }
        }

        break;
      case Types.Content.DESIGN:
        // TODO: Item type all

        if (reward.item_type === "All") {
          const designs_random = await randomDesigns(reward.value);
          await addDesigns(designs_random, user);

          item_list.push(...designs_random);
        } else {
          let equpmentId = reward.item_id;

          user.equipment.designs.id(equpmentId).quantity += reward.value;

          // add result
          const design_reward_info = item_config.config.find((item) => item.item_id == equpmentId);
          if (design_reward_info) {
            const foundIndex = item_list.findIndex((x) => x.item_id == design_reward_info.item_id);

            if (foundIndex !== -1) {
              item_list[foundIndex].value += reward.value;
            } else {
              item_list.push({
                ...design_reward_info,
                value: reward.value,
              });
            }
          }
          // end add result
        }

        user.markModified("equipment.designs");
        break;
      case Types.Content.GEM:
        user.gem += reward.value;
        user.paid_gem += reward.value;

        recordClaimTotalGem(user._id, reward.value);

        const gem_reward_info = item_config.config.find((item) => item.item_id == reward.item_id);
        item_list.push({
          ...gem_reward_info,
          value: reward.value,
        });
        break;
      case Types.Content.GOLD:
        user.gold += reward.value;
        user.paid_gold += reward.value;

        recordClaimTotalGold(user._id, reward.value);

        const gold_reward_info = item_config.config.find((item) => item.item_id == reward.item_id);
        item_list.push({
          ...gold_reward_info,
          value: reward.value,
        });
        break;
      case Types.Content.DNA:
        user.dna += reward.value;

        const dna_reward_info = item_config.config.find((item) => item.item_id == reward.item_id);
        item_list.push({
          ...dna_reward_info,
          value: reward.value,
        });

        break;
      case Types.Content.KEY:
        if (reward.item_id == Types.ItemID.SILVER_KEY) {
          user.silver_key += reward.value;
        } else if (reward.item_id == Types.ItemID.GOLD_KEY) {
          user.gold_key += reward.value;
        } else if (reward.item_id == Types.ItemID.S_KEY) {
          user.s_key += reward.value;
        }

        const key_reward_info = item_config.config.find((item) => item.item_id == reward.item_id);
        item_list.push({
          ...key_reward_info,
          value: reward.value,
        });

        break;
      case Types.Content.REVIVE_TOKEN:
        user.revive_token += reward.value;

        const revive_reward_info = item_config.config.find((item) => item.item_id == reward.item_id);
        item_list.push({
          ...revive_reward_info,
          value: reward.value,
        });

        break;
      case Types.Content.EXP:
        user.exp += Math.floor(reward.value);

        const exp_reward_info = item_config.config.find((item) => item.item_id == reward.item_id);
        item_list.push({
          ...exp_reward_info,
          value: reward.value,
        });
        break;
      case Types.Content.ENERGY:
        user.energy += reward.value;

        const energy_reward_info = item_config.config.find((item) => item.item_id == reward.item_id);
        item_list.push({
          ...energy_reward_info,
          value: reward.value,
        });

        break;

      case Types.Content.PATROL_GOLD:
        let gold_per_1_hours;
        // Get gold patrol
        let offline_earning_config = await GameConfig.findOne({
          name: "offline_earning",
          version: version ? version : "199",
        }).exec();

        if (!offline_earning_config) {
          offline_earning_config = await alternateGameConfig("offline_earning");
        }

        const offline_earning = offline_earning_config.config.offlineEarning;
        const recent_offline_earning = offline_earning.find((item) => item.highest_chapter_clear_id == user.data_stage.id_stage_current - 1);
        if (!recent_offline_earning) {
          gold_per_1_hours = 3000;
        }

        gold_per_1_hours = recent_offline_earning.gold_per_10_minutes * 6;

        let pattrol_to_gold = gold_per_1_hours * reward.value;

        user.gold += pattrol_to_gold;
        user.free_gold += pattrol_to_gold;

        const patrol_reward_info = item_config.config.find((item) => item.item_id == Types.ItemID.GOLD);

        if (patrol_reward_info) {
          const foundIndex = item_list.findIndex((x) => x.item_id == patrol_reward_info.item_id);
          if (foundIndex !== -1) {
            item_list[foundIndex].value += pattrol_to_gold;
          } else {
            item_list.push({
              ...patrol_reward_info,
              value: pattrol_to_gold,
            });
          }
        }

        break;
      case Types.Content.MATERIAL:
        const materialId = reward.item_id;

        if (user.equipment.materials.find((item) => item.id == materialId)) {
          user.equipment.materials.id(materialId).quantity += reward.value;
        } else {
          user.equipment.materials.push({
            _id: materialId,
            item_id: materialId,
            item_name: reward.item_name,
            item_type: reward.item_type,
            item_description: reward.item_description,
            item_current_rarity: reward.item_current_rarity,
            quantity: reward.value,
          });
        }

        const material_reward_info = item_config.config.find((item) => item.item_id == materialId);
        console.log("material_reward_info", material_reward_info);
        if (material_reward_info) {
          const foundIndex = item_list.findIndex((x) => x.item_id == material_reward_info.item_id);

          if (foundIndex !== -1) {
            item_list[foundIndex].value += reward.value;
          } else {
            item_list.push({
              ...material_reward_info,
              value: reward.value,
            });
          }
        }

        user.markModified("equipment.materials");
        break;
      case Types.Content.GADGET:
        if (reward.item_type === "All") {
          let list_random_gadgets = item_config.config.filter((item) => item.content == Types.Content.GADGET && item.item_type != "All" && item.item_type != "Choice");

          const common_column = await redisGetTrackingCommonColumns(user._id);

          if (common_column.ab_test_segment != "1002") {
            list_random_gadgets = list_random_gadgets.filter((item) => item.item_id != 2160010 && item.item_id != 2160011);
          }

          if (user.data_stage.id_stage_current < 1000006) {
            list_random_gadgets = list_random_gadgets.filter((item) => item.item_id != 1120029 && item.item_id != 1120003 && item.item_id != 1120004);
          } else if (user.data_stage.id_stage_current < 1000007) {
            list_random_gadgets = list_random_gadgets.filter((item) => item.item_id != 1120003 && item.item_id != 1120004);
          }

          let weight_random_gadgets = [];
          for (let index = 0; index < list_random_gadgets.length; index++) {
            weight_random_gadgets.push(10);
          }

          for (let index = 0; index < reward.value; index++) {
            const random_item = weightedRandom(list_random_gadgets, weight_random_gadgets);

            switch (reward.item_id) {
              case Types.ItemID.NORMAL_GADGET:
                random_item.item_current_rarity = 1;
                break;
              case Types.ItemID.GOOD_GADGET:
                random_item.item_current_rarity = 2;
                break;
              case Types.ItemID.BETTER_GADGET:
                random_item.item_current_rarity = 3;
                break;
              case Types.ItemID.EXCELLENT_GADGET:
                random_item.item_current_rarity = 4;
                break;
              default:
                break;
            }

            let itemInfo = await GadgetInfo.findOne({ item_id: random_item.item_id, item_current_rarity: random_item.item_current_rarity });

            if (itemInfo) {
              item_list.push({
                ...itemInfo.getInfo(),
                value: 1,
              });

              user.equipment.gadgets.push({
                ...itemInfo.getInfo(),
              });
            }
          }
        } else if (reward.item_type === "Choice") {
          reward.value = reward.value ? reward.value : 1;

          let choice_chest = item_config.config.find((item) => item.item_id == reward.item_id);
          choice_chest.value = reward.value;

          if (!user.equipment.choice_chests.find((item) => item.item_id == reward.item_id)) {
            user.equipment.choice_chests.push(choice_chest);
          } else {
            user.equipment.choice_chests.find((item) => item.item_id == reward.item_id).value += reward.value;
          }

          item_list.push(choice_chest);

          user.markModified("equipment.choice_chests");
        } else {
          let itemInfo = await GadgetInfo.findOne({ item_id: reward.item_id, item_current_rarity: reward.item_current_rarity });

          if (itemInfo) {
            item_list.push({
              ...itemInfo.getInfo(),
              value: reward.value,
            });

            user.equipment.gadgets.push({
              ...itemInfo.getInfo(),
            });
          }
        }

        user.markModified("equipment.gadgets");

        let max_rarity_gadget = item_list.reduce((max, obj) => (obj.item_current_rarity > max.item_current_rarity ? obj : max), item_list[0]);

        let userRecord = await redisGetAllUserRecords(user._id);

        if (
          !userRecord[Types.EventTaskCondition.TASK_CONDITION_55_GET_GADGET_RARITY_X] ||
          userRecord[Types.EventTaskCondition.TASK_CONDITION_55_GET_GADGET_RARITY_X] < max_rarity_gadget.item_current_rarity
        ) {
          record55GetGadgetRarity(user._id, max_rarity_gadget.item_current_rarity);
        }
        break;
      default:
        break;
    }
  }

  return item_list;
};

module.exports = {
  addReward,
};
