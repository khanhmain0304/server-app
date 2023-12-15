const User = require("../models/user");
const EquipmentRarity = require("../models/equipmentRarity");
const EquipmentLvlUp = require("../models/equipmentLvlUp");
const EquipmentMainStats = require("../models/equipmentMainStats");
const Types = require("../config/types");

const addEquipment = async (item_ids, equipments, level, user_id) => {
  const equipMainStat = await EquipmentMainStats.find({
    item_id: { $in: item_ids },
  });

  let item_types = [];

  for (const item of equipments) {
    for (let i = 0; i < equipMainStat.length; i++) {
      if (item.item_id == equipMainStat[i].item_id) {
        item_types.push({
          item_id: item.item_id,
          type: equipMainStat[i].item_type,
          rarity: item.rarity,
          level,
        });
      }
    }
  }

  let final_items = [];

  if (item_types.length == 0) {
    final_items = [];
  } else {
    const equipRare = await EquipmentRarity.find({ $or: [...item_types] });

    const equipLvlUp = await EquipmentLvlUp.find({ $or: [...item_types] });

    for (const item of item_types) {
      const item_current_rarity = item.rarity;
      let base_stats = [];

      for (let i = 0; i < equipRare.length; i++) {
        if (item.type == equipRare[i].type) {
          //equipRare
          if (equipRare[i].base_atk > 0) {
            base_stats.push({
              type: Types.Stat.ATK,
              value: equipRare[i].base_atk,
            });
          }

          if (equipRare[i].base_hp > 0) {
            base_stats.push({
              type: Types.Stat.HP,
              value: equipRare[i].base_hp,
            });
          }
        }
      }

      // effect_bonus -----------------
      var holder = {};
      let equipMainStatData;
      for (let i = 0; i < equipMainStat.length; i++) {
        if (equipMainStat[i].item_id == item.item_id) {
          equipMainStatData = equipMainStat[i].getInfo();

          equipMainStat[i].effect_bonus.forEach(function (d) {
            if (item.rarity >= d.rarity) {
              if (holder.hasOwnProperty(d.type)) {
                holder[d.type] = holder[d.type] + d.value;
              } else {
                holder[d.type] = d.value;
              }
            }
          });
        }
      }

      var effect_bonus = [];
      for (var prop in holder) {
        effect_bonus.push({ type: prop, value: holder[prop] });
      }

      let finalEquipLvlUp = [];
      for (let i = 0; i < equipLvlUp.length; i++) {
        if (equipLvlUp[i].type == item.type) {
          if (equipLvlUp[i]) {
            finalEquipLvlUp = { ...equipLvlUp[i].getInfo() };
          }
        }
      }

      let final_item = {
        ...equipMainStatData,
        item_current_rarity,
        effect_bonus,
        base_stats,
        ...finalEquipLvlUp,
      };

      final_items.push(final_item);
    }
  }

  // Update info
  const user = await User.findByIdAndUpdate(
    user_id,
    { $push: { "equipment.items": final_items } },
    { new: true }
  );
  return { ...user.getInfo() };
};

module.exports = { addEquipment };
