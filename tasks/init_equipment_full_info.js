require("../config/database")();

const EquipmentRarity = require("../models/equipmentRarity");
const EquipmentLvlUp = require("../models/equipmentLvlUp");
const EquipmentMainStats = require("../models/equipmentMainStats");
const EquipmentMergeRule = require("../models/equipmentMergeRule");
const { EquipmentInfo } = require("../models/equipment");
const item_configs = require("../data/meta/item_config.json");
const Types = require("../config/types");

// meta

const deleteAllEquipment = async () => {
  await EquipmentInfo.deleteMany({});
  console.log("Done! deleteAllEquipment");
};

const addEquipmentV2 = async () => {
  let all_final_item = [];
  for (let item of item_configs) {
    console.log("=====================================================");

    console.log(item);

    if (item.content !== "Equipment" || item.item_type === "All") {
      continue;
    }

    console.log("---------");

    const equipMainStat = await EquipmentMainStats.findOne({ item_id: item.item_id });

    if (!equipMainStat) {
      continue;
    }
    console.log(equipMainStat._id);

    console.log("---------");

    // TODO: for here
    const equipRares = await EquipmentRarity.find({ type: item.item_type });

    for (let equipRare of equipRares) {
      console.log(equipRare._id);

      console.log("---------");

      const equipLvlUp = await EquipmentLvlUp.findOne({ type: item.item_type, level: 1, rarity: equipRare.rarity });

      console.log(equipLvlUp._id);

      let base_stats = [];

      if (item.is_supper) {
        if (equipRare.base_atk_s > 0) {
          base_stats.push({
            type: Types.Stat.ATK,
            value: equipRare.base_atk_s,
          });
        }

        if (equipRare.base_hp_s > 0) {
          base_stats.push({
            type: Types.Stat.HP,
            value: equipRare.base_hp_s,
          });
        }
      } else {
        if (equipRare.base_atk > 0) {
          base_stats.push({
            type: Types.Stat.ATK,
            value: equipRare.base_atk,
          });
        }

        if (equipRare.base_hp > 0) {
          base_stats.push({
            type: Types.Stat.HP,
            value: equipRare.base_hp,
          });
        }
      }

      // effect_bonus -----------------
      var holder = {};
      equipMainStat.effect_bonus.forEach(function (d) {
        if (equipRare.rarity >= d.rarity) {
          if (holder.hasOwnProperty(d.type)) {
            holder[d.type] = holder[d.type] + d.value;
          } else {
            holder[d.type] = d.value;
          }
        }
      });
      var effect_bonus = [];
      for (var prop in holder) {
        effect_bonus.push({ type: prop, value: holder[prop] });
      }

      // -----------------------------

      let finalEquipLvlUp = [];
      if (equipLvlUp) {
        finalEquipLvlUp = { ...equipLvlUp.getInfo() };
      }

      let final_item = { content: item.content, ...equipMainStat.getInfo(), effect_bonus, base_stats, ...finalEquipLvlUp, isItem: true, item_current_rarity: equipRare.rarity };

      // await Equipment.create(final_item);
      console.log(final_item);

      all_final_item.push(final_item);
    }
  }

  await EquipmentInfo.insertMany(all_final_item);

  // console.log("all_final_item");
  // console.log(all_final_item);
};

// const addEquipment = async () => {
//   // let equipments = await EquipmentLvlUp.find({});

//   let all_final_item = [];
//   for (let item of item_configs) {
//     console.log("=====================================================");

//     console.log(item);

//     if (item.content !== "Equipment" || item.item_type === "All") {
//       continue;
//     }

   

//     console.log("---------");

//     const equipMainStat = await EquipmentMainStats.findOne({ item_id: item.item_id });

//     if (!equipMainStat) {
//       continue;
//     }
//     console.log(equipMainStat._id);

//     console.log("---------");

//     const equipRare = await EquipmentRarity.findOne({ type: item.item_type, rarity: item.item_current_rarity });
//     console.log(equipRare._id);

//     console.log("---------");

//     const equipLvlUp = await EquipmentLvlUp.findOne({ type: item.item_type, level: 1, rarity: item.item_current_rarity });

//     console.log(equipLvlUp._id);

//     let base_stats = [];

//     if (item.is_supper) {
//       if (equipRare.base_atk_s > 0) {
//         base_stats.push({
//           type: Types.Stat.ATK,
//           value: equipRare.base_atk_s,
//         });
//       }

