require("../config/database")();

const EquipmentMainStats = require("../models/equipmentMainStats");
const Types = require("../config/types");


// meta
const equipment_main_stats = require("../data/meta/equipment_main_stats.json");

const deleteAllEquipmentMainStats = async () => {
  await EquipmentMainStats.deleteMany({});
  console.log("Done! deleteAllEquipmentMainStats");
};

const addEquipmentMainStats = async () => {
    
    for (let index in equipment_main_stats) {
        let equip = equipment_main_stats[index];
        let item_effect = [equip.item_effect1, equip.item_effect2, equip.item_effect3, equip.item_effect4, equip.item_effect5];

        let effect_bonus = [];

        let markAtkBegin = "ATK +";
        let markAtkEnd = "%";
        let bonusType = Types.Stat.ATK;

        if(equip.item_effect1 && equip.item_effect1.startsWith(markAtkBegin) && equip.item_effect1.endsWith(markAtkEnd)){
            let value = parseInt(equip.item_effect1.replace(markAtkBegin, "").replace(markAtkEnd, "")) || 0;
            effect_bonus.push({
                type: bonusType,
                value: value,
                rarity: Types.Rarity.GOOD
            });
        }
        if(equip.item_effect2 && equip.item_effect2.startsWith(markAtkBegin) && equip.item_effect2.endsWith(markAtkEnd)){
            let value = parseInt(equip.item_effect2.replace(markAtkBegin, "").replace(markAtkEnd, "")) || 0;
            effect_bonus.push({
                type: bonusType,
                value: value,
                rarity: Types.Rarity.BETTER
            });
        }
        if(equip.item_effect3 && equip.item_effect3.startsWith(markAtkBegin) && equip.item_effect3.endsWith(markAtkEnd)){
            let value = parseInt(equip.item_effect3.replace(markAtkBegin, "").replace(markAtkEnd, "")) || 0;
            effect_bonus.push({
                type: bonusType,
                value: value,
                rarity: Types.Rarity.EXCELLENT
            });
        }
        if(equip.item_effect4 && equip.item_effect4.startsWith(markAtkBegin) && equip.item_effect4.endsWith(markAtkEnd)){
            let value = parseInt(equip.item_effect4.replace(markAtkBegin, "").replace(markAtkEnd, "")) || 0;
            effect_bonus.push({
                type: bonusType,
                value: value,
                rarity: Types.Rarity.EPIC
            });
        }
        if(equip.item_effect5 && equip.item_effect5.startsWith(markAtkBegin) && equip.item_effect5.endsWith(markAtkEnd)){
            let value = parseInt(equip.item_effect5.replace(markAtkBegin, "").replace(markAtkEnd, "")) || 0;
            effect_bonus.push({
                type: bonusType,
                value: value,
                rarity: Types.Rarity.LEGEND
            });
        }

        markAtkBegin = "HP +";
         markAtkEnd = "%";
        bonusType = Types.Stat.HP;
        
        if(equip.item_effect1 && equip.item_effect1.startsWith(markAtkBegin) && equip.item_effect1.endsWith(markAtkEnd)){
            let value = parseInt(equip.item_effect1.replace(markAtkBegin, "").replace(markAtkEnd, "")) || 0;
            effect_bonus.push({
                type: bonusType,
                value: value,
                rarity: Types.Rarity.GOOD
            });
        }
        if(equip.item_effect2 && equip.item_effect2.startsWith(markAtkBegin) && equip.item_effect2.endsWith(markAtkEnd)){
            let value = parseInt(equip.item_effect2.replace(markAtkBegin, "").replace(markAtkEnd, "")) || 0;
            effect_bonus.push({
                type: bonusType,
                value: value,
                rarity: Types.Rarity.BETTER
            });
        }
        if(equip.item_effect3 && equip.item_effect3.startsWith(markAtkBegin) && equip.item_effect3.endsWith(markAtkEnd)){
            let value = parseInt(equip.item_effect3.replace(markAtkBegin, "").replace(markAtkEnd, "")) || 0;
            effect_bonus.push({
                type: bonusType,
                value: value,
                rarity: Types.Rarity.EXCELLENT
            });
        }
        if(equip.item_effect4 && equip.item_effect4.startsWith(markAtkBegin) && equip.item_effect4.endsWith(markAtkEnd)){
            let value = parseInt(equip.item_effect4.replace(markAtkBegin, "").replace(markAtkEnd, "")) || 0;
            effect_bonus.push({
                type: bonusType,
                value: value,
                rarity: Types.Rarity.EPIC
            });
        }
        if(equip.item_effect5 && equip.item_effect5.startsWith(markAtkBegin) && equip.item_effect5.endsWith(markAtkEnd)){
            let value = parseInt(equip.item_effect5.replace(markAtkBegin, "").replace(markAtkEnd, "")) || 0;
            effect_bonus.push({
                type: bonusType,
                value: value,
                rarity: Types.Rarity.LEGEND
            });
        }

        const capitalizedType =  equip.item_type.charAt(0).toUpperCase()  + equip.item_type.slice(1)
        equip.item_type = capitalizedType

        await EquipmentMainStats.create({
            ...equip,
            item_effect,
            effect_bonus
        });
    }

    

};

const main = async () => {
  await deleteAllEquipmentMainStats();
  await addEquipmentMainStats();


  console.log("Done!");
  process.exit(0);
};

main();