//       if (equipRare.base_hp_s > 0) {
//         base_stats.push({
//           type: Types.Stat.HP,
//           value: equipRare.base_hp_s,
//         });
//       }
//     } else {
//       if (equipRare.base_atk > 0) {
//         base_stats.push({
//           type: Types.Stat.ATK,
//           value: equipRare.base_atk,
//         });
//       }

//       if (equipRare.base_hp > 0) {
//         base_stats.push({
//           type: Types.Stat.HP,
//           value: equipRare.base_hp,
//         });
//       }
//     }

//     // effect_bonus -----------------
//     var holder = {};
//     equipMainStat.effect_bonus.forEach(function (d) {
//       if (item.item_current_rarity >= d.rarity) {
//         if (holder.hasOwnProperty(d.type)) {
//           holder[d.type] = holder[d.type] + d.value;
//         } else {
//           holder[d.type] = d.value;
//         }
//       }
//     });
//     var effect_bonus = [];
//     for (var prop in holder) {
//       effect_bonus.push({ type: prop, value: holder[prop] });
//     }

//     // -----------------------------

//     let finalEquipLvlUp = [];
//     if (equipLvlUp) {
//       finalEquipLvlUp = { ...equipLvlUp.getInfo() };
//     }

//     let final_item = { ...equipMainStat.getInfo(), effect_bonus, base_stats, ...finalEquipLvlUp, isItem: true, item_current_rarity: item.item_current_rarity };

//     // await Equipment.create(final_item);
//     console.log(final_item);

//     all_final_item.push(final_item);
//   }

//   await EquipmentInfo.insertMany(all_final_item);

//   // console.log("all_final_item");
//   // console.log(all_final_item);
// };

// const addEquipment_Old = async () => {
//   // let equipments = await EquipmentLvlUp.find({});

//   let all_final_item = [];
//   for (let item of item_configs) {
//     console.log("=====================================================");

//     console.log(item);

//     if (item.content !== "Equipment") {
//       continue;
//     }

//     console.log("---------");

//     const equipMainStat = await EquipmentMainStats.findOne({ item_id: item.item_id });

//     if (!equipMainStat) {
//       continue;
//     }
//     console.log(equipMainStat._id);

//     console.log("---------");

//     const equipRare = await EquipmentRarity.findOne({ type: item.item_type, rarity: item.item_current_rarity });
//     console.log(equipRare._id);

//     console.log("---------");

//     const equipLvlUp = await EquipmentLvlUp.findOne({ type: item.item_type, level: 1, rarity: item.item_current_rarity });

//     console.log(equipLvlUp._id);

//     let base_stats = [];

//     if (item.is_supper) {
//       if (equipRare.base_atk_s > 0) {
//         base_stats.push({
//           type: Types.Stat.ATK,
//           value: equipRare.base_atk_s,
//         });
//       }

//       if (equipRare.base_hp_s > 0) {
//         base_stats.push({
//           type: Types.Stat.HP,
//           value: equipRare.base_hp_s,
//         });
//       }
//     } else {
//       if (equipRare.base_atk > 0) {
//         base_stats.push({
//           type: Types.Stat.ATK,
//           value: equipRare.base_atk,
//         });
//       }

//       if (equipRare.base_hp > 0) {
//         base_stats.push({
//           type: Types.Stat.HP,
//           value: equipRare.base_hp,
//         });
//       }
//     }

//     // effect_bonus -----------------
//     var holder = {};
//     equipMainStat.effect_bonus.forEach(function (d) {
//       if (item.item_current_rarity >= d.rarity) {
//         if (holder.hasOwnProperty(d.type)) {
//           holder[d.type] = holder[d.type] + d.value;
//         } else {
//           holder[d.type] = d.value;
//         }
//       }
//     });
//     var effect_bonus = [];
//     for (var prop in holder) {
//       effect_bonus.push({ type: prop, value: holder[prop] });
//     }

//     // -----------------------------

//     let finalEquipLvlUp = [];
//     if (equipLvlUp) {
//       finalEquipLvlUp = { ...equipLvlUp.getInfo() };
//     }

//     let final_item = { content: item.content, ...equipMainStat.getInfo(), effect_bonus, base_stats, ...finalEquipLvlUp, isItem: true, item_current_rarity: item.item_current_rarity };

//     // await Equipment.create(final_item);
//     console.log(final_item);

//     all_final_item.push(final_item);
//   }

//   await EquipmentInfo.insertMany(all_final_item);

//   // console.log("all_final_item");
//   // console.log(all_final_item);
// };

const main = async () => {
  await deleteAllEquipment();
  await addEquipmentV2();

  console.log("Done!");
  process.exit(0);
};

main();
